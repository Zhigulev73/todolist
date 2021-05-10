import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import classes from "./app.module.scss";
import routes from "./utils/Router";
import navlinks from "./utils/links";

const App = () => (
  <Router>
    <nav className={classes.navbar}>
        <div className={classes.navbarContainer}>
          {navlinks.map(({ to, title }) => (
            <NavLink className={classes.navlinks} to={to} key={to}>
              {title}
            </NavLink>
          ))}
        </div>
    </nav>
    <div className={classes.wrap}>
      <Switch>
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path} component={Component} />
        ))}
      </Switch>
    </div>
  </Router>
);

export default App;
