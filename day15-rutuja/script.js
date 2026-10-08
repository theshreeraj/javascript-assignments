let count = 0
let cartcount = 0
function addToWishlist() {
    console.log("added");
    count++;
    const getwishlisttracker = document.getElementById("wishlist-tracker").textContent = count;
    console.log(getwishlisttracker);
}

function addToCart() {
    cartcount++;
    document.getElementById("cart-tracker").textContent = cartcount;


}