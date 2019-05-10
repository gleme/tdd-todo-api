const { remove, findIndex, find, isEqual } = require('lodash');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      maxlength: 255
    },
    done: { type: Boolean, required: true, default: false },
    dueDate: { type: Date }
  },
  {
    timestamps: true
  }
);

const todoListSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 32,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    todos: [todoSchema]
  },
  {
    timestamps: true
  }
);

class TodoList {
  getTodo(todo) {
    return find(this.todos, td => isEqual(td.toJSON()._id, todo._id)).toJSON();
  }

  addTodo(todo) {
    this.todos.push(todo);
    return this.todos.slice();
  }

  removeTodo(todo) {
    this.todos = remove(this.todos, td => td._id === todo._id);
    return this.todos.slice();
  }

  updateTodo(todo) {
    const updateIndex = findIndex(this.todos, td => isEqual(td.toJSON()._id, todo._id));
    this.todos[updateIndex] = todo;
    return this.todos.slice();
  }
}

todoListSchema.loadClass(TodoList);

const model = mongoose.model('TodoList', todoListSchema);

module.exports = {
  TodoList: model,
  Todo: todoSchema
};
