//! elementos visibles
const header = document.querySelector('header')

const textarea = document.querySelector('#textarea')

const answerContainer = document.querySelector('.answer-container')

const boyImage = document.querySelector('#boy')
const noMensajeAviso = document.querySelector('.no-mensaje')
const ingresaTextoAviso = document.querySelector('.ingresa-texto')

const respuesta = document.querySelector('#respuesta')

//! elementos funcionales
const btnPegar = document.querySelector('#pegar')
const btnLimpiar = document.querySelector('#limpiar')

const btnEncriptar = document.querySelector('#btn-encriptar')
const btnDesencriptar = document.querySelector('#btn-desencriptar')

const btnCopyPaste = document.querySelector('#btn-copypaste')

const btnCopiar = document.querySelector('#btn-copiar')

//! varibles
const vocales = ['a', 'e', 'i', 'o', 'u']
const nuevasVocales = ['ai', 'enter', 'imes', 'ober', 'ufat']

const recipe = [['a', 'ai'], ['e', 'enter'], ['i', 'imes'], ['o', 'ober'], ['u', 'ufat']]

//! funciones
function toggleElements(value) {
    let toggle
    value == true ? toggle = 'display: none;' : toggle = 'display: block;';
    noMensajeAviso.style = toggle
    ingresaTextoAviso.style = toggle
    if (screen.width >= 1024) {
        boyImage.style = toggle
    }
}

function encriptar() {
    let info = textarea.value

    if (info == '') {
        alert('Ingrese un texto válido')
        return false
    } else {
        // elimina caracteres especiales
        info = info.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        let arr = [...info]

        for (let k = 0; k < recipe.length; k++) {
            for (let l = 0; l < arr.length; l++) {
                if (arr[l] == recipe[k][0]) {
                    arr[l] = recipe[k][1]
                }
            }
        }

        toggleElements(true)


        respuesta.innerHTML = arr.join('')
        btnCopiar.style = 'display: block;'
        answerContainer.style = 'justify-content: space-between;'
        answerContainer.scrollIntoView({behavior: 'smooth'})
    }
}

function desencriptar() {
    let info = textarea.value

    if (info == '') {
        alert('Ingrese un texto válido')
        return false
    } else {
        info = info.toLowerCase()
        
        //* Solución a medias, se come letras o se come letras y no elimina las nuevasVocales
        /*
        let arr = [...info]
        for (let i = 0; i < recipe.length; i++) {
            for (j = 0; j < arr.length; j++) {
                if (arr[j] === recipe[i][0]) {
                    for (k = 1; k < recipe[i][1].length; k++) {
                        if (arr[j + k] === recipe[i][1][k]) {
                            arr[j + k] = ''
                        }
                    }
                }
            }
        }
        let words = arr.join('')
        respuesta.innerHTML = words
        */
        
        let parrafo = info
        for(i = 0; i < vocales.length; i++) {
            parrafo = parrafo.replaceAll(recipe[i][1], recipe[i][0])
        }

        toggleElements(true)

        respuesta.innerHTML = parrafo
        btnCopiar.style = 'display: block;'
        answerContainer.style = 'justify-content: space-between;'
        answerContainer.scrollIntoView({behavior: 'smooth'})
    }
}

function copiarTexto() {
    let text = respuesta.innerHTML
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Texto copiado al portapapeles')
        })
        .catch(err => {
            console.error('Error al copiar al portapapeles:', err)
        })
}

function pegarTexto() {
    navigator.clipboard.readText()
        .then(text => {
            console.log('Texto del portapapeles:', text)
            textarea.value = text
            textarea.focus()
        })
        .catch(err => {
            console.error('Error al leer del portapapeles:', err)
        })
}

function limpiarTexto() {
    textarea.value = ''
    textarea.focus()
    toggleElements(false)
    respuesta.innerHTML = ''
    btnCopiar.style = 'display: none;'
    answerContainer.style = 'justify-content: center;'
}

function copiarPegarTexto() {
    if (respuesta.innerHTML != '') {
        textarea.value = respuesta.innerHTML
        textarea.focus()
        header.scrollIntoView({behavior: 'smooth'})
    }
}

//! eventos

window.addEventListener('resize', () => {
    if (screen.width < 1024) {
        boyImage.style = 'display: none'
    } else {
        boyImage.style = 'display: block'
    }
})

btnPegar.addEventListener('click', pegarTexto)
btnLimpiar.addEventListener('click', limpiarTexto)

btnEncriptar.addEventListener('click', encriptar)
btnDesencriptar.addEventListener('click', desencriptar)

btnCopyPaste.addEventListener('click', copiarPegarTexto)

btnCopiar.addEventListener('click', copiarTexto)