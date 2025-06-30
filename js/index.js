// Esperamos que todo el contenido del DOM cargue antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    // Recuperamos el carrito guardado en localStorage o iniciamos uno vacío
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Función para renderizar los productos en pantalla
    const renderProducts = () => {
        // Solicitamos los datos a la API -> promesa
        fetch("https://dummyjson.com/products/category/smartphones?limit=8")
        .then((res) => res.json()) // Esperamos promesa -> covertimos a js
        .then((data)=> {
            // Obtenemos el contenedor donde vamos a insertar los productos
            let contenedorProductos = document.getElementById("productos-container");

            // Recorremos cada producto recibido de la API
            for (const producto of data.products){
                // Capturamoms los elementos del HTML
                let article = document.createElement("article");
                let titulo = document.createElement("h2");
                let precio = document.createElement("p");
                let imagen = document.createElement("img");
                let btnAgregar = document.createElement("button");
                
                // Asignamos el contenido de producto y botón
                titulo.textContent = producto.title;
                precio.textContent = `$${producto.price}`;
                imagen.src = producto.images[0];
                imagen.alt = producto.title;
                btnAgregar.textContent = "Agregar al Carrito";

                // Agregamos las clases del CSS
                article.classList.add("producto-card");           
                titulo.classList.add("producto-titulo");          
                precio.classList.add("producto-precio");         
                imagen.classList.add("producto-imagen");          
                btnAgregar.classList.add("boton-agregar");  

                // Armamos la tarjeta agregando cada elemento dentro del <article>
                article.appendChild(imagen);
                article.appendChild(titulo);
                article.appendChild(precio);
                article.appendChild(btnAgregar);
                
                // Agregamos la tarjeta al contenedor de productos
                contenedorProductos.appendChild(article);
                
                // Agregamos evento al botón 
                btnAgregar.addEventListener("click", () => {
                    alert(`${producto.title} agregado al carrito`)
                    agregarProducto(producto); // Guardamos el producto en el carrito
                    actualizarContador(); // Actualiamos cantidad de items
                })
            }
        })
        
        // Si se produce un error -> mostramos en consola
        .catch((err)=>console.log(`Se ha producido un error: ${err}`));
    };
    // Actualiza el número de items en el header
    function actualizarContador() {
        const contador = document.getElementById("cantidad-carrito");
        contador.textContent = carrito.length;
    }
   
    // Agregamos producto al array y guardmaos en el localStorage
    function agregarProducto(producto){
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    
    renderProducts();
    actualizarContador();
});
