// CONTACTOS
let contactos =
JSON.parse(localStorage.getItem('contactos')) || [];

// FAVORITOS
let favoritos =
JSON.parse(localStorage.getItem('favoritos')) || [];


// MOSTRAR SECCIONES
function mostrar(seccion) {

    document.querySelectorAll('.contenido > div')
    .forEach(sec => {

        sec.style.opacity = '0';

        setTimeout(() => {
            sec.style.display = 'none';
        }, 200);

    });

    setTimeout(() => {

        const section =
        document.getElementById(seccion);

        if(seccion === 'perfil'){

            section.style.display = 'flex';

        }else{

            section.style.display = 'block';

        }

        setTimeout(() => {
            section.style.opacity = '1';
        }, 50);

    }, 250);

}


// AGREGAR CONTACTO
document.getElementById('formContacto')
.addEventListener('submit', function(e){

    e.preventDefault();

    const nombre =
    document.getElementById('nombre').value;

    const telefono =
    document.getElementById('telefono').value;

    contactos.push({nombre, telefono});

    localStorage.setItem(
        'contactos',
        JSON.stringify(contactos)
    );

    mostrarContactos();

    actualizarStats();

    this.reset();

});


// CONTACTOS
function mostrarContactos(){

    const lista =
    document.getElementById('listaContactos');

    lista.innerHTML = '';

    contactos.forEach(c => {

        lista.innerHTML += `
            <li class="list-group-item">
                <strong>${c.nombre}</strong>
                <br>
                ${c.telefono}
            </li>
        `;

    });

}


// PANEL
function togglePanel(){

    mostrarContactos();

    panel.classList.add('activo');

    overlay.classList.add('activo');

}

function cerrarPanel(){

    panel.classList.remove('activo');

    overlay.classList.remove('activo');

}


// LIKES
function iniciarLikes(){

    const items =
    document.querySelectorAll('.img-wrapper');

    items.forEach(item => {

        const img =
        item.querySelector('img');

        const btn =
        item.querySelector('.like-btn');

        const src =
        img.getAttribute('src');

        if(favoritos.includes(src)){

            btn.classList.add('activo');

        }

        btn.onclick = () => {

            if(favoritos.includes(src)){

                favoritos =
                favoritos.filter(i => i !== src);

                btn.classList.remove('activo');

            }else{

                favoritos.push(src);

                btn.classList.add('activo');

            }

            localStorage.setItem(
                'favoritos',
                JSON.stringify(favoritos)
            );

            actualizarStats();

        };

        // MODAL
        img.onclick = () => {

            document.getElementById('imgModal')
            .classList.add('activo');

            document.getElementById('modalImg')
            .src = src;

        };

    });

}


// CERRAR MODAL
function cerrarModal(){

    document.getElementById('imgModal')
    .classList.remove('activo');

}


// STATS
function actualizarStats(){

    document.getElementById(
        'totalFavoritos'
    ).innerText = favoritos.length;

    document.getElementById(
        'totalContactos'
    ).innerText = contactos.length;

}


// LOAD
window.addEventListener('load', () => {

    iniciarLikes();

    mostrarContactos();

    actualizarStats();

});