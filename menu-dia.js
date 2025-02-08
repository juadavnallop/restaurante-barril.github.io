document.getElementById('menu-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener los valores seleccionados
    const plato = document.getElementById('plato');
    const platoText = plato.options[plato.selectedIndex].text;

    const acompanante = document.getElementById('acompanante');
    const acompananteText = acompanante.options[acompanante.selectedIndex].text;

    const bebida = document.getElementById('bebida');
    const bebidaText = bebida.options[bebida.selectedIndex].text;

    // Crear el mensaje de WhatsApp
    const mensaje = `¡Hola! Quiero hacer un pedido del Menú del Día:\n\n` +
                    `- Plato: ${platoText}\n` +
                    `- Acompañante: ${acompananteText}\n` +
                    `- Bebida: ${bebidaText}`;

    // Número de WhatsApp
    const numeroWhatsApp = '+573134577990';

    // Crear y abrir el enlace de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
});