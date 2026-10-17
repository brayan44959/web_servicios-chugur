/**
 * JR MULTISERVICIOS CHUGUR SRL
 * Script Principal - Interactividad, Animaciones, Filtros, Cotizador y Modales
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initCounters();
  initFleetFilters();
  initFleetModal();
  initFaqAccordion();
  initTestimonialSlider();
  initCoverageSelector();
  initQuoteCalculator();
  initContactForm();
  initScrollAnimations();
  initBackToTop();
  initWhatsAppWidget();
});

/* ==========================================================================
   1. TEMA CLARO / OSCURO (DARK MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const storedTheme = localStorage.getItem('jr_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(activeTheme);
      localStorage.setItem('jr_theme', activeTheme);
      showToast(`Modo ${activeTheme === 'dark' ? 'Oscuro' : 'Claro'} activado`, 'info');
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }
}

/* ==========================================================================
   2. NAVBAR & NAVEGACIÓN MÓVIL & SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const navToggle = document.getElementById('navbar-toggle');
  const navMenu = document.getElementById('navbar-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar con sombra al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    updateActiveNavLink();
  });

  // Toggle Menú Móvil
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.classList.toggle('is-active');
      document.body.classList.toggle('no-scroll', isOpen);
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Scroll Spy: Destacar enlace activo
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   3. CONTADORES ESTADÍSTICOS ANIMADOS (SOBRE NOSOTROS)
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
              clearInterval(timer);
            } else {
              counter.textContent = `${prefix}${Math.floor(current).toLocaleString()}${suffix}`;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.getElementById('stats-container');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   4. FILTROS DE LA FLOTA VEHICULAR
   ========================================================================== */
