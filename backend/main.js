const express = require('express')
const cors = require('cors')
const path = require('path')
const { Pool } = require('pg')
const app = express()

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '..', 'frontend')))
app.use(cors())
app.use(express.json())

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'proyecto_db',
    password: '',
    port: 5432,
    options: '-c search_path=db,public'
})

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'registro.html'))
})

app.get('/autenticacion', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'autenticacion.html'))
})

app.get('/autenticar', async (req, res)=>{
    const cedula = req.query.cedula
    try{
        const query = 'SELECT nombre_apellido, cedula FROM usuarios WHERE cedula = $1'
        const query2 = 'SELECT tipo_cuenta, oficina, codigo_oficina, direccion, fecha FROM comprobantes WHERE cedula = $1'
        const usuario = await db.query(query, [cedula])
        const comprobante = await db.query(query2, [cedula])
        if(usuario.rows[0] && comprobante.rows[0]){
            res.render('reporte', {usuario: usuario.rows[0], comprobante: comprobante.rows[0]})
        }else{
            res.status(500).json({ error: 'Usuario o comprobante no encontrado'})
        }
    }catch(error){
        console.error('Error al obtener datos del usuario:', error)
        res.status(500).json({ error: error.message })
    }
})

app.post('/submit', async (req, res)=>{
    try{
        const info = req.body
        const query = 'INSERT INTO usuarios (nombre_apellido, cedula) VALUES ($1, $2)'
        const query2 = 'INSERT INTO comprobantes (direccion, tipo_cuenta, monto_estimado, promedio_transacciones, motivo_solicitud, uso_cuenta, origen_fondo, destino_fondo, nro_comprobante, oficina, codigo_oficina, cedula, fecha) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)'
        await db.query(query, [info.nombreApellido, info.cedula])
        await db.query(query2, [info.direccion, info.tipoCuenta, info.montoEstimado, info.promedioTransacciones, info.motivoSolicitud, info.usoCuenta, info.origenFondo, info.destinoFondo, info.nroComprobante, info.oficina, info.codigoOficina, info.cedula, info.fecha])
        res.status(200).json({ received: true })
    }catch(error){
        console.error('Error al obtener info:', error)
        res.status(500).json({ error: error.message })
    }
})

app.listen(3000, () => console.log(`Server listening on http://localhost:3000`))
