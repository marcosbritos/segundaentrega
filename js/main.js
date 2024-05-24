const productos = [
    { codigo: 1, tipo: 'Auto Compacto', precio: 15000 },
    { codigo: 2, tipo: 'Sedán', precio: 35000 },
    { codigo: 3, tipo: 'SUV', precio: 27000 },
    { codigo: 4, tipo: 'Camioneta', precio: 18000 },
    { codigo: 5, tipo: 'Convertible', precio: 22000 },
    { codigo: 6, tipo: 'Deportivo', precio: 29000 },
    { codigo: 7, tipo: 'Híbrido', precio: 31000 }
];

const mensajeInicial = "POR FAVOR, SELECCIONA EL CÓDIGO DEL AUTO QUE DESEAS COMPRAR:\n" +
    productos.map(producto => `${producto.codigo}. ${producto.tipo} - $${producto.precio}`).join('\n');

let carritoDeCompras = [];

function buscarProductoPorCodigo(codigo) {
    return productos.find(producto => producto.codigo === parseInt(codigo));
}

function mostrarCarrito() {
    console.table(carritoDeCompras);
}

class Compra {
    constructor(carrito) {
        this.carrito = carrito;
    }

    obtenerSubtotal() {
        return this.carrito.reduce((acc, producto) => acc + producto.precio, 0);
    }
}

function finalizarCompra() {
    if (carritoDeCompras.length > 0) {
        const compraActual = new Compra(carritoDeCompras);

        let costoMantenimiento = 0;
        let deseaMantenimiento = confirm("¿Deseas añadir un paquete de mantenimiento adicional por un año por $40000?");
        if (deseaMantenimiento) {
            costoMantenimiento = 40000;
        }

        let costoSeguro = 0;
        let deseaSeguro = confirm("¿Deseas añadir seguro por $50000?");
        if (deseaSeguro) {
            costoSeguro = 50000;
        }

        let total = compraActual.obtenerSubtotal() + costoMantenimiento + costoSeguro;
        console.log(`Total a pagar: $${total}`);

        if (deseaMantenimiento) {
            console.log(`Paquete de Mantenimiento (1 año): $${costoMantenimiento}`);
        }

        if (deseaSeguro) {
            console.log(`Seguro: $${costoSeguro}`);
        }

        let confirmaPago = confirm("¿Confirmas el pago?");
        if (confirmaPago) {
            alert(`El pago de $${total} ha sido exitoso ✅\n¡Gracias por tu compra! 🚗`);
            carritoDeCompras = [];
        }
    } else {
        console.warn("No hay autos en el carrito.");
    }
}

function comprarProducto() {
    let codigo = prompt(mensajeInicial);
    if (!parseInt(codigo)) {
        alert("❌ Código no válido. Ingresa un código correcto.");
        let intentarDeNuevo = confirm("¿Quieres intentarlo de nuevo?");
        if (intentarDeNuevo) {
            comprarProducto();
        }
        return;
    }

    let productoSeleccionado = buscarProductoPorCodigo(codigo);
    if (productoSeleccionado !== undefined) {
        alert(`El ${productoSeleccionado.tipo} ha sido añadido al carrito.\nPrecio $${productoSeleccionado.precio}`);
        carritoDeCompras.push(productoSeleccionado);
        let deseaLlevarOtroProducto = confirm("¿Te gustaría añadir otro auto?");
        if (deseaLlevarOtroProducto) {
            comprarProducto();
        } else {
            finalizarCompra();
        }
    } else {
        alert("❌ Código no válido. Ingresa un código correcto.");
        let intentarDeNuevo = confirm("¿Quieres intentarlo de nuevo?");
        if (intentarDeNuevo) {
            comprarProducto();
        }
    }
}

comprarProducto();
