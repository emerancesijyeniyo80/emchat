const users = [];

// Join user to chat
function userJoin(id, username, chatRoomId) {
  const user = { id, username, chatRoomId };

  users.push(user);

  return user;
}

// Join user to chat
function userJoin(id, username, chatRoomId) {
  const user = { id, username, chatRoomId };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(chatRoomId) {
  return users.filter((user) => user.room === chatRoomId);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
