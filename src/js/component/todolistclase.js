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
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Alexander", {
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
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/Alexander",
				{
					method: "PUT",
					body: JSON.stringify(tasks),
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
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
