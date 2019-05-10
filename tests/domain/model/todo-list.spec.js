const { expect } = require('chai');
const { TodoList } = require('../../../src/domain/model/todo-list');
const { givenTodoList, givenTodo } = require('../../helpers/model-mocks');

describe('TodoList', () => {
  describe('smoke tests', () => {
    it('should exist an TodoList model', () => {
      expect(TodoList).to.exist;
    });

    it('should exist a constructor for TodoList model', () => {
      expect(TodoList).to.be.a('function');
    });
  });

  context('valid data', () => {
    let todolist = null;
    let firstTodo = null;
    beforeEach(() => {
      todolist = new TodoList(givenTodoList());
      firstTodo = Object.assign({}, todolist.todos[0].toJSON());
    });

    describe('constructor', () => {
      it('should create a TodoList', () => {
        expect(todolist).to.be.instanceOf(TodoList);
      });
    });

    describe('getTodo', () => {
      it('should return the first Todo', () => {
        const todo = todolist.getTodo({ _id: firstTodo._id });
        expect(todo).to.be.eql(firstTodo);
      });
    });

    describe('addTodo', () => {
      it('should add a Todo to the TodoList', () => {
        todolist.addTodo(givenTodo);
        expect(todolist.todos).to.have.lengthOf(2);
      });
    });

    describe('removeTodo', () => {
      it('should remove a Todo to the TodoList', () => {
        todolist.removeTodo(firstTodo);
        expect(todolist.todos).to.have.lengthOf(0);
      });
    });

    describe('updateTodo', () => {
      it('should update a Todo on the TodoList', () => {
        firstTodo.description = 'Updated todo';
        todolist.updateTodo(firstTodo);
        expect(todolist.todos).to.have.lengthOf(1);
        expect(todolist).to.have.nested.property('todos[0].description', 'Updated todo');
      });
    });

    afterEach(() => {
      todolist = null;
    });
  });

  context('invalid data', () => {
    let title, userId, todos;
    beforeEach(() => {
      title = givenTodoList().title;
      userId = givenTodoList().userId;
      todos = givenTodoList().todos;
    });

    describe('constructor', () => {
      it('should not create a TodoList without a title', () => {
        const todolist = new TodoList({ userId, todos });
        expect(todolist.validateSync()).to.be.instanceOf(Error);
      });

      it('should not create a TodoList without an user id', () => {
        const todolist = new TodoList({ title, todos });
        expect(todolist.validateSync()).to.be.instanceOf(Error);
      });
    });
  });
});
