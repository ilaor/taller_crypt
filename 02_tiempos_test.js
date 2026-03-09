const moment = require('moment');
console.log(moment()); // Fecha y hora actual
console.log(moment().unix()); // Fecha y hora actual como secuencia numérica
console.log(moment().add(14,'days')); // Fecha actual + 14 días
console.log(moment().add(14, 'days') - moment()); // Fecha actual + 14 días – fecha actual
console.log(14*24*60*60*1000); // Catorce días expresados en milisegundos 