function initFleetFilters() {
  const filterBtns = document.querySelectorAll('.fleet-filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card-col');

  if (!filterBtns.length || !fleetCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      fleetCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   5. MODAL DE FICHA TÉCNICA DE VEHÍCULOS
   ========================================================================== */
const fleetDetailsData = {
  "cama-baja-120": {
    name: "Cama Baja Hidráulica Multiejes (Lowboy Desmontable)",
    category: "Carga Pesada & Sobredimensionada",
    capacity: "Hasta 120 Toneladas Métricas",
    axles: "4 a 6 Ejes Direccionales con Suspensión Neumática",
    dimensions: "Largo de cama: 14.50 m | Ancho: 3.20 m (expandible a 3.80 m)",
    brakeSystem: "Freno Auxiliar Retarder Voith Hidráulico + Frenos ABS/EBS Wabco",
    towingUnit: "Tracto Volvo FH16 6x4 (650 HP) / Kenworth T800 Heavy Duty",
    safetyGear: "Cuñas antideslizamiento, sensores de presión de inflado TPMS, cadenas grado 100 y señalética luminosa LED de sobreancho MTC.",
    idealCargo: "Excavadoras mineras de 50 a 90 Tn, palas hidráulicas, molinos de bolas, transformadores de subestaciones y estructuras industriales.",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80"
  },
  "cisterna-matpel": {
    name: "Cisterna MATPEL de Acero Inoxidable 316L Calidad Alimentaria / Química",
    category: "Materiales Peligrosos (MATPEL Clases 3, 5, 6, 8 y 9)",
    capacity: "11,500 Galones (Aprox. 43,500 Litros) / 3 Compartimentos",
    axles: "3 Ejes con suspensión de aire y válvulas de venteo de presión y vacío",
    dimensions: "Largo total: 13.20 m | Diámetro elíptico regulado DOT 407/412",
    brakeSystem: "Sistema de frenado electrónico EBS con control de estabilidad antivuelco (RSP)",
    towingUnit: "Scania R540 6x4 Euro 5 / Volvo FM 460 con escape apagachispas homologado",
    safetyGear: "Kit de emergencias MATPEL Nivel 3, válvulas de corte rápido por impacto, sistema de puesta a tierra electrostática, extintores PQS 12kg y kit antiderrame certificado.",
    idealCargo: "Ácido sulfúrico concentrado, combustible Diesel B5 S-50, cianuro de sodio en solución, lubricantes pesados y reactivos para flotación minera.",
    image: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=1000&q=80"
  },
  "modulares-especiales": {
    name: "Plataformas Modulares Hidráulicas de Líneas de Ejes",
    category: "Super Carga y Proyectos Megamineros",
    capacity: "Hasta 300 Toneladas Métricas Combinadas",
    axles: "8 a 16 Líneas de Ejes Pendulares con Compensación Hidráulica de Carga",
    dimensions: "Configuraciones modulares acoplables longitudinal y lateralmente",
    brakeSystem: "Frenado de servicio hidroneumático de alta respuesta integral",
    towingUnit: "Doble o Triple Tracción con Tracto Balastro Push-Pull 6x6 / 8x4",
    safetyGear: "Control remoto de nivelación electrónica, escolta con señalética estroboscópica y radios de banda cerrada HF/VHF.",
    idealCargo: "Módulos de plantas desalinizadoras, autotransformadores de potencia de 150 Tn, tambores de chancado y palas electromecánicas.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80"
  },
  "trailer-plataforma": {
    name: "Tráiler Plataforma con Barandas Rebatibles y Porta Contenedor",
    category: "Mercancías Generales y Estructuras",
    capacity: "32 a 35 Toneladas Métricas",
    axles: "3 Ejes Tubulares de Gran Resistencia con Eje Retráctil",
    dimensions: "Largo: 13.50 m | Ancho: 2.60 m con Seguro Twist-Locks para Contenedor de 20' y 40'",
    brakeSystem: "Frenos de aire tipo leva S con tambor de alta durabilidad y ABS",
    towingUnit: "Volvo FM 420 6x4 / Freightliner Cascadia DD15",
    safetyGear: "Fajas rachet de 4 pulgadas certificadas, tacos de goma, mallas de protección y lonas impermeables de alta resistencia.",
    idealCargo: "Tuberías HDPE, varillas de acero corrugado, cemento a granel embolsado, geomembranas y repuestos para maquinaria pesada.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80"
  },
  "furgon-isotermico": {
    name: "Furgón Cerrado de Carga Seca e Isotérmico",
    category: "Insumos Críticos, Carga Consolidada y Alta Seguridad",
    capacity: "15 a 25 Toneladas / Volumen de 85 m³",
    axles: "2 a 3 Ejes con Suspensión Neumática Suave",
    dimensions: "Largo: 12.00 m | Alto interior: 2.70 m | Ancho: 2.50 m",
    brakeSystem: "ABS + Control de Tracción y Sistema de Asistencia de Frenada de Emergencia",
    towingUnit: "Mercedes-Benz Actros 2645 / International LT",
    safetyGear: "Cerradura satelital blindada de apertura remota por geocerca, sensores de apertura de puerta y cámara interior de monitoreo.",
    idealCargo: "Explosivos e iniciadores para minería, lubricantes en bidones, componentes electrónicos sensibles y repuestos de alto valor.",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=80"
  },
  "camion-ligero-escolta": {
    name: "Camión Ligero / Mediano y Unidades de Escolta MTC",
    category: "Distribución Urbana, Reparto Expreso y Escolta Técnica",
    capacity: "5 a 10 Toneladas / Rampa Hidráulica de 2 Tn",
    axles: "2 Ejes rígidos reforzados",
    dimensions: "Largo de carrocería: 6.50 m | Ancho: 2.30 m",
    brakeSystem: "Freno hidráulico asistido por vacío y freno motor",
    towingUnit: "Hino 500 / Isuzu Forward / Camioneta Toyota Hilux 4x4 Escolta",
    safetyGear: "Barra antivuelco certificada, faro pirata buscador, sirena reglamentaria MTC y kit de primeros auxilios avanzado.",
    idealCargo: "Distribución de repuestos urgentes de planta, última milla en ciudades andinas y custodia de convoyes sobredimensionados.",
    image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=1000&q=80"
  }
};

function initFleetModal() {
  const modal = document.getElementById('fleet-modal');
  const modalCloseBtns = document.querySelectorAll('.close-fleet-modal');
  const viewDetailBtns = document.querySelectorAll('.view-fleet-detail');

  if (!modal) return;

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const vehicleKey = btn.getAttribute('data-vehicle');
      const data = fleetDetailsData[vehicleKey];

      if (data) {
        document.getElementById('modal-fleet-name').textContent = data.name;
        document.getElementById('modal-fleet-category').textContent = data.category;
        document.getElementById('modal-fleet-capacity').textContent = data.capacity;
        document.getElementById('modal-fleet-axles').textContent = data.axles;
        document.getElementById('modal-fleet-dimensions').textContent = data.dimensions;
        document.getElementById('modal-fleet-brakes').textContent = data.brakeSystem;
        document.getElementById('modal-fleet-towing').textContent = data.towingUnit;
        document.getElementById('modal-fleet-safety').textContent = data.safetyGear;
        document.getElementById('modal-fleet-cargo').textContent = data.idealCargo;
        document.getElementById('modal-fleet-image').src = data.image;
        document.getElementById('modal-fleet-image').alt = data.name;

        // Asignar vehículo a cotización directa
        const quoteBtn = document.getElementById('modal-fleet-quote-btn');
        if (quoteBtn) {
          quoteBtn.href = `#cotizador`;
          quoteBtn.onclick = () => {
            closeModal();
            const serviceSelect = document.getElementById('quote-service');
            if (serviceSelect) {
              if (vehicleKey.includes('cama-baja') || vehicleKey.includes('modular')) {
                serviceSelect.value = 'sobredimensionada';
              } else if (vehicleKey.includes('cisterna')) {
                serviceSelect.value = 'matpel';
              } else {
                serviceSelect.value = 'general';
              }
            }
          };
        }

        openModal();
      }
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  function openModal() {
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
}

/* ==========================================================================
   6. PREGUNTAS FRECUENTES (FAQ ACORDEÓN)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Cerrar todos los demás
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = null;
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          }
        });

        // Alternar el actual
        if (!isOpen) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        } else {
          item.classList.remove('active');
          answer.style.maxHeight = null;
          question.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
}

/* ==========================================================================
   7. SLIDER / TESTIMONIOS INTERACTIVOS
   ========================================================================== */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dotsContainer = document.getElementById('testimonial-dots');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  // Crear indicadores (dots)
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      dot.setAttribute('aria-label', `Testimonio ${idx + 1}`);
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides.forEach((slide, idx) => {
      slide.classList.remove('active');
      if (idx === index) {
        slide.classList.add('active');
      }
    });

    const dots = document.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    currentIndex = index;
  }

  function nextSlide() {
    let next = currentIndex + 1;
    if (next >= slides.length) next = 0;
    goToSlide(next);
  }

  function prevSlide() {
    let prev = currentIndex - 1;
    if (prev < 0) prev = slides.length - 1;
    goToSlide(prev);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();

  // Pausar al pasar el mouse por encima
  const sliderWrapper = document.querySelector('.testimonials-slider-container');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    sliderWrapper.addEventListener('mouseleave', startAutoplay);
  }
}

/* ==========================================================================
   8. COBERTURA NACIONAL - SELECTOR INTERACTIVO DE REGIONES
   ========================================================================== */
const coverageData = {
  norte: {
    title: "Zona Norte - Base Matriz Chugur & Corredor Cajamarca",
    highlight: "Sede central en Chugur con infraestructura para minería de alta montaña",
    cities: ["Chugur (Base Operativa)", "Cajamarca", "Chiclayo", "Trujillo", "Piura", "Talara", "Tumbes"],
    operations: "Transporte de maquinaria pesada para operaciones mineras (Tantahuatay, La Zanja, Yanacocha), transporte de concentrados, reactivos químicos y combustible Diesel B5.",
    transitTime: "12 a 24 horas continuas",
    fleetAssigned: "85 Unidades Heavy Duty y Cisternas MATPEL",
    supportBase: "Av. San Antonio s/n, Chugur - Cajamarca"
  },
  centro: {
    title: "Zona Centro - Hub Estratégico Callao / Lima & Sierra Central",
    highlight: "Centro neurálgico de recepción marítima y despacho hacia el interior del país",
    cities: ["Lima Metropolitana", "Callao (Puerto & Aeropuerto)", "Huancayo", "La Oroya", "Cerro de Pasco", "Huánuco"],
    operations: "Desaduanaje de componentes industriales sobredimensionados, logística de exportación e importación, distribución urbana y última milla.",
    transitTime: "8 a 18 horas según altitud y permisos MTC",
    fleetAssigned: "95 Plataformas, Tráileres y Camiones Urbanos",
    supportBase: "Av. Néstor Gambetta Km 8.5, Callao, Lima"
  },
  sur: {
    title: "Zona Sur & Corredor Minero (Arequipa - Moquegua - Cusco)",
    highlight: "Especialistas en la ruta de mayor exigencia topográfica y normativa del país",
    cities: ["Arequipa", "Cusco", "Moquegua", "Ilo", "Tacna", "Puno", "Espinar", "Challhuahuacho"],
    operations: "Transporte de ácido sulfúrico a granel para lixiviación, convoyes con escolta para palas y camiones de extracción en Las Bambas, Cerro Verde, Cuajone y Toquepala.",
    transitTime: "24 a 48 horas con paradas programadas y relevos",
    fleetAssigned: "70 Cisternas Inox 316L y Cama Bajas Modulares",
    supportBase: "Parque Industrial Río Seco, Arequipa"
  },
  selva: {
    title: "Zona Oriente & Selva Alta / Baja",
    highlight: "Conexión multimodal hacia proyectos energéticos y viales",
    cities: ["Tarapoto", "Moyobamba", "Pucallpa", "Tingo María", "Iquitos (Fluvial multimodal)"],
    operations: "Transporte de insumos para exploración petrolera, tuberías de acero, maquinaria de movimiento de tierras y proyectos de electrificación rural.",
    transitTime: "36 a 72 horas",
    fleetAssigned: "30 Tráileres Todo Terreno 6x6 y Furgones Reforzados",
    supportBase: "Carretera Fernando Belaúnde Terry Km 45, Tarapoto"
  }
};

function initCoverageSelector() {
  const tabs = document.querySelectorAll('.coverage-tab');
  const titleEl = document.getElementById('coverage-title');
  const highlightEl = document.getElementById('coverage-highlight');
  const citiesEl = document.getElementById('coverage-cities');
  const opsEl = document.getElementById('coverage-ops');
  const timeEl = document.getElementById('coverage-time');
  const fleetEl = document.getElementById('coverage-fleet');
  const baseEl = document.getElementById('coverage-base');

  if (!tabs.length || !titleEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const region = tab.getAttribute('data-region');
      const data = coverageData[region];

      if (data) {
        titleEl.textContent = data.title;
        highlightEl.textContent = data.highlight;
        opsEl.textContent = data.operations;
        timeEl.textContent = data.transitTime;
        fleetEl.textContent = data.fleetAssigned;
        baseEl.textContent = data.supportBase;

        // Renderizar tags de ciudades
        citiesEl.innerHTML = '';
        data.cities.forEach(city => {
          const pill = document.createElement('span');
          pill.className = 'city-pill';
          pill.innerHTML = `<i class="fa-solid fa-location-dot me-1 text-danger"></i>${city}`;
          citiesEl.appendChild(pill);
        });

        // Resaltar en mapa si existen nodos con la clase correspondiente
        document.querySelectorAll('.map-node').forEach(node => {
          if (node.getAttribute('data-region') === region) {
            node.classList.add('node-active');
          } else {
            node.classList.remove('node-active');
          }
        });
      }
    });
  });

  // Permitir hacer clic directo en los nodos del mapa SVG
  document.querySelectorAll('.map-node').forEach(node => {
    node.addEventListener('click', () => {
      const region = node.getAttribute('data-region');
      const targetTab = document.querySelector(`.coverage-tab[data-region="${region}"]`);
      if (targetTab) {
        targetTab.click();
      }
    });
  });
}

