const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const app = express();
const { exec } = require("child_process");
require('./models/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRouter);

app.listen(3000,() => {
    refreshDataBase();
    console.log('Servidor corriendo!');
});



function refreshDataBase(){
    exec("npx sequelize-cli db:seed:undo:all", (error, stdout, stderr) => {
        if (error) {
            console.log(`No se pudieron dropear las semillas. Esto puede deberse a que es la primera vez que ejecuta el servidor. Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`Se dropearon las semillas con stderr: ${stderr}`);
            return writeDataBase();
        }
        console.log(`Se dropearon las semillas con stdout: ${stdout}`);
        writeDataBase();
    });
}

function writeDataBase(){
    exec("npx sequelize-cli db:seed:all", (error, stdout, stderr) => {
        if (error) {
            console.log(`No se pudieron inicializar las semillas. Esto puede deberse a que es la primera vez que ejecuta el servidor. Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`Se inicializaron las semillas con stderr: ${stderr}`);
            return;
        }
        console.log(`Se inicializaron las semillas con stdout: ${stdout}`);
    });
}
