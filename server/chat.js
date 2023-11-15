import {createServer} from "http"
import {Server} from "socket.io"
import {cors} from "cors"

const httpServer = createServer()
const PORT = process.env.PORT || 5500
const io = new Server(httpServer, {
    cors: {
        origin: 'https://chatsapp-omega.vercel.app/'
    }
})

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('message', (textmsg) => {
        console.log(textmsg)
        socket.broadcast.emit('message', textmsg)
    })
})

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`))