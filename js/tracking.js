/**
 * JR MULTISERVICIOS CHUGUR SRL
 * Sistema Interactivo de Rastreo Satelital y Envíos en Tiempo Real
 */

const mockTrackingDB = {
  "JR-78452": {
    guide: "JR-78452",
    status: "in_transit",
    statusText: "En Tránsito - Monitoreo GPS Activo",
    badgeClass: "badge-warning",
    service: "Transporte MATPEL (Materiales Peligrosos - Clase 8)",
    commodity: "Ácido Sulfúrico Grado Minero (Cisterna Inox 316L)",
    origin: "Planta Industrial - Callao, Lima",
    destination: "Unidad Minera Cerro Verde - Arequipa",
    sender: "Química Industrial del Pacífico S.A.",
    receiver: "Sociedad Minera Cerro Verde S.A.A.",
    dispatchDate: "13 Oct 2026, 04:30 AM",
    estimatedArrival: "15 Oct 2026, 11:30 AM",
    driver: "Carlos Mendoza Villalobos (Lic. A-IIIc | Cert. MATPEL Cat. IV)",
    truck: "Tracto Volvo FH16 6x4 (650 HP) - Retarder Voith",
    plate: "F4T-892 / Cisterna: B7N-985",
    currentLocation: "Panamericana Sur Km 415, Palpa - Rumbo a Camaná",
    speed: "58 km/h (Dentro del límite de seguridad MATPEL)",
    temperature: "19.5 °C (Sensor de Cisterna Normal)",
    progressPercent: 68,
    timeline: [
      {
        step: "Despacho y Salida de Planta",
        location: "Base Callao, Lima",
        time: "13 Oct 2026 - 04:30 hrs",
        status: "completed",
        desc: "Inspección pre-operacional 360°, check-list MATPEL, precintado de seguridad y prueba de alcoholemia negativa.",
        icon: "fa-box-check"
      },
      {
        step: "Control de Garita y Telemetría",
        location: "Pucusana Km 58, Lima Sur",
        time: "13 Oct 2026 - 06:45 hrs",
        status: "completed",
        desc: "Validación de plan de ruta satelital y calibración de escolta de seguridad vial.",
        icon: "fa-shield-halved"
      },
      {
        step: "Punto de Relevo y Descanso Reglamentario",
        location: "Ica - Estación de Control Segura JR",
        time: "13 Oct 2026 - 13:20 hrs",
        status: "completed",
        desc: "Pausa activa obligatoria de 45 minutos. Monitoreo de fatiga ADAS OK.",
        icon: "fa-bed"
      },
      {
        step: "En Tránsito Carretero Activo",
        location: "Palpa Km 415, Ica / Arequipa",
        time: "14 Oct 2026 - 18:30 hrs (Actual)",
        status: "current",
        desc: "Vehículo en desplazamiento continuo con escolta. Parámetros de telemetría y presión normales.",
        icon: "fa-truck-fast"
      },
      {
        step: "Entrega Final y Descarga en Mina",
        location: "Garita de Control U.M. Cerro Verde, Arequipa",
        time: "15 Oct 2026 - 11:30 hrs (Estimado)",
        status: "pending",
        desc: "Descarga especializada bajo protocolo HSE y firma de Guía Remitente electrónica.",
        icon: "fa-location-dot"
      }
    ]
  },
  "JR-90214": {
    guide: "JR-90214",
    status: "delivered",
    statusText: "Envío Entregado a Conformidad",
    badgeClass: "badge-success",
    service: "Transporte Carga Sobredimensionada Especial",
    commodity: "Excavadora Minera CAT 349 (Cama Baja 4 Ejes)",
    origin: "Taller Central Ferreyros - Callao",
    destination: "Campamento Minero Chugur - Cajamarca",
    sender: "Consorcio Vial Andino",
    receiver: "JR Multiservicios Chugur SRL / Unidad Minera Tantahuatay",
    dispatchDate: "10 Oct 2026, 06:00 AM",
    estimatedArrival: "13 Oct 2026, 16:45 PM",
    driver: "Wilmer Alarcón Silva (Especialista en Cama Bajas)",
    truck: "Kenworth T800 6x4 Heavy Duty - Cama Baja Randon",
    plate: "T9A-812 / Plataforma: Z2M-910",
    currentLocation: "Entregado en Patio de Operaciones Chugur, Cajamarca",
    speed: "0 km/h (Operación Concluida)",
    temperature: "N/A",
    progressPercent: 100,
    timeline: [
      {
        step: "Carguío y Aseguramiento Técnico",
        location: "Base Callao, Lima",
        time: "10 Oct 2026 - 06:00 hrs",
        status: "completed",
        desc: "Trincaje con cadenas de aleación grado 100, cálculo de centro de gravedad y permiso MTC.",
        icon: "fa-dolly"
      },
      {
        step: "Tránsito Panamericana Norte con Escolta",
        location: "Barranca - Huarmey",
        time: "11 Oct 2026 - 14:15 hrs",
        status: "completed",
        desc: "Paso coordinado con camioneta liebre y semáforos auxiliares.",
        icon: "fa-road"
      },
      {
        step: "Ascenso a la Sierra Cajamarquina",
        location: "Ciudad de Dios - Chilete - Cajamarca",
        time: "12 Oct 2026 - 11:00 hrs",
        status: "completed",
        desc: "Ascenso seguro a 3,200 msnm con tracción continua y chequeo de frenos.",
        icon: "fa-mountain"
      },
      {
        step: "Descarga y Entrega Conforme",
        location: "Patio Industrial Chugur, Cajamarca",
        time: "13 Oct 2026 - 16:45 hrs",
        status: "completed",
        desc: "Recepción técnica sin novedades, acta de entrega conforme y cierre de guía satelital.",
        icon: "fa-circle-check"
      }
    ]
  },
  "JR-33108": {
    guide: "JR-33108",
    status: "in_transit",
    statusText: "En Punto de Control / Garita de Peaje",
    badgeClass: "badge-warning",
    service: "Transporte de Hidrocarburos y Combustibles",
    commodity: "Diesel B5 S-50 (Cisterna 11,500 Galones)",
    origin: "Refinería La Pampilla - Ventanilla, Callao",
    destination: "Base de Operaciones Yanacocha - Cajamarca",
    sender: "Distribuidora PetroPerú Energía",
    receiver: "Minera Yanacocha S.R.L.",
    dispatchDate: "14 Oct 2026, 02:00 AM",
    estimatedArrival: "16 Oct 2026, 08:00 AM",
    driver: "Jorge Díaz Huamán (Certificación MATPEL Combustibles)",
    truck: "Scania R540 6x4 V8 - Opticruise",
    plate: "C8V-714 / Cisterna: M1X-442",
    currentLocation: "Peaje de Chicama Km 600, La Libertad",
    speed: "45 km/h",
    temperature: "21.0 °C",
    progressPercent: 45,
    timeline: [
      {
        step: "Carga en Planta y Verificación de Sellos",
        location: "Refinería Callao",
        time: "14 Oct 2026 - 02:00 hrs",
        status: "completed",
        desc: "Llenado de 11,500 galones con válvula de fondo y precintos electrónicos.",
        icon: "fa-gas-pump"
      },
      {
        step: "Control de Peso en Balanza MTC",
        location: "Balanza Huacho Km 140",
        time: "14 Oct 2026 - 06:10 hrs",
        status: "completed",
        desc: "Pesaje conforme dentro de la tolerancia de 48 toneladas brutas.",
        icon: "fa-scale-balanced"
      },
      {
        step: "Paso por Peaje Chicama",
        location: "Chicama Km 600, Trujillo",
        time: "14 Oct 2026 - 17:50 hrs (Actual)",
        status: "current",
        desc: "Control de paso registrado por sensor satelital. Rumbo al desvío de Pacasmayo.",
        icon: "fa-ticket"
      },
      {
        step: "Llegada y Descarga en Tanques Mineros",
        location: "Cajamarca Base Yanacocha",
        time: "16 Oct 2026 - 08:00 hrs (Estimado)",
        status: "pending",
        desc: "Descarga mediante bomba neumática intrínsecamente segura.",
        icon: "fa-flag-checkered"
      }
    ]
  },
  "JR-44890": {
    guide: "JR-44890",
    status: "dispatched",
    statusText: "Despachado - Programado en Patio",
    badgeClass: "badge-info",
    service: "Transporte de Mercancía General e Insumos",
    commodity: "Tuberías de Polietileno HDPE 12 Pulgadas (32 Toneladas)",
    origin: "Almacén Central Lurín - Lima",
    destination: "Proyecto Minero Quellaveco - Moquegua",
    sender: "Tigre Tubos del Perú S.A.",
    receiver: "Anglo American Quellaveco",
    dispatchDate: "14 Oct 2026, 15:00 PM",
    estimatedArrival: "17 Oct 2026, 10:00 AM",
    driver: "Hernán Rojas Campos (Conductor Interprovincial)",
    truck: "Volvo FM 460 6x4 - Plataforma 3 Ejes",
    plate: "B3P-519 / Carreta: A9L-201",
    currentLocation: "Patio Logístico Lurín - En salida hacia Panamericana Sur",
    speed: "20 km/h",
    temperature: "N/A",
    progressPercent: 15,
    timeline: [
      {
        step: "Orden de Despacho y Armado de Carga",
        location: "Base Lurín, Lima",
        time: "14 Oct 2026 - 15:00 hrs",
        status: "completed",
        desc: "Estiba técnica con tacos de madera, fajas rachet de alta tensión y lonas de protección.",
        icon: "fa-clipboard-check"
      },
      {
        step: "Activación de Monitoreo GPS",
        location: "Torre de Control JR Multiservicios Chugur",
        time: "14 Oct 2026 - 16:30 hrs",
        status: "current",
        desc: "Geocerca configurada. Notificación enviada a cliente.",
        icon: "fa-satellite-dish"
      },
      {
        step: "Tránsito Interprovincial Costa Sur",
        location: "Ruta Panamericana Sur hacia Moquegua",
        time: "15 Oct 2026 - En proceso",
        status: "pending",
        desc: "Recorrido estimado de 1,150 km con 2 relevos de conductores.",
        icon: "fa-truck"
      },
      {
        step: "Entrega en Mina Quellaveco",
        location: "Moquegua",
        time: "17 Oct 2026 - 10:00 hrs (Estimado)",
        status: "pending",
        desc: "Inspección de entrega y visado de guías de remisión.",
        icon: "fa-circle-check"
      }
    ]
  }
};

