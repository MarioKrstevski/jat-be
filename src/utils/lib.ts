export const validDateString = (val: string | null | undefined) =>
  !val || !isNaN(Date.parse(val));

export function generateShortId(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    shortId += characters[randomIndex];
  }
  return shortId;
}
