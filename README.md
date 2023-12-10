# Para poder ver los errores en el navegador:
```
meteor add dev-error-overlay
```
# Para crear una colección:
```
import { Mongo } from 'meteor/mongo';

export const TasksCollection = new Mongo.Collection('tasks');
```
# Para renderizar la colección (useTraker)
```
meteor add react-meteor-data
```
# Para mostrar las tareas más recientes se puede usar lo siguiente en .find()
```
{ sort: { createdAt: -1 } }
```