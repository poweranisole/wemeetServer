module.exports = socket => {
    return (meetId, username, message) => {
        socket.to(meetId).emit('receiveMessage', username, message)
    }
}