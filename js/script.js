
export function takeToTop() {

    const toTopBtn = document.querySelector(".to-top");

    toTopBtn.onclick = function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }
}


