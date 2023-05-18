//! elementos visibles
const $header = document.querySelector('header')

const $textarea = document.querySelector('#textarea')

const $answerContainer = document.querySelector('.answer-container')

const $boyImage = document.querySelector('#boy')
const $noMensajeAviso = document.querySelector('.no-mensaje')
const $ingresaTextoAviso = document.querySelector('.ingresa-texto')

const $respuesta = document.querySelector('#respuesta')

const $alerta = document.querySelector('#alerta-mayus-tilde')
const $btnAlerta = document.querySelector('#btn-alerta')

//! elementos funcionales
const $btnPegar = document.querySelector('#pegar')
const $btnLimpiar = document.querySelector('#limpiar')

const $btnEncriptar = document.querySelector('#btn-encriptar')
const $btnDesencriptar = document.querySelector('#btn-desencriptar')

const $btnCopyPaste = document.querySelector('#btn-copypaste')

const $btnCopiar = document.querySelector('#btn-copiar')

//! varibles
let tilde = true
let mayus = true
const tildes = ['á', 'Á', 'é', 'É', 'í', 'Í', 'ó', 'Ó', 'ú', 'Ú']
const vocales = ['a', 'e', 'i', 'o', 'u']
const nuevasVocales = ['ai', 'enter', 'imes', 'ober', 'ufat']

const recipe = [['a', 'ai'], ['e', 'enter'], ['i', 'imes'], ['o', 'ober'], ['u', 'ufat']]

//! funciones
function formatoIncorrecto() {
    console.log('cambio')
    let texto = $textarea.value;
    if (texto.match(/[A-Z]/g))
        console.log('Mayuscula')
}

function toggleElements(value) {
    let toggle
    value == true 
        ? toggle = 'display: none;' 
        : toggle = 'display: block;';
    
    $noMensajeAviso.style = toggle
    $ingresaTextoAviso.style = toggle
    if (screen.width >= 1024) {
        $boyImage.style = toggle
    }
}

function toggleBoyImage() {
    if (screen.width < 1024) {
        $boyImage.style = 'display: none'
    } else if (screen.width >= 1024 && $respuesta.innerHTML == '' ) {
        $boyImage.style = 'display: block'
        $answerContainer.style = 'justify-content: center;'
    }
}

function encriptar() {
    let texto = $textarea.value

    if (texto == '') {
        alert('Ingrese un texto válido')
        return false
    } else {
        // elimina caracteres especiales
        texto = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        let arr = [...texto]

        for (let k = 0; k < recipe.length; k++) {
            for (let l = 0; l < arr.length; l++) {
                if (arr[l] == recipe[k][0]) {
                    arr[l] = recipe[k][1]
                }
            }
        }

        toggleElements(true)

        $respuesta.innerHTML = arr.join('')
        $btnCopiar.style = 'display: block;'
        $answerContainer.style = 'justify-content: space-between;'

        screen.width < 1024 && $answerContainer.scrollIntoView({behavior: 'smooth'})
    }
}

function desencriptar() {
    let texto = $textarea.value

    if (texto == '') {
        alert('Ingrese un texto válido')
        return false
    } else {
        texto = texto.toLowerCase()
        
        //* Solución a medias, se come letras o se come letras y no elimina las nuevasVocales
        /*
        let arr = [...texto]
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
        $respuesta.innerHTML = words
        */
        
        for(i = 0; i < vocales.length; i++) {
            texto = texto.replaceAll(recipe[i][1], recipe[i][0])
        }

        toggleElements(true)

        $respuesta.innerHTML = texto
        $btnCopiar.style = 'display: block;'
        $answerContainer.style = 'justify-content: space-between;'
        
        screen.width < 1024 && $answerContainer.scrollIntoView({behavior: 'smooth'})
    }
}

function copiarTexto() {
    let texto = $respuesta.innerHTML
    navigator.clipboard.writeText(texto)
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
            $textarea.value = text
            $textarea.focus()
        })
        .catch(err => {
            console.error('Error al leer del portapapeles:', err)
        })
}

function limpiarTexto() {
    $textarea.value = ''
    $textarea.focus()
    toggleElements(false)
    $respuesta.innerHTML = ''
    $btnCopiar.style = 'display: none;'
    if (screen.width >= 1024)
        $answerContainer.style = 'justify-content: center;'
}

function copiarPegarTexto() {
    if ($respuesta.innerHTML != '') {
        $textarea.value = $respuesta.innerHTML
        $textarea.focus()
        screen.width < 1024 && $header.scrollIntoView({behavior: 'smooth'})
    }
}

//! eventos

window.addEventListener('resize', toggleBoyImage)

$textarea.addEventListener('keyup', event => {
    let texto = event.target.value
    let arr = [...texto]
    if (tilde || mayus) {
        for (let i = 0; i < tildes.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] == tildes[i] || texto.match(/[A-Z]/g)) {
                    $alerta.style.display = 'flex'
                    tilde = false
                    mayus = false
                    break;
                }
            }
            break
        }
    }
} )

$btnPegar.addEventListener('click', pegarTexto)
$btnLimpiar.addEventListener('click', limpiarTexto)

$btnEncriptar.addEventListener('click', encriptar)
$btnDesencriptar.addEventListener('click', desencriptar)

$btnCopyPaste.addEventListener('click', copiarPegarTexto)

$btnCopiar.addEventListener('click', copiarTexto)

$btnAlerta.addEventListener('click', event => {
    $alerta.style.display = 'none'
    mayus = false
    tilde = false
    $textarea.focus()
})