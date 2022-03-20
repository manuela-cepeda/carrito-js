//Obtengo productos de json
fetch("json/productos.json", {
	"method": "GET",
})
.then(response => response.json())
.then(
    json =>{
    json.forEach(productoApi => {
        productos.push(new Producto(productoApi.id, productoApi.nombre, productoApi.precio, productoApi.descripcion, productoApi.img, productoApi.cantidad, productoApi.categoria));
        agregarProductoUI(productos)
     
    } );
    }
)
.catch(err => {
	console.error(err);
});


// RECUPERAR LA INFO DEL LOCALSTORAGE
if('Carrito' in localStorage) {

    const carritoLocal = JSON.parse(localStorage.getItem('Carrito'));  
    for (const objeto of carritoLocal) {       
        
        carrito.push(new Producto(objeto.id, objeto.nombre, objeto.precio, objeto.descripcion, objeto.img, objeto.cantidad, objeto.categoria));
        agregarCompraUI(carrito) ;
        
        var sumacarritolocal  =+ objeto.precio * objeto.cantidad;
       
    }
    actualizarPrecio(sumacarritolocal, 'suma')
}



//FILTRAR CON BOTONES
for( const filtro of filtros ){
filtro.onclick = () => {
    listaProductos.innerHTML = "";
   
    if(filtro.id == 'Todo' ) {       
        agregarProductoUI(productos)       
        cambiarBackground(filtro.id)
	}
    else{
        productosFiltrados = productos.filter(producto =>  producto.categoria == filtro.id);        
        agregarProductoUI(productosFiltrados)
        cambiarBackground(filtro.id)
    }    
  }      
}

//BUSCAR CON INPUT
busqueda.onkeyup = () => {
	let productosBusqueda = [];
	const txt = busqueda.value.toLowerCase();
	for (const producto of productos){
		let nombre = producto.nombre.toLowerCase();
		if(nombre.indexOf(txt) !== -1) {			
			productosBusqueda.push(producto);
		}
		listaProductos.innerHTML = "";
		agregarProductoUI(productosBusqueda)		
	}

}

//BORRAR CARRITO CON BOTON 
borrarCarrito.onclick = () => {
    Toastify({
        text: "Carrito vacio",
        duration: 1000,       
        style: {
            color: '#EF4444',
            background: "#FEE2E2",
            borderRadius: "0.375rem"
          },
    
    }).showToast ();    

    compra.innerHTML = 'Tu carrito está vacio';
    carrito = [];
    localStorage.removeItem('Carrito');
    actualizarPrecio()

}

//BORRAR CARRITO CON BOTON 
pago.onclick = () => {
	
    Toastify({
        text: `¡Pago realizado con exito!
		 TOTAL: $ ${total}`,
        duration: 3000,       
        style: {
			background: "#04AA6B",
			borderRadius: "0.375rem"
          },
    
    }).showToast ();   
	
	setTimeout(() => {
		compra.innerHTML = 'Tu carrito está vacio';
		carrito = [];
		localStorage.removeItem('Carrito');
		actualizarPrecio()
	}, 3000);
  


}
