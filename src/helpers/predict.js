// Import the node-fetch package
const fetch = require('node-fetch');

const SCAN_ENDPOINT = process.env.SCAN_ENDPOINT;

// Define the data to send in the request body
async function predictImage(path) {
  const data = {
    "photo": path,
  };

  // Use the fetch method to make a POST request
  return fetch(SCAN_ENDPOINT, {
      method: 'POST', // Specify the method
      headers: {
        'Content-Type': 'application/json' // Specify the content type
      },
      body: JSON.stringify(data) // Send the data as JSON
    })
    .then(res => res.json()) // Parse the response as JSON
    .then(res => {
      console.log(`Prediction of ${path}: ${JSON.stringify(res)}`);
      return res;
    }) // Do something with the response
    .catch(err => console.error(err)); // Handle errors
}

module.exports = {
  predictImage
}
