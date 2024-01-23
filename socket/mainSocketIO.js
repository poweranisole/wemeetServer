module.exports = io => {



    // socket events

    io.on('connection', socket => {





        // external events
        const userLive = require('./events/userLive')(socket)
        const askToJoin = require('./events/askToJoin')(socket)
        const askToJoinReply = require('./events/askToJoinReply')(socket)
        const removeStream = require('./events/removeStream')(socket)
        const disconnectUser = require('./events/disconnectUser')(socket)
        const sendMessage = require('./events/sendMessage')(socket)
        const unknownUser = require('./events/unknownUser')(socket)






        // console.log(socket)  // testing


        socket.on('join-room', roomId => socket.join(roomId))
        socket.on('user-live', userLive);
        socket.on('askToJoin', askToJoin);
        socket.on('askToJoinReply', askToJoinReply);
        socket.on('removeStream', removeStream);
        socket.on('disconnectUser', disconnectUser);
        socket.on('sendMessage', sendMessage);
        socket.on('unknown-user', unknownUser);



    })





}