## Scrum Game API REST Server Nodejs + Express

![Scrum Game](https://tim.com.ua/wp-content/uploads/2016/04/ScrumCardGame.jpeg)
<br>
<em>by DForce2055</em>

### Prerequisitos
Necesitas tener instalado un entorno **Node.js (node -v^10.15.3)**, **express (v^4.17.1)**, **mongoose (v^5.7.1)**,
**GIT (v^2.17.1)**, **Nodemon (v^1.19.3)**, y **MySQL (v^2.17.1)**<br>

#### Instrucciones para instalar entorno local con SO GNU/Linux
1. [NodeJS](https://www.hostinger.com.ar/tutoriales/instalar-node-js-ubuntu/)
2. [GIT](https://git-scm.com/)
    - ```apt-get install git```
    

### Paso-1
Bajarse el repositior de Git HUB
#### ```git clone https://github.com/dforce2055/scrum-game.git```

### Paso-2
Una vez que la copia del repositorio finalizó, necesitas dejar lista tu aplicación para la implementación <em>(deploy)</em>para lo cual es necesario instalar dependencias y construir el proyecto <em>(build)</em><br>
Dentro de la carpeta del repositorio recientemente clonado ejecutar desde la consola de NodeJS o de VSCode:
#### ```cd scrum-game```
#### ```npm install --save nodemon```
#### ```npm install```


### Paso-3
Ya estas listo para ejecutar la aplicación
#### ```nodemon app.js``` o ```node app.js```


## Esquema de la aplicación
1. Heroku server (Deploy Nodejs + Express App) [URL](https://scrum-game.herokuapp.com/)
2. BBDD MongoDB No SQL in [Atlas Server](https://cloud.mongodb.com/)
2. BBDD MySQL ClearDB [ClearDB for Heroku server](https://www.cleardb.com)