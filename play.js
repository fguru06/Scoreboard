// ---- Helpers ----
function showToast(msg, type = 'success') {
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;bottom:24px;right:24px;padding:14px 24px;border-radius:12px;color:#fff;font-weight:600;z-index:999;background:${type === 'error' ? '#ef4444' : '#22c55e'};box-shadow:0 4px 20px rgba(0,0,0,0.3);animation:slideIn 0.3s ease,fadeOut 0.3s ease 2.7s forwards;`;
    t.textContent = msg;
    document.body.appendChild(t);
    const style = document.createElement('style');
    style.textContent = `@keyframes slideIn{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes fadeOut{to{opacity:0;transform:translateY(20px)}}`;
    document.head.appendChild(style);
    setTimeout(() => { t.remove(); style.remove(); }, 3000);
}

// ---- Sound System ----
const sounds = {
    cheer: new Audio('Scoreboard_Images_And_Music/crowd-cheering.mp3'),
    aww:   new Audio('Scoreboard_Images_And_Music/Awww.mp3'),
    dun:   new Audio('Scoreboard_Images_And_Music/Dun-Dun-Duun.mp3')
};
Object.values(sounds).forEach(a => { a.volume = 0.6; });

let audioUnlocked = false;
function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    Object.values(sounds).forEach(a => {
        a.play().then(() => { a.pause(); a.currentTime = 0; }).catch(() => {});
    });
}
document.addEventListener('click', unlockAudio, { once: true });
document.addEventListener('touchstart', unlockAudio, { once: true });

function playSound(name) {
    try {
        const audio = sounds[name];
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
    } catch(e) {}
}

// ---- LocalStorage Persistence ----
function getSbData(id) {
    try {
        return JSON.parse(localStorage.getItem('sbData_' + id)) || {};
    } catch { return {}; }
}

function saveSbData(id, data) {
    localStorage.setItem('sbData_' + id, JSON.stringify(data));
}

// ---- Main ----
const urlParams = new URLSearchParams(window.location.search);
const sbId = urlParams.get('id');

if (!sbId) {
    document.getElementById('mainContent').innerHTML = `
        <div class="error-card">
            <h2>⚠️ No Scoreboard Selected</h2>
            <p>Please go back and choose a scoreboard to play.</p>
            <a href="index.html" class="back-btn" style="display:inline-block;">← Back to Scoreboards</a>
        </div>
    `;
    throw new Error('No scoreboard ID');
}

// Load scoreboard config
let sbConfig = null;
try {
    const all = JSON.parse(localStorage.getItem('scoreboards')) || [];
    sbConfig = all.find(s => s.id === sbId);
} catch(e) {}

if (!sbConfig) {
    document.getElementById('mainContent').innerHTML = `
        <div class="error-card">
            <h2>😕 Scoreboard Not Found</h2>
            <p>This scoreboard could not be found. It may have been deleted.</p>
            <a href="index.html" class="back-btn" style="display:inline-block;">← Back to Scoreboards</a>
        </div>
    `;
    throw new Error('Scoreboard config not found');
}

const { title, player1, player2, theme } = sbConfig;
document.title = `${title} — Scoreboard`;

// ---- Render UI ----
const main = document.getElementById('mainContent');
main.innerHTML = `
    <div class="scoreboard-card">
        <div class="sb-header">
            <h1>${theme || '🏆'} ${title}</h1>
            <div class="vs">${player1} 🆚 ${player2}</div>
        </div>

        <div class="winner-banner" id="winnerMessage">&nbsp;</div>

        <!-- Points -->
        <div class="player-row">
            <div class="player-card p1">
                <div class="name">${player1}</div>
                <div class="score" id="p1Score" onclick="openNumpad('p1Score','p1-color')">0</div>
                <button class="btn btn-set" onclick="openNumpad('p1Score','p1-color')">✏️ Set Score</button>
            </div>
            <div class="player-card p2">
                <div class="name">${player2}</div>
                <div class="score" id="p2Score" onclick="openNumpad('p2Score','p2-color')">0</div>
                <button class="btn btn-set" onclick="openNumpad('p2Score','p2-color')">✏️ Set Score</button>
            </div>
        </div>

        <div class="action-bar">
            <button class="btn btn-reset" id="resetBtn">⟳ RESET POINTS</button>
        </div>

        <!-- Wins -->
        <div class="section-divider">🏆 Wins</div>
        <div class="player-row">
            <div class="player-card p1">
                <div class="wins-label">${player1} Wins</div>
                <div class="wins-score" id="p1Wins" onclick="openNumpad('p1Wins','p1-color')">0</div>
                <button class="btn btn-set" onclick="openNumpad('p1Wins','p1-color')">✏️ Set Wins</button>
            </div>
            <div class="player-card p2">
                <div class="wins-label">${player2} Wins</div>
                <div class="wins-score" id="p2Wins" onclick="openNumpad('p2Wins','p2-color')">0</div>
                <button class="btn btn-set" onclick="openNumpad('p2Wins','p2-color')">✏️ Set Wins</button>
            </div>
        </div>

        <div class="action-bar">
            <button class="btn btn-reset" id="resetWinsBtn">⟳ RESET WINS</button>
        </div>
    </div>
`;

