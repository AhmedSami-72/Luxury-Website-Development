// Services Data with REAL IMAGES mapping
const servicesData = [
    { name: "Gevel Impregneren", short: "Bescherm uw gevel tegen vocht en vuil.", fullDesc: "Gevel impregneren is essentieel voor het beschermen van uw woning tegen weersinvloeden, vocht en vervuiling. Wij gebruiken hoogwaardige impregneermiddelen.", benefits: ["Waterafstotend en ademend", "Voorkomt schimmel en mosvorming", "Verlengt de levensduur", "Bespaart onderhoudskosten"], img: "facad.png" },
    { name: "Hogedrukreiniging", short: "Krachtige reiniging van alle oppervlakken.", fullDesc: "Onze hogedrukreiniging verwijdert hardnekkig vuil, algen en aanslag van terrassen, opritten en muren.", benefits: ["Verwijdert diep vuil", "Ideaal voor buiten", "Snel zichtbaar resultaat", "Verhoogt uitstraling"], img: "Hogedrukreiniging.png" },
    { name: "Zonnepanelen Reinigen", short: "Maximaliseer uw energieopbrengst.", fullDesc: "Vuil en stof op zonnepanelen verminderen het rendement. Wij reinigen veilig en effectief.", benefits: ["Tot 15% meer rendement", "Veilig en zonder schade", "Milieuvriendelijk", "Langere levensduur"], img: "solar-cleaning.png" },
    { name: "Glasbewassing", short: "Streeploos schone ramen.", fullDesc: "Professionele glasbewassing zorgt voor helder zicht en een frisse uitstraling.", benefits: ["Streeploos resultaat", "Inclusief kozijnen", "Regelmatig onderhoud", "Professionele afwerking"], img: "window-before-after.jpg.png" },
    { name: "Kozijnen Reiniging", short: "Reiniging van kozijnen en randen.", fullDesc: "Kozijnen verzamelen vuil. Wij reinigen grondig voor frisse uitstraling.", benefits: ["Verwijdert hardnekkig vuil", "Beschermt materiaal", "Verbetert uitstraling", "Onderhoudsverlenging"], img: "brush-wall.png" },
    { name: "Vloeronderhoud", short: "Professioneel onderhoud van vloeren.", fullDesc: "Wij reinigen en onderhouden diverse vloeren met professionele technieken.", benefits: ["Diepe reiniging", "Luxe uitstraling", "Beschermende laag", "Langere levensduur"], img: "before-after-wall.png" },
    { name: "Graffiti Verwijderen", short: "Snelle verwijdering zonder schade.", fullDesc: "Graffiti kan de uitstraling aantasten. Wij verwijderen veilig en effectief.", benefits: ["Snelle service", "Veilig voor oppervlak", "Volledig herstel", "Professionele aanpak"], img: "before-wall2.png" }
];

const servicesGrid = document.getElementById('servicesGrid');
function buildServices() {
    servicesData.forEach((s, idx) => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.setAttribute('data-animate', 'fade-up');
        card.style.animationDelay = `${idx * 0.05}s`;
        card.innerHTML = `<div class="service-img" style="background-image: url('assets/${s.img}'); background-size: cover; background-position: center;"></div><div class="service-info"><h3>${s.name}</h3><p>${s.short}</p></div>`;
        card.addEventListener('click', () => openModal(s));
        servicesGrid.appendChild(card);
    });
}
buildServices();

// Modal Logic
const modal = document.getElementById('serviceModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalBenefits = document.getElementById('modalBenefits');
const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
function openModal(service) {
    modalImg.src = `assets/${service.img}`;
    modalTitle.innerText = service.name;
    modalDesc.innerText = service.fullDesc;
    modalBenefits.innerHTML = service.benefits.map(b => `<li>${b}</li>`).join('');
    modalWhatsappBtn.href = `https://wa.me/31612345678?text=${encodeURIComponent(`Hallo Golden Touch, ik wil graag de dienst "${service.name}" boeken. Kunt u mij een offerte sturen?`)}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }
document.querySelector('.close-modal').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });

// Before After Slider Improved
const sliderDiv = document.getElementById('baSlider');
const afterDiv = document.getElementById('afterImage');
const handle = document.getElementById('sliderHandle');
let isDragging = false;
function moveSlider(clientX) {
    const rect = sliderDiv.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0; if (x > rect.width) x = rect.width;
    let percent = (x / rect.width) * 100;
    afterDiv.style.width = percent + '%';
    handle.style.left = percent + '%';
}
handle.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
window.addEventListener('mousemove', (e) => { if(isDragging) moveSlider(e.clientX); });
window.addEventListener('mouseup', () => { isDragging = false; });
handle.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); });
window.addEventListener('touchmove', (e) => { if(isDragging && e.touches[0]) moveSlider(e.touches[0].clientX); });
window.addEventListener('touchend', () => { isDragging = false; });

// Sticky Header + Dark Mode
const headerEl = document.getElementById('mainHeader');
window.addEventListener('scroll', () => { headerEl.classList.toggle('scrolled', window.scrollY > 50); });

const darkToggle = document.getElementById('darkModeToggle');
const body = document.body;
const prefersDark = localStorage.getItem('darkMode') === 'enabled';
if (prefersDark) body.classList.add('dark');
darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    darkToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});
if (prefersDark) darkToggle.innerHTML = '<i class="fas fa-sun"></i>';

// Intersection Observer for animations
const animatedEls = document.querySelectorAll('[data-animate="fade-up"], [data-animate="slide-left"], [data-animate="slide-right"], .service-card, .advantage-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.15, rootMargin: "0px 0px -20px 0px" });
animatedEls.forEach(el => observer.observe(el));
document.querySelectorAll('.service-card').forEach(card => observer.observe(card));
window.dispatchEvent(new Event('scroll'));