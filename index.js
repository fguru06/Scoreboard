// ---- Data Management ----
function getScoreboards() {
    try {
        return JSON.parse(localStorage.getItem('scoreboards')) || [];
    } catch { return []; }
}

function saveScoreboards(list) {
    localStorage.setItem('scoreboards', JSON.stringify(list));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

function showToast(msg, type = 'success') {
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

// ---- Render List ----
function renderList() {
    const list = getScoreboards();
    const container = document.getElementById('scoreboardList');

    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon">🏅</div>
                <p>No scoreboards yet! Create your first one above.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map(sb => `
        <div class="scoreboard-item">
            <div class="scoreboard-info">
                <h3>${sb.theme || '🏆'} ${sb.title} <span class="theme-badge">${sb.theme || '🏆'}</span></h3>
                <div class="players">${sb.player1} 🆚 ${sb.player2}</div>
                <div class="meta">Created ${new Date(sb.created).toLocaleDateString()}</div>
            </div>
            <div class="scoreboard-actions">
                <button class="btn btn-play" onclick="playScoreboard('${sb.id}')">▶ Play</button>
                <button class="btn btn-danger" onclick="deleteScoreboard('${sb.id}')">🗑 Delete</button>
            </div>
        </div>
    `).join('');
}

// ---- CRUD ----
function createScoreboard() {
    const title = document.getElementById('sbTitle').value.trim();
    const player1 = document.getElementById('player1Name').value.trim();
    const player2 = document.getElementById('player2Name').value.trim();
    const theme = document.getElementById('sbTheme').value;

    if (!title) { showToast('Please enter a scoreboard title.', 'error'); return; }
    if (!player1 || !player2) { showToast('Please enter both player names.', 'error'); return; }
    if (player1.toLowerCase() === player2.toLowerCase()) { showToast('Player names must be different!', 'error'); return; }

    const list = getScoreboards();
    const newSb = {
        id: generateId(),
        title,
        player1,
        player2,
        theme,
        created: Date.now()
    };
    list.push(newSb);
    saveScoreboards(list);
    renderList();

    // Clear form
    document.getElementById('sbTitle').value = '';
    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';

    showToast(`"${title}" created! 🎉`);
}

function playScoreboard(id) {
    window.location.href = 'play.html?id=' + encodeURIComponent(id);
}

function deleteScoreboard(id) {
    if (!confirm('Delete this scoreboard permanently?')) return;
    let list = getScoreboards();
    const sb = list.find(s => s.id === id);
    list = list.filter(s => s.id !== id);
    saveScoreboards(list);
    renderList();
    if (sb) showToast(`"${sb.title}" deleted.`);
}

// ---- Init ----
renderList();
