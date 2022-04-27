import mongoose, { Schema } from "mongoose";

import { GeoJson } from "../../types";

export declare type IMLine = GeoJson

const multiLineStringSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  geometry: {    
    type: {
      type: String,
      enum: ['MultiLineString'],
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

multiLineStringSchema.index({ 'geometry': '2dsphere' });

const MultiLineString = mongoose.model<IMLine>("multiline", multiLineStringSchema);

export default MultiLineString;