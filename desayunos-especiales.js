document.getElementById('desayunos-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener el valor seleccionado del desayuno
    const desayuno = document.getElementById('desayuno');
    const desayunoText = desayuno.options[desayuno.selectedIndex].text;

    // Obtener acompañantes seleccionados
    const acompanantes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.nextElementSibling.textContent)
        .join(', ');

    // Crear el mensaje
    const mensaje = `¡Hola! Quiero hacer un pedido:\n\n` +
                   `Desayuno: ${desayunoText}\n` +
                   `Acompañantes: ${acompanantes}`;

    // Número de WhatsApp
    const numeroWhatsApp = '+573134577990';

    // Crear y abrir el enlace de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
});

// Limitar la selección de acompañantes a 2
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        if (checkedBoxes.length > 2) {
            this.checked = false;
        }
    });
});