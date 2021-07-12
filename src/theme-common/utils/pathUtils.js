export const isSamePath = (path1, path2) => {
  const normalize = (pathname) => {
    return !pathname || pathname?.endsWith('/') ? pathname : `${pathname}/`;
  };

  return normalize(path1) === normalize(path2);
};

export default isSamePath;

