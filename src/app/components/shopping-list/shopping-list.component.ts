import { Component, HostListener } from '@angular/core';
import { Carrito } from 'src/app/model/carrito.model';
import { Product } from 'src/app/model/product.model';
import { Productos } from 'src/app/model/products.model';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  listaProductos: Product[] = [];
  listaComprasAux: Productos[] = [];
  listaComprasAux2: Productos[] = [];
  listaComprasAux3: Productos[] = [];
  itemlista: Productos;
  item: Productos;
  total: number = 0;
  email: string[] = [];

  constructor(
    private sLService: ShoppingService,
    private token: TokenService
  ) {}

  ngOnInit() {
    this.obtenerListaProductos();
    if(this.token.getProductSelected()){
      this.cargarListaProductos(); // Carga la lista de productos que esta el sessionStorage en listaProductos, en esta lista vienen productos repetidos
      this.listaComprasAux2 = this.contarProductos(); // Arma de manera ordenada la lista con los productos, su cantidad y un estado( false)
      //this.guardarListaProductosBD(this.listaComprasAux); //Guarda esa lista en la base de datos
    }
  }

  cargarListaProductos() {
    this.listaProductos = JSON.parse(this.token.getProductSelected()).map(
      (item: Product) => {
        return {
          fechaCreacion: item.fechaCreacion,
          nombre: item.nombre,
          precio: item.precio,
          proveedor: item.proveedor,
        };
      }
    );

    for (const producto of this.listaProductos) {
      this.total += producto.precio;
    }
  }

  contarProductos(): Productos[] {
    const contadorProductos: { [key: string]: number } = {};
    const productosConCantidad: Productos[] = [];
    let producto2: Productos;

    this.listaProductos.forEach((producto) => {
      const clave = `${producto.nombre}-${producto.precio}-${producto.proveedor}-${producto.fechaCreacion}`;
      contadorProductos[clave] = (contadorProductos[clave] || 0) + 1;
    });

    for (const clave in contadorProductos) {
      if (contadorProductos.hasOwnProperty(clave)) {
        const [nombre, precio, proveedor, fechaCreacion] = clave.split('-');
        const producto: Product = {nombre: nombre, precio: parseFloat(precio), proveedor: proveedor, fechaCreacion: new Date(fechaCreacion)};
        const cantidad = contadorProductos[clave];
        const estado = false;
        producto2 = new Productos(producto, cantidad, estado);
        productosConCantidad.push(producto2);
      }
    }
    return productosConCantidad;
  }

  guardarListaProductos(event: Event, item: Productos) {
    this.item = item;
    item.estado = (event.target as HTMLInputElement).checked;
    this.actualizarTotal(item);
    this.itemlista = new Productos(item.productos,item.cantidad,item.estado);
    const productoExistente = this.listaComprasAux.find((producto) => producto.productos === item.productos);
    if (productoExistente) {
      productoExistente.estado = item.estado;
    } else {
      const nuevoProducto = new Productos(item.productos,item.cantidad,item.estado);
      this.listaComprasAux.push(nuevoProducto);
    }
    this.guardarListaProductosBD(this.listaComprasAux);
  }
  
  guardarListaProductosBD(lista: Productos[]) {
    this.email = this.token.getEmail().split('@');
    this.sLService.guardarListaCompras(lista, this.email[0]).subscribe((data: Productos[]) => {
      !!data ? this.listaComprasAux2 = data : this.listaComprasAux2 = [];
      });
  }

  obtenerListaProductos(){
    this.email = this.token.getEmail().split('@');
    this.sLService.obtenerListaCompras(this.email[0]).subscribe((data: Productos[]) =>{
      if(data){
        this.listaComprasAux = data;
        this.listaComprasAux3 = this.verificarCantidadProductos(this.listaComprasAux,this.listaComprasAux2);
        this.guardarListaProductosBD(this.listaComprasAux);
        console.log('Lista 1',this.listaComprasAux);
        console.log('Lista 2',this.listaComprasAux2);
        console.log('Lista 3', this.listaComprasAux3);
      }else{
        this.cargarListaProductos();
        this.listaComprasAux2 = this.contarProductos();
        this.guardarListaProductosBD(this.listaComprasAux2);
      }
    });
  }

  saldoTotal(){
    for (const producto of this.listaComprasAux) {
      this.total += producto.productos.precio;
    }
  }

  actualizarTotal(item: Productos){
    this.total = item.estado
      ? this.total - item.productos.precio * item.cantidad
      : this.total + item.productos.precio * item.cantidad;
  }

  verificarCantidadProductos(lista1: Productos[], lista2: Productos[]): Productos[]{
    let lista: Productos[];
    for(let i=0;i<lista2.length;i++){
      for(let j=0;j<lista1.length;j++){
        console.log('Lista 1',lista1[i].productos);
        console.log('Lista 2',lista2[i].productos);
        if(lista1[i].productos === lista2[j].productos){
          console.log('entré');
            lista[i].cantidad = lista2[i].cantidad + lista1[j].cantidad;
        }
      }
    }
    return lista;
    
  }
  
}
