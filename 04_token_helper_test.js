
'use strict'
const TokenHelper = require('./helpers/token.helper'); 
const moment = require('moment');
// Simulamos datos...
const usuario = {
 _id: "56789123456789",
 email: 'pmacia@dtic.ua.es',
 displayName: 'pmacia',
 signupDate: moment().unix(),
 lastLogin: moment().unix()
};
console.log(usuario);
// Creamos un token...
const token = TokenHelper.creaToken( usuario );
console.log({ NewAccessToken: token });
// Ejemplo 1: decodificamos el token creado anteriormente...
TokenHelper.decodificaToken( token )
 .then( userID => console.log(`_ID1: ${userID}`
 ), err => console.log({Err1: err})
);
// Simulamos un token caducado y un token mal formado (creados en jwt.io)
const oldToken =
'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Njc4OTEyMzQ1Njc4OSIsImlhdCI6MTYwMzM2MjcyMCwiZXhwIjoxNjAzMzYyNzgwfQ.igpQ77raDzfIsfC5H1NUigEFIseqDEYgtFopdEiyHb0';
const badToken =
'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ8.eyJzdWIiOiI1Njc4OTEyMzQ1Njc4OSIsImlhdCI6MTYwMzM1MzEyOCwiZXhwIjoxNjA0NTY2MzI4fQ.edqpWcVnCJ0MtYqG4zTyZbUVX-c8LtHhX3XpU4gq99Q';
const goodToken =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBhY28gTWFjacOhIiwiaWF0IjoxNTE2MjM5MDIyfQ.-He4lmC9CntwBl3x-idg3k6NZQRkF16esho1WodaDVA';
// Ejemplo 2: intentamos decodificar el token caducado...
TokenHelper.decodificaToken( oldToken )
 .then( userID => console.log(`_ID2: ${userID}`
 ), err => console.log({Err2: err})
);
// Ejemplo 3: intentamos decodificar el token mal formado...
TokenHelper.decodificaToken( badToken ).then(
 userID => {
 console.log(`_ID3: ${userID}`);
 // Aquí pueden ir más instrucciones...
 },
 err => {
 console.log({Err3: err});
 // Aquí pueden ir más instrucciones...
 }
);
// Ejemplo 4: intentamos decodificar el token bien formado
// pero firmado con otra contraseña o secreto...
TokenHelper.decodificaToken( goodToken )
 .then( userID => {
 console.log(`_ID4: ${userID}`);
 // Aquí pueden ir más instrucciones...
 })
 .catch( err => {
 console.log({Err4: err});
 // Aquí pueden ir más instrucciones...
 }
);
// Vemos como en cada ejemplo hemos empleado diferentes estilos de programamción que son perfectamente
// válidos y que pueden servir de referencia para que los utilicemos en el futuro. 