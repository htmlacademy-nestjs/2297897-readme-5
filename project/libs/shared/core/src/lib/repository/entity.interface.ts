export type EntityIdType = string;
export type DefaultPOJOType = Record<string, unknown>;

export interface Entity<
  T extends EntityIdType,
  POJOType = DefaultPOJOType
> {
  id?: T;
  serialize(): POJOType;
}
