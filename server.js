// 1. Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// 2. Initialize the Express App
const app = express();

// 3. Configure Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
const PORT = process.env.PORT || 8000;


// TODO: Replace with your MongoDB connection string
// const MONGO_URI = 'mongodb+srv://23eg105j50_db_user:27zG48cEyJ38C8MG@<cluster-url>/mindscribe?retryWrites=true&w=majority';
const MONGO_URI = 'mongodb+srv://23eg105j50_db_user:27zG48cEyJ38C8MG@cluster0.dgto41x.mongodb.net/JournalDB?retryWrites=true&w=majority&appName=Cluster0';


// 3. Configure Middleware
// -- Serves static files (CSS, client-side JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); 
// -- Parses incoming JSON payloads
app.use(express.json());
// -- Parses URL-encoded payloads (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// i) Import session-related packages
const session = require('express-session');
const MongoStore = require('connect-mongo');
// ii) Configure session middleware
app.use(session({
    secret:'a_secret_key_to_sign_the_cookie', // Replace with a strong secret in production
    resave: false,
    saveUninitialized: false,
    store : MongoStore.create({
        mongoUrl: MONGO_URI,
        collectionName: 'sessions' // Name of the collection to store sessions
    }),
    cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Cookie expiration time (e.g., 24 hours)
  }
}))


// 5. Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// 6. Set Up View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

// 7. Define Routes
app.get('/', (req, res) => {
  res.render('index'); // Render the index.ejs file
});

// 8. Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});