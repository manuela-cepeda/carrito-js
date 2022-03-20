// declaracion clase
class Producto {
    constructor (id, nombre, precio, descripcion, img, cantidad, categoria) {        
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;        
        this.descripcion = descripcion;    
        this.img = img;  
        this.cantidad = cantidad;
        this.categoria = categoria;
    }
    addCantidad(){
        this.cantidad++;                
    } 
}


