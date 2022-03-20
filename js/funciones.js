
// agregar lista de productos guardados en localStorage al html
const agregarProductoUI = (productos) =>  {  
    listaProductos.innerHTML = "";               
    for (const  value of productos) {
    
    let divProducto = document.createElement('div'); 
    divProducto.setAttribute('id', value.id)       
    divProducto.classList += 'producto px-3 py-3 flex flex-col border border-gray-200 rounded-md h-46 justify-between cursor-pointer hover:bg-gray-100';
    divProducto.innerHTML = `
        <div class="leading-tight">
        <div class="font-bold text-gray-800 ">${value.nombre}</div>
        <span class="font-light text-sm text-gray-400 "> ${value.descripcion} </span>
    </div>
    <div class="flex flex-row justify-between items-center">
        <span class="self-end font-bold text-lg text-yellow-500">$ ${value.precio}</span>        
        <img src= ${value.img}
            class=" h-14 w-14 object-cover rounded-md" alt="">
    </div> `   ;              

        listaProductos.appendChild(divProducto);
        productosUI= document.getElementsByClassName('producto');
  
}    
       
seleccionProducto(productosUI)

}

//seleccion producto evento
const seleccionProducto = (productosUI) => {

    for( const prod of productosUI ) {
        prod.addEventListener('click', () => {  
            
            Toastify({
                text: "Producto agregado",
                duration: 1000,       
                style: {
                    background: "#04AA6B",
                    borderRadius: "0.375rem"
                  },
            
            }).showToast ();     
           
            let seleccion = carrito.find(producto => producto.id == prod.id);  
                //Si existe aumento cantidad
             if(seleccion){
                 seleccion.addCantidad();  
            //Si no existe agrego al carrito                              
            }else{
             seleccion= productos.find(producto => producto.id == prod.id);
            
               carrito.push( new Producto(seleccion.id, seleccion.nombre, seleccion.precio, seleccion.descripcion, seleccion.img, seleccion.cantidad) );
            }
             //actualizo el precio
             actualizarPrecio(seleccion.precio, 'suma')
            agregarCompraUI(carrito) ;
            guardarLocal('Carrito', JSON.stringify(carrito));
           


        })
    }
}

//AGREGAR COMPRA AL DOM
const agregarCompraUI = (carrito) =>  {  
    compra.innerHTML = ""; 
                  
    for (const productoSelec of carrito) {
    if(productoSelec.cantidad != 0){
    let divCompra = document.createElement('div'); 
    divCompra.setAttribute('id',`compra${productoSelec.id}`)
    divCompra.classList += 'flex flex-row justify-between items-center mb-4';
    divCompra.innerHTML = `
    <div class="flex flex-row items-center w-2/5">
    <img src="${productoSelec.img}"
        class="w-10 h-10 object-cover rounded-md" alt="">
    <span class="ml-4 font-semibold text-sm">${productoSelec.nombre}</span>
    </div>
    <div class="w-32 flex justify-between" >
        <span class="px-3 py-1 rounded-md bg-gray-300 cursor-pointer restarbtn"  >-</span>
        <span class="font-semibold mx-4" id="cantidad${productoSelec.id}">${productoSelec.cantidad}</span>
        <span class="px-3 py-1 rounded-md bg-gray-300 cursor-pointer sumarbtn" >+</span>
    </div>
    <div class="font-semibold text-lg w-16 text-center text-sm">
        $${productoSelec.precio}
    </div>`   ;              
    compra.appendChild(divCompra);
        
    } 

    restarBtns= document.getElementsByClassName('restarbtn');
    sumarBtns= document.getElementsByClassName('sumarbtn');
    
    } 
    if( compra.innerHTML == ""){
        compra.innerHTML = 'Tu carrito está vacio';
    }
      
//callbacks restar y sumar
restarCant(restarBtns);
sumarCant(sumarBtns)   
    
}

//ACTUALIZAR PRECIO 
const actualizarPrecio = (precio, operacion) => {  
     
    operacion == 'suma' ?  subtotal += parseInt(precio) :
    operacion == 'resta' ?  subtotal -= parseInt(precio) :
      subtotal = 0;     
    envio = 100;
    document.getElementById('subtotal').innerHTML = `$ ${subtotal}`;
    document.getElementById('envio').innerHTML = `$ ${envio}`;
    total = subtotal + envio;
    document.getElementById('total').innerHTML = `$ ${total}`;
}

//RESTAR CANTIDD EN CARRITO CON BOTON -
const restarCant = (restarBtns) => {         
    for( const restarBtn of restarBtns ) {
      
        restarBtn.onclick = () => {
            const id = restarBtn.parentNode.parentNode.id.slice(6);           
            let index = carrito.findIndex(prodcarrito => prodcarrito.id == id); 
           
           
            if( carrito[index].cantidad > 0){
                carrito[index].cantidad --; 
                document.getElementById(`cantidad${id}`).innerHTML = carrito[index].cantidad;
                actualizarPrecio(carrito[index].precio, 'resta')  
                  
                agregarCompraUI(carrito);
                guardarLocal('Carrito', JSON.stringify(carrito));
            }
        } 
    }

}

//SUMAR CANTIDAD EN CARRITO CON BOTON +
const sumarCant = (sumarBtns) => {         
    for( const sumarBtn of sumarBtns ) {
        sumarBtn.onclick = () => {
            const id = sumarBtn.parentNode.parentNode.id.slice(6);
            let index = carrito.findIndex(prodcarrito => prodcarrito.id == id); 
            carrito[index].cantidad ++; 
            document.getElementById(`cantidad${id}`).innerHTML = carrito[index].cantidad;
            actualizarPrecio(carrito[index].precio, 'suma')         
            agregarCompraUI(carrito);
            guardarLocal('Carrito', JSON.stringify(carrito));
        } 
    }

}

//GUARDAR EN LOCALSTORAGE
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor )};


// CAMBIAR COLOR FONDO BOTON FILTRO
const cambiarBackground = (categoria) => {
    for( const filtro of filtros ){
    filtro.id ==categoria ? filtro.classList.add('bg-yellow-500') : filtro.classList.remove('bg-yellow-500')
}
}