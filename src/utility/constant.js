export const OrderByTypeEnum = {
  Asc: 0,
  Desc: 1,
};

export const HairStyleEnum = {
  Straight: 1,
  KinkyStraight: 2,
  Wave: 3,
  BodyWave: 4,
  LooseWay: 5,
  DeepWave: 6,
  Curly: 7,
  CurlyWave: 8,
  KinkyCurly: 9,
};

export const HairStyleDisplayConfig = {
  [HairStyleEnum.Straight]: "Straight",
  [HairStyleEnum.KinkyStraight]: "KinkyStraight",
  [HairStyleEnum.Wave]: "Wave",
  [HairStyleEnum.BodyWave]: "BodyWave",
  [HairStyleEnum.LooseWay]: "LooseWay",
  [HairStyleEnum.DeepWave]: "DeepWave",
  [HairStyleEnum.Curly]: "Curly",
  [HairStyleEnum.CurlyWave]: "CurlyWave",
  [HairStyleEnum.KinkyCurly]: "KinkyCurly",
};

export const MaterialTypeEnum = {
  RemyHair: 1,
  VirginHair: 2,
};

export const MaterialTypeDisplayConfig = {
  [MaterialTypeEnum.RemyHair]: "RemyHair",
  [MaterialTypeEnum.VirginHair]: "VirginHair",
};

export const LengthMeasureUnitEnum = {
  Inch: 1,
  Centimeter: 2,
};

export const LengthMeasureUnitDisplayConfig = {
  [LengthMeasureUnitEnum.Inch]: "Inch",
  [LengthMeasureUnitEnum.Centimeter]: "Centimeter",
};

export const WeightMeasureUnitEnum = {
  Kilogram: 1,
  Pound: 2,
};

export const WeightMeasureUnitDisplayConfig = {
  [WeightMeasureUnitEnum.Kilogram]: "Kilogram",
  [WeightMeasureUnitEnum.Pound]: "Pound",
};

export const PackingRuleEnum = {
  ClearPlasticBagWithSmallTag: 1,
  ClientsPackingAndLogoAccepted: 2,
};

export const PackingRuleDisplayConfig = {
  [PackingRuleEnum.ClearPlasticBagWithSmallTag]: "ClearPlasticBagWithSmallTag",
  [PackingRuleEnum.ClientsPackingAndLogoAccepted]: "ClientsPackingAndLogoAccepted",
};
