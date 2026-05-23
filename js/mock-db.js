// Base de datos ficticia utilizando localStorage
const MOCK_DB_KEY = "proyecto_clubdeportivo_db";
const SESSION_KEY = "proyecto_clubdeportivo_session";

// Datos iniciales por defecto si la base de datos no existe en localStorage
const DEFAULT_DATA = {
    usuarios: [
        { id: 1, username: "admin", password: "admin", rol: "administrador" },
        { id: 2, username: "cajero", password: "cajero", rol: "cajero" },
        { id: 3, username: "entrenador", password: "entrenador", rol: "entrenador" }
    ],
    plantillas: [
        { id: 1, nombre_plantilla: "Primer Equipo (Educodes F.C. Senior)", categoria_edad: "Senior", descripcion: "Primer equipo masculino de Educodes FC", entrenador_principal_id: 3, horario_entrenamiento_habitual: "Lunes y Miércoles 19:00 - 21:00", campo_entrenamiento_asignado: "Campo Principal", estado_plantilla: "Activa" },
        { id: 2, nombre_plantilla: "Femenino Senior", categoria_edad: "Senior", descripcion: "Equipo senior femenino", entrenador_principal_id: 5, horario_entrenamiento_habitual: "Martes y Jueves 18:30 - 20:30", campo_entrenamiento_asignado: "Campo 2", estado_plantilla: "Activa" },
        { id: 3, nombre_plantilla: "Sub-17 Juvenil", categoria_edad: "Juvenil", descripcion: "Categoría juvenil masculina", entrenador_principal_id: null, horario_entrenamiento_habitual: "Lunes y Miércoles 17:00 - 18:30", campo_entrenamiento_asignado: "Campo 3", estado_plantilla: "Activa" },
        { id: 4, nombre_plantilla: "Sub-15 Cadete", categoria_edad: "Cadete", descripcion: "Categoría cadete de formación", entrenador_principal_id: null, horario_entrenamiento_habitual: "Martes y Jueves 16:30 - 18:00", campo_entrenamiento_asignado: "Campo 2", estado_plantilla: "En Formación" }
    ],
    miembros: [
        { id: 1, nombre_completo: "Juan Pérez", email: "juan.perez@fc.com", telefono: "611223344", documento_identidad: "12345678A", fecha_nacimiento: "2000-05-15", tipo_miembro: "Jugador", plantilla_id: 1, dorsal: 10, posicion: "Delantero", estado_miembro: "Activo", fecha_ingreso: "2024-01-10" },
        { id: 2, nombre_completo: "Carlos Gómez", email: "carlos.gomez@fc.com", telefono: "622334455", documento_identidad: "87654321B", fecha_nacimiento: "1999-08-22", tipo_miembro: "Jugador", plantilla_id: 1, dorsal: 1, posicion: "Portero", estado_miembro: "Activo", fecha_ingreso: "2024-01-12" },
        { id: 3, nombre_completo: "Roberto Mancini", email: "roberto.m@fc.com", telefono: "633445566", documento_identidad: "34567890C", fecha_nacimiento: "1975-11-30", tipo_miembro: "Entrenador", plantilla_id: 1, dorsal: null, posicion: "", estado_miembro: "Activo", fecha_ingreso: "2023-06-01" },
        { id: 4, nombre_completo: "María Silva", email: "maria.silva@fc.com", telefono: "644556677", documento_identidad: "45678901D", fecha_nacimiento: "2001-03-05", tipo_miembro: "Jugador", plantilla_id: 2, dorsal: 7, posicion: "Centrocampista", estado_miembro: "Activo", fecha_ingreso: "2024-02-15" },
        { id: 5, nombre_completo: "Laura Torres", email: "laura.t@fc.com", telefono: "655667788", documento_identidad: "56789012E", fecha_nacimiento: "1988-04-10", tipo_miembro: "Entrenador", plantilla_id: 2, dorsal: null, posicion: "", estado_miembro: "Activo", fecha_ingreso: "2023-09-01" },
        { id: 6, nombre_completo: "Pedro Martínez", email: "pedro.m@fc.com", telefono: "666778899", documento_identidad: "67890123F", fecha_nacimiento: "2009-07-14", tipo_miembro: "Jugador", plantilla_id: 3, dorsal: 9, posicion: "Delantero", estado_miembro: "Lesionado", fecha_ingreso: "2025-01-10" },
        { id: 7, nombre_completo: "Luis Rodríguez", email: "luis.r@fc.com", telefono: "677889900", documento_identidad: "78901234G", fecha_nacimiento: "2011-12-01", tipo_miembro: "Jugador", plantilla_id: 4, dorsal: 4, posicion: "Defensa", estado_miembro: "Activo", fecha_ingreso: "2025-02-01" },
        { id: 8, nombre_completo: "Francisco Javier", email: "francisco.j@fc.com", telefono: "688990011", documento_identidad: "89012345H", fecha_nacimiento: "1968-09-25", tipo_miembro: "Directivo", plantilla_id: null, dorsal: null, posicion: "", estado_miembro: "Activo", fecha_ingreso: "2022-01-01" },
        { id: 9, nombre_completo: "Ana Belén", email: "ana.b@fc.com", telefono: "699001122", documento_identidad: "90123456I", fecha_nacimiento: "1992-06-18", tipo_miembro: "Socio/Aficionado", plantilla_id: null, dorsal: null, posicion: "", estado_miembro: "Activo", fecha_ingreso: "2023-01-01" },
        { id: 10, nombre_completo: "Diego Maradona Jr", email: "diego.jr@fc.com", telefono: "600112233", documento_identidad: "01234567J", fecha_nacimiento: "1986-10-30", tipo_miembro: "Personal de Apoyo", plantilla_id: null, dorsal: null, posicion: "", estado_miembro: "Activo", fecha_ingreso: "2024-05-01" }
    ],
    eventos: [
        { id: 1, nombre: "Partido vs Real Madrid B", tipo_evento: "Partido", fecha_inicio: "2026-05-24", fecha_fin: "2026-05-24", hora_inicio: "18:00:00", hora_fin: "20:00:00", categoria: "Primer Equipo", lugar: "Estadio Educodes FC", estado: "Programado" },
        { id: 2, nombre: "Entrenamiento Táctico", tipo_evento: "Entrenamiento", fecha_inicio: "2026-05-22", fecha_fin: "2026-05-22", hora_inicio: "09:30:00", hora_fin: "11:30:00", categoria: "Primer Equipo", lugar: "Campo 2", estado: "Programado" },
        { id: 3, nombre: "Charla de Nutrición", tipo_evento: "Reunión", fecha_inicio: "2026-05-25", fecha_fin: "2026-05-25", hora_inicio: "17:00:00", hora_fin: "18:30:00", categoria: "Femenino Senior", lugar: "Salón de Actos", estado: "Programado" },
        { id: 4, nombre: "Partido de Copa vs FC Barcelona B", tipo_evento: "Partido", fecha_inicio: "2026-05-15", fecha_fin: "2026-05-15", hora_inicio: "19:00:00", hora_fin: "21:00:00", categoria: "Primer Equipo", lugar: "Mini Estadi", estado: "Finalizado" },
        { id: 5, nombre: "Partido de Liga vs Atlético de Madrid B", tipo_evento: "Partido", fecha_inicio: "2026-05-18", fecha_fin: "2026-05-18", hora_inicio: "16:00:00", hora_fin: "18:00:00", categoria: "Femenino Senior", lugar: "Ciudad Deportiva", estado: "Finalizado" }
    ],
    pagos: [
        { id: 1, miembro_id: 1, concepto: "Mensualidad Mayo 2026", monto: 50.00, fecha_pago: "2026-05-02", metodo_pago: "Transferencia", referencia: "TRF-98218", estado: "Completado", registrado_por: "cajero", notas_adicionales: "Pago recibido a tiempo.", fecha_registro: "2026-05-02 10:15:00" },
        { id: 2, miembro_id: 2, concepto: "Mensualidad Mayo 2026", monto: 50.00, fecha_pago: "2026-05-03", metodo_pago: "Efectivo", referencia: "EF-92019", estado: "Completado", registrado_por: "cajero", notas_adicionales: "Entregado en ventanilla.", fecha_registro: "2026-05-03 16:30:00" },
        { id: 3, miembro_id: 4, concepto: "Matrícula Anual", monto: 120.00, fecha_pago: "2026-05-01", metodo_pago: "Tarjeta de Crédito", referencia: "TC-28102", estado: "Completado", registrado_por: "admin", notas_adicionales: "Pago online.", fecha_registro: "2026-05-01 09:12:00" },
        { id: 4, miembro_id: 6, concepto: "Mensualidad Mayo 2026", monto: 40.00, fecha_pago: "2026-05-10", metodo_pago: "", referencia: "", estado: "Pendiente", registrado_por: "cajero", notas_adicionales: "", fecha_registro: "2026-05-10 12:00:00" },
        { id: 5, miembro_id: 7, concepto: "Mensualidad Mayo 2026", monto: 40.00, fecha_pago: "2026-05-08", metodo_pago: "", referencia: "", estado: "Pendiente", registrado_por: "cajero", notas_adicionales: "", fecha_registro: "2026-05-08 11:30:00" },
        { id: 6, miembro_id: 9, concepto: "Cuota de Socio Anual", monto: 80.00, fecha_pago: "2026-05-01", metodo_pago: "Transferencia", referencia: "TRF-71289", estado: "Completado", registrado_por: "admin", notas_adicionales: "", fecha_registro: "2026-05-01 14:00:00" },
        { id: 7, miembro_id: 1, concepto: "Seguro de Jugador", monto: 30.00, fecha_pago: "2026-04-15", metodo_pago: "Efectivo", referencia: "EF-28901", estado: "Completado", registrado_por: "cajero", notas_adicionales: "", fecha_registro: "2026-04-15 11:00:00" },
        { id: 8, miembro_id: 6, concepto: "Mensualidad Abril 2026", monto: 40.00, fecha_pago: "2026-04-05", metodo_pago: "", referencia: "", estado: "Atrasado", registrado_por: "cajero", notas_adicionales: "Acordó pagar con la cuota de mayo.", fecha_registro: "2026-04-05 10:00:00" }
    ],
    actividad: [
        { id: 1, accion: "Inicio de sesión exitoso del administrador", fecha: "2026-05-21 12:45:00", usuario: "admin" },
        { id: 2, accion: "Miembro registrado: Juan Pérez", fecha: "2026-05-20 16:30:00", usuario: "admin" },
        { id: 3, accion: "Pago confirmado para miembro Juan Pérez", fecha: "2026-05-20 16:45:00", usuario: "cajero" },
        { id: 4, accion: "Categoría de Plantilla agregada: Femenino Senior", fecha: "2026-05-19 11:20:00", usuario: "admin" },
        { id: 5, accion: "Estadísticas añadidas para jugador Juan Pérez", fecha: "2026-05-20 18:00:00", usuario: "admin" }
    ],
    estadisticas_jugador: [
        { id: 1, miembro_id: 1, temporada: "2025/2026", partidos_jugados: 22, minutos_jugados: 1850, goles_anotados: 18, asistencias: 8, pases_intentados: 450, pases_completados: 380, recuperaciones: 15, tarjetas_amarillas: 2, tarjetas_rojas: 0, lesiones_sufridas: 1, notas_rendimiento: "Excelente temporada, goleador del equipo y líder ofensivo.", fecha_ultima_actualizacion: "2026-05-20 18:00:00" },
        { id: 2, miembro_id: 1, temporada: "2024/2025", partidos_jugados: 20, minutos_jugados: 1600, goles_anotados: 12, asistencias: 5, pases_intentados: 400, pases_completados: 310, recuperaciones: 10, tarjetas_amarillas: 1, tarjetas_rojas: 0, lesiones_sufridas: 0, notas_rendimiento: "Temporada de adaptación y consolidación en el primer equipo.", fecha_ultima_actualizacion: "2025-05-20 17:00:00" },
        { id: 3, miembro_id: 2, temporada: "2025/2026", partidos_jugados: 24, minutos_jugados: 2160, goles_anotados: 0, asistencias: 1, pases_intentados: 350, pases_completados: 310, recuperaciones: 250, tarjetas_amarillas: 1, tarjetas_rojas: 1, lesiones_sufridas: 0, notas_rendimiento: "Portero titular indiscutible, gran porcentaje de paradas y excelente salida.", fecha_ultima_actualizacion: "2026-05-21 09:00:00" }
    ]
};

