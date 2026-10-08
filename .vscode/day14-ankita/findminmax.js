  let arr = [];

        arr.push(Math.floor(Math.random() * 100));
        arr.push(Math.floor(Math.random() * 100));
        arr.push(Math.floor(Math.random() * 100));
        arr.push(Math.floor(Math.random() * 100));
        arr.push(Math.floor(Math.random() * 100));
        arr.push(Math.floor(Math.random() * 100));
        arr.push(Math.floor(Math.random() * 100));
        arr.push(Math.floor(Math.random() * 100));

        console.log("Random numbers are", arr);

        let max = arr[0];
        let min = arr[0];

        for (let i = 1; i < arr.length; i++) {

            if (arr[i] > max) {
                max = arr[i];
            }

            if (arr[i] < min) {
                min = arr[i];
            }
        }

        console.log("Maximum number is", max);
        console.log("Minimum number is", min);
