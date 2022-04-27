import * as yup from 'yup';
import { MultiPolygon } from './types';
import { polygon } from './polygon';

export const mpoly = yup.array().of(polygon).min(2).required();

export const createMultiPolygonValidation = (data: MultiPolygon) => {
  const schema = yup.object({
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["MultiPolygon"]).required(),
      coordinates: mpoly
    }).required(),
    properties: yup.object()
  });
  return schema.validate(data);
};

export const editMultiPolygonValidation = (data: MultiPolygon) => {
  const schema = yup.object({
    _id: yup.string().required(),
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["MultiPolygon"]).required(),
      coordinates:  yup.array().of(polygon).required()
    }).required(),
    properties: yup.object()
  });
  return schema.validate(data);
};

export const deleteMultiPolygonValidation = (data: {_id: String }) => {
  const schema =  yup.object({
    _id: yup.string().required()
  });
  return schema.validate(data);
};