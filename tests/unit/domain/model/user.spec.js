const { expect } = require('chai');
const User = require('../../../../src/domain/model/user');
const { givenUser } = require('../../../helpers/model-mocks');

describe('User (unit)', () => {
  describe('smoke tests', () => {
    it('should exist an User model', () => {
      expect(User).to.exist;
    });

    it('should exist a constructor for User model', () => {
      expect(User).to.be.a('function');
    });
  });

  context('Valid data', () => {
    describe('constructor', () => {
      it('should create a user', () => {
        expect(new User(givenUser())).to.be.instanceOf(User);
      });
    });
  });
});
