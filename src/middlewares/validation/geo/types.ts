export declare type PointCoordinates = {
    longitude: Number;
    latitude: Number
};
export declare type LineCoordinates = Array<PointCoordinates>;
export declare type MultiLineCoordinates = Array<LineCoordinates>;
export declare type PolygonCoordinates = Array<LineCoordinates>;
export declare type MultiPolygonCoordinates = Array<PolygonCoordinates>;
export declare type Geometry = Array<"Point" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon">

export declare type Point = { _id?: String; type: String; geometry: { type: 'Point'; coordinates: PointCoordinates; maxdistance?: Number, spherical?: Boolean; }; properties?: { [key: string]: any }, filter?: Geometry; }
export declare type LineString= { _id?:  String; type: String; geometry: { type: 'LineString'; coordinates: LineCoordinates }; properties?: { [key: string]: any }, filter?: Geometry }
export declare type MultiLineString = { _id?:  String; type: String; geometry: { type: 'MultiLineString'; coordinates: MultiLineCoordinates }; properties?: { [key: string]: any }, filter?: Geometry }
export declare type Polygon = { _id?:  String; type: String; geometry: { type: 'Polygon'; coordinates: PolygonCoordinates, closed?: Array<Number | undefined>; }; properties?: { [key: string]: any }, filter?: Geometry }
export declare type MultiPolygon = { _id?:  String; type: String; geometry: { type: 'MultiPolygon'; coordinates: MultiPolygonCoordinates, closed?: Array<Number | undefined> }; properties?: { [key: string]: any }, filter?: Geometry }

export declare type GeoData = Point | LineString | MultiLineString | Polygon | MultiPolygon;

export interface DeleteGeoData {
    _id: String
};