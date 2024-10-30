// carrito_compras.js

document.addEventListener('DOMContentLoaded', () => {
    // Manejo de botones de incrementar y decrementar
    const incrementButtons = document.querySelectorAll('.incrementar');
    const decrementButtons = document.querySelectorAll('.decrementar');
    const counters = document.querySelectorAll('.numero');

    incrementButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let count = parseInt(counters[index].textContent);
            counters[index].textContent = count + 1;
            actualizarTotal();
        });
    });

    decrementButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let count = parseInt(counters[index].textContent);
            if (count > 0) {
                counters[index].textContent = count - 1;
                actualizarTotal();
            }
        });
    });

    // Manejo de "Seleccionar Todo"
    const seleccionarTodoCheckbox = document.getElementById('seleccionarTodo');
    const productoCheckboxes = document.querySelectorAll('.checkbox');

    seleccionarTodoCheckbox.addEventListener('change', () => {
        productoCheckboxes.forEach(checkbox => {
            checkbox.checked = seleccionarTodoCheckbox.checked;
        });
        actualizarSeleccionados();
    });

    productoCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', actualizarSeleccionados);
    });

    function actualizarTotal() {
        let total = 0;
        document.querySelectorAll('.producto-item').forEach((item, index) => {
            const precio = parseInt(item.querySelector('.precio').getAttribute('data-precio'));
            const cantidad = parseInt(item.querySelector('.numero').textContent);
            total += precio * cantidad;
        });
        document.getElementById('contadorTotal').textContent = `$${total}`;
    }

    function actualizarSeleccionados() {
        let seleccionados = 0;
        productoCheckboxes.forEach(checkbox => {
            if (checkbox.checked) seleccionados++;
        });
        document.getElementById('totalSeleccionados').textContent = `(${seleccionados})`;
    }
});


let cart = [];
let cartCount = 0;

// Escuchar cambios en todos los checkboxes
document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const product = this.getAttribute('data-producto');
        if (this.checked) {
            addToCart(product);
        } else {
            removeFromCart(product);
        }
    });
});

function addToCart(product) {
    cart.push(product);
    cartCount++;
    updateCartCount();
    
}

function removeFromCart(product) {
    const index = cart.indexOf(product);
    if (index > -1) {
        cart.splice(index, 1);  // Remueve el producto del carrito
        cartCount--;
        updateCartCount();
        
    }
}

function updateCartCount() {
    const cartCount = cart.length;
    document.querySelector('.cart-count').innerText = `Productos: ${cartCount}`;
}


document.addEventListener('DOMContentLoaded', () => {
    // Manejo de botones de incrementar y decrementar
    const incrementButtons = document.querySelectorAll('.incrementar');
    const decrementButtons = document.querySelectorAll('.decrementar');
    const counters = document.querySelectorAll('.numero');

    incrementButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let count = parseInt(counters[index].textContent);
            counters[index].textContent = count++;
            actualizarTotal();
        });
    });

    decrementButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let count = parseInt(counters[index].textContent);
            if (count > 0) {
                counters[index].textContent = count--;
                actualizarTotal();
            }
        });
    });

    // Función para actualizar el precio total
    function actualizarTotal() {
        let total = 0;
        const productos = document.querySelectorAll('.producto');
    
        productos.forEach((producto, index) => {
            const cantidad = parseInt(producto.querySelector('.numero').textContent);
            const precio = parseFloat(producto.querySelector('.precio').dataset.precio);
    
            console.log(`Cantidad: ${cantidad}, Precio: ${precio}`); // Debugging line
    
            total += cantidad * precio;
        });
    
        document.getElementById('contadorTotal').textContent = `($${total.toLocaleString('es-CO')})`;
    }
    

    // Inicialización del total en caso de que ya haya cantidades cargadas
    actualizarTotal();
});

// BORRAR PRODUCTO
function confirmarBorrado(event) {
    event.preventDefault();
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás deshacer esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo',
        cancelButtonText: 'Ya no'
    }).then((result) => {
        if (result.isConfirmed) {
            // Aquí puedes eliminar el producto del DOM
            event.target.closest('.producto-item').remove();
            actualizarTotal();
        }
    });
}




