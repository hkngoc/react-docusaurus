import {
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';

import DocPage from 'theme-classic/DocPage';

import Overview from 'pages/Docs/Overview';

import sidebars from 'pages/sidebars';
import routes from 'pages/routes';

const Docs = (props) => {
  return (
    <DocPage
      sidebars={sidebars}
      routes={routes}
    >
      <Switch>
        <Route path="/docs" name="Overview" component={Overview} />

        {/* <Redirect from="/docs" to="/docs/cli" /> */}
      </Switch>
    </DocPage>
  );
};

export default Docs;
