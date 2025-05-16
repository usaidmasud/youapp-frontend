export const getImage = (path: string) => {
  return `${process.env.NEXT_PUBLIC_FILE_URL}${path}`;
};