// Inicializa el Mock DB
function initDB() {
    if (!localStorage.getItem(MOCK_DB_KEY)) {
        localStorage.setItem(MOCK_DB_KEY, JSON.stringify(DEFAULT_DATA));
    } else {
        try {
            const db = JSON.parse(localStorage.getItem(MOCK_DB_KEY));
            if (db.plantillas && db.plantillas.length > 0 && !db.plantillas[0].hasOwnProperty('entrenador_principal_id')) {
                // Sobrescribir con la nueva estructura extendida
                localStorage.setItem(MOCK_DB_KEY, JSON.stringify(DEFAULT_DATA));
            }
        } catch(e) {}
    }
}

initDB();

// Retorna todos los datos de la DB
function getDB() {
    initDB();
    return JSON.parse(localStorage.getItem(MOCK_DB_KEY));
}

// Guarda la DB en localStorage
function saveDB(data) {
    localStorage.setItem(MOCK_DB_KEY, JSON.stringify(data));
}

const MockDB = {
    // ---- USUARIOS Y AUTH ----
    login: function (username, password) {
        const db = getDB();
        const user = db.usuarios.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
        if (user) {
            const session = {
                user_id: user.id,
                username: user.username,
                rol: user.rol
            };
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
            this.addActivity(`Inicio de sesión exitoso`, user.username);
            return { success: true, user: user };
        }
        return { success: false, message: "Usuario o contraseña incorrectos." };
    },
    logout: function () {
        localStorage.removeItem(SESSION_KEY);
    },
    getCurrentUser: function () {
        const session = localStorage.getItem(SESSION_KEY);
        return session ? JSON.parse(session) : null;
    },

    // ---- MIEMBROS ----
    getMembers: function () {
        const db = getDB();
        return db.miembros.map(m => {
            const plantilla = db.plantillas.find(p => p.id === parseInt(m.plantilla_id));
            return {
                ...m,
                nombre_plantilla: plantilla ? plantilla.nombre_plantilla : "Sin Asignar"
            };
        });
    },
    getMember: function (id) {
        const db = getDB();
        const m = db.miembros.find(m => m.id === parseInt(id));
        if (m) {
            const plantilla = db.plantillas.find(p => p.id === parseInt(m.plantilla_id));
            return {
                ...m,
                nombre_plantilla: plantilla ? plantilla.nombre_plantilla : "Sin Asignar"
            };
        }
        return null;
    },
    addMember: function (member) {
        const db = getDB();
        const nextId = db.miembros.reduce((max, m) => m.id > max ? m.id : max, 0) + 1;
        
        const newMember = {
            id: nextId,
            nombre_completo: member.nombre_completo,
            email: member.email,
            telefono: member.telefono,
            documento_identidad: member.documento_identidad || "",
            fecha_nacimiento: member.fecha_nacimiento || "",
            tipo_miembro: member.tipo_miembro,
            plantilla_id: member.plantilla_id ? parseInt(member.plantilla_id) : null,
            dorsal: member.dorsal ? parseInt(member.dorsal) : null,
            posicion: member.posicion || "",
            estado_miembro: member.estado_miembro || "Activo",
            fecha_ingreso: member.fecha_ingreso || new Date().toISOString().split('T')[0]
        };
        
        db.miembros.push(newMember);
        saveDB(db);
        
        const currentUser = this.getCurrentUser();
        this.addActivity(`Miembro registrado: ${newMember.nombre_completo}`, currentUser ? currentUser.username : "Sistema");
        
        return newMember;
    },
    updateMember: function (id, memberData) {
        const db = getDB();
        const idx = db.miembros.findIndex(m => m.id === parseInt(id));
        if (idx !== -1) {
            db.miembros[idx] = {
                ...db.miembros[idx],
                nombre_completo: memberData.nombre_completo,
                email: memberData.email,
                telefono: memberData.telefono,
                documento_identidad: memberData.documento_identidad,
                fecha_nacimiento: memberData.fecha_nacimiento,
                tipo_miembro: memberData.tipo_miembro,
                plantilla_id: memberData.plantilla_id ? parseInt(memberData.plantilla_id) : null,
                dorsal: memberData.dorsal ? parseInt(memberData.dorsal) : null,
                posicion: memberData.posicion || "",
                estado_miembro: memberData.estado_miembro,
                fecha_ingreso: memberData.fecha_ingreso
            };
            saveDB(db);
            
            const currentUser = this.getCurrentUser();
            this.addActivity(`Miembro actualizado: ${db.miembros[idx].nombre_completo}`, currentUser ? currentUser.username : "Sistema");
            return db.miembros[idx];
        }
        return null;
    },
    deleteMember: function (id) {
        const db = getDB();
        const idx = db.miembros.findIndex(m => m.id === parseInt(id));
        if (idx !== -1) {
            const deleted = db.miembros.splice(idx, 1)[0];
            
            // Eliminar de los pagos
            db.pagos = db.pagos.filter(p => p.miembro_id !== parseInt(id));
            // Eliminar estadísticas
            db.estadisticas_jugador = db.estadisticas_jugador.filter(s => s.miembro_id !== parseInt(id));
            
            saveDB(db);
            
            const currentUser = this.getCurrentUser();
            this.addActivity(`Miembro eliminado: ${deleted.nombre_completo}`, currentUser ? currentUser.username : "Sistema");
            return true;
        }
        return false;
    },

    // ---- CATEGORIAS / PLANTILLAS ----
    getCategories: function () {
        return getDB().plantillas;
    },
    getCategory: function (id) {
        return getDB().plantillas.find(p => p.id === parseInt(id)) || null;
    },
    addCategory: function (cat) {
        const db = getDB();
        const nextId = db.plantillas.reduce((max, p) => p.id > max ? p.id : max, 0) + 1;
        const newCat = {
            id: nextId,
            nombre_plantilla: cat.nombre_plantilla,
            categoria_edad: cat.categoria_edad || "",
            descripcion: cat.descripcion || "",
            entrenador_principal_id: cat.entrenador_principal_id ? parseInt(cat.entrenador_principal_id) : null,
            horario_entrenamiento_habitual: cat.horario_entrenamiento_habitual || "",
            campo_entrenamiento_asignado: cat.campo_entrenamiento_asignado || "",
            estado_plantilla: cat.estado_plantilla || "Activa"
        };
        db.plantillas.push(newCat);
        saveDB(db);
        
        const currentUser = this.getCurrentUser();
        this.addActivity(`Categoría agregada: ${newCat.nombre_plantilla}`, currentUser ? currentUser.username : "Sistema");
        
        return newCat;
    },
    updateCategory: function (id, catData) {
        const db = getDB();
        const idx = db.plantillas.findIndex(p => p.id === parseInt(id));
        if (idx !== -1) {
            db.plantillas[idx] = {
                ...db.plantillas[idx],
                nombre_plantilla: catData.nombre_plantilla,
                categoria_edad: catData.categoria_edad || "",
                descripcion: catData.descripcion || "",
                entrenador_principal_id: catData.entrenador_principal_id ? parseInt(catData.entrenador_principal_id) : null,
                horario_entrenamiento_habitual: catData.horario_entrenamiento_habitual || "",
                campo_entrenamiento_asignado: catData.campo_entrenamiento_asignado || "",
                estado_plantilla: catData.estado_plantilla || "Activa"
            };
            saveDB(db);
            
            const currentUser = this.getCurrentUser();
            this.addActivity(`Categoría actualizada: ${catData.nombre_plantilla}`, currentUser ? currentUser.username : "Sistema");
            return db.plantillas[idx];
        }
        return null;
    },
    deleteCategory: function (id) {
        const db = getDB();
        const idx = db.plantillas.findIndex(p => p.id === parseInt(id));
        if (idx !== -1) {
            const deleted = db.plantillas.splice(idx, 1)[0];
            
            // Quitar asignación de plantillas a los miembros
            db.miembros.forEach(m => {
                if (m.plantilla_id === parseInt(id)) {
                    m.plantilla_id = null;
                }
            });
            
            saveDB(db);
            
            const currentUser = this.getCurrentUser();
            this.addActivity(`Categoría eliminada: ${deleted.nombre_plantilla}`, currentUser ? currentUser.username : "Sistema");
            return true;
        }
        return false;
    },

    // ---- EVENTOS ----
    getEvents: function () {
        return getDB().eventos;
    },
    getEvent: function (id) {
        return getDB().eventos.find(e => e.id === parseInt(id)) || null;
    },
    addEvent: function (event) {
        const db = getDB();
        const nextId = db.eventos.reduce((max, e) => e.id > max ? e.id : max, 0) + 1;
        const newEvent = {
            id: nextId,
            nombre: event.nombre,
            tipo_evento: event.tipo_evento,
            fecha_inicio: event.fecha_inicio,
            fecha_fin: event.fecha_fin || event.fecha_inicio,
            hora_inicio: event.hora_inicio || "00:00:00",
            hora_fin: event.hora_fin || "00:00:00",
            categoria: event.categoria || "",
            lugar: event.lugar || "",
            estado: event.estado || "Programado"
        };
        db.eventos.push(newEvent);
        saveDB(db);
        
        const currentUser = this.getCurrentUser();
        this.addActivity(`Evento creado: ${newEvent.nombre}`, currentUser ? currentUser.username : "Sistema");
        
        return newEvent;
    },
    updateEvent: function (id, eventData) {
        const db = getDB();
        const idx = db.eventos.findIndex(e => e.id === parseInt(id));
        if (idx !== -1) {
            db.eventos[idx] = {
                ...db.eventos[idx],
                nombre: eventData.nombre,
                tipo_evento: eventData.tipo_evento,
                fecha_inicio: eventData.fecha_inicio,
                fecha_fin: eventData.fecha_fin || eventData.fecha_inicio,
                hora_inicio: eventData.hora_inicio,
                hora_fin: eventData.hora_fin,
                categoria: eventData.categoria,
                lugar: eventData.lugar,
                estado: eventData.estado
            };
            saveDB(db);
            
            const currentUser = this.getCurrentUser();
            this.addActivity(`Evento actualizado: ${eventData.nombre}`, currentUser ? currentUser.username : "Sistema");
            return db.eventos[idx];
        }
        return null;
    },
    deleteEvent: function (id) {
        const db = getDB();
        const idx = db.eventos.findIndex(e => e.id === parseInt(id));
        if (idx !== -1) {
            const deleted = db.eventos.splice(idx, 1)[0];
            saveDB(db);
            
            const currentUser = this.getCurrentUser();
            this.addActivity(`Evento eliminado: ${deleted.nombre}`, currentUser ? currentUser.username : "Sistema");
            return true;
        }
        return false;
    },

    // ---- PAGOS ----
    getPayments: function () {
        const db = getDB();
        return db.pagos.map(p => {
            const miembro = db.miembros.find(m => m.id === parseInt(p.miembro_id));
            return {
                ...p,
                nombre_miembro: miembro ? miembro.nombre_completo : "Miembro Desconocido"
            };
        });
    },
    getPayment: function (id) {
        const db = getDB();
        const p = db.pagos.find(p => p.id === parseInt(id));
        if (p) {
            const miembro = db.miembros.find(m => m.id === parseInt(p.miembro_id));
            return {
                ...p,
                nombre_miembro: miembro ? miembro.nombre_completo : "Miembro Desconocido"
            };
        }
        return null;
    },
    addPayment: function (pago) {
        const db = getDB();
        const nextId = db.pagos.reduce((max, p) => p.id > max ? p.id : max, 0) + 1;
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0];
        
        const newPago = {
            id: nextId,
            miembro_id: parseInt(pago.miembro_id),
            concepto: pago.concepto,
            monto: parseFloat(pago.monto),
            fecha_pago: pago.fecha_pago || now.toISOString().split('T')[0],
            metodo_pago: pago.metodo_pago || "",
            referencia: pago.referencia || "",
            estado: pago.estado || "Pendiente",
            registrado_por: this.getCurrentUser() ? this.getCurrentUser().username : "Sistema",
            notas_adicionales: pago.notas_adicionales || "",
            fecha_registro: formattedDate
        };
        
        db.pagos.push(newPago);
        saveDB(db);
        
        const miembro = db.miembros.find(m => m.id === newPago.miembro_id);
        const nombre = miembro ? miembro.nombre_completo : "Miembro";
        this.addActivity(`Pago registrado para ${nombre} ($${newPago.monto.toFixed(2)})`, newPago.registrado_por);
        
        return newPago;
    },
    updatePayment: function (id, pagoData) {
        const db = getDB();
        const idx = db.pagos.findIndex(p => p.id === parseInt(id));
        if (idx !== -1) {
            db.pagos[idx] = {
                ...db.pagos[idx],
                miembro_id: parseInt(pagoData.miembro_id),
                concepto: pagoData.concepto,
                monto: parseFloat(pagoData.monto),
                fecha_pago: pagoData.fecha_pago,
                metodo_pago: pagoData.metodo_pago,
                referencia: pagoData.referencia,
                estado: pagoData.estado,
                notas_adicionales: pagoData.notas_adicionales
            };
            saveDB(db);
            
            const miembro = db.miembros.find(m => m.id === db.pagos[idx].miembro_id);
            const nombre = miembro ? miembro.nombre_completo : "Miembro";
            const currentUser = this.getCurrentUser();
            this.addActivity(`Pago actualizado para ${nombre}`, currentUser ? currentUser.username : "Sistema");
            return db.pagos[idx];
        }
        return null;
    },
    confirmPayment: function (id, metodo, referencia) {
        const db = getDB();
        const idx = db.pagos.findIndex(p => p.id === parseInt(id));
        if (idx !== -1) {
            db.pagos[idx].estado = "Completado";
            db.pagos[idx].fecha_pago = new Date().toISOString().split('T')[0];
            db.pagos[idx].metodo_pago = metodo || "Efectivo";
            db.pagos[idx].referencia = referencia || "REF-" + Math.floor(Math.random() * 90000 + 10000);
            
            saveDB(db);
            
            const miembro = db.miembros.find(m => m.id === db.pagos[idx].miembro_id);
            const nombre = miembro ? miembro.nombre_completo : "Miembro";
            const currentUser = this.getCurrentUser();
            this.addActivity(`Pago confirmado para ${nombre} (Concepto: ${db.pagos[idx].concepto})`, currentUser ? currentUser.username : "Sistema");
            return db.pagos[idx];
        }
        return null;
    },
    deletePayment: function (id) {
        const db = getDB();
        const idx = db.pagos.findIndex(p => p.id === parseInt(id));
        if (idx !== -1) {
            const deleted = db.pagos.splice(idx, 1)[0];
            saveDB(db);
            
            const miembro = db.miembros.find(m => m.id === deleted.miembro_id);
            const nombre = miembro ? miembro.nombre_completo : "Miembro";
            const currentUser = this.getCurrentUser();
            this.addActivity(`Pago eliminado para ${nombre} ($${deleted.monto.toFixed(2)})`, currentUser ? currentUser.username : "Sistema");
            return true;
        }
        return false;
    },

    // ---- ESTADISTICAS DE JUGADORES ----
    getStatsByPlayer: function (playerId) {
        return getDB().estadisticas_jugador.filter(s => s.miembro_id === parseInt(playerId)) || [];
    },
    getStat: function (id) {
        return getDB().estadisticas_jugador.find(s => s.id === parseInt(id)) || null;
    },
    addStat: function (stat) {
        const db = getDB();
        const nextId = db.estadisticas_jugador.reduce((max, s) => s.id > max ? s.id : max, 0) + 1;
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0];
        
        const newStat = {
            id: nextId,
            miembro_id: parseInt(stat.miembro_id),
            temporada: stat.temporada,
            partidos_jugados: parseInt(stat.partidos_jugados) || 0,
            minutos_jugados: parseInt(stat.minutos_jugados) || 0,
            goles_anotados: parseInt(stat.goles_anotados) || 0,
            asistencias: parseInt(stat.asistencias) || 0,
            pases_intentados: parseInt(stat.pases_intentados) || 0,
            pases_completados: parseInt(stat.pases_completados) || 0,
            recuperaciones: parseInt(stat.recuperaciones) || 0,
            tarjetas_amarillas: parseInt(stat.tarjetas_amarillas) || 0,
            tarjetas_rojas: parseInt(stat.tarjetas_rojas) || 0,
            lesiones_sufridas: parseInt(stat.lesiones_sufridas) || 0,
            notas_rendimiento: stat.notas_rendimiento || "",
            fecha_ultima_actualizacion: formattedDate
        };
        
        db.estadisticas_jugador.push(newStat);
        saveDB(db);
        
        const jugador = db.miembros.find(m => m.id === newStat.miembro_id);
        const nombre = jugador ? jugador.nombre_completo : "Jugador";
        const currentUser = this.getCurrentUser();
        this.addActivity(`Estadísticas añadidas para ${nombre} (${stat.temporada})`, currentUser ? currentUser.username : "Sistema");
        
        return newStat;
    },
    updateStat: function (id, statData) {
        const db = getDB();
        const idx = db.estadisticas_jugador.findIndex(s => s.id === parseInt(id));
        if (idx !== -1) {
            const now = new Date();
            const formattedDate = now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0];
            
            db.estadisticas_jugador[idx] = {
                ...db.estadisticas_jugador[idx],
                temporada: statData.temporada,
                partidos_jugados: parseInt(statData.partidos_jugados) || 0,
                minutos_jugados: parseInt(statData.minutos_jugados) || 0,
                goles_anotados: parseInt(statData.goles_anotados) || 0,
                asistencias: parseInt(statData.asistencias) || 0,
                pases_intentados: parseInt(statData.pases_intentados) || 0,
                pases_completados: parseInt(statData.pases_completados) || 0,
                recuperaciones: parseInt(statData.recuperaciones) || 0,
                tarjetas_amarillas: parseInt(statData.tarjetas_amarillas) || 0,
                tarjetas_rojas: parseInt(statData.tarjetas_rojas) || 0,
                lesiones_sufridas: parseInt(statData.lesiones_sufridas) || 0,
                notas_rendimiento: statData.notas_rendimiento || "",
                fecha_ultima_actualizacion: formattedDate
            };
            saveDB(db);
            
            const jugador = db.miembros.find(m => m.id === db.estadisticas_jugador[idx].miembro_id);
            const nombre = jugador ? jugador.nombre_completo : "Jugador";
            const currentUser = this.getCurrentUser();
            this.addActivity(`Estadísticas actualizadas para ${nombre}`, currentUser ? currentUser.username : "Sistema");
            return db.estadisticas_jugador[idx];
        }
        return null;
    },
    deleteStat: function (id) {
        const db = getDB();
        const idx = db.estadisticas_jugador.findIndex(s => s.id === parseInt(id));
        if (idx !== -1) {
            const deleted = db.estadisticas_jugador.splice(idx, 1)[0];
            saveDB(db);
            
            const jugador = db.miembros.find(m => m.id === deleted.miembro_id);
            const nombre = jugador ? jugador.nombre_completo : "Jugador";
            const currentUser = this.getCurrentUser();
            this.addActivity(`Estadísticas eliminadas para ${nombre} (${deleted.temporada})`, currentUser ? currentUser.username : "Sistema");
            return true;
        }
        return false;
    },

    // ---- HISTORIAL DE ACTIVIDAD ----
    getActivities: function () {
        const db = getDB();
        // Ordenadas por fecha DESC
        return db.actividad.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    },
    addActivity: function (accion, usuario) {
        const db = getDB();
        const nextId = db.actividad.reduce((max, a) => a.id > max ? a.id : max, 0) + 1;
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0];
        
        const newAct = {
            id: nextId,
            accion: accion,
            fecha: formattedDate,
            usuario: usuario || "Invitado"
        };
        
        db.actividad.push(newAct);
        
        // Mantener solo las últimas 30 actividades
        if (db.actividad.length > 30) {
            db.actividad.sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); // ASC
            db.actividad.shift(); // Elimina la más vieja
        }
        
        saveDB(db);
        return newAct;
    }
};

window.MockDB = MockDB;
