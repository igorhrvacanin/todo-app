import React, {ChangeEvent, FC, useState} from 'react';
import nextId from 'react-id-generator';
import {ITask} from './interfaces';
import TodoTask from './Components/TodoTask'

const App: FC = () => {

	const [task, setTask] = useState<string>('');
	const [todoList, setTodoList] = useState<ITask[]>([]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setTask(event.target.value);
	}

	const addTask = (): void => {
		let newTask: ITask = {id: nextId(), name: task, done: false};

		setTodoList([newTask, ...todoList]);
		setTask('');
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
			<input
				type="text"
				placeholder="Insert the task..."
				onChange={handleChange}
				value={task}
			/>
			<button onClick={addTask}>Add task</button>
		</div>
		<div className="todo-list-items">
			{
				todoList.map((task: ITask, key: number) => {
					return <TodoTask key={key} task={task} deleteTask={deleteTask} completeTask={completeTask}></TodoTask>
				})
			}
		</div>
    </div>
  );
}

export default App;
