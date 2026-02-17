// Evento para convertir pesos a dólares
document.getElementById('btnConvertir').addEventListener('click', () => {

    const pesos = document.getElementById('pesos').value.trim();

    if (!pesos) {
        alert('⚠️ Por favor ingresa una cantidad en pesos');
        return;
    }

    if (isNaN(pesos) || parseFloat(pesos) < 0) {
        alert('⚠️ Debes ingresar un número válido positivo');
        return;
    }

    fetch('/convertir-divisa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            pesos: parseFloat(pesos)
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return res.json();
    })
    .then(data => {
        document.getElementById('dolares').value = data.dolares.toFixed(2);
        document.getElementById('tipoCambio').value = data.tipoCambio;

        console.log('✅ Conversión realizada:', data);
    })
    .catch(err => {
        alert('❌ Error al convertir: ' + err.message);
        console.error('Error:', err);
    });

});

// Evento para limpiar los campos
document.getElementById('btnLimpiarConversor').addEventListener('click', () => {
    document.getElementById('pesos').value = '';
    document.getElementById('dolares').value = '';
    document.getElementById('tipoCambio').value = '';

    console.log('🗑️ Formulario limpiado');
});

// Permitir convertir al presionar Enter
document.getElementById('pesos').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('btnConvertir').click();
    }
});

console.log('✅ conversor.js cargado correctamente');