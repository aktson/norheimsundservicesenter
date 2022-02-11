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

const carouselInner = document.querySelector("#carousel-inner");
const postsEmbedUrl = "http://localhost/norhss/wp-json/wp/v2/posts/?_embed";

async function fetchPosts() {
    const response = await fetch(postsEmbedUrl);
    const data = await response.json();
    data.forEach(item => {
        createHtml(item)
        console.log(item)
    });
}
fetchPosts()

function createHtml(result) {

    const image = result._embedded["wp:featuredmedia"][0].source_url;

    carouselInner.innerHTML += ` 
    <div class="carousel-item " data-bs-interval="10000" >
        <div class="ratio ratio-16x9" style="height:70vh;background:url('${image}')  center / cover no-repeat;background-color: rgba(0,0,0,0.3); background-blend-mode: overlay;">
            </div>
        <div class="carousel-caption d-none d-md-block  p-4 " style="background-color:rgba(0,0,0,0.6); width: 50%; margin: 0 auto;">
        <h3 class="fs-1 mb-3">${result.title.rendered} </h3>
        <p class="fs-4">${result.content.rendered}</p>
        </div>
    </div>
    `
}