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
// const spinner = document.querySelector("#spinner");
// const body = document.querySelector("body");

// document.onreadystatechange = function () {
//     if (document.readyState !== "complete") {
//         spinner.style.visibility = "visible";
//         body.style.display = "none";
//     } else {
//         spinner.style.display = "none";
//         body.style.display = "block"
//     }
// }

