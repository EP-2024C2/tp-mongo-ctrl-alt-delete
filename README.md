
# Trabajo Práctico Estrategias de Persistencia

## Pasos para iniciar la API

1. Instalar dependencias.
2. Levantar base con docker. Ejecutar docker-compose up -d
3. Levantar la API.

## Instalar dependencias

```bash
npm install
```

## Iniciar API

```bash
npm run dev
```

## Deciciones tomadas

En las rutas los ID se llamen `productoId`, `fabricanteId`, ya que había conflictos con los middleware en caso de querer validar 2 IDs de una misma ruta.

La entidad Componentes es una relacion incrustada de Productos ya que no van a ser modificados frecuentemente y porque no tienen proposito por fuera de la Entidad producto.

Cuando se agrega un fabricante a un producto o viceversa, esta relacion es impactada en ambas tablas, es decir, se referencia el id en ambas entidades.

Cuando se borra un fabricante o un producto que estaba siendo referenciado. Se borra la referencia en las tablas necesarias.

No usamos schema validator ya que el propio schema definido valida los modelos.

Usamos el id que genera mongo ya que generar otro id autoincremental era muy costoso


## Enpoints

| Verbo  | Recurso                              | Status code   | Descripción                                           |
| ------ | ------------------------------------ | ------------- | ----------------------------------------------------- |
| GET    | /productos                           | 200           | Obtener todos los productos                           |
| GET    | /productos/:idProducto               | 200, 404      | Obtener un producto en particular                     |
| POST   | /productos                           | 201, 400      | Crear un producto                                     |
| PUT    | /productos/:idProducto               | 200, 404      | Modificar los datos de un producto en particular      |
| DELETE | /productos/:idProducto               | 200, 404, 500 | Borrar un producto en particular                      |
| GET    | /productosFabricantes/:idProducto/   | 200, 404      | Obtener todos los detalles de los fabricantes de un producto          |
| POST   | /productosFabricantes/:idProducto/   | 201, 404, 400 | Crear la asociación de producto con 1 o N fabricantes |
| POST   | /productos/:idProducto/componentes   | 201, 404, 400 | Agrega 1 o N componentes a un producto                |
| GET    | /productos/:minPrecio/:maxPrecio     | 201, 404, 500 | Agrega 1 o N componentes a un producto                |
| PUT    | /productos/:productoId/fabricantes/:fabricanteId | 201, 404, 500 | Modificar los datos de un fabricante en particular  |
| GET    | /fabricantes                         | 200           | Obtener todos los fabricantes                         |
| GET    | /fabricantes/:idFabricante           | 200, 404      | Obtener un fabricante en particular                   |
| POST   | /fabricantes                         | 201, 400      | Crear un fabricante                                   |
| PUT    | /fabricantes/:idFabricante           | 200, 404      | Modificar los datos de un fabricante en particular    |
| DELETE | /fabricantes/:idFabricante           | 200, 404, 500 | Borrar un fabricante en particular                    |
| GET    | /fabricantesProductos/:idFabricante/ | 200, 404      | Obtener todos los detalles de los productos de un fabricante          |
