import React from 'react';
import { ITask } from '../interfaces';

interface Props {
    task: ITask;
    deleteTask(taskId: string): void;
    completeTask(taskId: string): void;
}

const TodoTask = ({task, deleteTask, completeTask}: Props) => {
    return (
        <div className="task-item">
            <div>
                {task.name} -
            </div>
            <div>
                {task.done.toString()}
            </div>
            <button onClick={() => completeTask(task.id)}>Complete</button>
            <button onClick={() => deleteTask(task.id)}>X</button>
        </div>
    );
}

export default TodoTask;
