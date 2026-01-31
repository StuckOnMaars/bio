// Gallery media data
const galleryItems = [
    {
        id: 1,
        title: "KJ Stars - Combat Showcase",
        description: "Fast-paced combo-based melee combat",
        project: "KJ Stars Battlegrounds",
        category: "kj-stars",
        type: "image",
        src: "https://tr.rbxcdn.com/180DAY-65ff1619ac33bee6709d2cf556562227/768/432/Image/Webp/noFilter"
    },
    {
        id: 2,
        title: "Mischievous Battlegrounds - Arena",
        description: "Main battlegrounds arena environment",
        project: "Mischievous Battlegrounds",
        category: "mischievous",
        type: "image",
        src: "https://tr.rbxcdn.com/180DAY-32e4ef4c65a6c4a9c41ab3bd9cca360c/768/432/Image/Webp/noFilter"
    },
    {
        id: 3,
        title: "KJ Stars - Ultimate Mode",
        description: "Ultimate mode transformation sequence",
        project: "KJ Stars Battlegrounds",
        category: "kj-stars",
        type: "image",
        src: "https://tr.rbxcdn.com/180DAY-65ff1619ac33bee6709d2cf556562227/768/432/Image/Webp/noFilter"
    },
    {
        id: 4,
        title: "Mischievous - Character Selection",
        description: "Diverse character roster with unique movesets",
        project: "Mischievous Battlegrounds",
        category: "mischievous",
        type: "image",
        src: "https://tr.rbxcdn.com/180DAY-32e4ef4c65a6c4a9c41ab3bd9cca360c/768/432/Image/Webp/noFilter"
    },
    {
        id: 5,
        title: "KJ Stars - Movement System",
        description: "Advanced movement mechanics and dash system",
        project: "KJ Stars Battlegrounds",
        category: "kj-stars",
        type: "image",
        src: "https://tr.rbxcdn.com/180DAY-65ff1619ac33bee6709d2cf556562227/768/432/Image/Webp/noFilter"
    },
    {
        id: 6,
        title: "Mischievous - Special Moves",
        description: "Unique character abilities and special attacks",
        project: "Mischievous Battlegrounds",
        category: "mischievous",
        type: "image",
        src: "https://tr.rbxcdn.com/180DAY-32e4ef4c65a6c4a9c41ab3bd9cca360c/768/432/Image/Webp/noFilter"
    }
];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const filterContainer = document.getElementById('filterContainer');
const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightboxMedia');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let currentFilter = 'all';
let filteredItems = [...galleryItems];

// Initialize
function init() {
    renderFilters();
    renderGallery('all');
    setupEventListeners();
    loadTheme();
}

// Render filter buttons
function renderFilters() {
    const categories = new Set();
    galleryItems.forEach(item => categories.add(item.category));

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.classList.add('filter-btn');
        btn.dataset.filter = category;

        // Create readable labels
        const label = category === 'kj-stars' ? 'KJ Stars' : 'Mischievous BG';
        btn.textContent = label;

        filterContainer.appendChild(btn);
    });
}

// Render gallery items
function renderGallery(filter) {
    galleryGrid.innerHTML = '';
    currentFilter = filter;

    filteredItems = filter === 'all'
        ? [...galleryItems]
        : galleryItems.filter(item => item.category === filter);

    filteredItems.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index);
        galleryGrid.appendChild(galleryItem);
    });
}

// Create individual gallery item
function createGalleryItem(item, index) {
    const div = document.createElement('div');
    div.classList.add('gallery-item');
    div.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    div.style.opacity = '0';

    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('gallery-item-media');

    if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.src;
        video.muted = true;
        video.loop = true;
        mediaDiv.appendChild(video);

        // Add video indicator
        const indicator = document.createElement('div');
        indicator.classList.add('video-indicator');
        indicator.innerHTML = '▶ Video';
        mediaDiv.appendChild(indicator);
    } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        img.loading = 'lazy';
        mediaDiv.appendChild(img);
    }

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('gallery-item-info');

    const title = document.createElement('h3');
    title.classList.add('gallery-item-title');
    title.textContent = item.title;

    const desc = document.createElement('p');
    desc.classList.add('gallery-item-desc');
    desc.textContent = item.description;

    infoDiv.appendChild(title);
    infoDiv.appendChild(desc);

    div.appendChild(mediaDiv);
    div.appendChild(infoDiv);

    // Click to open lightbox
    div.addEventListener('click', () => openLightbox(filteredItems.indexOf(item)));

    return div;
}

// Open lightbox
function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Pause video if playing
    const video = lightboxMedia.querySelector('video');
    if (video) video.pause();
}

// Update lightbox content
function updateLightboxContent() {
    const item = filteredItems[currentIndex];

    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.description;

    lightboxMedia.innerHTML = '';

    if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.src;
        video.controls = true;
        video.autoplay = true;
        lightboxMedia.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        lightboxMedia.appendChild(img);
    }
}

// Navigate to previous item
function showPrevious() {
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightboxContent();
}

// Navigate to next item
function showNext() {
    currentIndex = (currentIndex + 1) % filteredItems.length;
    updateLightboxContent();
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filter = e.target.dataset.filter;
            renderGallery(filter);
        }
    });

    // Lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevious);
    nextBtn.addEventListener('click', showNext);

    // Click backdrop to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevious();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });

    // Theme switching
    const themeDots = document.querySelectorAll('.theme-dot');
    themeDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const theme = dot.getAttribute('data-theme');
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    });
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.body.setAttribute('data-theme', savedTheme);
}

// Initialize on page load
init();
