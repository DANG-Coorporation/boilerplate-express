export function removeLimitAndPage(inputObject: any) {
  const { limit, page, ...rest } = inputObject;
  return rest;
}
