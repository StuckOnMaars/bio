const projects = [
    {
        id: "kj-stars",
        title: "KJ Stars Battlegrounds",
        role: "Contributor",
        shortDesc: "A cross-platform battlegrounds game on Roblox.",
        fullDesc: `KJ Stars Battlegrounds [Turbo Yokai] is a fast-paced Roblox battleground fighting game with combo-based melee combat and movement-focused gameplay. 🥋💨

📊 **Stats:**
• 1.5M+ Visits
• 1k+ Favorites
• 15 Players per Server
• Cross-platform (PC 💻, Mobile 📱, Console 🎮)

🎮 **Controls:**
• **G** - Ultimate Mode
• **F** - Block
• **Q** - Dash
• **Q (Ragdolled)** - Evasive Cancel
• **Double Tap W** - Run
• **B** - Emote Wheel
• **Left Click** - Punch

🏆 **Credits:**
• Yielding Arts - The Strongest Battlegrounds
• Arts of Vermillion - Legends Battlegrounds
• Jimpee’s Cabin - Jump Showdown
• Martial Arts Inc - Soulbound`,
        tags: ["Roblox", "Game", "Battlegrounds"],
        techStack: ["Roblox Studio", "Luau"],
        mediaType: "image",
        mediaSrc: "https://tr.rbxcdn.com/180DAY-65ff1619ac33bee6709d2cf556562227/768/432/Image/Webp/noFilter",
        links: [
            { text: "Play on Roblox", url: "https://www.roblox.com/games/78744178517631/KJ-Stars-Battlegrounds", type: "primary" },
            { text: "Join Game", url: "roblox://placeId=78744178517631", type: "secondary" },
            { text: "Join Discord", url: "https://discord.com/invite/Z2uRT28tUw", type: "secondary" },
            { text: "Join Group", url: "https://www.roblox.com/share/g/34592312", type: "secondary" }
        ]
    },
    {
        id: "mischievous-battlegrounds",
        title: "Mischievous Battlegrounds [REVAMPED]",
        role: "Ex-Developer",
        shortDesc: "A chaotic battlegrounds game with 2.5M+ visits.",
        fullDesc: `Mischievous Battlegrounds is a high-energy fighting game featuring diverse characters and unique movesets. ⚡🔥

📊 **Stats:**
• 2.5M+ Visits
• 10k+ Favorites
• Cross-platform support (PC 💻, Mobile 📱, Console 🎮)

🎮 **Controls:**
• **G** - Ultimate Mode
• **F** - Block
• **Q** - Dash
• **B** - Emote Wheel
• **Shift** - Shift-lock
• **Left Click** - Punch

👥 **Credits:**
• Icon Maker: bot223294
• Sound Maker: MeandfluffyEnemy
• Co-Owner: ThatRealNyx`,
        tags: ["Roblox", "Game", "Action"],
        techStack: ["Roblox Studio", "Luau"],
        mediaType: "image",
        mediaSrc: "https://tr.rbxcdn.com/180DAY-32e4ef4c65a6c4a9c41ab3bd9cca360c/768/432/Image/Webp/noFilter",
        links: [
            { text: "Play on Roblox", url: "https://www.roblox.com/games/130108105810583/Mischievous-Battlegrounds", type: "primary" }
        ]
    }
];

const projectsGrid = document.getElementById('projectsGrid');
const filterContainer = document.getElementById('filterContainer');
const modal = document.getElementById('projectModal');
const closeModalBtn = document.querySelector('.close-modal');

const modalTitle = document.getElementById('modalTitle');
const modalMedia = document.getElementById('modalMedia');
const modalTags = document.getElementById('modalTags');
const modalDesc = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const modalLinks = document.getElementById('modalLinks');

function init() {
    renderFilters();
    renderProjects('all');
    setupEventListeners();
    fetchGameStats();
    setupAvatarTilt();
    setupClickEasterEgg();
}

function renderFilters() {
    const allTags = new Set();
    projects.forEach(p => p.tags.forEach(t => allTags.add(t)));
    allTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.classList.add('filter-btn');
        btn.dataset.filter = tag;
        btn.textContent = tag;
        filterContainer.appendChild(btn);
    });
}

function renderProjects(filter) {
    projectsGrid.innerHTML = '';

    const filtered = filter === 'all'
        ? projects
        : projects.filter(p => p.tags.includes(filter));

    filtered.forEach((project, index) => {
        const card = createProjectCard(project);

        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';

        projectsGrid.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('card-media');

    if (project.mediaType === 'video') {
        const video = document.createElement('video');
        video.src = project.mediaSrc;
        video.muted = true;
        video.loop = true;
        mediaDiv.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = project.mediaSrc;
        img.alt = project.title;
        img.loading = "lazy";
        mediaDiv.appendChild(img);
    }

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('card-info');

    const h3 = document.createElement('h3');
    h3.classList.add('card-title');
    h3.textContent = project.title;

    const role = document.createElement('span');
    role.classList.add('card-role');
    role.textContent = project.role;

    const p = document.createElement('p');
    p.classList.add('card-desc');
    p.textContent = project.shortDesc;

    const tagsDiv = document.createElement('div');
    tagsDiv.classList.add('card-tags');
    project.tags.slice(0, 3).forEach(tag => {
        const span = document.createElement('span');
        span.classList.add('tag');
        span.textContent = tag;
        tagsDiv.appendChild(span);
    });

    infoDiv.append(h3, role, p, tagsDiv);
    card.append(mediaDiv, infoDiv);

    card.addEventListener('click', () => openModal(project));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') openModal(project);
    });

    return card;
}

