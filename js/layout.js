// Determinar la ruta base relativa
const prefix = getPathPrefix();

// Control inmediato de sesión y roles (evita el molesto parpadeo de interfaz no autorizada)
const currentUser = window.MockDB ? window.MockDB.getCurrentUser() : null;
const isLoginPage = window.location.pathname.endsWith("login.html") || window.location.pathname.endsWith("login.php");
const isLogoutPage = window.location.pathname.endsWith("logout.html") || window.location.pathname.endsWith("logout.php");

if (!currentUser && !isLoginPage && !isLogoutPage) {
    // Si no hay sesión, al login directo y cortamos renderizado
    document.documentElement.style.display = "none";
    window.location.href = prefix + "login.html";
} else if (currentUser && isLoginPage) {
    // Si ya está logueado, no hace nada en el login, va al index
    window.location.href = prefix + "index.html";
} else if (currentUser) {
    // Comprobar accesos según el rol de usuario
    const pathname = window.location.pathname;
    const rol = currentUser.rol; // 'administrador', 'cajero', 'entrenador'

    if (rol === "cajero") {
        // Cajero no entra a Equipo ni a Eventos
        if (pathname.includes("/admin/equipo/") || pathname.includes("/admin/eventos/")) {
            document.documentElement.style.display = "none";
            window.location.href = prefix + "index.html?error=unauthorized";
        }
    } else if (rol === "entrenador") {
        // Entrenador no entra a Miembros ni a Pagos
        if (pathname.includes("/admin/miembros/") || pathname.includes("/admin/pagos/")) {
            document.documentElement.style.display = "none";
            window.location.href = prefix + "index.html?error=unauthorized";
        }
    }
}

// Inyección de hojas de estilo básicas de forma inmediata
injectCSS(prefix);

// Inicialización del layout al terminar de cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    // Si es la página de login, no inyectamos sidebar ni cabeceras
    if (isLoginPage) {
        return;
    }

    // Cargar la barra lateral con las secciones autorizadas para el rol actual
    const sidebarContainer = document.getElementById("layout-sidebar");
    if (sidebarContainer) {
        const activePage = window.activePage || "";
        const rol = currentUser ? currentUser.rol : "";
        
        let menuItemsHtml = `<li><a href="${prefix}index.html" class="${activePage === 'dashboard' ? 'active' : ''}"><i class="bi bi-house-door-fill"></i> Principal</a></li>`;
        
        if (rol === "administrador" || rol === "cajero") {
            menuItemsHtml += `<li><a href="${prefix}admin/miembros/index.html" class="${activePage === 'miembros' ? 'active' : ''}"><i class="bi bi-people-fill"></i> Miembros</a></li>`;
        }
        
        if (rol === "administrador" || rol === "entrenador") {
            menuItemsHtml += `<li><a href="${prefix}admin/equipo/index.html" class="${activePage === 'equipo' ? 'active' : ''}"><i class="bi bi-clipboard2-check-fill"></i> Equipo</a></li>`;
        }
        
        if (rol === "administrador" || rol === "cajero") {
            menuItemsHtml += `<li><a href="${prefix}admin/pagos/index.html" class="${activePage === 'pagos' ? 'active' : ''}"><i class="bi bi-credit-card-2-front-fill"></i> Pagos</a></li>`;
        }
        
        if (rol === "administrador" || rol === "entrenador") {
            menuItemsHtml += `<li><a href="${prefix}admin/eventos/index.html" class="${activePage === 'eventos' ? 'active' : ''}"><i class="bi bi-calendar-event-fill"></i> Eventos</a></li>`;
        }
        
        menuItemsHtml += `<li><a href="${prefix}admin/reportes/index.html" class="${activePage === 'reportes' ? 'active' : ''}"><i class="bi bi-bar-chart-fill"></i> Reportes</a></li>`;

        sidebarContainer.innerHTML = `
            <nav class="sidebar">
                <button id="sidebar-close" class="sidebar-close-btn" aria-label="Cerrar menú">
                    <i class="bi bi-x-lg"></i>
                </button>
                
                <div class="sidebar-header">
                    <a href="${prefix}index.html" style="text-decoration: none; color: inherit; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                        <img src="${prefix}images/educodesfc.png" alt="Logo Educodes FC" class="sidebar-logo">
                        <h2 class="sidebar-club-name">Educodes FC</h2>
                    </a>
                </div>
                <ul class="sidebar-menu">
                    ${menuItemsHtml}
                </ul>
            </nav>
        `;

        // Capa de opacidad móvil
        if (!document.getElementById("sidebar-overlay")) {
            const overlay = document.createElement("div");
            overlay.id = "sidebar-overlay";
            overlay.className = "sidebar-overlay";
            document.body.appendChild(overlay);
        }
    }

    // Cabecera superior (Top Header) con el estado de la sesión
    const topHeaderContainer = document.getElementById("layout-top-header");
    if (topHeaderContainer) {
        const pageTitle = window.pageTitle || "Dashboard";
        const username = currentUser ? currentUser.username : "Usuario";
        const rol = currentUser ? currentUser.rol : "Invitado";
        
        topHeaderContainer.innerHTML = `
            <header class="header">
                <div class="d-flex align-items-center gap-2 flex-wrap">
                    <button id="mobile-toggle" class="mobile-toggle-btn" aria-label="Abrir menú de navegación">
                        <i class="bi bi-list"></i>
                    </button>
                    <h1 class="m-0">${pageTitle}</h1>
                    <span class="badge" style="background: rgba(0, 194, 255, 0.1); color: var(--color-accent); border: 1.5px solid rgba(0, 194, 255, 0.25); font-size: 0.72em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 10px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px; vertical-align: middle;">
                        <i class="bi bi-display" style="font-size: 0.95em;"></i> Demo Visual
                    </span>
                </div>
                <div class="user-info">
                    <div class="avatar" aria-label="Avatar de usuario" title="${username}">
                        ${username.substring(0, 1).toUpperCase()}
                    </div>
                    <span>Bienvenido, <strong>${username}</strong> (${rol})</span>
                    <a href="${prefix}logout.html" class="btn-logout" aria-label="Cerrar sesión">
                        <i class="bi bi-box-arrow-right"></i><span> Cerrar Sesión</span>
                    </a>
                </div>
            </header>
        `;
    }

    // Mostrar el toast si intentaron meterse donde no debían
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("error") === "unauthorized") {
        showUnauthorizedToast();
    }

    // 6. Configurar la interactividad móvil del Sidebar
    setupMobileSidebar();

    // 7. Inyectar scripts al final del body (Bootstrap)
    injectBootstrapScript();
});

