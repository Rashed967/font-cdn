import express from 'express';
import apiRouter from '/api.js';
const app = express();

// Use the API router
app.use('/api', apiRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});