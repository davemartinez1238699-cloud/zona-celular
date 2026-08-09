const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usuario") || document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword") || document.getElementById("mostrarPassword");
const loginMessage = document.getElementById("loginMessage") || document.getElementById("mensaje");
const forgotLink = document.getElementById("olvidaste");

if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
        const isSecret = passwordInput.type === "password";
        passwordInput.type = isSecret ? "text" : "password";
        togglePassword.textContent = isSecret ? "🙈" : "👁";
    });
}

if (loginForm && usernameInput && passwordInput && loginMessage) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const usuario = (usernameInput.value || "").trim();
        const clave = (passwordInput.value || "").trim();

        if (!usuario || !clave) {
            loginMessage.textContent = "Completa todos los campos.";
            loginMessage.className = "mensaje error";
            return;
        }

        if (usuario === "admin" && (clave === "1234" || clave === "123456")) {
            loginMessage.textContent = "Iniciando sesion...";
            loginMessage.className = "mensaje correcto";
            localStorage.setItem("zonaCelularSession", "true");
            setTimeout(() => {
                window.location.href = "/catalogo.html";
            }, 450);
        } else {
            loginMessage.textContent = "Usuario o contrasena incorrectos.";
            loginMessage.className = "mensaje error";
        }
    });
}

if (forgotLink) {
    forgotLink.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Para recuperar tu contrasena comunicate al 8230-0342.");
    });
}

const isProtectedPage = window.location.pathname.includes("/inicio.html") || window.location.pathname.includes("/catalogo.html");
if (isProtectedPage) {
    const session = localStorage.getItem("zonaCelularSession");
    if (session !== "true") {
        window.location.href = "/";
    }
}

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("zonaCelularSession");
        window.location.href = "/";
    });
}

const searchPhone = document.getElementById("searchPhone");
const brandFilter = document.getElementById("brandFilter");
const productCards = Array.from(document.querySelectorAll(".phone-card"));

function applyFilters() {
    if (!searchPhone || !brandFilter || productCards.length === 0) return;

    const query = searchPhone.value.toLowerCase();
    const brand = brandFilter.value;

    productCards.forEach((card) => {
        const name = (card.dataset.name || "").toLowerCase();
        const cardBrand = (card.dataset.brand || "").toLowerCase();
        const matchesQuery = name.includes(query);
        const matchesBrand = brand === "todos" || cardBrand === brand.toLowerCase();
        card.style.display = matchesQuery && matchesBrand ? "block" : "none";
    });
}

if (searchPhone && brandFilter) {
    searchPhone.addEventListener("input", applyFilters);
    brandFilter.addEventListener("change", applyFilters);
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
            .then(() => console.log("Zona Celular PWA instalada correctamente"))
            .catch((error) => console.error("Error registrando PWA:", error));
    });
}
