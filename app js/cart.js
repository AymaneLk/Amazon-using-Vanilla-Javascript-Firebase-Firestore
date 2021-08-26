function getCartItems() {
    db.collection('cart-items').onSnapshot(snapshot => {
        let cartItems = [];
        snapshot.docs.forEach(doc => {
            cartItems.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                brand: doc.data().brand,
                rating: doc.data().rating,
                price: doc.data().price,
                quantity: doc.data().quantity
            })
        })
        renderProductCmd(cartItems);
        getTotalCost(cartItems);
    })
}

function renderProductCmd(cartItems) {
    let itemsHTML = "";
    cartItems.forEach(item => {
        itemsHTML += `
            <!-- ITEM 1 -->
            <div class="cart-item flex items-center pb-4 border-b border-gray-100">
                <div class="cart-item-img w-48 h-42 p-4">
                    <img src="${item.image}" 
                    alt="" class="h-full w-full object-contain"> 
                </div>
                <div class="item-details flex-grow">
                    <div class="cart-item-title font-bold text-sm text-gray-600">
                        ${item.name}
                    </div>
                    <div class="cart-item-title text-sm text-gray-400">
                        ${item.brand}
                    </div>
                </div>
                <div class="item-counter w-48 flex items-center">
                    <div data-id=${item.id} class="decrease-btn chevron-left h-6 w-6 flex justify-center items-center cursor-pointer text-gray-400 bg-gray-100 rounded hover:bg-gray-400 hover:text-black">
                        <i class="fas fa-chevron-left fa-xs"></i>
                    </div>
                    <h4 class="text-gray-400 px-5">x${item.quantity}</h4>
                    <div data-id=${item.id} class="increase-btn chevron-right h-6 w-6 flex justify-center items-center cursor-pointer text-gray-400 bg-gray-100 rounded hover:bg-gray-400 hover:text-black">
                        <i class="fas fa-chevron-right fa-xs"></i>
                    </div>
                </div>
                <div class="item-total-cost w-48 font-bold text-gray-400">
                    ${numeral(item.price * item.quantity).format('0,0.00')}
                </div>
                <div data-id=${item.id} class="cart-item-delete cursor-pointer w-10 font-bold text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        `
    })
    document.querySelector('.cart-items').innerHTML = itemsHTML;
    addEventListeners();
}

/** ADDING EVENT LISTENERS TO LEFT & RIGHT CHEVRONS**/
function addEventListeners() {
    let decreaseButtons = document.querySelectorAll('.decrease-btn');
    let increaseButtons = document.querySelectorAll('.increase-btn');
    let deleteButtons = document.querySelectorAll('.cart-item-delete');

    // EVENTLISTENERS FOR DECREASE BUTTONS
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            decreaseCount(button.dataset.id);
        })
    })
    // EVENTLISTENERS FOR INCREASE BUTTONS
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            increaseCount(button.dataset.id);
        })
    })
    //EVENTLISTENERS FOR DELETE BUTTONS 
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            deleteItem(button.dataset.id);
        })
    })

} 

function decreaseCount(itemId) {
    // CALLING FOR THE DOCUMENT
    let cartItem = db.collection('cart-items').doc(itemId)
    // GETTING DOCUMENT THEN CHECKING IF IT EXISTS
    cartItem.get().then(doc => {
        if(doc.exists) {
            if(doc.data().quantity > 1) {
                cartItem.update({
                    quantity: doc.data().quantity - 1
                });
            }
        }
    })
}

function increaseCount(itemId) {
    // CALLING FOR THE DOCUMENT
    let cartItem = db.collection('cart-items').doc(itemId)
    //GETTING DOCUMENT THEN CHECKING IF IT EXISTS
    cartItem.get().then(doc => {

        if(doc.exists) {
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        }
    })
}

function deleteItem(itemId) {
    db.collection('cart-items').doc(itemId).delete();
}

function getTotalCost(items) {
    let totalCost = 0;
    items.forEach(item => {
        totalCost += (item.price * item.quantity);
    })
    document.querySelector('.total-cost-nbr').textContent = numeral(totalCost).format('$0,0.00');
}

getCartItems();