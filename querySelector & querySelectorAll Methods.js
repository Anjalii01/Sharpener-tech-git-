let basketHeading = document.querySelector("#basket-heading");
basketHeading.style.color = "brown";

let fruits = document.querySelectorAll(".fruit");

for (let i = 0; i < fruits.length; i++){
    if ((i + 1) % 2 == 0) {
        fruits[i].style.backgroundColor = "brown";
        fruits[i].style.color = "white";
    }
}

let fruitList = document.querySelector(".fruits");
fruitList.style.listStyle = "none";