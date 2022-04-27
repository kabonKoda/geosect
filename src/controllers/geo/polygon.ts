/* eslint-disable consistent-return */
import { Request, Response } from "express";
import { Polygon as Geo } from "../../models/geo";
import {
  createPolygonValidation,
  editPolygonValidation,
  deletePolygonValidation
} from "../../middlewares/validation/geo";
import { Polygon } from "../../middlewares/validation/geo/types";
import { PolygonCoordinates } from "../../types";

export const polygonGeometry = (coordinates: Polygon['geometry']['coordinates']): PolygonCoordinates => {
  return coordinates.map(polygon => {
    return polygon.map(coordinate => {
        const { longitude, latitude } = coordinate;
        return [longitude, latitude];
    });
  });
}


export const polygon_create = async (req: Request, res: Response) => {
  const body: Polygon = req.body;
  
  createPolygonValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const coordinates = polygonGeometry(body.geometry.coordinates);
  //Create new polygon
  try {
    const geo = new Geo({ ...body, geometry: { type: "Polygon", coordinates } });
    await geo.save();
    return res.send(geo);
  } catch(err) {
    console.log(err)
    return res.status(500);
  }
};

export const polygon_edit = async (req: Request, res: Response) => {
  const body: Polygon = req.body;

  editPolygonValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const { _id } = body;
  const coordinates = polygonGeometry(body.geometry.coordinates);
  //Update polygon in database
  try {
    const resGeo = await Geo.updateOne({ _id }, { ...body, geometry: { type: "Polygon", coordinates } }, { new: true });
    return res.status(200).send(resGeo);
  }
  catch {
    return res.status(500);
  }
};

export const polygon_delete = async (req: Request, res: Response) => { 
  const body: { _id: String } = req.body;

  deletePolygonValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const { _id } = body;
  try {
    //delete polygon in db
    const resGeo = await Geo.deleteOne({ _id }, { new: true });

    if (!resGeo.deletedCount) return res.status(404).send('Not found');
    
    return res.status(200).send('ok');
  }
  catch {
    return res.status(500).send("An unexpected error occured");
  }  
};