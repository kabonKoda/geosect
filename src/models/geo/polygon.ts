import mongoose, { Schema } from "mongoose";

import { GeoJson } from "../../types";

export declare type IPolygon = GeoJson

const polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  geometry: {
    type: {
      type: String,
      enum: ['Polygon'],
      required: true
    },
    coordinates: {
      type: [[[Number]]],
      required: true
    }
  },
  properties: {
    type: Object
  }
});

polygonSchema.index({ 'geometry': '2dsphere' });

const Polygon = mongoose.model<IPolygon>("polygon", polygonSchema);

export default Polygon;
