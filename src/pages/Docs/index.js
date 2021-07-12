import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Overview from 'pages/Docs/Overview';

const Docs = () => {
  return (
    <Switch>
      <Route path="/docs/overview" name="Overview" component={Overview} />

      <Redirect from="/docs" to="/docs/overview" />
    </Switch>
  );
};

export default Docs;
