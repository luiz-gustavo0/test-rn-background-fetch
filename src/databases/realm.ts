import Realm from 'realm';
import { TaskSchema } from './schemas/TaskSchema';

export const getRealm = async () => {
  return Realm.open({
    path: 'background-task-app',
    schema: [TaskSchema],
  });
};
