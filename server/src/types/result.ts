export enum ResultType {
  Ok = "Ok",
  Error = "Error",
  Skipped = "Skipped"
}
type ResultMessage = string
export type Result = [ResultType, ResultMessage]