/* ==========================================================================
   9. CALCULADORA Y FORMULARIO DE COTIZACIÓN PROFESIONAL
   ========================================================================== */
function initQuoteCalculator() {
  const quoteForm = document.getElementById('quote-form');
  const quoteModal = document.getElementById('quote-modal');
  const closeQuoteModalBtns = document.querySelectorAll('.close-quote-modal');

  if (!quoteForm) return;

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const service = document.getElementById('quote-service').value;
    const origin = document.getElementById('quote-origin').value;
    const destination = document.getElementById('quote-destination').value;
    const weight = document.getElementById('quote-weight').value;
    const name = document.getElementById('quote-name').value;
    const company = document.getElementById('quote-company').value;
    const phone = document.getElementById('quote-phone').value;
    const email = document.getElementById('quote-email').value;
    const notes = document.getElementById('quote-notes').value || 'Sin observaciones adicionales';

    // Opciones adicionales
    const escortChecked = document.getElementById('quote-escort')?.checked ? 'Sí (Escolta Autorizada MTC)' : 'No requerida';
    const insuranceChecked = document.getElementById('quote-insurance')?.checked ? 'Sí (Póliza Todo Riesgo Adicional)' : 'Póliza estándar incluida';
    const matpelChecked = document.getElementById('quote-matpel-plan')?.checked ? 'Sí (Plan de Contingencia y Kit Nivel 3)' : 'Estándar';

    if (!service || !origin || !destination || !weight || !name || !phone) {
      showToast('Por favor completa todos los campos requeridos con asterisco (*)', 'warning');
      return;
    }

    // Calcular código de cotización simulado
    const quoteCode = `COT-JR-${Math.floor(10000 + Math.random() * 90000)}`;

    // Renderizar resumen en el modal
    document.getElementById('summary-code').textContent = quoteCode;
    document.getElementById('summary-service').textContent = document.getElementById('quote-service').options[document.getElementById('quote-service').selectedIndex].text;
    document.getElementById('summary-route').textContent = `${origin} ➔ ${destination}`;
    document.getElementById('summary-weight').textContent = `${weight} Toneladas Métricas`;
    document.getElementById('summary-client').textContent = `${name} (${company || 'Persona Natural'})`;
    document.getElementById('summary-phone').textContent = phone;
    document.getElementById('summary-addons').textContent = `Escolta: ${escortChecked} | Seguro: ${insuranceChecked}`;

    // Configurar enlace de WhatsApp directo con los datos precargados
    const whatsappMessage = encodeURIComponent(
      `*SOLICITUD DE COTIZACIÓN - JR MULTISERVICIOS CHUGUR SRL*\n` +
      `-------------------------------------------\n` +
      `📋 *Código:* ${quoteCode}\n` +
      `🚛 *Servicio:* ${document.getElementById('quote-service').options[document.getElementById('quote-service').selectedIndex].text}\n` +
      `📍 *Ruta:* ${origin} a ${destination}\n` +
      `⚖️ *Peso/Volumen:* ${weight} Toneladas\n` +
      `🛡️ *Escolta Vial:* ${escortChecked}\n` +
      `📄 *Seguro Mercancía:* ${insuranceChecked}\n` +
      `👤 *Contacto:* ${name} - ${company}\n` +
      `📞 *Teléfono:* ${phone}\n` +
      `✉️ *Email:* ${email}\n` +
      `📝 *Detalles:* ${notes}\n` +
      `-------------------------------------------\n` +
      `Solicito propuesta formal y disponibilidad de flota inmediata.`
    );

    const whatsappBtn = document.getElementById('quote-whatsapp-send');
    if (whatsappBtn) {
      whatsappBtn.href = `https://api.whatsapp.com/send?phone=51976543210&text=${whatsappMessage}`;
    }

    // Abrir modal de éxito
    if (quoteModal) {
      quoteModal.classList.add('active');
      document.body.classList.add('no-scroll');
    }

    showToast('¡Cotización generada exitosamente! Un asesor se comunicará contigo.', 'success');
  });

  closeQuoteModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (quoteModal) {
        quoteModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  });
}

