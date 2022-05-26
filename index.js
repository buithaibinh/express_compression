const express = require('express');
const app = express();
const compression = require('compression');

app.use(
  compression({
    level: 4, // Compression level, from -1 to 9. 0 mean no compression
    threshold: 100 * 1000, // compress if larger than 100KB
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.get('/', (req, res) => {
  res.send('Hello World! <br />'.repeat(100000));
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000! http://localhost:3000`);
});
