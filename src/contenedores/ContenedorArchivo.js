import { promises as fs } from 'fs';
import config from '../config.js';

class ContenedorArchivo {
  
  constructor(ruta) {
    this.ruta = `${config.fileSystem.path}/${ruta}`;
  }

  async listar(id) {
    const objs = await this.listarTodos();
    const buscado = objs.find((obj) => obj.id === id);
    return buscado;
  }

  async listarTodos() {
    try {
      const objs = await fs.readFile(this.ruta, 'utf-8');
      return JSON.parse(objs);
    } catch (error) {
      return [];
    }
  }

  async guardar(obj) {
    const objs = await this.listarTodos();
    let newId
    
    if (objs.length === 0) {
      newId = 1;
    } else {
      newId = objs[objs.length - 1].id + 1;
    }
    
    const newObj = { ...obj, id: newId };
    objs.push(newObj);

    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      return newObj;
    } catch (error) {
      console.log(`Error al guardar el objeto: ${error}`);
    }
  }

  async actualizar(obj) {
    const objs = await this.listarTodos();
    const index = objs.findIndex((o) => o.id === obj.id);
    objs[index] = obj;

    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      return obj;
    } catch (error) {
      console.log(`Error al actualizar el objeto: ${error}`);
    }
  }

  async borrar(id) {
    const objs = await this.listarTodos();
    const index = objs.findIndex((o) => o.id === id);
    if (index === -1) {
      throw new Error(`No existe el objeto con id ${id}`);
    }
    objs.splice(index, 1);
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      return true;
    } catch (error) {
      throw new Error(`Error al borrar el objeto: ${error}`);
    }
  }
}

export default ContenedorArchivo;