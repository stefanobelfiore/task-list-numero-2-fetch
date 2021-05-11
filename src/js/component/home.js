import React from "react";
import TaskBoard from "./taskboard.jsx";

//create your first component
export function Home() {
	return (
		<div className="text-center mt-5">
			<div className="blog-card spring-fever">
				<div className="title-content">
					<h3> ToDo List</h3>
					<hr />
					<div className="intro">
						<TaskBoard />
					</div>
				</div>
				<div className="card-info"></div>
				<div className="utility-info"></div>
			</div>
		</div>
	);
}
