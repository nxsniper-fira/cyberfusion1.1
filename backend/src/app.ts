import { Server } from "socket.io";
const io = new Server(httpServer, { cors: { origin: "*" } });
// In your worker, emit lines as they arrive:
io.to(jobId).emit("output", { line: data });