module.exports = socket => {

    return (toId, fromId) => {
        socket.to(toId).emit('removeStream', fromId);
        //   console.log(userId, " is Live")

    }
}