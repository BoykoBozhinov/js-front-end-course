function attachEvents() {

    const BASE_URL = 'http://localhost:3030/jsonstore/grocery/';
    let products = [];
    let findProduct = {};
    let allDomInputs = {
        product: document.getElementById('product'),
        count: document.getElementById('count'),
        price: document.getElementById('price')
    }

    let otherDom = {
        addProductsBtn: document.getElementById('add-product'),
        updateProductBtn: document.getElementById('update-product'),
        loadProductsBtn: document.getElementById('load-product'),
        tableBody: document.getElementById('tbody'),
        form: document.querySelector('.list')
    }

    otherDom.loadProductsBtn.addEventListener('click', loadPorductsHandler);
    otherDom.addProductsBtn.addEventListener('click', addProductHandler);
    otherDom.updateProductBtn.addEventListener('click', updateProductHandler);

    function updateProductHandler(event) {
        if (event) {
            event.preventDefault();
        }

        const {product, count, price} = allDomInputs;

        let productToEdit = JSON.stringify({
            product: product.value,
            count: count.value,
            price: price.value
        });

        let headers = {
            method: 'PATCH',
            body: productToEdit
        }

        fetch(`${BASE_URL}${findProduct._id}`, headers)
        .then(() => {
            loadPorductsHandler();
            otherDom.addProductsBtn.disabled = false;
            otherDom.updateProductBtn.disabled = true;
            otherDom.form.reset();
        })
    }

    function addProductHandler(event) {
        if (event) {
            event.preventDefault();
        }

        const { product, count, price } = allDomInputs;
        let isEmptyField = Object.values(allDomInputs).every((input) => input.value !== '');
        if (!isEmptyField) {
            return;
        }
        let newProduct = JSON.stringify({
            product: product.value,
            count: count.value,
            price: price.value
        });

        let headers = {
            method: 'POST',
            body: newProduct
        };

        fetch(BASE_URL, headers)
        .then(() =>  {
            loadPorductsHandler();
            otherDom.form.reset();
        })
    }

    function loadPorductsHandler(event) {
        
        if (event) {
            event.preventDefault();
        }

        otherDom.tableBody.innerHTML = '';

        fetch(BASE_URL)
        .then((res) => res.json())
        .then((productsData) => {
            products = Object.values(productsData);
            for (let {product, count, price, _id} of products) {
                let tableRow = createElement('tr', otherDom.tableBody);
                tableRow.id = _id;
                createElement('td', tableRow, `${product}`, ['name']);
                createElement('td', tableRow, `${count}`, ['count-product']);
                createElement('td', tableRow, `${price}`, ['product-price']);
                let btnContainer = createElement('td', tableRow, '', ['btn']);
                let updateBtn = createElement('button', btnContainer, 'Update', ['update']);
                let deleteBtn = createElement('button', btnContainer, 'Delete', ['delete']);

                deleteBtn.addEventListener('click', deleteProductHandler);
                updateBtn.addEventListener('click', loadUpdateProductFormHandler);
            }
        })
    }

    function loadUpdateProductFormHandler() {
        let id = this.parentNode.parentNode.id;
      
        findProduct = products.find((p) => p._id === id);

        for (let key in allDomInputs) {
            allDomInputs[key].value = findProduct[key];
        }

        otherDom.updateProductBtn.disabled = false;
        otherDom.addProductsBtn.disabled = true;
    }

    function deleteProductHandler() {
        let id = this.parentNode.parentNode.id;

        fetch(`${BASE_URL}${id}`, { method: 'DELETE' })
        .then(() => loadPorductsHandler())
        .catch((err) => {
            console.log(err);
        })
        
    }

    function createElement(type, parentNode, content, classes, id, attributes, innerHtml) {

        let htmlElement = document.createElement(type);

        if (content && innerHtml) {
            htmlElement.innerHTML = content;
        } else {

            if (content && type !== 'input') {
                htmlElement.textContent = content;
            }

            if (content && type === 'input') {
                htmlElement.value = content;
            }

        }

        if (classes && classes.length > 0) {
            htmlElement.classList.add(...classes);
        }

        if (id) {
            htmlElement.id = id;
        }

        if (attributes) {
            for (key in attributes) {
                htmlElement[key] = attributes[key];
            }
        }

        if (parentNode) {
            parentNode.appendChild(htmlElement);
        }

        return htmlElement;
    }
}

attachEvents();