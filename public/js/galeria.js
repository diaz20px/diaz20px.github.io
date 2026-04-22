// ================= CONTACTOS =================
let contactos = JSON.parse(localStorage.getItem('contactos')) || [];

// MOSTRAR SECCIONES
function mostrar(seccion) {
    document.getElementById('perfil').style.display = 'none';
    document.getElementById('album').style.display = 'none';
    document.getElementById('contacto').style.display = 'none';

    document.getElementById(seccion).style.display = 'block';

    cerrarPanel();

    if (seccion === 'album') {
        mostrarTodas();
    }
}

// AGREGAR CONTACTO
document.getElementById('formContacto').addEventListener('submit', function(e) {
    e.preventDefault();
    agregarContacto();
});

function agregarContacto() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    if (!nombre || !telefono) {
        alert("Completa los campos");
        return;
    }

    contactos.push({ nombre, telefono });
    localStorage.setItem('contactos', JSON.stringify(contactos));

    mostrarContactos();

    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
}

// MOSTRAR CONTACTOS
function mostrarContactos() {
    const lista = document.getElementById('listaContactos');
    lista.innerHTML = '';

    if (contactos.length === 0) {
        lista.innerHTML = `<li class="list-group-item">Sin contactos</li>`;
        return;
    }

    contactos.forEach((c) => {
        lista.innerHTML += `
        <li class="list-group-item">
            <strong>${c.nombre}</strong><br>
            <small>${c.telefono}</small>
        </li>`;
    });
}

// PANEL
function togglePanel() {
    mostrarContactos();
    document.getElementById('panel').classList.add('activo');
    document.getElementById('overlay').classList.add('activo');
}

function cerrarPanel() {
    document.getElementById('panel').classList.remove('activo');
    document.getElementById('overlay').classList.remove('activo');
}

// ================= FAVORITOS =================
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// INICIAR LIKES
function iniciarLikes() {
    const items = document.querySelectorAll('.img-wrapper');

    items.forEach(item => {
        const img = item.querySelector('img');
        const btn = item.querySelector('.like-btn');
        const src = img.getAttribute('src');

        // estado guardado
        if (favoritos.includes(src)) {
            btn.classList.add('activo');
        }

        btn.onclick = () => {
            if (favoritos.includes(src)) {
                favoritos = favoritos.filter(i => i !== src);
                btn.classList.remove('activo');
            } else {
                favoritos.push(src);
                btn.classList.add('activo');
            }

            localStorage.setItem('favoritos', JSON.stringify(favoritos));
        };

        // doble click en imagen ❤️
        img.ondblclick = () => btn.click();
    });
}

// VER SOLO FAVORITOS
function verFavoritos() {
    const items = document.querySelectorAll('#galeria .img-wrapper');

    items.forEach(item => {
        const img = item.querySelector('img').getAttribute('src');

        if (favoritos.includes(img)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// FAVORITOS DESDE MENÚ
function verFavoritosMenu() {
    mostrar('album');
    verFavoritos();
}

// MOSTRAR TODAS
function mostrarTodas() {
    const items = document.querySelectorAll('#galeria .img-wrapper');
    items.forEach(item => item.style.display = 'block');
}

// ================= EVENTOS =================
window.addEventListener('resize', cerrarPanel);

window.addEventListener('load', () => {
    cerrarPanel();
    mostrarContactos();
    iniciarLikes(); // 🔥 importante
});