// ---- Load saved scores ----
const saved = getSbData(sbId);
if (saved.p1Score !== undefined) document.getElementById('p1Score').textContent = saved.p1Score;
if (saved.p2Score !== undefined) document.getElementById('p2Score').textContent = saved.p2Score;
if (saved.p1Wins !== undefined) document.getElementById('p1Wins').textContent = saved.p1Wins;
if (saved.p2Wins !== undefined) document.getElementById('p2Wins').textContent = saved.p2Wins;

// ---- Persist helper ----
function persistAll() {
    saveSbData(sbId, {
        p1Score: document.getElementById('p1Score').textContent,
        p2Score: document.getElementById('p2Score').textContent,
        p1Wins: document.getElementById('p1Wins').textContent,
        p2Wins: document.getElementById('p2Wins').textContent
    });
}

// ---- Numpad Modal ----
let numpadTarget = null;
let numpadColor = '';
let numpadValue = '';

window.openNumpad = function(targetId, colorClass) {
    numpadTarget = document.getElementById(targetId);
    numpadColor = colorClass;
    numpadValue = numpadTarget.textContent === '0' ? '' : numpadTarget.textContent;

    const overlay = document.createElement('div');
    overlay.className = 'numpad-overlay';
    overlay.id = 'numpadOverlay';
    overlay.innerHTML = `
        <div class="numpad-modal">
            <div class="numpad-title">Enter score</div>
            <div class="numpad-display ${numpadColor}" id="numpadDisplay">${numpadValue || '0'}</div>
            <div class="numpad-grid">
                ${[1,2,3,4,5,6,7,8,9].map(n => `<button class="numpad-key" data-num="${n}">${n}</button>`).join('')}
            </div>
            <div class="numpad-actions">
                <button class="numpad-key key-clear" id="numpadClear">⌫</button>
                <button class="numpad-key key-ok" id="numpadOk">✓ OK</button>
            </div>
            <button class="numpad-key" data-num="0" style="width:100%;margin-top:8px;padding:14px;">0</button>
        </div>
    `;
    document.body.appendChild(overlay);

    // Number keys
    overlay.querySelectorAll('[data-num]').forEach(btn => {
        btn.addEventListener('click', () => {
            const digit = btn.dataset.num;
            if (numpadValue.length < 5) {
                numpadValue += digit;
                document.getElementById('numpadDisplay').textContent = numpadValue;
            }
        });
    });

    // Clear (backspace)
    document.getElementById('numpadClear').addEventListener('click', () => {
        numpadValue = numpadValue.slice(0, -1);
        document.getElementById('numpadDisplay').textContent = numpadValue || '0';
    });

    // OK
    document.getElementById('numpadOk').addEventListener('click', () => {
        const val = parseInt(numpadValue, 10) || 0;
        numpadTarget.textContent = val;
        persistAll();
        if (numpadTarget.id === 'p1Score' || numpadTarget.id === 'p2Score') {
            checkWinner();
        }
        playSound('cheer');
        closeNumpad();
    });

    // Click outside to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeNumpad();
    });
};

function closeNumpad() {
    const el = document.getElementById('numpadOverlay');
    if (el) el.remove();
    numpadTarget = null;
}

// ---- Reset Handlers ----
document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('p1Score').textContent = '0';
    document.getElementById('p2Score').textContent = '0';
    persistAll();
    playSound('dun');
    checkWinner();
});
document.getElementById('resetWinsBtn').addEventListener('click', () => {
    document.getElementById('p1Wins').textContent = '0';
    document.getElementById('p2Wins').textContent = '0';
    persistAll();
    playSound('dun');
});

// ---- Winner Logic ----
function checkWinner() {
    const p1Val = parseInt(document.getElementById('p1Score').textContent, 10) || 0;
    const p2Val = parseInt(document.getElementById('p2Score').textContent, 10) || 0;
    const msg = document.getElementById('winnerMessage');

    if (p1Val > p2Val) {
        msg.innerHTML = `🏆 <b>${player1}</b> is winning by <b>${p1Val - p2Val}</b> point${p1Val - p2Val !== 1 ? 's' : ''}!`;
    } else if (p2Val > p1Val) {
        msg.innerHTML = `🏆 <b>${player2}</b> is winning by <b>${p2Val - p1Val}</b> point${p2Val - p1Val !== 1 ? 's' : ''}!`;
    } else if (p1Val === 0 && p2Val === 0) {
        msg.innerHTML = '&nbsp;';
    } else {
        msg.innerHTML = `🤝 It's a tie!`;
    }
}

// Run winner check on load
checkWinner();