// Lanza una notificación toast flotante premium para avisar de acceso restringido
function showUnauthorizedToast() {
    // Evitar duplicar elementos de aviso
    if (document.getElementById("unauthorized-toast")) return;

    const toast = document.createElement("div");
    toast.id = "unauthorized-toast";
    
    // Estilos inline de vidrio premium
    toast.style.position = "fixed";
    toast.style.bottom = "24px";
    toast.style.right = "24px";
    toast.style.zIndex = "9999";
    toast.style.background = "linear-gradient(135deg, #FF6B6B 0%, #FF3333 100%)";
    toast.style.color = "#FFFFFF";
    toast.style.padding = "16px 24px";
    toast.style.borderRadius = "12px";
    toast.style.boxShadow = "0 8px 30px rgba(255, 77, 77, 0.35)";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "12px";
    toast.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
    toast.style.fontWeight = "600";
    toast.style.fontSize = "0.9em";
    toast.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease";
    toast.style.transform = "translateY(100px)";
    toast.style.opacity = "0";

    toast.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill" style="font-size: 1.25em;"></i>
        <span>Acceso Denegado: Tu rol de usuario no tiene permisos para ver esa sección.</span>
        <button onclick="this.parentElement.remove()" style="background:transparent; border:none; color:white; font-size:1.1em; cursor:pointer; margin-left:10px; display:inline-flex; align-items:center;">
            <i class="bi bi-x-lg"></i>
        </button>
    `;

    document.body.appendChild(toast);

    // Animación de entrada con retardo
    setTimeout(() => {
        toast.style.transform = "translateY(0)";
        toast.style.opacity = "1";
    }, 100);

    // Autodescarte a los 5 segundos con animación de salida
    setTimeout(() => {
        if (document.getElementById("unauthorized-toast")) {
            toast.style.transform = "translateY(100px)";
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 400);
        }
    }, 5500);
}

// Configura la apertura y cierre del sidebar en pantallas pequeñas
function setupMobileSidebar() {
    const mobileToggle = document.getElementById("mobile-toggle");
    const sidebarClose = document.getElementById("sidebar-close");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (!mobileToggle || !sidebar || !overlay) return;

    // Función para abrir el menú
    mobileToggle.addEventListener("click", () => {
        sidebar.classList.add("open");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Previene scroll de fondo
    });

    // Función para cerrar el menú
    const closeMenu = () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
        document.body.style.overflow = ""; // Restablece scroll de fondo
    };

    if (sidebarClose) {
        sidebarClose.addEventListener("click", closeMenu);
    }
    overlay.addEventListener("click", closeMenu);
}

// Obtiene el prefijo de ruta relativo a la raíz
function getPathPrefix() {
    const pathname = window.location.pathname;
    
    // Si la ruta contiene las carpetas del módulo administrativo
    if (pathname.includes('/admin/miembros/') || 
        pathname.includes('/admin/equipo/') || 
        pathname.includes('/admin/pagos/') || 
        pathname.includes('/admin/eventos/') || 
        pathname.includes('/admin/reportes/')) {
        return "../../";
    }
    
    // Por si estamos una carpeta más adentro
    if (pathname.includes('/admin/includes/')) {
        return "../";
    }
    
    return "./";
}

// Inyecta dinámicamente las hojas de estilo comunes
function injectCSS(prefix) {
    const cssLinks = [
        "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Roboto+Condensed:wght@300;400;700&display=swap",
        "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
        prefix + "css/global.css",
        prefix + "css/dashboard.css"
    ];

    cssLinks.forEach(url => {
        // Verificar que no esté agregado ya
        const exists = Array.from(document.querySelectorAll("link")).some(link => link.href === url);
        if (!exists) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = url;
            if (url.includes("cdnjs") || url.includes("cdn.jsdelivr")) {
                link.crossOrigin = "anonymous";
            }
            document.head.appendChild(link);
        }
    });
}

// Inyecta el script de Bootstrap
function injectBootstrapScript() {
    const scriptUrl = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    const exists = Array.from(document.querySelectorAll("script")).some(scr => scr.src === scriptUrl);
    
    if (!exists) {
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.integrity = "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
    }
}
