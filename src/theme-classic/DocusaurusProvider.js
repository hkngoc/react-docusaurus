import DocusaurusContext from '@docusaurus/core/lib/client/exports/context';

export const DocusaurusProvider = ({ config, id, children }) => {
  return (
    <DocusaurusContext.Provider
      value={{
        ...config
      }}
    >
      {
        id ? (
          <div id={id}>
            {children}
          </div>
        ) : (
          children
        )
      }
    </DocusaurusContext.Provider>
  );
};

export default DocusaurusProvider;
