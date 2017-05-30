/** @docs-private */
export function createMissingDateImplError(provider: string) {
  return new Error(
      `Md2Datepicker: No provider found for ${provider}. You must import one of the following` +
      `modules at your application root: Md2NativeDateModule, or provide a custom implementation.`);
}
