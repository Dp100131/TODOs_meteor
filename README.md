# Para poder ver los errores en el navegador:
```
meteor add dev-error-overlay
```
# Para crear una colección:
```
import { Mongo } from 'meteor/mongo';

export const TasksCollection = new Mongo.Collection('tasks');
```
