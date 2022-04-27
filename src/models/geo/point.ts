import mongoose, { Schema } from "mongoose";

import { GeoJson } from "../../types";

export declare type IPoint = GeoJson

export const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  properties: {
    type: Object
  }
});

pointSchema.index({ 'geometry': '2dsphere' });

const Point = mongoose.model<IPoint>("points", pointSchema);

export default Point;

// zone: {
//   type: "Airy"  || "Australian National" || "Bessel 1841" || "Bessel 1841 Nambia" || "Clarke 1866" || "Clarke 1880" || "Everest" || "Fischer 1960 Mercury" || "Fischer 1968" || "Fischer 1968" || "GRS 1967" || "GRS 1980" || "Helmert 1906" || "Hough" || "International" || "Krassovsky" || "Modified Airy" || "Modified Everest" || "Modified Fischer 1960" || "South American 1969" || "WGS 60" || "WGS 66" || "WGS 72" || "WGS 72" || "ED50" || "WGS 84" || "EUREF89" || "ETRS89",
//   required: true,
// }
