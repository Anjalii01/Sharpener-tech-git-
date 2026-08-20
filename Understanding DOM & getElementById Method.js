let heading = document.getElementById("main-heading");

heading.textContent = "Fruit World";
heading.style.color = "orange";

let header = document.getElementById("header");

header.style.backgroundColor = "green";
header.style.borderBottom = "2px solid orange";

let basketHeading = document.getElementById("basket-heading");

basketHeading.style.color = "green";

let thanks = document.getElementById("thanks");

let paragraph = document.createElement("p");
paragraph.textContent = "Please visit us again";

thanks.appendChild(paragraph);