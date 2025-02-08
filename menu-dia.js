document.getElementById('menu-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Capturar las selecciones del cliente
    const arroz = document.getElementById('arroz').value;
    const proteina = document.getElementById('proteina').value;
    const ensalada = document.getElementById('ensalada').value;
    const bebida = document.getElementById('bebida').value;

    // Crear el mensaje de WhatsApp
    const mensaje = `Hola, quiero hacer un pedido del Menú del Día:\n\n` +
                    `- Arroz: ${arroz}\n` +
                    `- Proteína: ${proteina}\n` +
                    `- Ensalada: ${ensalada}\n` +
                    `- Bebida: ${bebida}`;

    // Número de WhatsApp
    const numeroWhatsApp = '+573134577990';

    // Codificar el mensaje para la URL
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Redirigir al cliente a WhatsApp
    window.open(urlWhatsApp, '_blank');
});