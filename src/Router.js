import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { SiderDemo } from "./page";
import Login from "./page/login";
import Register from "./page/register";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={SiderDemo} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