function openModal(project) {
    modalTitle.textContent = project.title;

    let modalRole = document.getElementById('modalRole');
    if (!modalRole) {
        modalRole = document.createElement('span');
        modalRole.id = 'modalRole';
        modalRole.classList.add('modal-role-badge');
        modalTitle.parentNode.insertBefore(modalRole, modalTitle.nextSibling);
    }
    modalRole.textContent = project.role;

    modalDesc.textContent = project.fullDesc;

    modalTags.innerHTML = '';
    project.tags.forEach(tag => {
        const span = document.createElement('span');
        span.classList.add('tag');
        span.textContent = tag;
        modalTags.appendChild(span);
    });

    modalTech.innerHTML = '';
    project.techStack.forEach(tech => {
        const li = document.createElement('li');
        li.textContent = tech;
        modalTech.appendChild(li);
    });

    modalLinks.innerHTML = '';
    project.links.forEach((link, index) => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        a.target = "_blank";
        a.classList.add('action-btn');
        a.classList.add(index === 0 ? 'btn-primary' : 'btn-secondary');
        modalLinks.appendChild(a);
    });

    modalMedia.innerHTML = '';
    if (project.mediaType === 'video') {
        const video = document.createElement('video');
        video.src = project.mediaSrc;
        video.controls = true;
        video.autoplay = true;
        modalMedia.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = project.mediaSrc;
        img.alt = project.title;
        modalMedia.appendChild(img);
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    const video = modalMedia.querySelector('video');
    if (video) video.pause();
}

function setupEventListeners() {
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filter = e.target.dataset.filter;
            renderProjects(filter);
        }
    });
    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });

    const themeDots = document.querySelectorAll('.theme-dot');
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.body.setAttribute('data-theme', savedTheme);

    themeDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const theme = dot.getAttribute('data-theme');
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    });
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);

                let current = 0;
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        observer.observe(stat);
    });
}

function fetchGameStats() {
    const universeIds = '9052829477,6835164125';
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://games.roblox.com/v1/games?universeIds=${universeIds}`)}`;

    fetch(proxyUrl)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            const parsedData = JSON.parse(data.contents);
            if (parsedData.data && parsedData.data.length > 0) {
                let totalVisits = 0;
                let totalFavorites = 0;

                parsedData.data.forEach(game => {
                    totalVisits += game.visits;
                    totalFavorites += game.favoritedCount;
                });

                const statNumbers = document.querySelectorAll('.stat-number');
                if (statNumbers.length >= 2) {
                    const visitsInMillions = (totalVisits / 1000000).toFixed(1);
                    const favoritesInK = (totalFavorites / 1000).toFixed(1);

                    statNumbers[0].setAttribute('data-target', visitsInMillions);
                    statNumbers[1].setAttribute('data-target', favoritesInK);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching stats:', error);
        })
        .finally(() => {
            animateStats();
        });
}

const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(styleSheet);

function setupAvatarTilt() {
    const card = document.getElementById('avatarCard');
    const container = document.getElementById('avatarContainer');

    if (!card || !container) return;

    container.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPct = x / rect.width;
        const yPct = y / rect.height;

        const rotateY = (xPct - 0.5) * 40;
        const rotateX = (0.5 - yPct) * 40;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
}

function setupClickEasterEgg() {
    const trigger = document.getElementById('robloxSkill');
    if (!trigger) return;

    let clickCount = 0;
    let timeout;

    trigger.addEventListener('click', () => {
        clickCount++;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            clickCount = 0;
        }, 1000);

        if (clickCount >= 5) {
            startMcLovinRain();
            clickCount = 0;
            clearTimeout(timeout);
        }
    });
}

function startMcLovinRain() {
    const container = document.getElementById('rainContainer');
    container.style.display = 'block';

    let count = 0;
    const interval = setInterval(() => {
        spawnMcLovin(container);
        count++;
        if (count > 50) {
            clearInterval(interval);
            setTimeout(() => {
                container.style.display = 'none';
                container.innerHTML = '';
            }, 5000);
        }
    }, 100);
}

function spawnMcLovin(container) {
    const img = document.createElement('img');
    img.src = "https://i.redd.it/okarun-mclovin-v0-5ffo9ddswqsd1.png?width=612&format=png&auto=webp&s=c4e25858d73fc581ea5d85a00a03eb7c0067ccaf";
    img.classList.add('mclovin');

    img.style.left = Math.random() * 100 + 'vw';

    const size = 50 + Math.random() * 100;
    img.style.width = size + 'px';

    img.style.animationDuration = (2 + Math.random() * 3) + 's';

    container.appendChild(img);
}

init();

