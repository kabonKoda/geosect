import * as yup from 'yup';
import { MultiLineString } from './types';
import { line } from './line';

export const mline = yup.array().of(line).min(2).required();

export const createMultiLineStringValidation = (data: MultiLineString) => {
  const schema = yup.object({
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["MultiLinestring"]).required(),
      coordinates: mline
    }).required(),
    properties: yup.object()
  });
  return schema.validate(data)
};

export const editMultiLineStringValidation = (data: MultiLineString) => {
  const schema = yup.object({
    _id: yup.string().required(),
    type: yup.string().required(),
    geometry: yup.object({
      type: yup.string().oneOf(["MultiLinestring"]).required(),
      coordinates: yup.array().of(line).required()
    }).required(),
    properties: yup.object()
  });
  return schema.validate(data)
};

export const deleteMultiLineStringValidation = (data: {_id: String }) => {
  const schema =  yup.object({
    _id: yup.string().required()
  });
  return schema.validate(data);
};