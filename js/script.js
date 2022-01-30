const toTopBtn = document.querySelector(".to-top");

toTopBtn.onclick = function () {
    console.log("ankit")
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

