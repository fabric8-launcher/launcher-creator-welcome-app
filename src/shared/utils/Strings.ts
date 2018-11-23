export function defaultIfEmpty(val: string | undefined, def: string): string {
  return (val && val.length > 0) ? val : def;
}