module.exports = socket => {

    return (userDetails, hostId) => {
        socket.to(hostId).emit('askToJoin', userDetails);
        //   console.log(userId, " is Live")

    }
}