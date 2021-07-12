import { useContext } from 'react';

import context from './DocusaurusContext';

const useDocusaurusContext = () => {
  const docusaurusContext = useContext(context);

  return docusaurusContext;
};

export default useDocusaurusContext;
