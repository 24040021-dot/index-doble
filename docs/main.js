// Evento para calcular el promedio
document.getElementById('btnCalcular').addEventListener('click', () => {

    const nombre = document.getElementById('nombre').value.trim();
    const unidad1 = document.getElementById('unidad1').value;
    const unidad2 = document.getElementById('unidad2').value;
    const unidad3 = document.getElementById('unidad3').value;

    // Validar que todos los campos tengan información
    if (!nombre || !unidad1 || !unidad2 || !unidad3) {
        alert('⚠️ Por favor completa todos los campos');
        return;
    }

    // Validar que las calificaciones sean números válidos
    if (isNaN(unidad1) || isNaN(unidad2) || isNaN(unidad3)) {
        alert('⚠️ Las calificaciones deben ser números válidos');
        return;
    }

    // Validar que las calificaciones estén entre 0 y 10
    if (unidad1 < 0 || unidad1 > 10 || unidad2 < 0 || unidad2 > 10 || unidad3 < 0 || unidad3 > 10) {
        alert('⚠️ Las calificaciones deben estar entre 0 y 10');
        return;
    }

    // Hacer la petición al servidor
    fetch('/calcular-promedio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre,
            unidad1: parseFloat(unidad1),
            unidad2: parseFloat(unidad2),
            unidad3: parseFloat(unidad3)
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return res.json();
    })
    .then(data => {
        // Mostrar los resultados
        document.getElementById('promedio').value = data.promedio.toFixed(2);
        document.getElementById('estatus').value = data.estatus;

        // Aplicar estilos según el resultado
        const estatusInput = document.getElementById('estatus');
        estatusInput.classList.remove('success', 'danger');
        
        if (data.estatus === 'Aprobado') {
            estatusInput.classList.add('success');
        } else {
            estatusInput.classList.add('danger');
        }

        console.log('✅ Promedio calculado correctamente:', data);
    })
    .catch(err => {
        alert('❌ Error al calcular el promedio: ' + err.message);
        console.error('Error:', err);
    });

});

// Evento para limpiar los campos del formulario
document.getElementById('btnLimpiar').addEventListener('click', () => {
    document.getElementById('nombre').value = '';
    document.getElementById('unidad1').value = '';
    document.getElementById('unidad2').value = '';
    document.getElementById('unidad3').value = '';
    document.getElementById('promedio').value = '';
    document.getElementById('estatus').value = '';

    // Remover clases de estilos
    document.getElementById('estatus').classList.remove('success', 'danger');

    console.log('🗑️ Formulario limpiado');
});

// Evento para limpiar al presionar Enter en el campo de nombre
document.getElementById('nombre').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('unidad1').focus();
    }
});

// Permitir calcular al presionar Enter en cualquier campo
['unidad1', 'unidad2', 'unidad3'].forEach(id => {
    document.getElementById(id).addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('btnCalcular').click();
        }
    });
});

console.log('✅ main.js cargado correctamente');