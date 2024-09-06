import mongoose, {Schema} from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true,
  },
  completed: {
    type: Number,
    enum : [0, 20, 40, 60, 80, 100],
    default: 0,
  },
});

export const Task = mongoose.model('Task', TaskSchema);
