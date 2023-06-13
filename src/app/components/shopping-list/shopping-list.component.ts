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
    // if(this.token.getProductSelected()){
    //   this.cargarListaProductos(); // Carga la lista de productos que esta el sessionStorage en listaProductos, en esta lista vienen productos repetidos
    //   this.listaComprasAux2 = this.contarProductos(); // Arma de manera ordenada la lista con los productos, su cantidad y un estado( false)
    //   //this.guardarListaProductosBD(this.listaComprasAux); //Guarda esa lista en la base de datos
    // }
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
        const producto: Product = new Product(nombre,parseFloat(precio),proveedor,new Date(fechaCreacion)); 
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
      console.log(data);
      if(data && this.token.getProductSelected()){
        this.cargarListaProductos();
        this.listaComprasAux2 = this.contarProductos();
        this.listaComprasAux = data.map((item: Productos) => { return new Productos(new Product(item.productos.nombre,item.productos.precio,item.productos.proveedor,new Date(item.productos.fechaCreacion)),item.cantidad,item.estado)});
        console.log('Lista en sesion',this.listaComprasAux);
        this.listaComprasAux3 = this.verificarCantidadProductos(this.listaComprasAux,this.listaComprasAux2);
        this.guardarListaProductosBD(this.listaComprasAux3);
        this.token.cleanProductSelect();
        this.saldoTotal(this.listaComprasAux3);
      }else if(data){
        this.listaComprasAux3 = data;
        this.saldoTotal(this.listaComprasAux3);
      }else if(this.token.getProductSelected()){
        this.cargarListaProductos();
        this.listaComprasAux3 = this.contarProductos();
        this.saldoTotal(this.listaComprasAux3);
        this.guardarListaProductosBD(this.listaComprasAux3);
        this.token.cleanProductSelect();
      }
    });
  }

  saldoTotal(lista: Productos[]){
    this.total = 0;
    for (const producto of lista) {
      if(!producto.estado){
        this.total += producto.productos.precio * producto.cantidad;
      }
    }
  }

  actualizarTotal(item: Productos){
    this.total = item.estado
      ? this.total - item.productos.precio * item.cantidad
      : this.total + item.productos.precio * item.cantidad;
  }

  //Lista 1: Viene de BD
  verificarCantidadProductos(lista1: Productos[], lista2: Productos[]): Productos[]{
    lista1.forEach(data => {
      let productoExiste = lista2.find(item => item.productos.nombre === data.productos.nombre);
      if(productoExiste != undefined){
        data.cantidad = data.cantidad + productoExiste.cantidad;
      }
    });

    lista2.forEach(data => {
      let productoExiste = lista1.find(item => item.productos.nombre === data.productos.nombre);
      productoExiste == undefined ? lista1.push(data): null;
    });
    console.log(lista1);
    return lista1;
  }
  
}
