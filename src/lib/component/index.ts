export abstract class TComponent<
  TFieldsModel = Record<string, unknown>,
  TGettersModel = Record<string, unknown>,
  TSettersModel = Record<string, unknown>
> {
  abstract fields: TFieldsModel;
  abstract getters: TGettersModel;
  abstract setters: TSettersModel;
}
