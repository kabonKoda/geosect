import * as yup from 'yup';
import { Point } from './types';

export const longitude = yup.number().min(-180).max(180).required();
export const latitude = yup.number().min(-90).max(90).required();
export const point = yup.object({ longitude, latitude }).required();

export const createPointValidation = (data: Point) => {
  const schema = yup.object({
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["Point"]).required(),
      coordinates: point
    }).required(),
    properties: yup.object()
  });
  return schema.validate(data)
};

export const editPointValidation = (data: Point) => {
  const schema = yup.object({
    _id: yup.string().required(),
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["Point"]).required(),
      coordinates: point
    }).required(),
    properties: yup.object()
  });
  return schema.validate(data);
};

export const deletePointValidation = async (data: {_id: String }) => {
  const schema =  yup.object({
    _id: yup.string().required()
  });
  return schema.validate(data);
};