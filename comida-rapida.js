document.getElementById('rapida-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores seleccionados
    const comida = document.getElementById('comida');
    const comidaText = comida.options[comida.selectedIndex].text;

    const bebida = document.getElementById('bebida');
    const bebidaText = bebida.options[bebida.selectedIndex].text;

    // Crear el mensaje
    const mensaje = `¡Hola! Quiero hacer un pedido:\n\n` +
                   `Comida: ${comidaText}\n` +
                   `Bebida: ${bebidaText}`;

    // Número de WhatsApp
    const numeroWhatsApp = '+573134577990';

    // Crear y abrir el enlace de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
});