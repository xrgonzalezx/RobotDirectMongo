const robotMembers = require('../robotdata.json');

function findUser ( username ) {
  return robotMembers.users.find(function(member) {return member.username.toLowerCase() === username});

}

module.exports = { fetchUser: findUser }
