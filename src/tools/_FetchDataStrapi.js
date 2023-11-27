export const _FetchDataStrapi = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

export default _FetchDataStrapi;
