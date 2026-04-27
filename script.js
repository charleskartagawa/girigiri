function setLang(lang) {
    const body = document.body;
    const btnEn = document.getElementById('lang-en');
    const btnId = document.getElementById('lang-id');
    
    if (lang === 'en') {
        body.classList.remove('lang-id');
        body.classList.add('lang-en');
        btnEn.classList.add('active');
        btnId.classList.remove('active');
    } else {
        body.classList.remove('lang-en');
        body.classList.add('lang-id');
        btnId.classList.add('active');
        btnEn.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. HAMBURGER MENU --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    /* --- 2. SCROLL ANIMATION --- */
    const observerOptions = { threshold: 0.15 };
    const fadeElements = document.querySelectorAll('.fade-in-up, .feature-item, .menu-card');

    fadeElements.forEach(el => {
        if (!el.classList.contains('fade-in-up')) el.classList.add('fade-in-up');
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    /* --- 3. NAVBAR SCROLL EFFECT --- */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(250, 221, 162, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(97, 55, 30, 0.05)';
        } else {
            navbar.style.background = 'rgba(250, 221, 162, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    /* --- 4. WHATSAPP CUSTOMIZATION LOGIC FOR SUSHI --- */
    const waButton = document.getElementById('waButton');
    const customForm = document.getElementById('sushiForm');

    function updateWhatsAppLink() {
        if (!waButton || !customForm) return;

        // Nomor WA owner Girigirii (Ganti dengan nomor aslinya nanti)
        const baseUrl = "https://wa.me/6281234567890?text=";

        // Ambil data Condiment
        const condimentCheckboxes = document.querySelectorAll('input[name="condiment"]:checked');
        let condiments = [];
        condimentCheckboxes.forEach(cb => condiments.push(cb.value));
        const condimentText = condiments.length > 0 ? condiments.join(', ') : 'Sesuai standar';

        // Ambil data Alat Makan
        const alatRadio = document.querySelector('input[name="alat"]:checked');
        const alatText = alatRadio ? alatRadio.value : 'Pakai Sumpit';

        // Susun Pesan
        const message = `Konnichiwa Girigirii! ✨🍣%0A%0ASaya ingin tanya seputar *Bulk Order / Self Pick-up*. Berikut preferensi pesanan saya:%0A%0A🥢 *Alat Makan:* ${alatText}%0A🍶 *Extra Condiment:* ${condimentText}%0A%0AMohon info ketersediaan menu dan total harganya ya. Arigatou!`;

        waButton.href = baseUrl + message;
    }

    if (customForm) {
        customForm.addEventListener('change', updateWhatsAppLink);
        updateWhatsAppLink(); // Inisialisasi awal
    }
});