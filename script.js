// ========================
// 1. SERVICES DATA
// ========================
const servicesData = [
    { id: "glasbewassing", name: "Glasbewassing", short: "Streeploos schone ramen en kozijnen.", fullDesc: "Professionele glasbewassing voor helder zicht en een stralende uitstraling. Wij gebruiken moderne technieken voor een vlekkeloos resultaat.", benefits: ["Streeploos resultaat", "Inclusief kozijnen", "Regelmatig onderhoud mogelijk", "Professionele afwerking"], img: "Glasbewassing.webp" },
    { id: "hogedrukreiniging", name: "Hogedrukreiniging", short: "Krachtige reiniging van alle buitenoppervlakken.", fullDesc: "Onze hogedrukreiniging verwijdert hardnekkig vuil, algen en aanslag van terrassen, opritten, muren en meer.", benefits: ["Verwijdert diep vuil", "Ideaal voor buiten", "Snel zichtbaar resultaat", "Verhoogt uitstraling"], img: "Hogedrukreiniger.webp" },
    { id: "dieptereiniging", name: "Dieptereiniging", short: "Grondige reiniging voor een frisse start.", fullDesc: "Dieptereiniging van muren, vloeren en gevels. Perfect voor oppervlakken die een intensieve reiniging nodig hebben.", benefits: ["Verwijdert hardnekkig vuil", "Verbetert hygiëne", "Frisse uitstraling", "Professioneel apparaat"], img: "Specialistische reiniging.webp" },
    { id: "kozijn-reinigen", name: "Kozijnen Reiniging", short: "Vakkundige reiniging van alle kozijnen.", fullDesc: "Kozijnen verzamelen vuil en stof. Wij reinigen zorgvuldig zonder beschadigingen.", benefits: ["Verwijdert hardnekkig vuil", "Beschermt materiaal", "Verbetert uitstraling", "Onderhoudsverlenging"], img: "Kozijnen reiniging.webp" },
    { id: "hout-schoonmaken", name: "Hout Schoonmaken", short: "Zachte maar effectieve reiniging van hout.", fullDesc: "Speciale reiniging voor houten oppervlakken. Wij verwijderen vuil en algen zonder het hout aan te tasten.", benefits: ["Veilig voor hout", "Verwijdert groene aanslag", "Langere levensduur", "Natuurlijke uitstraling"], img: "Gevel impregneren.webp" },
    { id: "vloeronderhoud", name: "Vloeronderhoud", short: "Professioneel onderhoud van vloeren.", fullDesc: "Wij reinigen en onderhouden diverse vloeren met professionele technieken voor een luxe uitstraling.", benefits: ["Diepe reiniging", "Luxe uitstraling", "Beschermende laag", "Langere levensduur"], img: "Vloeronderhoud.webp" },
    { id: "rvs-reiniging", name: "RVS Reiniging", short: "Schoon en glanzend RVS oppervlak.", fullDesc: "Specialistische reiniging van roestvrij staal. Verwijder vingerafdrukken, vuil en roestplekken.", benefits: ["Streeploos resultaat", "Beschermt tegen corrosie", "Professionele middelen", "Blijvende glans"], img: "Graffiti verwijderen.webp" },
    { id: "zonnepanelen-reinigen", name: "Zonnepanelen Reinigen", short: "Maximaliseer uw energieopbrengst.", fullDesc: "Vuil en stof op zonnepanelen verminderen het rendement. Wij reinigen veilig en effectief.", benefits: ["Tot 15% meer rendement", "Veilig en zonder schade", "Milieuvriendelijk", "Langere levensduur"], img: "Zonnepanelen reinigen.webp" }
];

// ========================
// 2. RENDER SERVICES
// ========================
const servicesGrid = document.getElementById('servicesGrid');
function buildServices() {
    if (!servicesGrid) return;
    servicesGrid.innerHTML = '';
    servicesData.forEach((s, idx) => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.id = s.id;
        card.setAttribute('data-animate', 'fade-up');
        card.innerHTML = `
            <div class="service-img" style="background-image: url('assets/${s.img}');"></div>
            <div class="service-info">
                <h3>${s.name}</h3>
                <p>${s.short}</p>
            </div>
        `;
        card.addEventListener('click', () => openModal(s));
        servicesGrid.appendChild(card);
    });
}
buildServices();

// ========================
// 3. MODAL LOGIC
// ========================
const modal = document.getElementById('serviceModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalBenefits = document.getElementById('modalBenefits');
const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

function openModal(service) {
    if (!modal) return;
    modalImg.src = `assets/${service.img}`;
    modalTitle.innerText = service.name;
    modalDesc.innerText = service.fullDesc;
    modalBenefits.innerHTML = service.benefits.map(b => `<li>${b}</li>`).join('');
    modalWhatsappBtn.href = `https://wa.me/31612345678?text=${encodeURIComponent(`Hallo Golden Touch, ik wil graag de dienst "${service.name}" boeken.`)}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelector('.close-modal')?.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// ========================
// 4. HERO VIDEO LOGIC
// ========================
function initHeroVideo() {
    const poster = document.getElementById('heroPoster');
    const iframe = document.querySelector('.hero-video-iframe');

    if (!poster || !iframe) return;

    // Fade out poster when iframe is ready
    iframe.onload = () => {
        poster.style.opacity = '0';
        setTimeout(() => {
            poster.style.display = 'none';
        }, 500);
    };

    // Fallback if onload doesn't fire (some browsers/Vimeo behavior)
    setTimeout(() => {
        poster.style.opacity = '0';
        setTimeout(() => {
            poster.style.display = 'none';
        }, 500);
    }, 3000);
}
initHeroVideo();

// ========================
// 5. SERVICE NAVIGATION LOGIC
// ========================
function initServiceNav() {
    const navItems = document.querySelectorAll('.service-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetCard = document.getElementById(targetId);
            const service = servicesData.find(s => s.id === targetId);

            if (targetCard) {
                // Scroll to card
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Highlight card
                targetCard.classList.add('highlight');
                setTimeout(() => targetCard.classList.remove('highlight'), 2000);

                // Open modal if service found
                if (service) {
                    setTimeout(() => openModal(service), 800);
                }
            }
        });
    });
}
initServiceNav();

// ========================
// 6. UTILITIES (Slider, Dark Mode, Observer)
// ========================

// Before After Slider
const slider = document.getElementById('baSlider');
const afterImg = document.getElementById('afterImage');
const handle = document.getElementById('sliderHandle');
if (slider && afterImg && handle) {
    let isResizing = false;
    const updateSlider = (x) => {
        const rect = slider.getBoundingClientRect();
        let position = ((x - rect.left) / rect.width) * 100;
        if (position < 0) position = 0;
        if (position > 100) position = 100;
        afterImg.style.width = `${position}%`;
        handle.style.left = `${position}%`;
    };
    handle.addEventListener('mousedown', () => isResizing = true);
    window.addEventListener('mouseup', () => isResizing = false);
    window.addEventListener('mousemove', (e) => { if (isResizing) updateSlider(e.clientX); });
    handle.addEventListener('touchstart', () => isResizing = true);
    window.addEventListener('touchend', () => isResizing = false);
    window.addEventListener('touchmove', (e) => { if (isResizing) updateSlider(e.touches[0].clientX); });
}

// Dark Mode
const darkToggle = document.getElementById('darkModeToggle');
if (darkToggle) {
    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        darkToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate], .service-card').forEach(el => observer.observe(el));

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});
