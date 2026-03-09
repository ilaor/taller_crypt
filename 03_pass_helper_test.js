'use strict'

/**
 * Importacion de la biblioteca personalizada de gestion de contraseñas y moment para fechas.
 * El archivo pass.helper.js encapsula la logica de cifrado con bcrypt[cite: 219, 247].
 */
const PassHelper = require('./helpers/pass.helper');
const moment = require('moment');

/** * Simulacion de datos de entrada para la validacion del sistema.
 * Se definen contraseñas en texto plano para verificar el comportamiento del hash[cite: 248].
 */
const miPass = "12345";
const badPass = "9876hl";

/**
 * Objeto de usuario siguiendo el esquema requerido para el WS AUTH.
 * Se utiliza moment().unix() para almacenar marcas de tiempo en formato numerico[cite: 249, 257, 258].
 */
const usuario = { 
    _id: "56789123456789",
    email: 'pmacia@dtic.ua.es',
    displayName: 'pmacia',
    password: miPass,
    signupDate: moment().unix(),
    lastLogin: moment().unix()
}

// Muestra del estado inicial del objeto antes de procesar la seguridad[cite: 259].
console.log(usuario);

/**
 * Proceso de encriptacion mediante el helper.
 * La funcion encriptaPassword devuelve una promesa que resuelve en un hash con salt incluido.
 * Este proceso es asincrono debido al coste computacional de bcrypt[cite: 178, 234, 261].
 */
PassHelper.encriptaPassword(usuario.password).then (hash => {
    
    /**
     * Sustitucion de la contraseña en texto plano por el hash generado.
     * El hash resultante tiene el formato de identificador, coste, salt y digest[cite: 127, 262].
     */
    usuario.password = hash;
    console.log(usuario);

    /**
     * Primera verificacion: Comparamos la contraseña original con el hash almacenado.
     * PassHelper.comparaPassword utiliza internamente bcrypt.compare para validar la integridad[cite: 237, 265].
     */
    PassHelper.comparaPassword( miPass, usuario.password ).then( passOK => {
        console.log(`comp1: ${passOK}`);
        
        // El resultado passOK es un booleano que indica si el texto plano coincide con el hash[cite: 266, 295].
        if ( passOK ) {
            console.log('El password es correcto.');
        } else {
            console.log('El password no es correcto.');
        }
    });

    /**
     * Segunda verificacion: Intento de acceso con una contraseña incorrecta.
     * Se demuestra que, aunque el hash sea el mismo, una entrada diferente produce un fallo de validacion[cite: 274].
     */
    PassHelper.comparaPassword( badPass, usuario.password ).then( passOK => {
        console.log(`comp2: ${passOK}`);
        
        /**
         * Uso de operador ternario para mostrar el resultado de la comparacion fallida.
         * En este caso, el resultado esperado es false (KO)[cite: 276, 297].
         */
        console.log( passOK ? 'El password es correcto' : 'El password no es correcto' );
    });
});