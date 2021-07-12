export const hasProtocol = (url) => {
  return /^(\w*:|\/\/)/.test(url) === true;
}

export const isInternalUrl = (url) => {
  return typeof url !== 'undefined' && !hasProtocol(url);
}

export default isInternalUrl;
