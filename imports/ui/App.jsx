import React, { useState, Fragment } from 'react'; 

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { TasksCollection } from '../api/TasksCollection.js';  
import { Task } from './Task.jsx';
import { TaskForm } from './TaskForm.jsx';
import { LoginForm } from './LoginForm.jsx';


export const App = () => {

  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);

  // CRUD

  // Tareas pendientes:

  const hideCompletedFilter = { isChecked: { $ne: true } };

    const userFilter = user ? { userId: user._id } : {};

    const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

    const tasks = useTracker(() => {
      if (!user) {
        return [];
      }

      return TasksCollection.find(
        hideCompleted ? pendingOnlyFilter : userFilter,
        {
          sort: { createdAt: -1 },
        }
      ).fetch();
    });

    const pendingTasksCount = useTracker(() => {
      if (!user) {
        return 0;
      }

      return TasksCollection.find(pendingOnlyFilter).count();
    });

  const toggleChecked = ({ _id, isChecked}) => {
    TasksCollection.update(_id, {
      $set:{
        isChecked: !isChecked
      }
    })
  }

  const deleteTask = ({ _id }) => TasksCollection.remove(_id);

  const logout = () => Meteor.logout();

  console.log(tasks);

  return (
    <div className='app'>  
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              📝️ To Do List
              ({pendingTasksCount})
            </h1>
          </div>
        </div>
      </header>
      <div className='main'>
        {user ? (
          <Fragment>
            <div className='user' onClick={logout}>
              {user.username} 🚪
            </div>
            <TaskForm user={user} />
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
          </Fragment> 
        ) : (
          <LoginForm />
        )}
      </div> 
    </div>
  );
};
