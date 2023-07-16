const express = require('express');
const patentRoutes = require('./routes/patentRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/patent', patentRoutes);

// Start the server
const port = 3000; // Change the port number if needed
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
