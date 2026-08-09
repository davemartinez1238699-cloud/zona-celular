const loginForm = document.getElementById("loginForm");

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const loginMessage = document.getElementById("loginMessage");

// MOSTRAR / OCULTAR CONTRASEÑA
if (togglePassword) {

```
togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "🙈";

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "👁️";

    }

});
```

}

// LOGIN
if (loginForm) {

```
loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const usuario = document
        .getElementById("username")
        .value
        .trim();

    const contraseña = document
        .getElementById("password")
        .value
        .trim();


    console.log("Usuario:", usuario);
    console.log("Contraseña:", contraseña);


    // DATOS DE PRUEBA
    if (
        usuario === "admin" &&
        contraseña === "123456"
    ) {

        loginMessage.textContent =
            "✓ Inicio de sesión correcto";

        loginMessage.style.color =
            "#4ade80";


        // Guardar sesión
        localStorage.setItem(
            "zonaCelularSession",
            "true"
        );


        // REDIRECCIÓN
        setTimeout(() => {

            window.location.href =
                "/inicio.html";

        }, 500);


    } else {

        loginMessage.textContent =
            "✕ Usuario o contraseña incorrectos";

        loginMessage.style.color =
            "#f87171";

    }

});
```

}

// PROTEGER LA PÁGINA PRINCIPAL
if (
window.location.pathname.endsWith("/inicio.html")
) {

```
const session =
    localStorage.getItem(
        "zonaCelularSession"
    );


if (session !== "true") {

    window.location.href =
        "/";

}
```

}

// CERRAR SESIÓN
const logoutButton =
document.getElementById("logoutButton");

if (logoutButton) {

```
logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "zonaCelularSession"
        );

        window.location.href = "/";

    }
);
```

}
