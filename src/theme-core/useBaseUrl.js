import useDocusaurusContext from './useDocusaurusContext';
import { hasProtocol } from './isInternalUrl';

const addBaseUrl = (siteUrl, baseUrl, url, { forcePrependBaseUrl = false, absolute = false } = {}) => {
  if (!url) {
      return url;
  }
  // it never makes sense to add a base url to a local anchor url
  if (url.startsWith('#')) {
      return url;
  }
  // it never makes sense to add a base url to an url with a protocol
  if (hasProtocol(url)) {
      return url;
  }
  if (forcePrependBaseUrl) {
      return baseUrl + url;
  }
  // We should avoid adding the baseurl twice if it's already there
  const shouldAddBaseUrl = !url.startsWith(baseUrl);
  const basePath = shouldAddBaseUrl ? baseUrl + url.replace(/^\//, '') : url;
  return absolute ? siteUrl + basePath : basePath;
};

export const useBaseUrlUtils = () => {
  const { siteConfig: { baseUrl = '/', url: siteUrl } = {}, } = useDocusaurusContext();
  return {
      withBaseUrl: (url, options) => {
          return addBaseUrl(siteUrl, baseUrl, url, options);
      },
  };
}

export const useBaseUrl = (url, options = {}) => {
  const { withBaseUrl } = useBaseUrlUtils();
  return withBaseUrl(url, options);
};

export default useBaseUrl;
