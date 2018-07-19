export const ArrayDelete = (array: Array<any>, index: number) => {
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ];
};
