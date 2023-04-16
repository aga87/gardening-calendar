export const hasNonEmptyValue = (object: { [key: string]: string }): boolean =>
  Object.values(object).some(value => value !== '');
