import { ObjectSchema } from 'realm';

export const TaskSchema: ObjectSchema = {
  name: 'Task',
  properties: {
    _id: 'string',
    name: 'string',
    created_at: 'date',
  },
  primaryKey: '_id',
};
