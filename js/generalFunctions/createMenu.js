import { getUser } from "./storage.js";


const username = getUser()


const { pathname } = document.location;


let authLink = `<li class="nav-item">
                  <a class="nav-link ${pathname === "/login.html" ? "active" : ""}" href="login.html">Login</a>
                </li>`  ;


if (username) {
  authLink = `<li class="nav-item">
                  <span class="nav-link text-danger" >"Hei ${username}"</span>
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