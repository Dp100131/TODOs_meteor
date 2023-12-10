import React from 'react'; 

import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/TasksCollection.js'; 

import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';


export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  const toggleChecked = ({ _id, isChecked}) => {
    TasksCollection.update(_id, {
      $set:{
        isChecked: !isChecked
      }
    })
  }
  const deleteTask = ({ _id }) => TasksCollection.remove(_id);

  return (
    <div>  
      <TaskForm />
      <ul>
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
  );
};
