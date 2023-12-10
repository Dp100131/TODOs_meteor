import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';
import { ServiceConfiguration } from 'meteor/service-configuration';


// SEED user:
const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

// Insertar task to collection:

const insertTask = (taskText, user) => TasksCollection.insert({
  text: taskText,
  userId: user._id,
  createdAt: new Date(),
});

const user = Accounts.findUserByUsername(SEED_USERNAME);  

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  } 

  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(taskText => insertTask(taskText, user));
  } 
});

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: '826285b91785c10a6e30', // insert your clientId here
      secret: '1966d85436e41f07cd7728ec82659e2d5f869e9e', // insert your secret here
    },
  }
);