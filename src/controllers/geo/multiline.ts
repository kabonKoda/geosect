/* eslint-disable consistent-return */
import { Request, Response } from "express";
import { MultiLineString as Geo } from "../../models/geo";
import {
  createMultiLineStringValidation,
  editMultiLineStringValidation,
  deleteMultiLineStringValidation
} from "../../middlewares/validation/geo";
import { MultiLineString } from "../../middlewares/validation/geo/types";
import { MultiLineCoordinates } from "../../types";

export const multiLineGeometry = (coordinates: MultiLineString['geometry']['coordinates']): MultiLineCoordinates => {
  return coordinates.map(lines => {
    return lines.map(coordinate => {
        const { longitude, latitude } = coordinate;
        return [longitude, latitude];
    });
  });
}

export const mline_create = async (req: Request, res: Response) => {
  const body: MultiLineString = req.body;
  
  //validate user input
  createMultiLineStringValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const coordinates = multiLineGeometry(body.geometry.coordinates);
  //Create new multiline
  try {
    const geo = new Geo({ ...body, geometry: { type: "MultiLineString", coordinates } });
    await geo.save();
    return res.send(geo);
  } catch(err) {
    console.log(err)
    return res.status(500);
  }
};

export const mline_edit = async (req: Request, res: Response) => {
  const body: MultiLineString = req.body;

  editMultiLineStringValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const { _id } = body;
  const coordinates = multiLineGeometry(body.geometry.coordinates);
  //Update multiline in database
  try {
    const resGeo = await Geo.updateOne({ _id }, { ...body, geometry: { type: "MultiLineString", coordinates } }, { new: true });
    return res.status(200).send(resGeo);
  }
  catch {
    return res.status(500);
  }
};

export const mline_delete = async (req: Request, res: Response) => { 
  const body: { _id: String } = req.body;

  deleteMultiLineStringValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const { _id } = body;
  try {
    //delete multiline in db
    const resGeo = await Geo.deleteOne({ _id }, { new: true });

    if (!resGeo.deletedCount) return res.status(404).send('Not found');
    
    return res.status(200).send('ok');
  }
  catch {
    return res.status(500).send("An unexpected error occured");
  }  
};