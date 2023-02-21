Java.perform(function() {
    // Definición de variable apuntando a la clase "c.b.a.e"
    var decryptFunc = Java.use("c.b.a.e");

    // Redefinimos la implementación de la función "c.b.a.e.c"
    decryptFunc.b.implementation = function(param_1) {
        console.log("Parametro de la funcion b = ", param_1)
        // Imprimimos en la consola el valor original de la función b
        let return_b = this.b(param_1);
        console.log("Valor devuelto por la funcion b = ", return_b);
        // Devolvemos el valor cifrado/descifrado
        return return_b;
    }
})