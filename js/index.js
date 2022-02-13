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
        <div class="ratio ratio-21x9" style="height:60vh;background:url('${image}')  center / cover no-repeat;background-color: rgba(0,0,0,0.5); background-blend-mode: overlay;">
            </div>
        <div class="carousel-caption d-none d-md-block p-2 " style=" margin: 0 auto;" id="caption">
        <h3 class="fs-1 mb-3">${result.title.rendered} </h3>
        <p class="fs-4">${result.content.rendered}</p>
        </div>
    </div>
    `
}