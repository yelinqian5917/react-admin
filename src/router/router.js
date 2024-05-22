import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import PrivateRoute from '@/components/PrivateRoute';
// import Login from '@/pages/Login';
// import Index from '@/pages/Index';
import wordHome from "@/pages/wordHome";
import Test from "@/pages/Test/index";

const getRouter = () => (
  <Router>
    <Switch>
      {/* <Route path="/login" component={Login} />
			<PrivateRoute path="/" component={Index} /> */}
      <Route path="/" component={wordHome}></Route>
      {/* <Route path="/" component={Test}></Route> */}
    </Switch>
  </Router>
);

export default getRouter;
