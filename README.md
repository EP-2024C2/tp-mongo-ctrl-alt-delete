
# Trabajo Práctico Estrategias de Persistencia

## Pasos para iniciar la API

1. Instalar dependencias.
2. Configurar variables de entorno en el archivo `.env` con los datos de la base de datos que se quiera usar. Si no se especifica, se usará por defecto una base de datos SQLite.
3. En caso de ser la primera vez que se usa la API, se puede optar por crear las tablas con o sin datos pre-cargados.
4. Levantar la API.

## Instalar dependencias

```bash
npm install
```

## Crear tablas con/sin datos

### Creación de tablas con datos pre-cargados:

```bash
npm run init-db
```

### Creación de tablas sin datos:

```bash
npm run sync-db
```

## Iniciar API

```bash
npm run dev
```

## Observaciones

Decidimos que en las rutas los ID se llamen `productoId`, `fabricanteId`, `componenteId`, ya que había conflictos con los middleware en caso de querer validar 2 IDs de una misma ruta.

## Diagrama Entidad-Relación

![DER](./data/DER.png)