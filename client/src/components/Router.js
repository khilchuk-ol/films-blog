import React from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Switch, Route } from "react-router-dom";

export default function Router() {
  return (
    <div className="container mt-3">
      <Switch>
        {/*<Route exact path={["/", "/posts"]} component={PostsList} />
        <Route exact path={["/users"]} component={UsersList} />
        <Route exact path="/add" component={AddPost} />
        <Route path="/posts/:id" component={Post} />
        <Route path={["/profile", "/users/:id"]} component={User} />*/}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}
