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
        title: "Mischievous - Omni-Man Ultimate",
        description: "The ultimate for the Omni-Man Character",
        project: "Mischievous Battlegrounds",
        category: "mischievous",
        type: "embed",
        src: "https://streamable.com/e/o9dgbt"
    },
    {
        id: 5,
        title: "KJ Stars - Okarun's Ultimate Moves",
        description: "3 Moves for Okaruns Ultimate Moveset",
        project: "KJ Stars Battlegrounds",
        category: "kj-stars",
        type: "embed",
        src: "https://streamable.com/e/e0vxzh"
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

function init() {
    renderFilters();
    renderGallery('all');
    setupEventListeners();
    loadTheme();
}

function renderFilters() {
    const categories = new Set();
    galleryItems.forEach(item => categories.add(item.category));

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.classList.add('filter-btn');
        btn.dataset.filter = category;

        const label = category === 'kj-stars' ? 'KJ Stars' : 'Mischievous BG';
        btn.textContent = label;

        filterContainer.appendChild(btn);
    });
}

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
        video.playsInline = true;
        video.autoplay = false;
        video.preload = "metadata";
        video.setAttribute('webkit-playsinline', 'true');
        mediaDiv.appendChild(video);

        const indicator = document.createElement('div');
        indicator.classList.add('video-indicator');
        indicator.innerHTML = '▶ Video';
        mediaDiv.appendChild(indicator);

        div.addEventListener('mouseenter', () => {
            document.querySelectorAll('video').forEach(v => {
                if (v !== video && !v.closest('.lightbox-media')) v.pause();
            });
            document.querySelectorAll('.gallery-item iframe').forEach(ifrm => {
                ifrm.src = ifrm.src.replace('&autoplay=1', '&autoplay=0');
            });
            video.play().catch(() => { });
        });

        div.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });

    } else if (item.type === 'embed') {
        const iframePlaceholder = document.createElement('div');
        iframePlaceholder.style.width = '100%';
        iframePlaceholder.style.height = '100%';
        iframePlaceholder.style.background = '#2a2a2e';
        iframePlaceholder.style.display = 'flex';
        iframePlaceholder.style.alignItems = 'center';
        iframePlaceholder.style.justifyContent = 'center';
        iframePlaceholder.innerHTML = '<span style="color: var(--text-muted); font-size: 0.8rem;">Hover to Preview</span>';
        mediaDiv.appendChild(iframePlaceholder);

        const indicator = document.createElement('div');
        indicator.classList.add('video-indicator');
        indicator.innerHTML = '▶ Embed';
        mediaDiv.appendChild(indicator);

        div.addEventListener('mouseenter', () => {
            document.querySelectorAll('video').forEach(v => {
                if (!v.closest('.lightbox-media')) v.pause();
            });
            document.querySelectorAll('.gallery-item-media iframe').forEach(ifrm => ifrm.remove());

            const iframe = document.createElement('iframe');
            iframe.src = `${item.src}?autoplay=1&muted=1&controls=0`;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.pointerEvents = 'none';
            mediaDiv.appendChild(iframe);
            iframePlaceholder.style.display = 'none';
        });

        div.addEventListener('mouseleave', () => {
            const iframe = mediaDiv.querySelector('iframe');
            if (iframe) iframe.remove();
            iframePlaceholder.style.display = 'flex';
        });
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

    div.addEventListener('click', () => openLightbox(filteredItems.indexOf(item)));

    return div;
}

function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}


function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    const video = lightboxMedia.querySelector('video');
    if (video) video.pause();
}

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
        video.playsInline = true;
        video.muted = false;

        video.onerror = () => {
            lightboxMedia.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <p style="color: #ff4444; margin-bottom: 1rem;">Unable to load video.</p>
                    <p style="font-size: 0.8rem; color: #888;">Note: Direct links are required for video tags.</p>
                </div>
            `;
        };

        lightboxMedia.appendChild(video);
    } else if (item.type === 'embed') {
        const iframe = document.createElement('iframe');
        iframe.src = item.src;
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.frameBorder = "0";
        iframe.allow = "autoplay; fullscreen";
        iframe.allowFullscreen = true;
        iframe.style.aspectRatio = "16 / 9";
        iframe.style.borderRadius = "var(--border-radius)";
        lightboxMedia.appendChild(iframe);
    } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        lightboxMedia.appendChild(img);
    }
}

function showPrevious() {
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightboxContent();
}
function showNext() {
    currentIndex = (currentIndex + 1) % filteredItems.length;
    updateLightboxContent();
}

function setupEventListeners() {
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filter = e.target.dataset.filter;
            renderGallery(filter);
        }
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevious);
    nextBtn.addEventListener('click', showNext);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

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

    const themeDots = document.querySelectorAll('.theme-dot');
    themeDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const theme = dot.getAttribute('data-theme');
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    });
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.body.setAttribute('data-theme', savedTheme);
}

init();