/**
 * Generador dinámico para cualquier número de guía que el usuario escriba
 */
function generateDynamicTracking(guideNumber) {
  const cleanNumber = guideNumber.trim().toUpperCase();
  const today = new Date();
  const dateStr = today.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
  const arrivalDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
  const arrivalStr = arrivalDate.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });

  return {
    guide: cleanNumber,
    status: "in_transit",
    statusText: "En Tránsito - Monitoreo GPS Satelital Activo",
    badgeClass: "badge-warning",
    service: "Transporte Especial de Carga Pesada & MATPEL",
    commodity: "Carga Especial Industrializada y Equipos de Minería",
    origin: "Centro de Despacho Principal - Lima / Chugur",
    destination: "Destino Registrado - Operación Minera e Industrial",
    sender: "Cliente Corporativo Registrado",
    receiver: "Unidad Operativa Destinataria",
    dispatchDate: `${dateStr}, 05:30 hrs`,
    estimatedArrival: `${arrivalStr}, 14:00 hrs`,
    driver: "Conductor Profesional Homologado JR (Cert. MTC & MATPEL)",
    truck: "Tracto-Camión Heavy Duty 6x4 de Última Generación",
    plate: "JRC-772 / Carreta Especializada",
    currentLocation: "Corredor Logístico Nacional - Señal GPS 100% Estable",
    speed: "54 km/h (Velocidad segura y auditada)",
    temperature: "Estable / Sensores Activos",
    progressPercent: 55,
    timeline: [
      {
        step: "Guía Emitida y Despacho Autorizado",
        location: "Planta de Origen",
        time: `${dateStr} - 05:30 hrs`,
        status: "completed",
        desc: "Inspección técnica pre-operacional, verificación de estiba y precintos de seguridad.",
        icon: "fa-box-check"
      },
      {
        step: "Control de Pesaje y Garita MTC",
        location: "Estación de Control Vial Troncal",
        time: `${dateStr} - 09:15 hrs`,
        status: "completed",
        desc: "Pesaje por eje dentro de normativa reglamentaria y validación de hoja de ruta.",
        icon: "fa-scale-balanced"
      },
      {
        step: "En Ruta con Telemetría Activa 24/7",
        location: "En Tránsito Nacional - Vía Asfaltada",
        time: `${dateStr} - Horario Actual`,
        status: "current",
        desc: "Transmisión de coordenadas en tiempo real cada 30 segundos a la central de monitoreo.",
        icon: "fa-truck-fast"
      },
      {
        step: "Próxima Llegada y Descarga en Destino",
        location: "Instalaciones del Cliente",
        time: `${arrivalStr} - 14:00 hrs (Estimado)`,
        status: "pending",
        desc: "Descarga conforme a procedimientos de seguridad y entrega de remisión firmada.",
        icon: "fa-circle-check"
      }
    ]
  };
}

