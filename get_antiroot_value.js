Java.perform(function() {
    // Definición de variable apuntando a la clase "a.a.a.a.a"
    var class_a = Java.use("a.a.a.a.a");

    // Redefinimos la implementación de la función "a.a.a.a.a.R":
    class_a.R.implementation = function() {
        // Capturamos el valor que devuelve la función R original
        let return_R = this.R();
        // Imprimimos en la consola el valor original de la función AntiRoot
        console.log("Valor original =", return_R);
        // Devolvemos el valor original
        return return_R
    }
})
