// import { lazy } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import DocusaurusProvider from 'theme-core/DocusaurusProvider';

import Home from 'pages/Home';
import Docs from 'pages/Docs';

import config from 'docusaurus.config';
import './App.css';

// Need implement Falback frist
// const Home = lazy(() => import(/* webpackChunkName: "Home" */'pages/Home'));
// const Docs = lazy(() => import(/* webpackChunkName: "Docs" */'pages/Docs'));

const App = () => {
  return (
    <Router>
      <DocusaurusProvider
        config={config}
      >
        <Switch>
          <Route path="/docs" name="Docs" component={Docs} />

          <Route path="/" name="Home" component={Home} />
        </Switch>
      </DocusaurusProvider>
    </Router>
  );
};

export default App;
