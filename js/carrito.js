document.addEventListener("DOMContentLoaded", function () {
    // Recuperamos el carrito desde localStorage o lo iniciamos vacío
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

    // Función para renderizar los producotos del carrito
    function renderCarrito() {
        const contenedorCarrito = document.getElementById("carrito-container");
        const totalPagar = document.getElementById("total-pagar");
        const contador = document.getElementById("cantidad-carrito");
        const contenedorBotones = document.querySelector(".carrito-botones");

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
            // Ocultamos los botones si el carrito está vacío
            contenedorBotones.style.display = "none";

            return;
        } else {
            // Si no esta vacio -> mostramos los botones de vaciado y finalizar y luego renderizamos los productos
            contenedorBotones.style.display = "flex";
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
                    eliminarProducto(index);
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

    function eliminarProducto(index) {
        if (confirm("¿Está seguro que desea eliminar el producto del carrito?")) {
            // Eliminamos del carrito
            carrito.splice(index, 1);
            // Actualizamos el localStorate
            localStorage.setItem("carrito", JSON.stringify(carrito));
            // Actualizamos
            renderCarrito();
        }
    }

    // Vaciar Carrito
    const btnVaciar = document.getElementById("vaciar-carrito");
    btnVaciar.addEventListener("click", () => {
        if (confirm("¿Está seguro que desea vaciar el carrito?")) {
            carrito = [];
            localStorage.removeItem("carrito");
            renderCarrito();
        }
    })

    // Finalizar compra
    const btnFinalizar = document.getElementById("finalizar-compra")
    btnFinalizar.addEventListener("click", () => {
        // Comprobamos que el carrito esté vacío si no lo está terminamos la compra
        if (carrito.length === 0) {
            alert("El carrito está vacío.")
        } else if (confirm("¿Desea finalizar la compra?")) {
            alert("¡Gracias por su compra!")
            carrito = [];
            localStorage.removeItem("carrito");
            window.location.href = "../index.html";
        }
    })

    renderCarrito();
    actualizarContador();
})