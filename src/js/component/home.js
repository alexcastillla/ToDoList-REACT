import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { TodoList } from "./todolistapp";

//create your first component
export function Home() {
	return (
		<div className="container text-center">
			<h1>To-Do List</h1>
			<TodoList />
		</div>
	);
}
