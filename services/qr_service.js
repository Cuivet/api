var https = require('follow-redirects').https;
var fs = require('fs');

var qrService = {
  checkIfIsValidDNI: checkIfIsValidDNI
}

async function checkIfIsValidDNI(image64, dni) {
  try {
    const generatedResultToken = await postImageOnApi(image64);
    const response = await getImageOnApi(generatedResultToken);
    if (response.includes(dni)) {
      console.log("error");
    } else {
      if (response.includes("No se encontraron códigos de barras")) {
        throw new Error("No se encontraron codigos de barras");
      } else {
        throw new Error("El DNI cargado no corresponde con el ingresado");
      }
    }
  } catch (error) {
    throw error;
  }
}

function postImageOnApi(image64) {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'POST',
      'hostname': 'api.products.aspose.app',
      'path': '/barcode/recognize/apiRequestRecognize',
      'headers': {
        'authority': 'api.products.aspose.app',
        'accept': '*/*',
        'accept-language': 'en,es-AR;q=0.9,es-419;q=0.8,es;q=0.7,gl;q=0.6',
        'cookie': '_ga=GA1.1.1453610982.1699366609; _ga_1LEXT1ZD9X=GS1.1.1699366608.1.1.1699371986.0.0.0',
        'origin': 'https://products.aspose.app',
        'referer': 'https://products.aspose.app/',
        'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
      },
      'maxRedirects': 20
    };

    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        var responseBody = body.toString();

        try {
          var jsonResponse = JSON.parse(responseBody);
          var recognizeResultToken = jsonResponse.recognizeResultToken;
          if (recognizeResultToken != null) {
            resolve(recognizeResultToken);
          } else {
            reject("Hay un error en la peticion para generar la imagen" + error);
          }
        } catch (error) {
          reject("Error al analizar la respuesta como JSON: " + error);
        }
      });

      res.on("error", function (error) {
        reject(error);
      });
    });

    req.setHeader('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');

    var postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"type\"\r\n\r\npdf417\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"quality\"\r\n\r\n2\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"uuid\"\r\n\r\nac369bbe-e2cf-4724-892c-5ecf4d751f2a\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"fileBase64\"\r\n\r\n" + image64 + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--";
    
    req.write(postData);

    req.end();

  });
}

function getImageOnApi(generatedToken) {
  return new Promise((resolve, reject) => {
    var options = {
      'method': 'GET',
      'hostname': 'api.products.aspose.app',
      'path': '/barcode/es/recognize/recognizeresult/' + generatedToken + '?timestamp=1699371562598',
      'headers': {
        'authority': 'metrics.svc.conholdate.cloud',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en,es-AR;q=0.9,es-419;q=0.8,es;q=0.7,gl;q=0.6',
        'origin': 'https://products.aspose.app',
        'referer': 'https://products.aspose.app/',
        'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'cookie': '_ga=GA1.1.1453610982.1699366609; _ga_1LEXT1ZD9X=GS1.1.1699366608.1.1.1699371556.0.0.0',
        'Referer': '',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'content-length': '0'
      },
      'maxRedirects': 20
    };

    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        var responseBody = body.toString();

        try {
          var jsonResponse = JSON.parse(responseBody);
          var ready = jsonResponse.ready;
          if (ready) {
            resolve(jsonResponse.html);
          } else {
            reject("No se generó una ruta válida en la conversion de la imagen. Error: " + error);
          }
        } catch (error) {
          reject("Error al analizar la respuesta como JSON: " + error);
        }
      });

      res.on("error", function (error) {
        reject(error);
      });
    });

    req.end();
  });
}

module.exports = qrService;



