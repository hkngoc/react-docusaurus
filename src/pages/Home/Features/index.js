import clsx from 'clsx';

import { ReactComponent as Logo1 } from './undraw_docusaurus_mountain.svg';
import { ReactComponent as Logo2 } from './undraw_docusaurus_react.svg';
import { ReactComponent as Logo3 } from './undraw_docusaurus_tree.svg';

import './styles.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: Logo1,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: Logo2,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: Logo3,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

const Feature = ({ Svg, title, description }) => {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={"featureSvg"} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className={"features"}>
      <div className="container">
        <div className="row">
          {
            FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Features;
