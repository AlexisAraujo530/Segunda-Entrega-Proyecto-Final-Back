import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }

  async guardar(producto) {
    return super.guardar(producto);
  }
}

export default ProductosDaoFirebase;