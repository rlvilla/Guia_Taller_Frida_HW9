## Frida Server
Para ejecutar el servidor de Frida en el dispositivo Android (asignando un puerto especifico para evitar posibles checkers):
1. Enviamos el archivo al dispositivo por adb
```
cd ~/Utiles/Herramientas_Root
adb push frida-server /data/local/tmp
```

2. Cambiamos los permisos de ejecución 
```
adb shell "su -c chmod +x /data/local/tmp/frida-server"
```

3. Ejecutamos frida-server con diferentes comandos
```
run-frida-server # unicamente en 'matefrida'
```

> OR

```
adb shell "su -c /data/local/tmp/frida-server -l 0.0.0.0:1337 &"
```
> OR

```
adb shell
su
/data/local/tmp/frida-server -l 0.0.0.0:1337 &
```
4. Podemos hacer Ctrl+C (el proceso seguirá corriendo)


5. Probamos la conexión con:
```
frida-ps -Uia
```

5. Usamos este comando para hacer forwarding del puerto 1337 asignado a frida-server:

```
adb forward tcp:1337 tcp:1337
```

6. Finalmente, probamos el forwarding:
```
frida-ps -H 127.0.0.1:1337 -ia
```

## Repackaging

Para hacer repackaging de aplicaciones (importante tener version actualizada de Apktool):

1. Ir a la carpeta donde se ubice el APK y decompilar con apktool o apkx:
```
cd ~/Utiles/Damn-Vulnerable-Bank/DecompiladoBank/
apktool d dvba_v1.1.0.apk -o dvba_apktool
```

2. Modificar los archivos pertinentes...

3. Reempaquetar la aplicacion:
```
apktool empty-framework-dir --force 
```
```
apktool b dvba_apktool -o dvba_no-gpu.apk
```
4. Comprobar que se puede instalar:
```
adb install dvba_no-gpu.apk
```
5. Dará error de fallo de firma (el APK no está firmado aun). Creamos el almacen de firmas y firmamos:
```
keytool -genkey -v -keystore my-release.keystore -alias dvba_no-gpu -keyalg RSA -keysize 2048 -validity 10000
```
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore dvba-no-gpu.apk dvba-no-gpu
```
6. Finalmente, probamos a instalar el APK firmado...
```
adb install dvba_no-gpu.apk
```

## Damn Vulnerable Bank

Para ejecutar la API para la app Damn Vulnerable Bank:
1. Ir a la carpeta donde esté instalada
```
cd ~/Utiles/Damn-Vulnerable-Bank/BackendServer
```
2. Ejecutar docker-compose:
```
sudo docker-compose up --build
```