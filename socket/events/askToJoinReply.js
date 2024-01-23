module.exports = socket => {

    return (userId, reply) => {
        socket.to(userId).emit('askToJoinReply', reply)
    }
} 