document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://fakestoreapi.com/products';
    const productsContainer = document.getElementById('products');
    const category = document.body.getAttribute('data-category'); // Obtener la categoría desde el atributo data-category
    const categorySelect = document.getElementById('categorySelect'); // Selector de categoría
    const searchInput = document.getElementById('searchInput'); // Campo de búsqueda de productos
    const cartContainer = document.querySelector('#lista-carrito tbody'); // Contenedor del carrito
    const totalAmount = document.getElementById('total'); // Total del carrito
    const emptyCartButton = document.getElementById('vaciar-carrito'); // Botón de vaciar carrito
    const notificationContainer = document.getElementById('notification-container'); // Contenedor de notificaciones

    let cart = [];

    if (category) {
        // Si hay una categoría definida, obtener los productos de esa categoría
        axios.get(`${API_URL}/category/${category}`)
            .then(response => {
                const products = response.data;
                displayProducts(products);
            })
            .catch(error => console.error(error));
    } else {
        // Si no hay categoría definida, obtener todos los productos
        axios.get(API_URL)
            .then(response => {
                const products = response.data;
                displayProducts(products);
                populateCategories(products); // Poblar el selector de categorías con las categorías obtenidas
            })
            .catch(error => console.error(error));
    }

    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <a href="product.html?id=${product.id}" class="stretched-link">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        </a>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>$${product.price}</strong></p>
                            <button class="btn add-to-cart mt-auto" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.insertAdjacentHTML('beforeend', productCard);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    function addToCart(event) {
        const button = event.target;
        const productId = button.getAttribute('data-id');
        axios.get(`${API_URL}/${productId}`)
            .then(response => {
                const product = response.data;
                addItemToCart(product);
                showNotification('Product added to cart'); // Mostrar notificación
            })
            .catch(error => console.error(error));
    }

    function addItemToCart(product) {
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';
        cart.forEach(product => {
            const cartRow = document.createElement('tr');
            cartRow.innerHTML = `
                <td><img src="${product.image}" width="50"></td>
                <td>${product.title}</td>
                <td>$${product.price}</td>
                <td>${product.quantity}</td>
                <td><button class="btn btn-danger btn-sm remove-item" data-id="${product.id}">X</button></td>
            `;
            cartContainer.appendChild(cartRow);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItemFromCart);
        });

        updateTotal();
    }

    function removeItemFromCart(event) {
        const button = event.target;
        const productId = button.getAttribute('data-id');
        cart = cart.filter(product => product.id != productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function updateTotal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        totalAmount.textContent = `Total: $${total.toFixed(2)}`;
    }

    emptyCartButton.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    });

    function populateCategories(products) {
        const categories = [...new Set(products.map(product => product.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value;
        axios.get(API_URL)
            .then(response => {
                const products = response.data;
                const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);
                displayProducts(filteredProducts);
            })
            .catch(error => console.error(error));
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        axios.get(API_URL)
            .then(response => {
                const products = response.data;
                const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
                displayProducts(filteredProducts);
            })
            .catch(error => console.error(error));
    });

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;

        notificationContainer.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        renderCart(savedCart);
    }
});
