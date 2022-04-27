/* eslint-disable consistent-return */
import { Request, Response } from "express";
import { Point as Geo } from "../../models/geo";
import {
  createPointValidation,
  editPointValidation,
  deletePointValidation
} from "../../middlewares/validation/geo";
import { Point } from "../../middlewares/validation/geo/types";
import { PointCoordinates } from "../../types";

export const pointGeometry = (coordinates: Point['geometry']['coordinates']): PointCoordinates => {
  const { longitude, latitude } = coordinates;
  return [longitude, latitude];
}

export const point_create = async (req: Request, res: Response) => {
  const body: Point = req.body;  
  
  createPointValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });
  
  const coordinates = pointGeometry(body.geometry.coordinates);
  //Create new point
  try {
    const geo = new Geo({ ...body, geometry: { type: "Point", coordinates } });
    await geo.save();
    return res.send(geo);
  } catch(err) {
    console.log(err)
    return res.status(500);
  } 
};

export const point_edit = async (req: Request, res: Response) => {
  const body: Point = req.body;

  editPointValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0]);
  });
  
  const coordinates = pointGeometry(body.geometry.coordinates);
  //Update point in database
  const { _id } = body;
  try {
    const resGeo = await Geo.updateOne({ _id }, { ...body, geometry: { type: "Point", coordinates } }, { new: true });
    return res.status(200).send(resGeo);
  }
  catch {
    return res.status(500);
  }
};

export const point_delete = async (req: Request, res: Response) => { 
  const body: { _id: String } = req.body;

  deletePointValidation(body).catch(err => {
    console.log(err)
    if (err) return res.status(400).send(err.errors[0])
  });

  const { _id } = body;
  try {
    //delete point in db
    const resGeo = await Geo.deleteOne({ _id }, { new: true });

    if (!resGeo.deletedCount) return res.status(404).send('Not found');
    
    return res.status(200).send('ok');
  }
  catch {
    return res.status(500).send("An unexpected error occured");
  }  
};