import React, { useState } from 'react'; 

import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/TasksCollection.js'; 

import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';


export const App = () => {

  const [hideCompleted, setHideCompleted] = useState(false);

  // CRUD

  // Tareas pendientes:

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  ); 

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;
  
  const tasks = useTracker(() => TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch());

  const toggleChecked = ({ _id, isChecked}) => {
    TasksCollection.update(_id, {
      $set:{
        isChecked: !isChecked
      }
    })
  }

  const deleteTask = ({ _id }) => TasksCollection.remove(_id); 

  return (
    <div className='app'>  
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              📝️ To Do List
              {pendingTasksTitle}
            </h1>
          </div>
        </div>
      </header>
      <div className='main'>
        <TaskForm />
        <div className='filter'>
          <button
            onClick={() => setHideCompleted(!hideCompleted)}
          >{hideCompleted ? "ShowAll" : "Hide completed"}</button>
        </div>
        <ul className='tasks'>
          { tasks.map(task => 
            <Task 
              key={ task._id } 
              task={ task }
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ) }
        </ul>
      </div> 
    </div>
  );
};
