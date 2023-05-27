const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const userRoutes = require('./client/src/routes/userRoutes');
const socketRoutes = require('./client/src/routes/socketRoutes');
const cookieParser = require('cookie-parser');
const UserModel = require('./client/src/models/UserModel');

const app = express();
const httpServer = http.createServer(app);
app.use(cookieParser());
app.use(cors());

// Configure connection to MongoDB
mongoose.connect('mongodb://localhost:27017/chat_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

// Middleware for request bodies
app.use(express.json());

// Middleware to set SameSite and Secure attributes for all cookies sent in server responses
app.use((req, res, next) => {
  res.setHeader('Set-Cookie', 'SameSite=None; Secure');
  next();
});

// Route for user authentication/login
app.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    // Check if the user exists in the database
    const user = await UserModel.findOne({ cpf });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(senha, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate an authentication token
    const token = jwt.sign({ userId: user._id }, 'your-secret-here');

    // Return the token to the client
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Error during login' });
  }
});

// Route to handle POST requests to "/"
app.post('/', (req, res) => {
  // Logic to handle the POST request to "/"
  // Here you can process the data sent in the request body (req.body) and send an appropriate response

  // Example of sending a success response with the received data
  const { nome, idade } = req.body;
  res
    .status(200)
    .cookie('cookieName', 'cookieValue', { sameSite: 'none', secure: true })
    .json({ message: 'POST request received successfully', nome, idade });
});

// Example route to set a cookie with SameSite and Secure attributes
app.get('/example-route', (req, res) => {
  res.cookie('cookieName1', 'cookieValue1', { sameSite: 'none', secure: true });
  res.cookie('cookieName2', 'cookieValue2', { sameSite: 'none', secure: true });
  res.cookie('cookieName3', 'cookieValue3', { sameSite: 'none', secure: true });
  res.send('Cookies configured successfully');
});

// Use the routes in the application
app.use('/users', userRoutes);
app.use('/sockets', socketRoutes);

const httpPort = 8000;
const socketIOPort = 9000;

httpServer.listen(httpPort, () => {
  console.log(`HTTP server running at http://localhost:${httpPort}`);
});

// Initialize the Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (message) => {
    // Logic to handle the message received from the client
    console.log('Received message:', message);

    // Send the message back to the client or perform other necessary actions
    socket.emit('message', 'Message received by the server');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

io.listen(socketIOPort, () => {
  console.log(`Socket.IO server running at http://localhost:${socketIOPort}`);
});