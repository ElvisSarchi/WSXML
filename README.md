# Web Services para consultar el XML del SRI

Web Services para consultar el XML del SRI

## Instrucciones para para Iniciar el API

### Requisitos

Debes tener instalado NodeJS v12 o superior en tu sistema. Se está utilizando Node 12 para el
desarrollo.

Luego de clonar el repositorio o extraer el ZIP debes ejecutar `npm install` en la línea de
comandos, ubicandote en la raíz de la carpeta.

Esto descargará todos los módulos correspondientes para hacer funcionar el sistema.

Estos módulos los encontrarás en la capeta `node_modules` en la raíz de la carpeta. Estos modulos
NO se suben al repositorio.

### Iniciar Servidor de desarrollo

Para iniciar el sevidor en modo desarrollo usa:

```bash
npm start
```

Si quieres que el sevidor se reinicie automáticamente al hacer algun cambio, debes usar **Nodemon**

#### Nodemon

Nodemon es un herramienta que te permite mantener el servidor iniciado aun cuando se han hecho
cambios. NO SE RECOMIENDA PARA ENTORNOS DE PRODUCCIÓN, SOLO DESARROLLO.

Se recomienda instalarlo de forma global en el sistema. Para ello usa este comando:

```bash
npm install nodemon -g
```

Y para ejecutarlo puedes usar cualquiera de los siguiente comandos:

```bash
# Usando NPM:
npm run startn

# Usando los archivos en específico (nodemon debe estar instalado globalmente)
nodemon ./bin/www
```

## Apendices

### Carpeta ".secret"

El sistema necesita hacer uso de algunos archivos que se encuentra en al carpeta ".secret", pero esta carpeta está ignorada por el repositorio y es posible que no aparezca al descargar el código.

Esto es así, ya que los valores en esta carpeta son demasiado sensible como para enviarlos al repositorio.

Dentro se encuentran archivos que sirven de plantilla para crear los archivos reales.

A continuación descibiré cual debe ser la estructura de los archivos que van dentro de esta carpeta.

#### env.js

```js
module.exports = {
  WSSRI: "XXXXXXXXXXX",
  SECRET: "XXXXXXXXXXX",
  USERWS: "XXXXXXXXXXX",
  PASSWORDWS: "XXXXXXXXXXX",
  PORT: 3000,
}
```

| Variable | Descripción |
| :---     | :---        |
| **WSSRI** | La URL del web Services para el consumo del servicio SOAP. |
| **SECRET** | Palabra clave para la generación del token de seguridad |
| **USERWS** | Usuario para la generación del token |
| **PASSWORDWS** | Password para la generación del token |
| **PORT** | Puerto donde se levanta el servicio |

