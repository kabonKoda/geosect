import * as yup from 'yup';
import { Polygon } from './types';
import { point } from './point';

export const polygon = yup.array().of(yup.array().of(point).min(3).required()).length(1).required();

export const closed = (data: Polygon) => {
  const { coordinates } = data.geometry;
  const closed: Array<Number | undefined> = [];
  coordinates.forEach((coordinate, i) => {
    const { length } = coordinates;
    const start = coordinate[0];
    const end = coordinate[length - 1];
    start.longitude !== end.longitude || start.latitude !== end.latitude && closed.push(i);
  })
  return closed;
}

export const createPolygonValidation = (data: Polygon) => { 
  data.geometry.closed = closed(data); 
  const schema = yup.object({
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["Polygon"]).required(),
      coordinates: polygon,      
      closed: yup.array().of(yup.number()).length(0, `The coordinates of the first and last points of polygon(s) [${data.geometry.closed.join(', ')}] must be equal`).required()
    }).required(),
    properties: yup.object()
  });
  return schema.validate(data);
};

export const editPolygonValidation = (data: Polygon) => {
  data.geometry.closed = closed(data);
  const schema = yup.object({
    _id: yup.string().required(),
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["Polygon"]).required(),
      coordinates: polygon,
      closed: yup.array().of(yup.number()).length(0, `The coordinates of the first and last points of polygon(s) [${data.geometry.closed.join(', ')}] must be equal`).required()
    }).required(),
    properties: yup.object()
  });
  return schema.validate(data);
};

export const deletePolygonValidation = async (data: {_id: String }) => {
  const schema =  yup.object({
    _id: yup.string().required()
  });
  return schema.validate(data);
};