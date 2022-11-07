var axios = require('axios');
var https = require('follow-redirects').https;

var mpService = {
    getMPs: getMPs
}

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
})

async function getMPs() {
    const responseData = (await axios.get('https://cmvc.soportedlr.com.ar/api/v1/matriculados-pagina', { httpsAgent })).data.registros;
    const mpDataList = [];
    responseData.forEach(registro => {
        mpDataList.push({
            completeName: registro.apellido_y,
            mp: registro.xmatricula.toString()
        })
    });
    return mpDataList;
};

module.exports = mpService;