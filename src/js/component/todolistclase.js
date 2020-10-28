import React, { Fragment, useState, useEffect } from "react";

export const TodoList = props => {
	const [tasks, setTasks] = useState([]);
	const [initialValue, setInitialValue] = useState(null);

	const removeTodo = index => {
		const newTodos = [...tasks];
		newTodos.splice(index, 1);
		setTasks(newTodos);
	};

	let newTask = event => {
		let myInput = document.querySelector("#taskInput");
		let newTask = event.target.value;

		if (event.keyCode == 13) {
			event.preventDefault();
			if (newTask) {
				setTasks(tasks => [...tasks, { label: newTask, done: false }]);
				myInput.value = "";
			}
		}
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Lorella", {
			method: "GET"
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(respAsJson => {
				respAsJson.map(task => {
					setTasks(tasks => [...tasks, task]);
				});
				console.log(respAsJson);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(
		() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/Lorella", {
				method: "PUT",
				body: JSON.stringify(tasks),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					if (!resp.ok) {
						throw Error(resp.statusText);
					}
					return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
				})
				.then(respAsJson => {
					return respAsJson.json();
				})
				.catch(error => {
					//manejo de errores
					console.log(error);
				});
		},
		[tasks]
	);

	// useEffect(
	// 	() => {
	// 		fetch("https://assets.breatheco.de/apis/fake/todos/user/Lorella", {
	// 			method: "PUT",
	// 			body: JSON.stringify(tasks),
	// 			headers: {
	// 				"Content-Type": "application/json"
	// 			}
	// 		})
	// .then(resp => {
	// 	console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
	// 	console.log(resp.status); // el código de estado = 200 o código = 400 etc.
	// 	console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
	// 	return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
	// 			})
	// 			.then(respjson => {
	// 				console.log(respjson); //esto imprimirá en la consola el objeto exacto recibido del servidor
	// 				return respjson.json();
	// 				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
	// 			})
	// 			.catch(error => {
	// 				//manejo de errores
	// 				console.log(error);
	// 			});
	// 	},
	// 	[tasks]
	// );

	//Useffect que haga un fectch de la lista al cargarr dependiendo de un []

	// UseEffect que se va a dedicar a añadir un elemento nuevo mi lista y dependera de la acción newTask. Siempre vamos a añadir toda la lista
	// van en el mismo
	// Segundo UseEffect que va a "eliminar" (en este caso es otra actualizacion) a mi lista, previa comprobacion de la lista almacenada. Esta dependera de removeTodo.

	return (
		<Fragment>
			<form>
				<input
					id="taskInput"
					type="text"
					placeholder="Add Task"
					value={initialValue}
					onKeyPress={() => {
						newTask(event);
					}}
					removeTodo={removeTodo}
				/>
			</form>
			<div>
				{tasks.map((task, index) => {
					return (
						<li key={index}>
							{task.label}
							<button onClick={() => removeTodo(index)}>x</button>
						</li>
					);
				})}
			</div>
		</Fragment>
	);
};
