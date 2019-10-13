import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import store from "./store";
import Header from './componentes/Header';
import NuevoProducto from './componentes/NuevoProducto';
import Productos from './componentes/Productos';
import EditarProducto from './componentes/EditarProducto';


function App() {
	return (
		<Router>
			<Header></Header>
			<Provider store={store}>
				<div className="container">
					<Switch>
						<Route exact path="/" component={Productos} />
						<Route
							exact
							path="/productos/nuevo"
							component={NuevoProducto}
						/>
						<Route
							exact
							path="/productos/editar/:id"
							component={EditarProducto}
						/>
					</Switch>
				</div>
			</Provider>
		</Router>
	);
}

export default App;
