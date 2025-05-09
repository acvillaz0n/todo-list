
# Todo List
- Lista de tareas.
- Editar tareas.
- Marcar tareas como completadas.
- Eliminar tareas.

Para la persistencia de los datos se uso la herramienta [json-server](https://www.npmjs.com/package/json-server)






## Stack Tecnologico

- Angular v19.2.10
- Node v20.18.0
- json-server (Emular API)
- Jasmine - Karma

## Ejecutar localmente

Clonamos el proyecto

```bash
  git clone https://github.com/acvillaz0n/todo-list
```

Ingresamos al directorio del proyecto

```bash
  cd todo-list
```

Instalamos las dependencias  
_Importante tener instalado Angular v19 y Node > 20_  

```bash
  npm install
```

Ejecutamos una aplicación

```bash
  npm run start
```

En otra consola/terminal (desde la raiz del projecto) Ejecutamos

```bash
  npx json-server db/tasks.json
```
Este comando, nos desplegará una API (local), en donde se persistirá la información.
