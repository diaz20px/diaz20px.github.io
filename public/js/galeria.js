let contactos = JSON.parse(localStorage.getItem('contactos')) || [];

function mostrar(seccion) {
    document.getElementById('perfil').style.display = 'none';
    document.getElementById('album').style.display = 'none';
    document.getElementById('contacto').style.display = 'none';

    document.getElementById(seccion).style.display = 'block';

    cerrarPanel();
}

function agregarContacto() {
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;

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

function mostrarContactos() {
    const lista = document.getElementById('listaContactos');
    lista.innerHTML = '';

    contactos.forEach((c) => {
        lista.innerHTML += `
        <li class="list-group-item">
            ${c.nombre}<br><small>${c.telefono}</small>
        </li>`;
    });
}

function togglePanel() {
    document.getElementById('panel').classList.add('activo');
    document.getElementById('overlay').classList.add('activo');
}

function cerrarPanel() {
    document.getElementById('panel').classList.remove('activo');
    document.getElementById('overlay').classList.remove('activo');
}

mostrarContactos();

// 🔥 Cerrar panel al cambiar tamaño de pantalla
window.addEventListener('resize', () => {
    cerrarPanel();
});

// 🔥 Asegurar que inicie cerrado
window.addEventListener('load', () => {
    cerrarPanel();
});

// ============ GALERÍA ============
// ===== FAVORITOS =====
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// ===== ACTIVAR CORAZONES =====
function activarLikes() {
    const galeria = document.getElementById('galeria');
    const imgs = galeria.querySelectorAll('img');

    imgs.forEach((img) => {
        const src = img.getAttribute('src');

        // evitar duplicados
        if (img.parentElement.classList.contains('img-wrapper')) return;

        const wrapper = document.createElement('div');
        wrapper.classList.add('img-wrapper');

        const like = document.createElement('span');
        like.classList.add('like-btn');
        like.innerHTML = "❤️";

        // si ya es favorito → rojo
        if (favoritos.includes(src)) {
            like.classList.add('activo');
        }

        like.onclick = () => toggleFavorito(src, like);

        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.appendChild(like);
    });

}

// ===== TOGGLE FAVORITO =====
function toggleFavorito(src, btn) {
    if (favoritos.includes(src)) {
        favoritos = favoritos.filter(i => i !== src);
        btn.classList.remove('activo');
    } else {
        favoritos.push(src);
        btn.classList.add('activo');
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));

}

// ===== VER FAVORITOS =====
function verFavoritos() {
    const items = document.querySelectorAll('#galeria .img-wrapper');

    items.forEach(item => {
        const img = item.querySelector('img').getAttribute('src');

        if (favoritos.includes(img)) {
            item.style.display = 'inline-block';
        } else {
            item.style.display = 'none';
        }
    });

}

// ===== MOSTRAR TODAS =====
function mostrarTodas() {
    const items = document.querySelectorAll('#galeria .img-wrapper');
    items.forEach(item => item.style.display = 'inline-block');
}

// ===== NAVEGACION =====
function mostrar(seccion) {
    document.getElementById('perfil').style.display = 'none';
    document.getElementById('album').style.display = 'none';
    document.getElementById('contacto').style.display = 'none';

    document.getElementById(seccion).style.display = 'block';

    cerrarPanel();

    if (seccion === 'album') {
        activarLikes();
        mostrarTodas(); // 🔥 IMPORTANTE (restaura todas)
    }

}

