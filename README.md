Google-Map-Plugins
==================

Librerías
--------------------------------------
```javascript
https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places
dvmap.min.js 
```

Página demo y documentación
--------------------------------------
[Demo y Documentación](http://dvdeveloper.github.io/Google-Map-Plugins/)

Parametros
--------------------------------------
| Etiqueta        | Tipo           | Descripción  |
| ------------- |:-------------:| -----:|
| num      | Int | Identificador único, se utiliza para tener multiples mapas en diferentes identificador (#id).defecto:0 |
| zoom      | Int      | Distancia que tendra el mapa y marcador. defecto: 14 |
| address | String      | Ubicación en la cual se marcará el mapa |
| circle | Boolean      | Dibujar un circulo al rededor del punto de referencia. defecto: false  |
| color | String      | Color del circulo. defecto: #AA0000 |
| radius | Int      |   Kilometros a la redonda. defecto: 300  |
| info | Boolean      | Popup en el marcador, defecto: false |
| html | String      | Contenido del popup, acepta html  |

Ejemplo Básico
--------------------------------------
```javascript
DvMap.map("mapa_basico").search({
  num: 1,
  zoom: 14,
  address: 'Dirección a buscar',
  circle: true,
  radius: 300,
  info: true,
  html: '<div style="width:100px;"> Dirección a buscar  </div>'
});
```

```html
<div style="width:100%;height:300px;" id="mapa_basico"></div>
```
