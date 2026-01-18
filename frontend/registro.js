let tipoCuenta = ''
const tipoCuentaSelect = document.getElementById('tipo-cuenta')
let montoEstimado = ''
const montoEstimadoSelect = document.getElementById('estimado-movilizacion')
let promedioTransacciones = ''
const promedioTransaccionesSelect = document.getElementById('promedio-movilizacion')
let motivoSolicitud = ''
const motivoSolicitudSelected = document.getElementById('motivo-solicitud')
let usoCuenta = ''
const usoCuentaSelect = document.getElementById('uso-cuenta')
let oficina = ''
const oficinaSelect = document.getElementById('agencia-bancaria')
let origenFondo = ''
const origenFondoInput = document.getElementById('origen-fondo')
let destinoFondo = ''
const destinoFondoInput = document.getElementById('destino-fondo')
let direccion = ''
const direccionInput = document.getElementById('direccion')
let nombreApellido = ''
const nombreApellidoInput = document.getElementById('nombre-apellido')
let cedula = ''
const cedulaInput = document.getElementById('cedula')

if (tipoCuentaSelect) {
    tipoCuentaSelect.addEventListener('change', function(){
        tipoCuenta = tipoCuentaSelect.value
    })
}

if (oficinaSelect) {
    oficinaSelect.addEventListener('change', function(){
        oficina = oficinaSelect.value
    })
}


if (montoEstimadoSelect) {
    montoEstimadoSelect.addEventListener('change', function(){
        montoEstimado = montoEstimadoSelect.value
    })
}

if (promedioTransaccionesSelect) {
    promedioTransaccionesSelect.addEventListener('change', function(){
        promedioTransacciones = promedioTransaccionesSelect.value
    })
}

if (motivoSolicitudSelected) {
    motivoSolicitudSelected.addEventListener('change', function(){
        motivoSolicitud = motivoSolicitudSelected.value
    })
}

if (usoCuentaSelect) {
    usoCuentaSelect.addEventListener('change', function(){
        usoCuenta = usoCuentaSelect.value
    })
}


if (origenFondoInput) {
    origenFondoInput.addEventListener('change', function(){
        origenFondo = origenFondoInput.value
    })
}


if (destinoFondoInput) {
    destinoFondoInput.addEventListener('change', function(){
        destinoFondo = destinoFondoInput.value
    })
}


if (direccionInput) {
    direccionInput.addEventListener('change', function(){
        direccion = direccionInput.value
    })
}

if (nombreApellidoInput) {
    nombreApellidoInput.addEventListener('change', function(){
        nombreApellido = nombreApellidoInput.value
    })
}

if (cedulaInput) {
    cedulaInput.addEventListener('change', function(){
        cedula = cedulaInput.value
    })
}

let info = {}
let codigoOficina = 0
let nroComprobante = Math.floor(Math.random() * 1111111111 - 9999999999 + 1) + 1111111111

nroComprobante < 0 ? nroComprobante = nroComprobante * -1 : nroComprobante

const fecha = new Date()

const buttonFinalizar = document.getElementById('button-finalizar')
if (buttonFinalizar) {
    buttonFinalizar.addEventListener('click', async function(){

    if(oficina === 'Agencia Las Trinitarias - C.C. Las Trinitarias') codigoOficina = 1111
    else if (oficina === 'Agencia Sambil - C.C. Sambil Barquisimeto') codigoOficina = 1122
    else if (oficina === 'Agencia Avenida Vargas - Torre ejecutiva') codigoOficina = 1133
    else if (oficina === 'Agencia El Oeste - C.C. Metrópolis') codigoOficina = 1144

    info = {
        nombreApellido: nombreApellido,
        cedula: cedula,
        nroComprobante: nroComprobante,
        tipoCuenta: tipoCuenta,
        usoCuenta: usoCuenta,
        motivoSolicitud: motivoSolicitud,
        montoEstimado: montoEstimado,
        promedioTransacciones: promedioTransacciones,
        origenFondo: origenFondo,
        destinoFondo: destinoFondo,
        direccion: direccion,
        oficina: oficina,
        codigoOficina: codigoOficina,
        fecha: fecha.toLocaleString('es-ES', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        })
    }
    try{
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        if(response.ok){
            alert('La informacion ha sido enviada exitosamente')
            window.location.href = `/autenticar?cedula=${cedula}`
        }else{
            console.error('error al enviar la informacion: ', response.status, await response.text())
        }
    }catch(error){
        console.error('fetch error:', error)
    }
    })
}

const autenticacion= document.getElementById('autenticacion')
if (autenticacion) {
    autenticacion.addEventListener('click', function(){
        window.location.href = '/autenticacion'
    })
}