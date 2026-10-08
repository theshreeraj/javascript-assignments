  let count = 1
        function addToWishList()
        {
          
            count++;
            const getWishlistTracker = document.getElementById("wishlist-tracker").textContent=count;
            console.log(getWishlistTracker)
            console.log("added")
        }

        function addtocart()
        {
            count++;
            const getcardadder = document.getElementById("cart-added").textContent=count;
            console.log(getcardadder)
            console.log("added")
        }   