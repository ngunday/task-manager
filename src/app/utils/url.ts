export const urlToName = (name: string) => {
  return name
    .replace(/https?:\/\//, '')
    .replace(/\//g, '-')
    .replace('.', '-');
};
