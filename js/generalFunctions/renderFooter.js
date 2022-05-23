export function renderFooter() {
    const footer = document.querySelector("footer");

    footer.innerHTML += `<div class="container d-flex flex-column justify-content-center p-4 gap-sm-4  gap-1 mt-4  ">
                            <div class="row gap-1 gap-sm-2 text-center justify-content-center ">
                                <div class="row mb-4 px-0  "> 
                                    <h2 class="text-light fs-3">Norheimsund Servicesenter AS</h2>
                                </div>
                                <div class="col-md p-2">
                                    <h5 class="text-danger  mb-3 ">Address</h5>
                                    <p>Hardangerfjordvegen 50</p>
                                    <p><i class="bi bi-geo-alt"></i>5600 Norheimsund</p>
                                </div>
                                <div class="col-md p-2">
                                    <h5 class="text-danger  mb-3">Kontakt</h5>
                                    <p><i class="bi bi-envelope "></i>post@norhservice.no </p>
                                    <p><i class="bi bi-telephone"></i>56 55 13 10</p>
                                </div>
                                <div class="col-md p-2 "> 
                                    <h5 class="text-danger  mb-3 ">Åpningstider</h5>
                                    <p><i class="bi bi-calendar-week"></i>Mandag- Fredag</p>
                                    <p><i class="bi bi-clock"></i>07.30 - 16.00</p>
                                </div>
                            </div>
                            <div class="row mt-1 mt-md-5 md-gap-2 text-center border-top border-danger">
                                <div class="col-sm p-sm-4 p-2"><p>@2022 Copyright</p></div>
                                <div class="col-sm p-sm-4 p-2"><a href="#" class="text-light">Terms | Policy</a></div>
                                <div class="col-sm p-sm-4 p-2">
                                    <p class="text-danger mb-3">
                                    Følg oss på
                                    <i class="bi bi-facebook fs-4 text-light"></i>
                                    </p>
                                </div>
                            </div>
                            <div class="position-absolute bottom-0 end-0 p-4 to-top">
                                <i class="bi bi-arrow-up-circle-fill" style="font-size: 2rem; cursor: pointer"></i>
                            </div>
                        </div>`

    const toTopBtn = document.querySelector(".to-top");
    toTopBtn.addEventListener("click", scrollToTop)
}



function scrollToTop() {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })

}


