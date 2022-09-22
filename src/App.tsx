import React, {ChangeEvent, FC, FormEvent, useState, useEffect} from 'react';
import nextId from 'react-id-generator';
import {ITask} from './interfaces';
import TodoTask from './Components/TodoTask'

const App: FC = () => {

	const [task, setTask] = useState<string>('');
	const [todoList, setTodoList] = useState<ITask[]>(window.localStorage.getItem('todoItems') ? JSON.parse(window.localStorage.getItem('todoItems')!) : []);

	useEffect(() => {
		return window.localStorage.setItem('todoItems', JSON.stringify(todoList));
	}, [todoList]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setTask(event.target.value);
	}

	const addTask = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		let newTask: ITask = {id: nextId(), name: task, done: false};

		setTodoList([newTask, ...todoList]);
		setTask('');
	}

	const editTask = (id: string, name: string): void => {
		setTodoList(todoList.map(task => {
			if (task.id === id)
				return {id, name, done: false};
			return task;
		}));
	}

	const deleteTask = (id: string): void => {
		setTodoList(todoList.filter((task) => {
			return task.id !== id;
		}))
	}

	const completeTask = (id: string): void => {
		setTodoList(todoList.map(task => {
			if (task.id === id)
				return {...task, done: true};
			return task;
		}));
	}

  return (
    <div className="container">
		<div className="title">TODO App</div>
		<div className="input-container">
			<form onSubmit={addTask}>
				<input
					required
					type="text"
					placeholder="Insert the task..."
					onChange={handleChange}
					value={task}
				/>
				<button className="add-task-btn" type="submit">Add task</button>
			</form>
		</div>
		<div className="todo-list-items">
			{
				todoList.map((task: ITask, key: number) => {
					return <TodoTask
							key={key}
							task={task}
							deleteTask={deleteTask}
							completeTask={completeTask}
							editTask={editTask}
						></TodoTask>
				})
			}
		</div>
    </div>
  );
}

export default App;
