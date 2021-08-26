/** Getting the quantity from the database firestore */
function getCartItems() {
    db.collection("cart-items").onSnapshot((snapshot) => {
        let totalCount = 0;
        snapshot.docs.forEach((doc) => {
            totalCount += doc.data().quantity;
        });
        setCartCounter(totalCount);
    })
}

function setCartCounter(totalCount) {
    document.querySelector(".cart-item-nbr").textContent = totalCount;
}

getCartItems();