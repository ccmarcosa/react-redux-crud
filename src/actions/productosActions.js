import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,
	COMENZAR_DESCARGA_PRODUCTOS,
	DESCARGA_PRODUCTOS_EXITOSA,
	DESCARGA_PRODUCTOS_ERROR,
	OBTENER_PRODUCTO_ELIMINAR,
	PRODUCTO_ELIMINADO_EXITO,
	PRODUCTO_ELIMINADO_ERROR,
	OBTENER_PRODUCTO_EDITAR,
	PRODUCTO_EDITAR_EXITO,
	PRODUCTO_EDITAR_ERROR,
	COMENZAR_EDICION_PRODUCTO,
	PRODUCTO_EDITADO_EXITO,
	PRODUCTO_EDITADO_ERROR
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

// crear un nuevo producto - función principal
export function crearNuevoProductoAction(producto) {
	return dispatch => {
		dispatch(nuevoProducto());
		// insertar la API
		clienteAxios
			.post("/libros", producto)
			.then(respuesta => {
				// si se inserta correctamente
				dispatch(agregarProductoExito(producto));
			})
			.catch(error => {
				console.log(error);
				// si hay un error
				dispatch(agregarProductoError(error));
			});
	};
}

export const nuevoProducto = () => ({
	type: AGREGAR_PRODUCTO
});

export const agregarProductoExito = producto => ({
	type: AGREGAR_PRODUCTO_EXITO,
	payload: producto
});

export const agregarProductoError = error => ({
	type: AGREGAR_PRODUCTO_ERROR,
	payload: error
});

// obtener listado de productos (consultar API)
export function obtenerProductosAction() {
	return dispatch => {
		dispatch(obtenerProductosComienzo());

		// consultar la API
		clienteAxios
			.get("/libros")
			.then(respuesta => {
				dispatch(descargarProductosExitosa(respuesta.data));
			})
			.catch(error => {
				dispatch(descargarProductosError());
			});
	};
}

export const obtenerProductosComienzo = () => ({
	type: COMENZAR_DESCARGA_PRODUCTOS
});

export const descargarProductosExitosa = productos => ({
	type: DESCARGA_PRODUCTOS_EXITOSA,
	payload: productos
});

export const descargarProductosError = () => ({
	type: DESCARGA_PRODUCTOS_ERROR
});

// funcion que elimina un producto en específico
export function borrarProductoAction(id) {
	return dispatch => {
		dispatch(obtenerProductoEliminar());

		// eliminar en la API
		clienteAxios
			.delete(`/libros/${id}`)
			.then(respuesta => {
				dispatch(eliminarProductoExito(id));
			})
			.catch(error => {
				dispatch(eliminarProductoError());
			});
	};
}

export const obtenerProductoEliminar = () => ({
	type: OBTENER_PRODUCTO_ELIMINAR
});

export const eliminarProductoExito = id => ({
	type: PRODUCTO_ELIMINADO_EXITO,
	payload: id
});

export const eliminarProductoError = () => ({
	type: PRODUCTO_ELIMINADO_ERROR
});

// obtener el producto a Editar
export function obtenerProductoEditarAction(id) {
	return dispatch => {
		dispatch(obtenerProductoAction());

		//obtener producto de la api
		clienteAxios
			.get(`/libros/${id}`)
			.then(respuesta => {
				console.log(respuesta.data);
				dispatch(obtenerProductoEditarExito(respuesta.data));
			})
			.catch(error => {
				console.log(error);
				dispatch(obtenerProductoEditarError());
			});
	};
}

export const obtenerProductoAction = () => ({
	type: OBTENER_PRODUCTO_EDITAR
});

export const obtenerProductoEditarExito = producto => ({
	type: PRODUCTO_EDITAR_EXITO,
	payload: producto
});

export const obtenerProductoEditarError = () => ({
	type: PRODUCTO_EDITAR_ERROR
});

// modifica un producto en la API y state
export function editarProductoAction(producto) {
	return dispatch => {
		dispatch(comenzarEdicionProducto());

		// consultar la API
		clienteAxios
			.put(`/libros/${producto.id}`, producto)
			.then(respuesta => {
				dispatch(editarProductoExito(respuesta.data));

				Swal.fire(
					"Almacenado",
					"El producto se actualizó correctamente",
					"success"
				);
			})
			.catch(error => {
				dispatch(editarProductoError());
			});
	};
}

export const comenzarEdicionProducto = () => ({
	type: COMENZAR_EDICION_PRODUCTO
});

export const editarProductoExito = producto => ({
	type: PRODUCTO_EDITADO_EXITO,
	payload: producto
});

export const editarProductoError = () => ({
	type: PRODUCTO_EDITADO_ERROR
});
