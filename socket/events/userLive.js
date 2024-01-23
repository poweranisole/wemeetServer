module.exports = socket => {

    return userId => {
        socket.to('admin').emit('user-live', userId);
        //   console.log(userId, " is Live")

    }
}