/* ==========================================================================
   10. FORMULARIO DE CONTACTO DIRECTO
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const subject = document.getElementById('contact-subject').value;

    showToast(`Gracias ${name}, tu mensaje sobre "${subject}" fue recibido. Nos contactaremos al ${phone} en breve.`, 'success');
    contactForm.reset();
  });
}

/* ==========================================================================
   11. ANIMACIONES SUAVES AL HACER SCROLL
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   12. BOTÓN "VOLVER ARRIBA" (BACK TO TOP)
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   13. WIDGET MULTIAGENTE DE WHATSAPP FLOTANTE
   ========================================================================== */
function initWhatsAppWidget() {
  const toggleBtn = document.getElementById('whatsapp-toggle-btn');
  const popupMenu = document.getElementById('whatsapp-popup');
  const closeBtn = document.getElementById('whatsapp-close');

  if (!toggleBtn || !popupMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    popupMenu.classList.toggle('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popupMenu.classList.remove('active');
    });
  }

  document.addEventListener('click', (e) => {
    if (!popupMenu.contains(e.target) && e.target !== toggleBtn) {
      popupMenu.classList.remove('active');
    }
  });
}

/* ==========================================================================
   14. MODALES LEGALES (LIBRO DE RECLAMACIONES, PRIVACIDAD, TÉRMINOS)
   ========================================================================== */
