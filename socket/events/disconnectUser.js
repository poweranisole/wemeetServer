module.exports = socket => {

    return (hostId, userId) => {
        socket.to(hostId).emit('disconnectUser', userId);
        //   console.log(userId, " is Live")

    }
}