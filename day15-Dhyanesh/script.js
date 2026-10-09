let count = 0;
let cartCount = 0;
function addToWishlist() {
  count++;
  console.log("added");
  const getWishListTracker = (document.getElementById(
    "countTracker",
  ).textContent = count);
}


function addToCart(){
    cartCount++;
    console.log("add to cart")
    document.getElementById("cartTracker").textContent = cartCount
}