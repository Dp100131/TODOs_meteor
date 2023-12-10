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
# Hacer un update:

```
TasksCollection.update(_id, {
      $set:{
        isChecked: !isChecked
      }
    })
```

# Filtrar trae los que no cumplen:
```
const hideCompletedFilter = { isChecked: { $ne: true } };
const tasks = useTracker(() => TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch());
```
# Me entrega los faltantes
```
const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
); 
```

# Agregar cuentas de usuario:
```
meteor add accounts-password
```
Se recomienda instalar bcrypt
```
meteor npm install --save bcrypt
```
de esa manera para manejar la versión de npm que tiene meteor.

# Para crear usuarios se necesita en "main.jsx:
```
import { Accounts } from 'meteor/accounts-base';
```
## Metodos de Accounts:
- findUserByUsername
- createUser
- loginWithPassword // Esta es de Meteor ```import { Meteor } from 'meteor/meteor';```
### Instalar para el login:
```
meteor add accounts-password
```

## Auth
```
const user = useTracker(() => Meteor.user());
```

# Github Auth
```
meteor add accounts-github
```
add service:
```
meteor add service-configuration
```
