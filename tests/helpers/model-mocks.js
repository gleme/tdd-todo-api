const bson = require('bson');
const moment = require('moment');

function givenUser() {
  return {
    id: bson.ObjectID(),
    firstName: 'Gustavo',
    lastName: 'Leme',
    email: 'gleme@nevada.unr.edu',
    birthDate: moment('13/11/1993', 'DD/MM/YYYY').toDate()
  };
}

module.exports = {
  givenUser
};