window.openLegalModal = function(type) {
  const modal = document.getElementById('legal-modal');
  const title = document.getElementById('legal-modal-title');
  const body = document.getElementById('legal-modal-body');

  if (!modal || !title || !body) return;

  if (type === 'reclamaciones') {
    title.innerHTML = '<i class="fa-solid fa-book-open text-danger me-2"></i>Libro de Reclamaciones Virtual';
    body.innerHTML = `
      <p class="text-muted small">Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571) y el Reglamento del Libro de Reclamaciones (D.S. N° 011-2011-PCM).</p>
      <div class="card p-3 bg-light mb-3">
        <p class="mb-1"><strong>Razón Social:</strong> JR MULTISERVICIOS CHUGUR S.R.L.</p>
        <p class="mb-1"><strong>RUC:</strong> 20608945123</p>
        <p class="mb-0"><strong>Dirección:</strong> Av. San Antonio s/n, Distrito de Chugur, Cajamarca, Perú.</p>
      </div>
      <form id="reclamaciones-form" onsubmit="event.preventDefault(); submitClaim();">
        <div class="row g-2">
          <div class="col-md-6 mb-2">
            <label class="form-label small">Nombre Completo *</label>
            <input type="text" class="form-control form-control-sm" required placeholder="Nombres y Apellidos">
          </div>
          <div class="col-md-6 mb-2">
            <label class="form-label small">DNI / RUC *</label>
            <input type="text" class="form-control form-control-sm" required placeholder="Número de documento">
          </div>
          <div class="col-md-6 mb-2">
            <label class="form-label small">Teléfono / Celular *</label>
            <input type="tel" class="form-control form-control-sm" required placeholder="976 000 000">
          </div>
          <div class="col-md-6 mb-2">
            <label class="form-label small">Correo Electrónico *</label>
            <input type="email" class="form-control form-control-sm" required placeholder="correo@ejemplo.com">
          </div>
          <div class="col-12 mb-2">
            <label class="form-label small">Tipo de Requerimiento *</label>
            <select class="form-select form-select-sm" required>
              <option value="reclamo">Reclamo (Disconformidad relacionada a los servicios)</option>
              <option value="queja">Queja (Disconformidad frente a la mala atención al público)</option>
            </select>
          </div>
          <div class="col-12 mb-3">
            <label class="form-label small">Detalle y Sustento del Reclamo/Queja *</label>
            <textarea class="form-control form-control-sm" rows="3" required placeholder="Explique brevemente los hechos ocurridos..."></textarea>
          </div>
        </div>
        <div class="d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-outline-secondary btn-sm" onclick="closeLegalModal()">Cancelar</button>
          <button type="submit" class="btn btn-danger btn-sm"><i class="fa-solid fa-paper-plane me-1"></i>Registrar Reclamo</button>
        </div>
      </form>
    `;
  } else if (type === 'privacidad') {
    title.innerHTML = '<i class="fa-solid fa-shield-halved text-danger me-2"></i>Política de Privacidad y Tratamiento de Datos';
    body.innerHTML = `
      <p>En <strong>JR MULTISERVICIOS CHUGUR S.R.L.</strong> protegemos la privacidad y confidencialidad de la información de nuestros clientes corporativos, proveedores y usuarios conforme a la Ley N° 29733 (Ley de Protección de Datos Personales del Perú).</p>
      <h6>1. Finalidad del Tratamiento</h6>
      <p class="small text-muted">Los datos facilitados en nuestros formularios de cotización, rastreo satelital y contacto son utilizados exclusivamente para la gestión logística de transporte, facturación y reportes de estado de mercancía en ruta.</p>
      <h6>2. Confidencialidad y Custodia de Cargas</h6>
      <p class="small text-muted">La información sobre volúmenes de carga, trayectos mineros, sustancias químicas y especificaciones de seguridad son tratadas con estricto secreto comercial.</p>
      <div class="text-end mt-4">
        <button class="btn btn-danger btn-sm" onclick="closeLegalModal()">Entendido</button>
      </div>
    `;
  } else if (type === 'terminos') {
    title.innerHTML = '<i class="fa-solid fa-file-contract text-danger me-2"></i>Términos y Condiciones del Servicio de Transporte';
    body.innerHTML = `
      <h6>1. Ámbito de Aplicación</h6>
      <p class="small text-muted">Los presentes términos rigen para todos los servicios de transporte de carga pesada, sobredimensionada, sustancias y materiales peligrosos (MATPEL) prestados por JR MULTISERVICIOS CHUGUR S.R.L. en el territorio nacional.</p>
      <h6>2. Cumplimiento Normativo MTC & SUTRAN</h6>
      <p class="small text-muted">Toda operación se rige por el Reglamento Nacional de Administración de Transporte (D.S. 017-2009-MTC) y la Ley General de Transporte de Materiales y Residuos Peligrosos (Ley N° 28256).</p>
      <h6>3. Coberturas de Seguro</h6>
      <p class="small text-muted">Todas nuestras unidades cuentan con SOAT vigente, póliza de responsabilidad civil extracontractual y seguro de carga según el valor declarado en la Guía de Remisión.</p>
      <div class="text-end mt-4">
        <button class="btn btn-danger btn-sm" onclick="closeLegalModal()">Cerrar</button>
      </div>
    `;
  }

  modal.classList.add('active');
  document.body.classList.add('no-scroll');
};

