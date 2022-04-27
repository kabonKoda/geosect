import mongoose, { Schema } from "mongoose";

import { GeoJson } from "../../types";

export declare type IMPolygon = GeoJson

const multiPolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  geometry: {    
    type: {
      type: String,
      enum: ['MultiPolygon'],
      required: true
    },
    coordinates: {
      type: [[[[Number]]]],
      required: true
    }
  },
  properties: {
    type: Object
  }  
});

multiPolygonSchema.index({ 'geometry': '2dsphere' });

const MultiPolygon = mongoose.model<IMPolygon>("multipolygon", multiPolygonSchema);

export default MultiPolygon;
