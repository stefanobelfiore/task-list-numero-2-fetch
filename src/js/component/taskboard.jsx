import React, { useState, Fragment, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskBoard = () => {
	const [listTask, setListTask] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [MyBoolean, setMyBoolean] = useState(false);
	const [totalUsers, setTotalUsers] = useState([]);
	const mainURL = "https://assets.breatheco.de/apis/fake/todos/user";
	//--------------------------------------------------------
	useEffect(() => {
		fetch(mainURL, {
			method: "GET",
			//   body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (!response.ok) {
					console.log(response.statusText);
					throw Error(response.statusText);
				}
				console.log(response.ok); // will be true if the response is successfull
				console.log(response.status); // the status code = 200 or code = 400 etc.

				// will try return the exact result as string
				return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				setTotalUsers(data);
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}, []);
	//------------------------------------------------------
	useEffect(() => {
		fetch(mainURL.concat(event.target.value), {
			method: "GET",
			//   body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (!response.ok) {
					console.log(response.statusText);
					throw Error(response.statusText);
				}
				console.log(response.ok); // will be true if the response is successfull
				console.log(response.status); // the status code = 200 or code = 400 etc.
				// will try return the exact result as string
				return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				setListTask(data);
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}, []);

	useEffect(() => {
		setNewTask(
			listTask.map((singleTask, index) => {
				return (
					<li key={index.toString()}>
						{singleTask.label}{" "}
						<button
							onClick={() => {
								DELETE(index);

								console.log(listTask);
								setMyBoolean(!MyBoolean);
							}}>
							<i className="far fa-trash-alt"></i>
						</button>
					</li>
				);
			})
		);
	}, [listTask]);
	const DELETE = indexToDelete => {
		setListTask(listTask.filter((_, index) => index !== indexToDelete));
	};
	//--------------------------------------------------------------------------------------------
	useEffect(() => {
		fetch(mainURL.concat(event.target.value), {
			method: "PUT",
			body: JSON.stringify(listTask),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				console.log(response.ok); // will be true if the response is successfull
				console.log(response.status); // the status code = 200 or code = 400 etc.

				return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}, [MyBoolean]);
	//-------------------------------------------------------------------------------------------------------------------------------
	return (
		<Fragment>
			<input
				type="text"
				placeholder="User Name"
				onKeyDown={event => {
					if (event.key === "Enter") {
						let found = totalUsers.find(
							element => element === event.target.value
						);
						if (found === event.target.value)
							return mainURL.concat(event.target.value);
					}
				}}></input>
			<input
				type="text"
				placeholder="my new task"
				onKeyDown={event => {
					if (event.key === "Enter") {
						setListTask([
							...listTask,
							{ label: event.target.value, done: false }
						]);
						setMyBoolean(!MyBoolean);
						event.target.value = "";
					}
				}}
			/>
			<ul>{newTask}</ul>
		</Fragment>
	);
};
export default TaskBoard;
