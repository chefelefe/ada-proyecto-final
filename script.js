const divPersonajes = document.querySelector('.personajes')
const constenedorCantidadPersonajes = document.querySelector('.cantidadPersonajes')

// Menu filtros
const itemTodos = document.querySelector('#todos')
const itemFemenino = document.querySelector('#femenino')
const itemMasculino = document.querySelector('#masculino')
const itemSinGenero = document.querySelector('#sinGenero')
const itemDesconocido = document.querySelector('#desconocido')

// Botones paginado
const botonSiguientePagina = document.querySelector('#paginaSiguiente')
const botonAnteriorPagina = document.querySelector('#paginaAnterior')
const botonPrimerPagina = document.querySelector('#primerpagina')
const botonUltimaPagina = document.querySelector('#ultimaPagina')
const constenedorNumeroPagina = document.querySelector('#numeroPagina')

let personajes
let paginaActual = 1
let paginaUltima
let cantidadPersonajes

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

    if (paginaActual === 42) {
        botonSiguientePagina.style.display = 'none'
        botonUltimaPagina.style.display = 'none'
    } else {
        botonSiguientePagina.style.display = 'flex'
        botonUltimaPagina.style.display = 'flex'
    }

    console.log('paginaActual ===>', paginaActual)
}

function setearCantidadPersonajes() {
    constenedorCantidadPersonajes.innerHTML = `Cantidad de personajes: ${cantidadPersonajes}`
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
            cantidadPersonajes = data.results.length
            crearTarjetas(personajes)
            checkBotonesPaginado()
            setearCantidadPersonajes()
        })
}

pedidoFetch(paginaActual)
constenedorNumeroPagina.innerHTML = paginaActual

function filtros(filtro) {
    const filtroPersonajes = personajes.filter(personaje => {
        return personaje.gender === filtro
    })
    crearTarjetas(filtroPersonajes)
    cantidadPersonajes = filtroPersonajes.length
    setearCantidadPersonajes()
}

itemTodos.addEventListener('click', () => pedidoFetch(paginaActual))
itemFemenino.addEventListener('click', () => filtros('Female'))
itemMasculino.addEventListener('click', () => filtros('Male'))
itemSinGenero.addEventListener('click', () => filtros('genderless'))
itemDesconocido.addEventListener('click', () => filtros('unknown'))

function paginaSiguiente() {
    paginaActual++
    pedidoFetch(paginaActual)
    constenedorNumeroPagina.innerHTML = paginaActual
}
function paginaAnterior() {
    paginaActual--
    pedidoFetch(paginaActual)
    constenedorNumeroPagina.innerHTML = paginaActual
}

function primerPagina() {
    paginaActual = 1
    pedidoFetch(paginaActual)
    constenedorNumeroPagina.innerHTML = paginaActual
}

function ultimaPagina() {
    paginaActual = 42
    pedidoFetch(paginaUltima)
    constenedorNumeroPagina.innerHTML = paginaActual
}

botonSiguientePagina.addEventListener('click', () => paginaSiguiente())
botonAnteriorPagina.addEventListener('click', () => paginaAnterior())
botonPrimerPagina.addEventListener('click', () => primerPagina())
botonUltimaPagina.addEventListener('click', () => ultimaPagina())