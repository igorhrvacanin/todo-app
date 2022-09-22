import React, {useState, FormEvent, ChangeEvent, createRef, useEffect} from 'react';
import { ITask } from '../interfaces';

interface Props {
    task: ITask;
    deleteTask(taskId: string): void;
    completeTask(taskId: string): void;
    editTask(id: string, name: string): void
}

interface EditItem {
    id: string;
    name: string;
}

const TodoTask = ({task, deleteTask, completeTask, editTask}: Props) => {

    const [editItem, setEditItem] = useState<EditItem>({id: '', name: ''});
    const [showDialog, setShowDialog] = useState<Boolean>(false);

    const openEditDialog = (id: string, name: string): void => {
        setEditItem({id, name});
        setShowDialog(true);
    }

    const edit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (editItem && editItem.id && editItem.name)
            editTask(editItem.id, editItem.name);
        
        setShowDialog(false);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        let id = editItem?.id
		setEditItem({id, name: event.target.value});
    }
    
    const closeDialog = (): void => {
        setEditItem({id: '', name: ''});
        setShowDialog(false);
    }

    const editDialog = createRef<HTMLDivElement>();

    useEffect(() => {
        const handleClickOutside = (event: any): void => {
            if (editDialog.current && !editDialog.current.contains(event.target)) {
                closeDialog()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [editDialog]);


    return (
        <>
            <div className={`task-item ${task.done ? 'task-item-done' : 'task-item-ongoing'}`}>
                <div>
                    <p>{task.name}</p>
                </div>
                <div className="task-item-actions">
                    <button className="complete-btn" onClick={() => completeTask(task.id)}><i className="fa fa-check" aria-hidden="true"></i></button>
                    <button className="edit-btn" onClick={() => openEditDialog(task.id, task.name)}><i className="fa fa-pen" aria-hidden="true"></i></button>
                    <button className="delete-btn" onClick={() => deleteTask(task.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
            </div>

            <div ref={editDialog} className="edit-dialog" style={showDialog ? {display: 'block'} : {display: 'none'}}>
                <p style={{margin: 0}}>Edit Task:</p>
                <hr style={{color: '#445760', border: '1px solid'}}></hr>
                <form className="dialog-form" onSubmit={edit}>
                    <input
                        required
                        type="text"
                        placeholder="Insert the task..."
                        onChange={handleChange}
                        value={editItem.name}
                    />
                    <div className="dialog-form-actions">
                        <button className="add-task-btn " type="submit">Edit task</button>
                        <button className="delete-btn" type="button" onClick={closeDialog}>Close</button>
                    </div>
                </form>
            </div>
        </>
        
    );
}

export default TodoTask;
