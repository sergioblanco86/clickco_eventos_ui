export const ArrayInsert = (array: Array<any>, element: any, index?: number) => {
  if (index !== undefined) {
    return [
      ...array.slice(0, index + 1),
      ...element,
      ...array.slice(index + 1)
    ];
  } else {
    return [...array, element];
  }
};
