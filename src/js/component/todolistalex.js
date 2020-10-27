import React, { useState } from "react";

export const TodoList = props => {
	const [todo, setTodo] = React.useState("");
	const [todos, setTodos] = React.useState([]);

	const handleChange = event => {
		setTodo(event.target.value);
	}; // Escucha los Enter que realizamos

	const addTodo = () => {
		setTodos([
			...todos,
			{
				id: todos.length + 1,
				text: todo
			}
		]);
	}; // Cada vez que añado un input, genero una copia del Array en donde le asigna un id y un text para luego realizar un filtrado

	const dontSubmit = event => {
		event.preventDefault();
		if (todo === "") return;
		addTodo();
		setTodo("");
	}; // Evitamos que se recargue con cada input

	const removeTodo = todoId => {
		const updatedTodos = todos.filter(todo => todo.id !== todoId);
		setTodos(updatedTodos);
	};  //

	return (
		<div className="container">
			<label htmlFor="todo">TodoList</label>
			<form onSubmit={dontSubmit}>
				<input
					id="todo"
					onChange={handleChange}
					value={todo}
					placeholder="Add your task"
				/>
			</form>
			<div>
				<ul>
					{todos.map(todo => (
						<ul key={todo.id}>
							<span>{todo.text}</span>
							<button onClick={() => removeTodo(todo.id)}>
								x
							</button>
						</ul>
					))}
				</ul>
			</div>
		</div>
	);
};
