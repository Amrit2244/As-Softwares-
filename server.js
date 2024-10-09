const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const userRoutes = require('./Routes/user');
// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tallyUserData', { useNewUrlParser: true, useUnifiedTopology: true });

// Use user routes
app.use('/api/users', userRoutes);

// Proxy requests to Tally
app.use('/tally', createProxyMiddleware({
    target: 'http://localhost:9000',
    changeOrigin: true,
    pathRewrite: {
        '^/tally': '', // Remove '/tally' from the path
    },
}));

app.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
});
