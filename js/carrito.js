document.addEventListener("DOMContentLoaded", function () {
    // Recuperamos el carrito desde localStorage o lo iniciamos vacío
    let carrito = JSON.parse(localStorage.getItem("carrito") || []);

    // Función para renderizar los producotos del carrito
    function renderCarrito() {
        const contenedorCarrito = document.getElementById("carrito-container");
        const contenedorTotal = document.getElementById("total-container");

        // Si el carrito está vacío
        if (carrito.length === 0) {
            // Mostramos mensaje
            let mensaje = document.createElement("p");
            mensaje.textContent = "El carrito está vacío";
            contenedorCarrito.appendChild(mensaje)
        } else {
            // Mostramos el contenido del carrito
            for (const producto of carrito) {
                // Capturamoms los elementos del HTML
                let article = document.createElement("article");
                let titulo = document.createElement("h2");
                let precio = document.createElement("p");
                let imagen = document.createElement("img");

                titulo.textContent = producto.title;
                precio.textContent = `$${producto.price}`;
                imagen.src = producto.images[0];
                imagen.alt = producto.title;

                // Asignamos CSS
                article.classList.add("producto-card");
                titulo.classList.add("producto-titulo");
                precio.classList.add("producto-precio");
                imagen.classList.add("producto-imagen");

                article.appendChild(imagen);
                article.appendChild(titulo);
                article.appendChild(precio);

                contenedorCarrito.appendChild(article);
            }

            // Calculamos y mostramos el total
            calcularTotal();
        }

        // Función para calcular el total a pagar
        function calcularTotal() {
            let total = 0;
            for (const producto of carrito) {
                total += producto.price
            }

            const totalPagar = document.getElementById("total-pagar");
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