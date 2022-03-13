import { getUser } from "./storage.js";


const username = getUser()


const { pathname } = document.location;


let authLink = `<li class="nav-item">
                  <a class="nav-link ${pathname === "/login.html" ? "active" : ""}" href="login.html">Logg inn</a>
                </li>`  ;


if (username) {
  authLink = `<li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Legge til
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item  ${pathname === "/addProduct.html" ? "active" : ""}" href="addProduct.html">Produkt</a>
                  </li>
                  <li>
                    <a class="dropdown-item ${pathname === "/addCampaign.html" ? "active" : ""}" href="addCampaign.html">Kampanje</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <span class="nav-link text-danger pe-none" >"Hei ${username.toUpperCase()}"</span>
              </li>
              <li class="nav-item" >
                <button class="btn btn-danger btn-sm text-light nav-link" id="logout" >Logout</button>
              </li>`
}


export function createMenu() {
  const menuContainer = document.querySelector("#menu-container");

  menuContainer.innerHTML = `<li class="nav-item">
                                <a class="nav-link ${pathname === "/" || pathname === "/index.html" ? "active" : ""}"  href="index.html">Heim</a>
                              </li >
                              <li class="nav-item">
                                <a class="nav-link ${pathname === "/tjenester.html" ? "active" : ""}" href="tjenester.html">Tjenester</a>
                              </li>
                                <li class="nav-item">
                                <a class="nav-link ${pathname === "/produkter.html" ? "active" : ""} " href="produkter.html">Produkter</a>
                                </li>
                              <li class="nav-item">
                                <a class="nav-link ${pathname === "/contact.html" ? "active" : ""}" href="contact.html">Kontakt</a>
                              </li>
                              ${authLink}`

  if (username) {
    const logoutBtn = document.querySelector("#logout");
    const { pathname } = window.location;

    logoutBtn.onclick = function () {
      localStorage.clear();
      location.href = pathname;
    }

  }

}