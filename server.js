const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const { Server } = require("socket.io");
const { createServer } = require("http");



require('dotenv').config()



// variables
const app = express()
const port = process.env.PORT || 8000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});








// middlewares
app.use(cors())
app.use('/profilePic', express.static('uploads'))
app.use(express.json());
// app.use(express.urlencoded())












// external routes
const authRouter = require('./routes/auth')
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const getUsersRouter = require('./routes/getUsers')
const updateRightsRouter = require('./routes/updaterights')
const attendanceRouter = require('./routes/attendance')
const getRecordsRouter = require('./routes/getRecords')
const createMeetRouter = require('./routes/createMeet')
const getMeetsRouter = require('./routes/getMeets')
const deleteMeetRouter = require('./routes/deleteMeet')
const getMeetDetailsRouter = require('./routes/getMeetDetails')
const endMeetingRouter = require('./routes/endMeeting')
const leaveMeetRouter = require('./routes/leaveMeet')














// endpoints
app.get('/', (req, res) => res.send('connected'))
app.use('/api/login', loginRouter)
app.use('/api/signup', signupRouter)
app.use('/api/auth', authRouter)
app.use('/api/getusers', getUsersRouter)
app.use('/api/updaterights', updateRightsRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/getRecords', getRecordsRouter)
app.use('/api/createMeet', createMeetRouter)
app.use('/api/getMeets', getMeetsRouter)
app.use('/api/deleteMeet', deleteMeetRouter)
app.use('/api/getMeetDetails', getMeetDetailsRouter)
app.use('/api/endMeeting', endMeetingRouter)
app.use('/api/leaveMeet', leaveMeetRouter)






















// socket events

require('./socket/mainSocketIO')(io)













mongoose.connect(process.env.URI).then(() => {
    console.log('DB connected')
    httpServer.listen(port, () => console.log(`listening on ${port} ... `))
})