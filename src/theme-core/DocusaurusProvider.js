import { useState, useEffect } from 'react';

import DocusaurusContext from './DocusaurusContext';

const DocusaurusProvider = ({ config, children }) => {
  const [_config, setConfig] = useState(config);

  useEffect(() => {
    setConfig(config);
  }, [config]);

  return (
    <DocusaurusContext.Provider
      value={{
        ..._config
      }}
    >
      {children}
    </DocusaurusContext.Provider>
  );
};

export default DocusaurusProvider;
