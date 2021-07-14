import {
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';

import Overview from 'pages/Docs/Overview';

const Docs = (props) => {
  return (
    <Switch>
      <Route path="/docs" name="Overview" component={Overview} />

      {/* <Redirect from="/docs" to="/docs/cli" /> */}
    </Switch>
  );
};

export default Docs;
