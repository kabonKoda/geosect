/* eslint-disable consistent-return */
import mongoose from "mongoose";
import { Request, Response } from "express";
import { point_create, point_edit, point_delete, pointGeometry } from "./point";
import { line_create, line_edit, line_delete, lineGeometry } from "./line";
import { mline_create, mline_edit, mline_delete, multiLineGeometry } from "./multiline";
import { polygon_create, polygon_edit, polygon_delete, polygonGeometry } from "./polygon";
import { mpoly_create, mpoly_edit, mpoly_delete, multiPolygonGeometry } from "./multipolygon";
import { GeoData, intersectGeoValidation, nearGeoValidation, withinGeoValidation } from "../../middlewares/validation/geo";
import { Point, LineString, MultiLineString, Polygon, MultiPolygon } from "../../models/geo";
import { Point as PointValidation } from "../../middlewares/validation/geo/types";
import { IPoint } from "../../models/geo/point";
import { ILine } from "../../models/geo/line";
import { IMLine } from "../../models/geo/multiline";
import { IPolygon } from "../../models/geo/polygon";
import { IMPolygon } from "../../models/geo/multipolygon";

export {
  point_create, 
  point_edit, 
  point_delete, 
  line_create, 
  line_edit, 
  line_delete, 
  mline_create, 
  mline_edit, 
  mline_delete, 
  polygon_create, 
  polygon_edit, 
  polygon_delete, 
  mpoly_create, 
  mpoly_edit, 
  mpoly_delete
}
   
export const arrayfier = {
  'Point': pointGeometry,
  'LineString': lineGeometry,
  'MultiLineString': multiLineGeometry,
  'Polygon': polygonGeometry,
  'MultiPolygon': multiPolygonGeometry
}

export const geo_intersect = async (req: Request, res: Response) => {
  const body: GeoData = req.body;

  intersectGeoValidation(body).catch(err => {
    console.log(err);
    if (err) return res.status(400).send(err.errors[0]);
  });

  try {
    const intersects: { [key: string]: Array<IPoint | ILine | IMLine | IPolygon | IMPolygon> } = {};
    const { filter } = body;
    const { type, coordinates } = body.geometry;
    const c: any = coordinates
    const geometry = { type: type, coordinates: arrayfier[type](c) };
    console.log(geometry)
    if (filter?.includes('Point')) intersects.Points =  await Point.find().where('geometry').intersects().geometry({ ...geometry });
    if (filter?.includes('LineString')) intersects.LineStrings =  await LineString.find().where('geometry').intersects().geometry({ ...geometry });
    if (filter?.includes('MultiLineString')) intersects.MultiLineStrings =  await MultiLineString.find().where('geometry').intersects().geometry({ ...geometry });
    if (filter?.includes('Polygon')) intersects.Polygons =  await Polygon.find().where('geometry').intersects().geometry({ ...geometry });
    if (filter?.includes('MultiPolygon')) intersects.MultiPolygons =  await MultiPolygon.find().where('geometry').intersects().geometry({ ...geometry });
    
    return res.status(200).send({ ...intersects });
  } catch (err) {
    console.log(err);
    return res.status(500).send("An unexpected error occured");
  }  
};

export const geo_within = async (req: Request, res: Response) => {
  const body: GeoData = req.body;

  withinGeoValidation(body).catch(err => {
    console.log(err);
    if (err) return res.status(400).send(err.errors[0]);
  });

  try {
    const intersects: { [key: string]: Array<IPoint | ILine | IMLine | IPolygon | IMPolygon> } = {};
    const { filter } = body;
    const { type, coordinates } = body.geometry;
    const c: any = coordinates
    const geometry = { type: type, coordinates: arrayfier[type](c) };
    console.log(geometry)
    if (filter?.includes('Point')) intersects.Points =  await Point.find().where('geometry').within().geometry({ ...geometry });
    if (filter?.includes('LineString')) intersects.LineStrings =  await LineString.find().where('geometry').within().geometry({ ...geometry });
    if (filter?.includes('MultiLineString')) intersects.MultiLineStrings =  await MultiLineString.find().where('geometry').within().geometry({ ...geometry });
    if (filter?.includes('Polygon')) intersects.Polygons =  await Polygon.find().where('geometry').within().geometry({ ...geometry });
    if (filter?.includes('MultiPolygon')) intersects.MultiPolygons =  await MultiPolygon.find().where('geometry').within().geometry({ ...geometry });

    return res.status(200).send({ ...intersects });
  } catch {
    return res.status(500).send("An unexpected error occured");
  }  
};

export const geo_near = async (req: Request, res: Response) => {
  const body: PointValidation = req.body;

  nearGeoValidation(body).catch(err => {
    console.log(err);
    if (err) return res.status(400).send(err.errors[0]);
  });

  try {
    const intersects: { [key: string]: Array<IPoint | ILine | IMLine | IPolygon | IMPolygon> } = {};
    const { filter } = body;
    const { coordinates, maxdistance, spherical } = body.geometry;
    const geometry = { center: pointGeometry(coordinates), maxdistance, spherical };
    console.log(geometry)
    if (filter?.includes('Point')) intersects.Points =  await Point.find().where('geometry').near({ ...geometry });
    if (filter?.includes('LineString')) intersects.LineStrings =  await LineString.find().where('geometry').near({ ...geometry });
    if (filter?.includes('MultiLineString')) intersects.MultiLineStrings =  await MultiLineString.find().where('geometry').near({ ...geometry });
    if (filter?.includes('Polygon')) intersects.Polygons =  await Polygon.find().where('geometry').near({ ...geometry });
    if (filter?.includes('MultiPolygon')) intersects.MultiPolygons =  await MultiPolygon.find().near({ ...geometry });

    return res.status(200).send({ ...intersects });
  } catch {
    return res.status(500).send("An unexpected error occured");
  }  
};