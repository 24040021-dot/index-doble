const express = require('express');
const path = require('path');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal - Panel de aplicaciones
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para la calculadora de promedio
app.get('/calificaciones', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'calificaciones.html'));
});

// Ruta para el conversor de pesos a dólares
app.get('/conversor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'conversor.html'));
});

// API - Calcular promedio
app.post('/calcular-promedio', (req, res) => {
    try {
        const { nombre, unidad1, unidad2, unidad3 } = req.body;

        if (!nombre || unidad1 === undefined || unidad2 === undefined || unidad3 === undefined) {
            return res.status(400).json({ 
                error: "Faltan datos en la solicitud" 
            });
        }

        const u1 = parseFloat(unidad1);
        const u2 = parseFloat(unidad2);
        const u3 = parseFloat(unidad3);

        if (isNaN(u1) || isNaN(u2) || isNaN(u3)) {
            return res.status(400).json({ 
                error: "Las calificaciones deben ser números válidos" 
            });
        }

        if (u1 < 0 || u1 > 10 || u2 < 0 || u2 > 10 || u3 < 0 || u3 > 10) {
            return res.status(400).json({ 
                error: "Las calificaciones deben estar entre 0 y 10" 
            });
        }

        const promedio = (u1 + u2 + u3) / 3;
        const estatus = promedio >= 6 ? "Aprobado" : "Reprobado";

        res.json({
            nombre,
            unidad1: u1,
            unidad2: u2,
            unidad3: u3,
            promedio,
            estatus
        });

        console.log(`✅ Promedio calculado - ${nombre}: ${promedio.toFixed(2)} (${estatus})`);

    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ 
            error: "Error interno del servidor" 
        });
    }
});

// API - Convertir pesos a dólares
app.post('/convertir-divisa', (req, res) => {
    try {
        const { pesos } = req.body;

        if (pesos === undefined) {
            return res.status(400).json({ 
                error: "Falta la cantidad en pesos" 
            });
        }

        const pesosNum = parseFloat(pesos);

        if (isNaN(pesosNum) || pesosNum < 0) {
            return res.status(400).json({ 
                error: "La cantidad debe ser un número válido positivo" 
            });
        }

        // Tipo de cambio (puedes actualizarlo con una API real)
        const tipoCambio = 17.50; // 1 USD = 17.50 MXN (ejemplo)
        const dolares = pesosNum / tipoCambio;

        res.json({
            pesos: pesosNum,
            dolares: parseFloat(dolares.toFixed(2)),
            tipoCambio: `1 USD = ${tipoCambio} MXN`
        });

        console.log(`💱 Conversión: ${pesosNum} MXN = ${dolares.toFixed(2)} USD`);

    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ 
            error: "Error interno del servidor" 
        });
    }
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});