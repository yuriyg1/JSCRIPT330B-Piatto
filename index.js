const server = require("./server");
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1/fc-v1', {}).then(() => {
  server.listen(port, () => {
   console.log(`Server is listening on http://localhost:${port}`);
  });
}).catch((e) => {
  console.error(`Failed to start server:`, e);
});








//OLD //OLD //OLD //OLD //OLD //OLD //OLD //OLD //OLD //OLD //OLD //OLD //OLD //OLD //OLD //OLD //OLD //OLD 

// const server = require("./server");
// const mongoose = require('mongoose');

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1/fc-v1', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Start the server
//     const app = require('./server');
//     const PORT = 3000;
//     app.listen(PORT, () => {
//       console.log(`Hej, Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });
