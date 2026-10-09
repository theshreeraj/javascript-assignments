let count = 0;
let count2= 0;

function addToWishlist() {
    count++;
    document.getElementById("wishlist-tracker").textContent = count;
    console.log("Added");
}

function AddToCard(){
    count2++;
    document.getElementById("AddToCard-tracker").textContent = count2;
}