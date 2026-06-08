export type PlazaObjectType =
  | "district"
  | "building"
  | "citizen"
  | "opportunity";

export type PlazaInfo = {
  id: string;
  name: string;
  type: PlazaObjectType;
  description: string;
  futureCapability: string;
};

export type Building = PlazaInfo & {
  type: "building";
  districtId: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  roofColor: string;
};

export type Citizen = PlazaInfo & {
  type: "citizen";
  role: "human" | "ai" | "knowledge" | "compute";
  position: [number, number, number];
  color: string;
  accentColor: string;
};

export type District = PlazaInfo & {
  type: "district";
  position: [number, number, number];
  color: string;
};

export type Opportunity = PlazaInfo & {
  type: "opportunity";
  position: [number, number, number];
  status: "open" | "draft" | "future";
};

export type SelectablePlazaObject = Building | Citizen | District | Opportunity;
