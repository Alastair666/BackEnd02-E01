# 1er Pre-entrega. Programación Backend II: Diseño y Arquitectura Backend

## Comisión 70070

- **Objetivos generales** : 
1. Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios.
2. Implementar un sistema de login del usuario que trabaje con jwt.
- **Objetivos específicos** : 
1. Desarrollar una estrategia “current” para extraer la cookie que contiene el token y con dicho token obtener el usuario asociado. En caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error de passport, utilizar un extractor de cookie.
2. Agregar al router /api/sessions/ la ruta /current, la cual validará al usuario logueado y devolverá en una respuesta sus datos (Asociados al JWT).
- **Formato** : 
1. Link al repositorio de Github, sin la carpeta de node_modules.
    ```sh
    https://github.com/Alastair666/BackEnd02-E01.git

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Instalación](#instalación)
3. [Estructura](#estructura-del-proyecto)
4. [Endpoint](#endpoints)
5. [Conclusiones](#conclusiones)

## Introducción
Este proyecto es la primer pre-entrega final del curso "Programación Backend II: Diseño y Arquitectura Backend" de la plataforma Coderhouse.

## Instalación

### Requisitos
- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

### Instalación de Node.js
Para instalar Node.js, sigue estos pasos:

1. Descarga el instalador desde la página oficial de Node.js.
2. Ejecuta el instalador y sigue las instrucciones en pantalla.
3. Verifica la instalación ejecutando los siguientes comandos en tu terminal:
   ```bash
   node -v
   npm -v

### Instalación de Librerías
1. Una vez que Node.js esté instalado, puedes instalar las librerías necesarias para este proyecto. Ejecuta el siguiente comando en la raíz del proyecto:
    ```sh
    npm install express bcryptjs body-parser bcryptjs connect-mongo cookie-parser express-handlebars express-session mongoose passport passport-jwt passport-local

## Estructura del Proyecto
1. **node_modules/**: Contiene las dependencias del proyecto.
2. **src/**: Carpeta principal del código fuente.
3. **config/**: Contiene los archivos de configuración para el acceso a la base de datos.
4. **models/**: Contiene las definiciones de los modelos de las colecciones (Mongo DB).
5. **routes/**: Contiene acceso a las funciones expuestas (endpoints).
6. **views/**: Contiene las interfaces con las que interactuará el usuario.

- La estructura del proyecto es la siguiente:
    ```
    BackEnd01_EF/
    ├── node_modules/
    ├── src/
    │   ├── models/
    │   ├── ├── user.model.js
    │   ├── public/
    │   ├── ├── js/
    │   ├── ├── ├── index.js
    │   ├── routes/
    │   ├── ├── api/
    │   ├── ├── ├── sessions.js
    │   ├── ├── views.route.js
    │   ├── views/
    │   ├── ├── layouts/
    │   ├── ├── ├── main.hbs
    ├── ├── index.hbs
    ├── ├── login.hbs
    ├── ├── register.hbs
    ├── ├── users.hbs
    ├── app.js
    ├── utils.js
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md

## Endpoints
A continuación se describen los endpoints disponibles en la aplicación:




## Conclusiones
- Este proyecto demuestra el uso de Node.js y varias librerías para desarrollar una aplicación backend robusta. Si tienes alguna pregunta o necesitas más información, no dudes en contactarme.
    ```
    Este archivo `README.md` proporciona una guía clara y estructurada para la instalación, estructura y uso del proyecto