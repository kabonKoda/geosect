/* eslint-disable consistent-return */
import { Request, Response } from "express";
import { MultiPolygon as Geo } from "../../models/geo";
import {
  createMultiPolygonValidation,
  editMultiPolygonValidation,
  deleteMultiPolygonValidation
} from "../../middlewares/validation/geo";
import { MultiPolygon } from "../../middlewares/validation/geo/types";
import { MultiPolygonCoordinates } from "../../types";

export const multiPolygonGeometry = (coordinates: MultiPolygon['geometry']['coordinates']): MultiPolygonCoordinates => {
  return coordinates.map(polygons => {
    return polygons.map(polygon => {
      return polygon.map(coordinate => {
        const { longitude, latitude } = coordinate;
        return [longitude, latitude];
      });
    });
  });
}

export const mpoly_create = async (req: Request, res: Response) => {
  const body: MultiPolygon = req.body;
  
  createMultiPolygonValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const coordinates = multiPolygonGeometry(body.geometry.coordinates);
  //Create new multipolygon
  try {
    const geo = new Geo({ ...body, geometry: { type: "MultiPolygon", coordinates } });
    await geo.save();
    return res.send(geo);
  } catch(err) {
    console.log(err)
    return res.status(500);
  }
};

export const mpoly_edit = async (req: Request, res: Response) => {
  const body: MultiPolygon = req.body;

  editMultiPolygonValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const { _id } = body;
  const coordinates = multiPolygonGeometry(body.geometry.coordinates);
  //Update multipolygon in database
  try {
    const resGeo = await Geo.updateOne({ _id }, { ...body, geometry: { type: "MultiPolygon", coordinates } }, { new: true });
    return res.status(200).send(resGeo);
  }
  catch {
    return res.status(500);
  }
};

export const mpoly_delete = async (req: Request, res: Response) => { 
  const body: { _id: String } = req.body;

  deleteMultiPolygonValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const { _id } = body;
  try {
    //delete multipolygon in db
    const resGeo = await Geo.deleteOne({ _id }, { new: true });

    if (!resGeo.deletedCount) return res.status(404).send('Not found');
    
    return res.status(200).send('ok');
  }
  catch {
    return res.status(500).send("An unexpected error occured");
  }  
};