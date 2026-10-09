
        let count = 0;
        let cartCount = 0;

        function wishlist(){
        count++;
        const wishlistTracker = document.getElementById("tracker").textContent = count; 

        console.log(wishlistTracker);
        console.log("Added");
        }

        function addtocart(){
             
        cartCount++;
        document.getElementById("cart-tracker").textContent = cartCount;
        }