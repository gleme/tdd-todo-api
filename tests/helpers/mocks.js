const bson = require('bson');
const moment = require('moment');

function givenUser() {
  return {
    _id: new bson.ObjectID(),
    firstName: 'Gustavo',
    lastName: 'Leme',
    email: 'gleme@nevada.unr.edu',
    birthDate: moment('13/11/1993', 'DD/MM/YYYY').toDate()
  };
}

function givenTodo() {
  return {
    _id: new bson.ObjectID(),
    description: 'Make TDD presentation',
    done: false,
    dueDate: moment('10/05/2019', 'DD/MM/YYYY').toDate()
  };
}

function givenTodoList() {
  return {
    title: 'My Todo List',
    userId: givenUser()._id,
    todos: [givenTodo()]
  };
}

module.exports = {
  givenUser,
  givenTodo,
  givenTodoList
};
