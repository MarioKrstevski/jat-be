export const validDateString = (val: string | null | undefined) =>
  !val || !isNaN(Date.parse(val));
