export interface CliCommandInterface {
  readonly name: string;
  run(...parameters: string[]): void;
}