/**
 * Inicializador y manejador del módulo de rastreo
 */
document.addEventListener('DOMContentLoaded', () => {
  const trackingForm = document.getElementById('tracking-form');
  const trackingInput = document.getElementById('tracking-input');
  const trackingResultContainer = document.getElementById('tracking-result');
  const trackingSampleBtns = document.querySelectorAll('.tracking-sample-btn');

  if (!trackingForm || !trackingInput || !trackingResultContainer) return;

  // Manejar click en ejemplos de guía rápida
  trackingSampleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const code = btn.getAttribute('data-code');
      if (code) {
        trackingInput.value = code;
        executeTracking(code);
      }
    });
  });

  // Manejar envío del formulario
  trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = trackingInput.value.trim();
    if (!code) {
      showToast('Por favor, ingresa un número de guía válido (ej: JR-78452)', 'warning');
      trackingInput.focus();
      return;
    }
    executeTracking(code);
  });

  function executeTracking(code, shouldScroll = true) {
    const cleanCode = code.trim().toUpperCase();

    // Mostrar animación de carga
    trackingResultContainer.innerHTML = `
      <div class="tracking-loading">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="mt-3">Conectando con la Torre Satelital de <strong>JR Multiservicios Chugur</strong>...</p>
        <span class="text-muted small">Consultando telemetría GPS y estado de la guía ${cleanCode}</span>
      </div>
    `;
    trackingResultContainer.style.display = 'block';

    // Scroll suave hacia los resultados solo si fue por interacción directa
    if (shouldScroll) {
      trackingResultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Simular latencia de red satelital
    const latency = shouldScroll ? 700 : 100;
    setTimeout(() => {
      const data = mockTrackingDB[cleanCode] || generateDynamicTracking(cleanCode);
      renderTrackingResult(data);
    }, latency);
  }

  // Cargar visualización inicial sin scroll forzado
  executeTracking('JR-78452', false);

  function renderTrackingResult(data) {
    let timelineHTML = '';
    data.timeline.forEach((item, index) => {
      const isCompleted = item.status === 'completed';
      const isCurrent = item.status === 'current';
      const itemClass = isCompleted ? 'timeline-item completed' : (isCurrent ? 'timeline-item current animate-pulse' : 'timeline-item pending');
      const badgeIcon = isCompleted ? 'fa-check' : (isCurrent ? 'fa-satellite-dish' : 'fa-clock');

      timelineHTML += `
        <div class="${itemClass}">
          <div class="timeline-marker">
            <i class="fa-solid ${item.icon || badgeIcon}"></i>
          </div>
          <div class="timeline-content">
            <div class="timeline-header">
              <h5 class="timeline-title">${item.step}</h5>
              <span class="timeline-time"><i class="fa-regular fa-clock me-1"></i>${item.time}</span>
            </div>
            <p class="timeline-location"><i class="fa-solid fa-map-pin me-1 text-danger"></i><strong>${item.location}</strong></p>
            <p class="timeline-desc">${item.desc}</p>
          </div>
        </div>
      `;
    });

    const statusBadgeColors = {
      in_transit: 'bg-warning text-dark',
      delivered: 'bg-success text-white',
      dispatched: 'bg-info text-white',
      pending: 'bg-secondary text-white'
    };
    const badgeBg = statusBadgeColors[data.status] || 'bg-danger text-white';

    const resultCardHTML = `
      <div class="tracking-card">
        <div class="tracking-card-header">
          <div class="header-left">
            <span class="guide-tag">GUÍA DE REMISIÓN ELECTRÓNICA</span>
            <h3 class="guide-number">${data.guide}</h3>
            <span class="badge ${badgeBg} status-badge">
              <span class="status-dot"></span> ${data.statusText}
            </span>
          </div>
          <div class="header-right">
            <button class="btn btn-outline-light btn-sm" onclick="copyTrackingCode('${data.guide}')">
              <i class="fa-regular fa-copy me-1"></i> Copiar Código
            </button>
            <a href="https://api.whatsapp.com/send?phone=51976543210&text=Hola,%20solicito%20soporte%20sobre%20mi%20guía%20${data.guide}" target="_blank" rel="noopener" class="btn btn-danger btn-sm">
              <i class="fa-brands fa-whatsapp me-1"></i> Consultar a Operador
            </a>
          </div>
        </div>

        <!-- Barra de Progreso de Ruta -->
        <div class="tracking-progress-wrapper">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="small font-weight-bold"><i class="fa-solid fa-route me-1 text-danger"></i> Progreso Estimado de Ruta</span>
            <span class="small font-weight-bold text-danger">${data.progressPercent}% completado</span>
          </div>
          <div class="progress custom-progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${data.progressPercent}%;" aria-valuenow="${data.progressPercent}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>

        <!-- Cuadrícula de Información Clave -->
        <div class="tracking-info-grid">
          <div class="info-card">
            <div class="info-icon"><i class="fa-solid fa-box-open text-danger"></i></div>
            <div class="info-details">
              <span class="info-label">Tipo de Servicio y Carga</span>
              <strong class="info-val">${data.service}</strong>
              <small class="text-muted d-block">${data.commodity}</small>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon"><i class="fa-solid fa-map-location-dot text-danger"></i></div>
            <div class="info-details">
              <span class="info-label">Ubicación Actual por GPS</span>
              <strong class="info-val text-primary">${data.currentLocation}</strong>
              <small class="text-muted d-block">Velocidad: ${data.speed}</small>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon"><i class="fa-solid fa-calendar-check text-danger"></i></div>
            <div class="info-details">
              <span class="info-label">Fecha Estimada de Llegada (ETA)</span>
              <strong class="info-val text-success">${data.estimatedArrival}</strong>
              <small class="text-muted d-block">Despachado: ${data.dispatchDate}</small>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon"><i class="fa-solid fa-truck-monster text-danger"></i></div>
            <div class="info-details">
              <span class="info-label">Unidad de Transporte y Conductor</span>
              <strong class="info-val">${data.plate}</strong>
              <small class="text-muted d-block">${data.driver}</small>
            </div>
          </div>
        </div>

        <!-- Ruta Detallada Origen -> Destino -->
        <div class="route-box mb-4">
          <div class="row align-items-center">
            <div class="col-md-5">
              <div class="route-point">
                <span class="point-badge bg-dark"><i class="fa-solid fa-play text-white"></i></span>
                <div>
                  <small class="text-muted text-uppercase">Punto de Origen</small>
                  <p class="mb-0 font-weight-bold">${data.origin}</p>
                  <small class="text-muted">Remitente: ${data.sender}</small>
                </div>
              </div>
            </div>
            <div class="col-md-2 text-center py-2">
              <div class="route-arrow-divider">
                <i class="fa-solid fa-arrows-turn-right text-danger fs-4"></i>
              </div>
            </div>
            <div class="col-md-5">
              <div class="route-point">
                <span class="point-badge bg-danger"><i class="fa-solid fa-flag-checkered text-white"></i></span>
                <div>
                  <small class="text-muted text-uppercase">Punto de Destino</small>
                  <p class="mb-0 font-weight-bold">${data.destination}</p>
                  <small class="text-muted">Consignatario: ${data.receiver}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Línea de Tiempo de Hitos (Timeline) -->
        <div class="timeline-section">
          <h4 class="timeline-main-title">
            <i class="fa-solid fa-timeline me-2 text-danger"></i>Historial de Hitos de Despacho y Puntos de Control
          </h4>
          <div class="custom-timeline">
            ${timelineHTML}
          </div>
        </div>

        <div class="tracking-footer">
          <div class="security-seal">
            <i class="fa-solid fa-shield-check text-success me-2"></i>
            <span>Auditoría de Ruta con Telemetría Dual GPS y Sensor Antifatiga homologado por MTC</span>
          </div>
          <button class="btn btn-outline-secondary btn-sm" onclick="printTracking('${data.guide}')">
            <i class="fa-solid fa-print me-1"></i> Imprimir Reporte de Ruta
          </button>
        </div>
      </div>
    `;

    trackingResultContainer.innerHTML = resultCardHTML;
  }
});

// Helper para copiar código
window.copyTrackingCode = function(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`Código de guía ${code} copiado al portapapeles`, 'success');
  }).catch(() => {
    showToast(`Código: ${code}`, 'info');
  });
};

// Helper para imprimir reporte
window.printTracking = function(code) {
  window.print();
};
