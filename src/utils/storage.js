export const StoreData = (key, value) => {
  const data = localStorage.getItem(key);
  if (data) {
    const parse_data = JSON.parse(data);
    localStorage.setItem(key, JSON.stringify([...parse_data, value]));
    return null;
  }
  localStorage.setItem(key, JSON.stringify([value]));
  return null;
};

export const StoreGrpTextData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return null;
};

export const RetriveData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : data;
};

export const RemoveDataWithKey = (key) => {
  localStorage.removeItem(key);
  return null;
};
