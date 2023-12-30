const divPersonajes = document.querySelector('.personajes')
// Menu filtros
const itemFemenino = document.querySelector('#femenino')
const itemMasculino = document.querySelector('#masculino')
const itemSinGenero = document.querySelector('#sinGenero')
const itemDesconocido = document.querySelector('#desconocido')

// Botones paginado
const botonSiguientePagina = document.querySelector('#paginaSiguiente')
const botonAnteriorPagina = document.querySelector('#paginaAnterior')
const botonPrimerPagina = document.querySelector('#primerpagina')
const botonUltimaPagina = document.querySelector('#ultimaPagina')

let personajes
let paginaActual = 1
let paginaUltima

function crearTarjetas(arrayPersonajes) {
    divPersonajes.innerHTML = ''
    arrayPersonajes.forEach(personajeObj => {
        divPersonajes.innerHTML += `
        <div class="tarjeta">
            <img src="${personajeObj.image}" alt="">
            <p><b>Nombre:</b> ${personajeObj.name}</p>
            <p><b>Género:</b> ${personajeObj.gender}</p>
            <p><b>Especie:</b> ${personajeObj.species}</p>
            <p><b>Estado:</b> ${personajeObj.status}</p>
            <p><b>Origen:</b> ${personajeObj.origin.name}</p>
            <p><b>Ubicación:</b> ${personajeObj.location.name}</p>
        </div>
    `
    })
}

function checkBotonesPaginado() {
    if (paginaActual === 1) {
        botonPrimerPagina.style.display = 'none'
        botonAnteriorPagina.style.display = 'none'
    } else {
        botonPrimerPagina.style.display = 'flex'
        botonAnteriorPagina.style.display = 'flex'
    }
}

function pedidoFetch(pagina) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            console.log(data)
            paginaUltima = data.info.pages
            personajes = data.results;
            crearTarjetas(personajes)
            checkBotonesPaginado()
        })
}

pedidoFetch(paginaActual)

function filtros(filtro) {
    const filtroPersonajes = personajes.filter(personaje => {
        return personaje.gender === filtro
    })
    crearTarjetas(filtroPersonajes)
}

itemFemenino.addEventListener('click', () => filtros('Female'))
itemMasculino.addEventListener('click', () => filtros('Male'))
itemSinGenero.addEventListener('click', () => filtros('genderless'))
itemDesconocido.addEventListener('click', () => filtros('unknown'))

function paginaSiguiente() {
    paginaActual++
    pedidoFetch(paginaActual)
}
function paginaAnterior() {
    paginaActual--
    pedidoFetch(paginaActual)
}

function primerPagina() {
    paginaActual = 1
    pedidoFetch(paginaActual)
}

function ultimaPagina() {
    pedidoFetch(paginaUltima)
}

botonSiguientePagina.addEventListener('click', () => paginaSiguiente())
botonAnteriorPagina.addEventListener('click', () => paginaAnterior())
botonPrimerPagina.addEventListener('click', () => primerPagina())
botonUltimaPagina.addEventListener('click', () => ultimaPagina())