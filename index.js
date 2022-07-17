const express = require('express'); //la inicializo 
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api'); //aca lo que estoy haciendo es decirle que todas las routas que entran al servidor con /api, las va a gestionar el fichero apiRouter

const app = express(); //llamo a express

require('./models/db')

app.use(bodyParser.json()); //con esto lanzo un middleware
app.use(bodyParser.urlencoded({extended: true})); //me codifica la URL

app.use('/api', apiRouter)

app.listen(3000,() => {
    console.log('Servidor corriendo!');
});