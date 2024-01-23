module.exports = socket => {

    return userId => {
        socket.to('admin').emit('unknown-user', userId);
    }

}