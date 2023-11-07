const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const app = express();
require('./models/db');

const bodyParserConfig = {
    limit: '10mb',
  };
  
app.use(bodyParser.json(bodyParserConfig));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api', apiRouter);

app.listen(3000,() => {
    console.log('Servidor corriendo!');
});


