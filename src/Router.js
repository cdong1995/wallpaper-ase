import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { SiderDemo } from "./page";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SiderDemo} />
      {/* <Route exact path="/image" component={Image} />
      <Route exact path="/settings" component={Settings} /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;
