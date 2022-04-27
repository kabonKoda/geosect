import * as yup from 'yup';
import { createPointValidation, editPointValidation, deletePointValidation, point } from './point';
import { createLineStringValidation, editLineStringValidation, deleteLineStringValidation, line } from './line';
import { createMultiLineStringValidation, editMultiLineStringValidation, deleteMultiLineStringValidation, mline } from './multiline';
import { createPolygonValidation, editPolygonValidation, deletePolygonValidation, polygon } from './polygon';
import { createMultiPolygonValidation, editMultiPolygonValidation, deleteMultiPolygonValidation, mpoly } from './multipolygon';
import { GeoData, Point } from './types';

const intersectGeoValidation = (data: GeoData) => {
  const { type } =  data.geometry;
  const schema = yup.object({
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["Point", "LineString", "MultiLineString", "Polygon", "MultiPolygon"]),
      coordinates: 
        type === 'Point' ? point : 
        type === 'LineString' ? line : 
        type === 'MultiLineString' ? mline : 
        type === 'Polygon' ? polygon :
        type === 'MultiPolygon' ? mpoly : yup.array().length(-1)
    }).required(), 
    filter: yup.array().of(yup.string().oneOf(["Point", "LineString", "MultiLineString", "Polygon", "MultiPolygon"])).min(1).max(5).required(),
    properties: yup.object(),
  });
  return schema.validate(data);
}

const withinGeoValidation = (data: GeoData) => {
  const { type } =  data.geometry;
  const schema = yup.object({
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["Point", "LineString", "MultiLineString", "Polygon", "MultiPolygon"]),
      coordinates: 
        type === 'Point' ? point : 
        type === 'LineString' ? line : 
        type === 'MultiLineString' ? mline : 
        type === 'Polygon' ? polygon :
        type === 'MultiPolygon' ? mpoly : yup.array().length(-1)
    }).required(), 
    filter: yup.array().of(yup.string().oneOf(["Polygon", "MultiPolygon"])).min(1).max(2).required(),
    properties: yup.object(),
  });
  return schema.validate(data);
}

const nearGeoValidation = (data: Point) => {
  const schema = yup.object({
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["Point"]),
      coordinates: point,
      spherical: yup.boolean().required(),
      maxdistance: yup.number().required()
    }).required(),
    filter: yup.array().of(yup.string().oneOf(["Point", "LineString", "MultiLineString", "Polygon", "MultiPolygon"])).max(5).required(),
    properties: yup.object(),
  });
  return schema.validate(data);
}

export {
  GeoData,
  createPointValidation,
  editPointValidation, 
  deletePointValidation, 
  createLineStringValidation, 
  editLineStringValidation, 
  deleteLineStringValidation, 
  createMultiLineStringValidation, 
  editMultiLineStringValidation, 
  deleteMultiLineStringValidation,
  createPolygonValidation, 
  editPolygonValidation, 
  deletePolygonValidation, 
  createMultiPolygonValidation, 
  editMultiPolygonValidation, 
  deleteMultiPolygonValidation,
  intersectGeoValidation,
  withinGeoValidation,
  nearGeoValidation,
}
