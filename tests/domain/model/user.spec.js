const { expect } = require('chai');
const User = require('../../../src/domain/model/user');
const { givenUser } = require('../../helpers/model-mocks');

describe('User', () => {
  describe('smoke tests', () => {
    it('should exist an User model', () => {
      expect(User).to.exist;
    });

    it('should exist a constructor for User model', () => {
      expect(User).to.be.a('function');
    });
  });

  context('valid data', () => {
    describe('constructor', () => {
      it('should create a user', () => {
        expect(new User(givenUser())).to.be.instanceOf(User);
      });
    });
  });

  context('invalid data', () => {
    let email, firstName, lastName;
    beforeEach(() => {
      email = givenUser().email;
      firstName = givenUser().firstName;
      lastName = givenUser().lastName;
    });

    describe('constructor', () => {
      it('should not create an user without an email', () => {
        const user = new User({ firstName, lastName });
        expect(user.validateSync()).to.be.instanceOf(Error);
      });

      it('should not create an user without a first name', () => {
        const user = new User({ email, lastName });
        expect(user.validateSync()).to.be.instanceOf(Error);
      });

      it('should not create an user without a last name', () => {
        const user = new User({ email, firstName });
        expect(user.validateSync()).to.be.instanceOf(Error);
      });

      it('should not create an user with a known invalid email (regex)', () => {
        const user = new User({ firstName, lastName, email: 'fake-email' });
        const user2 = new User({ firstName, lastName, email: 'fake-email@' });
        expect(user.validateSync()).to.be.instanceOf(Error);
        expect(user2.validateSync()).to.be.instanceOf(Error);
      });
    });
  });
});
