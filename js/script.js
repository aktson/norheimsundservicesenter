const toTopBtn = document.querySelector(".to-top");

toTopBtn.onclick = function () {
    console.log("ankit")
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

// page on load loader function
// const loader = document.querySelector(".loader");
// const main = document.querySelector("main");

// document.onreadystatechange = function () {
//     if (document.readyState !== "complete") {

//         loader.style.visibility = "visible"
//         main.style.display = "none";
//     } else {
//         loader.style.display = "none";
//         main.style.display = "block"

//     }
// }