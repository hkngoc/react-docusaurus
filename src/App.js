// import { lazy } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Layout from 'theme-classic/Layout';

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
      <Layout
        config={config}
      >
        <Switch>
          <Route path="/docs" name="Docs" component={Docs} />

          <Route path="/" name="Home" component={Home} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
