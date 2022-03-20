
// variables globales 
const listaProductos = document.getElementById('lista-productos');
const compra = document.getElementById('compra');
const borrarCarrito = document.getElementById('borrar');
const filtros = document.querySelectorAll('#filtros span');
const busqueda =document.getElementById('buscar');
const pago =document.getElementById('pagar');
let  productos = [];
let productosFiltrados = [];

let carrito = [];
let subtotal = 0;
let total= 0;
let productosUI;
let restarBtns;
let sumarBtns;