window.closeLegalModal = function() {
  const modal = document.getElementById('legal-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
};

window.submitClaim = function() {
  closeLegalModal();
  showToast('Su hoja de reclamación ha sido registrada. Se le ha enviado un correo con el código de seguimiento.', 'success');
};

/* ==========================================================================
   15. SISTEMA DE NOTIFICACIONES TOAST FLOTANTES
   ========================================================================== */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `custom-toast toast-${type}`;

  const icons = {
    success: 'fa-circle-check',
    warning: 'fa-triangle-exclamation',
    danger: 'fa-circle-xmark',
    info: 'fa-circle-info'
  };

  toast.innerHTML = `
    <div class="toast-content">
      <i class="fa-solid ${icons[type] || 'fa-bell'} toast-icon"></i>
      <span class="toast-message">${message}</span>
    </div>
    <button class="toast-close" aria-label="Cerrar">&times;</button>
  `;

  toastContainer.appendChild(toast);

  // Animar entrada
  setTimeout(() => toast.classList.add('show'), 10);

  // Cerrar al hacer clic
  toast.querySelector('.toast-close').addEventListener('click', () => {
    removeToast(toast);
  });

  // Auto-cerrar después de 4.5 segundos
  setTimeout(() => {
    removeToast(toast);
  }, 4500);

  function removeToast(t) {
    t.classList.remove('show');
    setTimeout(() => {
      if (t.parentElement) {
        t.parentElement.removeChild(t);
      }
    }, 300);
  }
}
window.showToast = showToast;
