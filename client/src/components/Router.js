import React from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Switch, Route } from "react-router-dom";
import PostsList from "./posts/PostsList";
import UsersList from "./users/UsersList";
import User from "./users/User";
import EditUser from "./users/EditUser";
import Post from "./posts/Post";

export default function Router() {
  return (
    <div className='container mt-3'>
      <Switch>
        <Route exact path={["/", "/posts"]}>
          <PostsList isEditable={false} />
        </Route>
        <Route exact path={["/users"]} component={UsersList} />
        <Route path='/posts/:id' component={Post} />
        <Route path={["/profile/edit/"]} component={EditUser} />
        <Route path={["/profile", "/users/:id"]} component={User} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </div>
  );
}
