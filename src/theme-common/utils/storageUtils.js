export const StorageTypes = ['localStorage', 'sessionStorage', 'none'];

const DefaultStorageType = 'localStorage';

const getBrowserStorage = (storageType = DefaultStorageType) => {
  if (typeof window === 'undefined') {
    throw new Error('Browser storage is not available on Node.js/Docusaurus SSR process.');
  }
  if (storageType === 'none') {
    return null;
  }
  else {
    try {
      return window[storageType];
    }
    catch (e) {
      logOnceBrowserStorageNotAvailableWarning(e);
      return null;
    }
  }
};

let hasLoggedBrowserStorageNotAvailableWarning = false;
const logOnceBrowserStorageNotAvailableWarning = (error) => {
  if (!hasLoggedBrowserStorageNotAvailableWarning) {
    console.warn(`Docusaurus browser storage is not available.
Possible reasons: running Docusaurus in an iframe, in an incognito browser session, or using too strict browser privacy settings.`, error);
    hasLoggedBrowserStorageNotAvailableWarning = true;
  }
};

const NoopStorageSlot = {
  get: () => null,
  set: () => { },
  del: () => { },
};

const createServerStorageSlot = (key) => {
  const throwError = () => {
    throw new Error(`Illegal storage API usage for storage key "${key}".
Docusaurus storage APIs are not supposed to be called on the server-rendering process.
Please only call storage APIs in effects and event handlers.`);
  };

  return {
    get: throwError,
    set: throwError,
    del: throwError,
  };
}

export const createStorageSlot = (key, options) => {
  if (typeof window === 'undefined') {
    return createServerStorageSlot(key);
  }

  const browserStorage = getBrowserStorage(options === null || options === void 0 ? void 0 : options.persistence);
  if (browserStorage === null) {
    return NoopStorageSlot;
  }

  return {
    get: () => browserStorage.getItem(key),
    set: (value) => browserStorage.setItem(key, value),
    del: () => browserStorage.removeItem(key),
  };
};

export function listStorageKeys(storageType = DefaultStorageType) {
  const browserStorage = getBrowserStorage(storageType);
  if (!browserStorage) {
    return [];
  }
  const keys = [];
  for (let i = 0; i < browserStorage.length; i += 1) {
    const key = browserStorage.key(i);
    if (key !== null) {
      keys.push(key);
    }
  }
  return keys;
};
