// Local development server: runs the same Express app that Vercel runs as a serverless function.
const app = require('./api/index.js');
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('API listening on http://localhost:' + port));
