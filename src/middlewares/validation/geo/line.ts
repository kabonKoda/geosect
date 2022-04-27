import * as yup from 'yup';
import { LineString } from './types';
import { point } from './point';

export const line = yup.array().of(point).min(2).required();

export const createLineStringValidation = (data: LineString) => {
  const schema = yup.object({
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["LineString"]).required(),
      coordinates: line
    }).required(),
    properties: yup.object()
  });
  return schema.validate(data)
};

export const editLineStringValidation = (data: LineString) => {
  const schema = yup.object({
    _id: yup.string().required(),
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["LineString"]).required(),
      coordinates: point
    }).required(),
    properties: yup.object()
  });
  return schema.validate(data);
};

export const deleteLineStringValidation = (data: {_id: String }) => {
  const schema =  yup.object({
    _id: yup.string().required()
  });
  return schema.validate(data);
};