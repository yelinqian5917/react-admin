import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import PrivateRoute from '@/components/PrivateRoute';
// import Login from '@/pages/Login';
// import Index from '@/pages/Index';
import wordHome from '@/pages/wordHome';

const getRouter = () => (
	<Router>
		<Switch>
			{/* <Route path="/login" component={Login} />
			<PrivateRoute path="/" component={Index} /> */}
			<Route path="/" component={wordHome}></Route>
		</Switch>
	</Router>
);

export default getRouter;