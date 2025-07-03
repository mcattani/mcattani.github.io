document.addEventListener("DOMContentLoaded", function () {
    // Recuperamos el carrito desde localStorage o lo iniciamos vacío
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

    // Función para renderizar los producotos del carrito
    function renderCarrito() {
        const contenedorCarrito = document.getElementById("carrito-container");
        const totalPagar = document.getElementById("total-pagar");
        const contador = document.getElementById("cantidad-carrito");

        contenedorCarrito.innerHTML = "";
        console.log("Contenido actual del carrito:", carrito);

        // Si el carrito está vacío
        if (carrito.length === 0) {
            // Mostramos mensaje
            const mensaje = document.createElement("p");
            mensaje.textContent = "El carrito está vacío.";
            contenedorCarrito.appendChild(mensaje);
            totalPagar.textContent = "$0";
            contador.textContent = "0";
            return;
        } else {
            // Si no esta vacio -> renderizamos los productos
            carrito.forEach((producto, index) => {
                const item = document.createElement("article");
                item.classList.add("producto-card");

                const titulo = document.createElement("h2");
                titulo.classList.add("producto-titulo");
                titulo.textContent = producto.title;

                const precio = document.createElement("p");
                precio.classList.add("producto-precio");
                precio.textContent = `$${producto.price}`;

                const imagen = document.createElement("img");
                imagen.classList.add("producto-imagen");
                imagen.src = producto.images[0];
                imagen.alt = producto.title;

                const btnEliminar = document.createElement("button");
                btnEliminar.textContent = "Eliminar";

                // Evento del btnElimiar
                btnEliminar.addEventListener("click", () => {
                    alert(`${producto.title} ha sido eliminado`)
                })

                item.appendChild(imagen);
                item.appendChild(titulo);
                item.appendChild(precio);
                item.appendChild(btnEliminar);


                contenedorCarrito.appendChild(item);

            });

            // Calculamos y mostramos el total
            calcularTotal();
        }

        // Función para calcular el total a pagar
        function calcularTotal() {
            let total = 0;
            for (const producto of carrito) {
                total += producto.price
            }

            totalPagar.textContent = `$${total}`
        }


    }

    function actualizarContador() {
        const contador = document.getElementById("cantidad-carrito");
        contador.textContent = carrito.length;
    }


    renderCarrito();
    actualizarContador();
})