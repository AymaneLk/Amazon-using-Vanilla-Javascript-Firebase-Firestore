let mainProductEl = document.querySelector('.main-product');
let cartItemNbr = document.querySelector('.cart-item-nbr');

/** GETTING DATA FROM FIREBASE **/
function getItemsfromDatabase() {
    let items = [];
    db.collection('items').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                brand: doc.data().brand,
                rating: doc.data().rating,
                price: doc.data().price
            });
        })
        renderItems(items);
    })
}

/** Adding data to the database **/
function addToCart(item) {
    // NAVIGATING TO THE ITEM IN cart-items COLLECTION
    let cartItems = db.collection('cart-items').doc(item.id);
    // GETTING THE DOCUMENT WHICH HAS THE ID 
    cartItems.get()
    // THEN CHECKING IF IT EXISTS OR NOT
    .then(doc => {
        if(doc.exists) {
            cartItems.update({
                quantity: doc.data().quantity + 1
            });
        } else {
            cartItems.set({
                image: item.image,
                name: item.name,
                brand: item.brand,
                rating: item.rating,
                price: item.price,
                quantity: 1
            })
        }
    })
}

/** Rendering Data in the DOM **/
function renderItems(items) {
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add("product-details", "my-4")
        doc.innerHTML = `
            <div class="product-details my-4">
                <!-- PRODUCT IMAGE -->
                <div class="product-image w-48 h-52 bg-white rounded-lg 
                flex items-center justify-center">
                    <img src="${item.image}" 
                    class="p-4" alt="">
                </div>
                <!-- PRODUCT NAME -->
                <div class="product-name text-gray-700 font-bold mt-2 text-sm">
                    ${item.name}
                </div>
                <!-- PRODUCT BRAND -->
                <div class="product-brand text-green-700 font-bold">
                    ${item.brand}
                </div>
                <!-- PRODUCT RATING -->
                <div class="product-rating text-yellow-300 my-1">
                    ⭐⭐⭐⭐${item.rating}
                </div>
                <!-- PRODUCT PRICE -->
                <div class="product-price font-bold text-gray-700 text-lg">
                    ${numeral(item.price).format('$0,0.00')}
                </div>
            </div>
        `
        let addToCartEl = document.createElement('div');
        addToCartEl.classList.add('add-to-cart-btn', 'flex', 'justify-center', 'items-center', 'text-gray-100', 
        'font-bold', 'h-8', 'w-40', 'bg-yellow-500', 'rounded', 'mt-1', 'hover:bg-yellow-600');
        addToCartEl.textContent = "Add to Cart";
        addToCartEl.addEventListener('click', () => {
            addToCart(item);
        })
        doc.append(addToCartEl);
        mainProductEl.append(doc);
    });
}

getItemsfromDatabase();