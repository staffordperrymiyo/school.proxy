const express = require('express');
const axios = require('axios'); 
const app = express();
const path = require("path")

app.use(express.json()); 

app.get("/client.html", (req, res) => {
  res.sendFile(path.resolve("client.html"))
})

app.post('/', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send('No URL provided.');
  }

  try {
    const response = await axios.get(url);
    let html = response.data;

    html = html.replace(/src="(https?:\/\/[^"]+)"/g, 'src="/proxy?url=$1"');
    html = html.replace(/href="(https?:\/\/[^"]+)"/g, 'href="/proxy?url=$1"');

    res.send(html); 
  } catch (error) {
    res.status(500).send('Error fetching the HTML from the provided URL.');
  }
});

app.get('/proxy', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('No URL provided.');
  }

  try {

    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set(response.headers);
    res.send(response.data); 
  } catch (error) {
    res.status(500).send('Error fetching the content from the provided URL.');
  }
});

app.listen(3004, () => {
  console.log('Proxy server is running on http://localhost:3004');
});