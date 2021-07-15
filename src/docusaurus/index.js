import {
  Switch,
  Route,
} from 'react-router-dom';

import DocusaurusProvider from 'theme-classic/DocusaurusProvider';
import DocPage from 'theme-classic/DocPage';

import Home from 'pages/Home';
import Docs from 'pages/Docs';

import config from './docusaurus.config';
import sidebars from './sidebars';
import routes from './routes';

import 'theme-classic/styles.css';

const DocRouter = () => {
  return (
    <DocPage
      sidebars={sidebars}
      routes={routes}
    >
      <Switch>
        <Route path="/docs" name="Docs" component={Docs} />
      </Switch>
    </DocPage>
  );
};

const Docusaurus = () => {
  return (
    <DocusaurusProvider
      config={config}
      id={"__docusaurus"}
    >
      <Switch>
        <Route path="/:path" name="DocRouter" component={DocRouter} />

        <Route path="/" name="Home" component={Home} />
      </Switch>
    </DocusaurusProvider>
  );
};

export default Docusaurus;
