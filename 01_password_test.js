'use strict'
// Formato de una contraseña protegida con hash y salt:
// $2b$[cost]$[22 character salt][31 character hash]
// Ejemplo:
// '$2b$10$G1DDAoljDq90F9H/9uH6z.NQpkg4lbVVC/v4RTLQ87j1.6VDbpbTK'
// \__/\/ \____________________/\_____________________________/
// Alg Cost Salt Hash
//
const bcrypt = require('bcrypt');
// Datos simulados...
const myPassword = "miContrasenya";
const badPassword = "miOtraConstrasenya";
// Creamos un Salt...
bcrypt.genSalt(10, (err, salt) => {
 console.log(`Salt1: ${salt}`);
 // Utilizamos el Salt para generar un Hash...
 bcrypt.hash(myPassword, salt, (err, hash) => {
 if (err) console.log(err);
 else console.log(`hash1: ${hash}`);
 });
});
// Creamos un Hash con Salt incluido utilizando Callbacks...
bcrypt.hash(myPassword, 10, (err, hash) => {
 if (err) console.log(err);
 else {
 console.log(`hash2: ${hash}`);

 // Verificamos con la contraseña original...
 bcrypt.compare(myPassword, hash, (err, result) => {
 console.log(`result2.1: ${result}`);
 });
 // Verificamos contra otra contraseña...
 bcrypt.compare(badPassword, hash, (err, result) => {
 console.log(`result2.2: ${result}`);
 });
 }
});
// Creamos un Hash con Salt incluido utilizando Promesas...
bcrypt.hash(myPassword, 10).then( hash => {
 console.log(`hash3: ${hash}`);

 bcrypt.compare(myPassword, hash).then( result => { 
     console.log(`result3.1: ${result}`);
 }); 
 bcrypt.compare(badPassword, hash).then( result => {
 console.log(`result3.2: ${result}`);
 });
}); 