document.addEventListener('DOMContentLoaded', () => {
    const quoteBox = document.getElementById('quotes');

    const quotes = [
        "The best way to get started is to quit talking and begin doing. - Walt Disney",
        "Don't let yesterday take up too much of today. - Will Rogers",
        "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
        "If you are working on something exciting, it will keep you motivated. - Unknown",
        "If you dont work, you wont have a life, dumbahhs. - Not Noah"
    ];

    function displayRandomQuote() {
        if (!quoteBox) {
            console.error('Element with id "quotes" not found.');
            return;
        }
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteBox.textContent = quotes[randomIndex];
    }
    function displayYear() {
        const yearElement = document.getElementsByClassName('year')[0];
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        } else {
            console.error('Element with class "year" not found.');
        }
    }

    displayRandomQuote();
    displayYear();

    /* -----------------------------
       Members data (edit this)
       Put your members here; the script will render cards automatically.
       Fields: name, role, img, age, dob, joined, tags (array or comma string),
       description, extra, priority (boolean)
    ------------------------------*/
    const MEMBERS = [
        {
            name: 'Noah Keyes',
            role: 'Lead Developer & Founder',
            img: 'img/logo-encased.png',
            age: '13',
            dob: '2012-08-27',
            joined: '2025-01-21',
            tags: ['Lead','Backend','Unity'],
            description: 'Handles core systems, build pipelines, and release management.',
            extra: 'Loves optimization and tooling.',
            priority: true
        },
        {
            name: "Lorem I'sum",
            role: 'UI/UX Designer',
            img: 'img/heade-bg.png',
            age: '15',
            dob: '2010-05-14',
            joined: '2025-03-10',
            tags: 'UI,UX,Design',
            description: 'Designs user interfaces and improves user experience across our platforms.',
            extra: 'Enjoys creating intuitive designs.',
            priority: false
        }
    ];

    function renderMembers(members, targetSelector = '.teams .team') {
        const container = document.querySelector(targetSelector);
        if (!container) {
            console.warn('Members container not found:', targetSelector);
            return;
        }
        // Clear existing members
        container.innerHTML = '';

        members.forEach(m => {
            const item = document.createElement('div');
            item.className = 'member';
            if (m.priority) item.classList.add('Priority');

            // dataset for modal
            if (m.description) item.dataset.description = m.description;
            if (m.age) item.dataset.age = m.age;
            if (m.dob) item.dataset.dob = m.dob;
            if (m.role) item.dataset.role = m.role;
            if (m.joined) item.dataset.joined = m.joined;
            if (m.tags) item.dataset.tags = Array.isArray(m.tags) ? m.tags.join(',') : m.tags;
            if (m.extra) item.dataset.extra = m.extra;

            // image
            const imgWrap = document.createElement('div');
            imgWrap.className = 'member-img';
            const img = document.createElement('img');
            img.src = m.img || 'img/logo-encased.png';
            img.alt = m.name || 'Member';
            imgWrap.appendChild(img);

            // info
            const info = document.createElement('div');
            info.className = 'member-info';
            const h3 = document.createElement('h3');
            h3.textContent = m.name || '';
            const p = document.createElement('p');
            p.textContent = m.role || '';
            info.appendChild(h3);
            info.appendChild(p);

            item.appendChild(imgWrap);
            item.appendChild(info);

            container.appendChild(item);
        });
    }

    // Render the members into the first team grid
    renderMembers(MEMBERS);

    // Create modal container
    let modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.setAttribute('aria-hidden', 'true');
    modalOverlay.innerHTML = `
        <div class="modal-content" role="dialog" aria-modal="true">
            <button class="modal-close" aria-label="Close">✕</button>
            <div class="modal-header">
                <img src="" alt="Member image">
                <div>
                    <div class="modal-title"></div>
                    <div class="modal-subtitle muted"></div>
                </div>
            </div>
            <div class="modal-body">
                <p class="modal-description"></p>
                <div class="modal-details">
                    <div class="detail"><strong>Role</strong><div class="detail-role"></div></div>
                    <div class="detail"><strong>Age</strong><div class="detail-age"></div></div>
                    <div class="detail"><strong>Date of birth</strong><div class="detail-dob"></div></div>
                    <div class="detail"><strong>Joined</strong><div class="detail-joined"></div></div>
                </div>
                <div class="modal-extra"></div>
                <div class="modal-tags" aria-label="Member tags"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const modalContent = modalOverlay.querySelector('.modal-content');
    const modalImg = modalOverlay.querySelector('.modal-header img');
    const modalTitle = modalOverlay.querySelector('.modal-title');
    const modalSubtitle = modalOverlay.querySelector('.modal-subtitle');
    const modalBody = modalOverlay.querySelector('.modal-body');
    const modalDescription = modalOverlay.querySelector('.modal-description');
    const modalRole = modalOverlay.querySelector('.detail-role');
    const modalAge = modalOverlay.querySelector('.detail-age');
    const modalDOB = modalOverlay.querySelector('.detail-dob');
    const modalJoined = modalOverlay.querySelector('.detail-joined');
    const modalExtra = modalOverlay.querySelector('.modal-extra');
    const modalTags = modalOverlay.querySelector('.modal-tags');
    const modalClose = modalOverlay.querySelector('.modal-close');

    function openMemberModal(memberEl) {
        // Scroll the clicked card to center of viewport
        memberEl.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});

        const img = memberEl.querySelector('.member-img img');
        const name = memberEl.querySelector('h3')?.textContent || '';
        const subtitle = memberEl.querySelector('p')?.textContent || '';
        // Build extra content — clone member-info or add placeholder

        const infoClone = memberEl.querySelector('.member-info')?.cloneNode(true);

        // data attributes
        const desc = memberEl.dataset.description || '';
        const age = memberEl.dataset.age || '';
        const dob = memberEl.dataset.dob || '';
        const role = memberEl.dataset.role || subtitle || '';
        const joined = memberEl.dataset.joined || '';
        const tags = memberEl.dataset.tags || '';
        const extra = memberEl.dataset.extra || '';

        modalImg.src = img ? img.src : '';
        modalImg.alt = img ? (img.alt || name) : '';
        modalTitle.textContent = name;
        modalSubtitle.textContent = subtitle;

        modalDescription.textContent = desc || (infoClone ? '' : 'No additional information available.');

        // Fill detail fields
        modalRole.textContent = role || '—';
        modalAge.textContent = age || '—';
        modalDOB.textContent = dob || '—';
        modalJoined.textContent = joined || '—';

        // Extra content — if member-info exists, append its paragraphs into modalExtra
        modalExtra.innerHTML = '';
        if (infoClone) {
            // remove images to avoid duplicates
            const innerImgs = infoClone.querySelectorAll('img');
            innerImgs.forEach(i => i.remove());
            // append clone children
            Array.from(infoClone.childNodes).forEach(n => modalExtra.appendChild(n.cloneNode(true)));
        } else if (extra) {
            modalExtra.textContent = extra;
        }

        // Tags
        modalTags.innerHTML = '';
        if (tags) {
            tags.split(',').map(t => t.trim()).filter(Boolean).forEach(t => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = t;
                modalTags.appendChild(span);
            });
        } else {
            // include priority/leader if present
            if (memberEl.classList.contains('Priority') || memberEl.classList.contains('priority')) {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = 'Priority';
                modalTags.appendChild(span);
            }
        }

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        modalClose.focus();
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
    }

    // Attach click handlers to member cards
    const members = document.querySelectorAll('.member');
    members.forEach(m => {
        m.style.cursor = 'pointer';
        // add badge for priority members
        if (m.classList.contains('Priority') || m.classList.contains('priority')) {
            const b = document.createElement('span');
            b.className = 'member-badge';
            b.textContent = 'PRIORITY';
            m.appendChild(b);
        }
        m.addEventListener('click', (e) => {
            // avoid opening when clicking links or buttons inside
            if (e.target.closest('a') || e.target.closest('button')) return;
            openMemberModal(m);
        });
    });

    // Close handlers
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});