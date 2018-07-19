export const ArrayUpdate = (array: Array<any>, index: number, item: any) => {
  return array.map((_item, _index) => {
    if (_index !== index) {
      return _item;
    }

    return item;
  });
};
