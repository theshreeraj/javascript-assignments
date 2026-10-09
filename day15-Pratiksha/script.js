let count=0;
        function addToWishlist(){
            count++;
            console.log("Added");
            const getwishlistTracker = document.getElementById("wishlist-tracker").textContent = count;
            console.log(getwishlistTracker)
        }

let count2=0;
        function addToCart(){
            count2++;
            console.log("Added");
            const getCartTracker = document.getElementById("cart-tracker").textContent = count2;
            console.log(getCartTracker)
        }