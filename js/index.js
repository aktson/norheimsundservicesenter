const carouselInner = document.querySelector("#carousel-inner");
const postsEmbedUrl = "http://localhost/norhss/wp-json/wp/v2/posts/?_embed";

async function fetchPosts() {
    try {
        const response = await fetch(postsEmbedUrl);
        const data = await response.json();
        data.forEach((item) => {
            createHtml(item)

            console.log(item._embedded["wp:featuredmedia"][0].source_url)
        });
    }
    catch (error) {

        console.log(error)
    }

}
fetchPosts()

function createHtml(result) {

    const receivedImage = result._embedded["wp:featuredmedia"][0].source_url;

    carouselInner.innerHTML += ` 
    <div class="carousel-item " data-bs-interval="10000" >
        <div class="ratio ratio-21x9" style="height:60vh;background:url('${receivedImage}')  center / cover no-repeat;background-color: rgba(0,0,0,0.5); background-blend-mode: overlay;">
            </div>
        <div class="carousel-caption  d-none d-md-block p-2 "  id="caption" >
        <h5 class="fs-3 mb-3">${result.title.rendered} </h5>
        <p >${result.content.rendered}</p>
        </div>
    </div>
    `
}