/* eslint-disable consistent-return */
import { Request, Response } from "express";
import { LineString as Geo } from "../../models/geo";
import {
  createLineStringValidation,
  editLineStringValidation,
  deleteLineStringValidation
} from "../../middlewares/validation/geo";
import { LineString } from "../../middlewares/validation/geo/types";
import { LineCoordinates } from "../../types";

export const lineGeometry = (coordinates: LineString['geometry']['coordinates']): LineCoordinates => {
  return coordinates.map(coordinate => {
    const { longitude, latitude } = coordinate;
    return [longitude, latitude];
  });
}

export const line_create = async (req: Request, res: Response) => {
  const body: LineString = req.body;
  
  createLineStringValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const coordinates = lineGeometry(body.geometry.coordinates);
  //Create new point
  try {
    const geo = new Geo({ ...body, geometry: { type: "LineString", coordinates } });
    await geo.save();
    return res.send(geo);
  } catch(err) {
    console.log(err)
    return res.status(500);
  }  
};

export const line_edit = async (req: Request, res: Response) => {
  const body: LineString = req.body;

  editLineStringValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });
  
  const coordinates = lineGeometry(body.geometry.coordinates);
  //Update line in database
  const { _id } = body;
  try {
    const resGeo = await Geo.updateOne({ _id }, { ...body, geometry: { type: "LineString", coordinates } }, { new: true });
    return res.status(200).send(resGeo);
  }
  catch {
    return res.status(500);
  }
};

export const line_delete = async (req: Request, res: Response) => { 
  const body: { _id: String } = req.body;

  deleteLineStringValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const { _id } = body;
  try {
    //delete line in db
    const resGeo = await Geo.deleteOne({ _id }, { new: true });

    if (!resGeo.deletedCount) return res.status(404).send('Not found');
    
    return res.status(200).send('ok');
  }
  catch {
    return res.status(500).send("An unexpected error occured");
  }  
};