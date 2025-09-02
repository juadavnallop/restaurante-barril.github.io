// Configuración e inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initializeComponents();
    
    // Configurar funcionalidades
    setupScrollEffects();
    setupVideoModal();
    setupMenuHours();
    setupAnimations();
    
    // Eliminar pantalla de carga
    setTimeout(() => {
        hideLoadingScreen();
    }, 1500);
});

// Inicializar componentes principales
function initializeComponents() {
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
    
    // Configurar GLightbox para videos
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.video-play-btn',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }
}

// Ocultar pantalla de carga
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

// Configurar efectos de scroll
function setupScrollEffects() {
    const navbar = document.querySelector('.glass-nav');
    let scrolled = false;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100 && !scrolled) {
            navbar.classList.add('scrolled');
            scrolled = true;
        } else if (scrollTop <= 100 && scrolled) {
            navbar.classList.remove('scrolled');
            scrolled = false;
        }
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Configurar modal de video
function setupVideoModal() {
    const videoButtons = document.querySelectorAll('.video-play-btn');
    
    videoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            if (videoSrc) {
                // Crear modal de video personalizado
                createVideoModal(videoSrc);
            }
        });
    });
}

// Crear modal de video personalizado
function createVideoModal(videoSrc) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <span class="video-modal-close">&times;</span>
            <video controls autoplay>
                <source src="${videoSrc}" type="video/mp4">
                Tu navegador no soporta el elemento de video.
            </video>
        </div>
    `;
    
    // Estilos del modal
    const style = document.createElement('style');
    style.textContent = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        
        .video-modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .video-modal-content video {
            width: 100%;
            height: 100%;
            border-radius: 15px;
        }
        
        .video-modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s;
        }
        
        .video-modal-close:hover {
            color: #ff6f61;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Cerrar modal
    const closeBtn = modal.querySelector('.video-modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    // Cerrar al hacer clic fuera del video
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

// Configurar control de horarios
function setupMenuHours() {
    const menuDelDia = document.getElementById('menu-del-dia');
    const btnMenuDia = document.getElementById('btn-menu-dia');
    
    if (!menuDelDia || !btnMenuDia) return;
    
    function getColombianTime() {
        const now = new Date();
        const options = { 
            timeZone: 'America/Bogota', 
            hour: 'numeric', 
            hour12: false 
        };
        const colombianHour = new Intl.DateTimeFormat('es-CO', options).format(now);
        return parseInt(colombianHour);
    }
    
    function isWithinOperatingHours() {
        const currentHour = getColombianTime();
        const OPENING_HOUR = 10;  // 10:00 AM
        const CLOSING_HOUR = 24;   // 12:00 AM (midnight)
        return currentHour >= OPENING_HOUR && currentHour < CLOSING_HOUR;
    }
    
    function updateMenuAvailability() {
        if (isWithinOperatingHours()) {
            menuDelDia.classList.remove('oculto');
            btnMenuDia.classList.remove('disabled');
            btnMenuDia.textContent = 'Ver Menú';
            btnMenuDia.setAttribute('href', 'menu-dia.html');
        } else {
            menuDelDia.classList.add('oculto');
            btnMenuDia.classList.add('disabled');
            btnMenuDia.textContent = 'Fuera de horario';
            btnMenuDia.setAttribute('href', '#');
        }
    }
    
    // Verificar horario inicial
    updateMenuAvailability();
    
    // Verificar horario cada minuto
    setInterval(updateMenuAvailability, 60000);
}

// Configurar animaciones personalizadas
function setupAnimations() {
    // Animación para las tarjetas del menú
    const menuCards = document.querySelectorAll('.menu-card, .carne-card');
    
    menuCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Efecto parallax suave
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${(y - 0.5) * 5}deg) 
                rotateY(${(x - 0.5) * 5}deg)
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // Animación del botón pulse
    const pulseButtons = document.querySelectorAll('.pulse-button');
    pulseButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'none';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.animation = 'pulse-glow 2s infinite';
        });
    });
}

// Smooth scroll para enlaces internos
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Optimización para el video de fondo
function optimizeVideoBackground() {
    const video = document.querySelector('.video-background video');
    if (video) {
        // Pausar video en móviles para ahorrar batería
        if (window.innerWidth <= 768) {
            video.pause();
            video.style.display = 'none';
        } else {
            video.play();
            video.style.display = 'block';
        }
    }
}

// Ejecutar optimización en carga y redimensionamiento
window.addEventListener('load', optimizeVideoBackground);
window.addEventListener('resize', optimizeVideoBackground);

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
    // Aquí podrías enviar el error a un servicio de monitoreo
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registrado con éxito:', registration.scope);
            }, function(err) {
                console.log('ServiceWorker falló al registrarse:', err);
            });
    });
}
