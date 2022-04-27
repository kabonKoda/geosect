export declare type PointCoordinates = Array<Number>;
export declare type LineCoordinates = Array<PointCoordinates>;
export declare type MultiLineCoordinates = Array<LineCoordinates>;
export declare type PolygonCoordinates = Array<LineCoordinates>;
export declare type MultiPolygonCoordinates = Array<PolygonCoordinates>;

export declare type Point = { _id?: String; type: String; geometry: { type: 'Point'; coordinates: PointCoordinates }; properties?: { [key: string]: any } }
export declare type LineString= { _id?:  String; type: String; geometry: { type: 'LineString'; coordinates: LineCoordinates }; properties?: { [key: string]: any } }
export declare type MultiLineString = { _id?:  String; type: String; geometry: { type: 'MultiLineString'; coordinates: MultiLineCoordinates }; properties?: { [key: string]: any } }
export declare type Polygon = { _id?:  String; type: String; geometry: { type: 'Polygon'; coordinates: PolygonCoordinates }; properties?: { [key: string]: any } }
export declare type MultiPolygon = { _id?:  String; type: String; geometry: { type: 'MultiPolygon'; coordinates: MultiPolygonCoordinates }; properties?: { [key: string]: any } }

export declare type GeoJson = Point | LineString | MultiLineString | Polygon | MultiPolygon;