const abilitiesDatabase = [
    { id: "dash", name: "Dash", color: "#ff4757", svg: '<path d="M15 15l15 10-15 10M25 15l15 10-15 10" stroke="white" stroke-width="3" fill="none"/>' },
    { id: "grenade", name: "Grenade", color: "#4b6584", svg: '<circle cx="25" cy="27" r="11" fill="white"/><rect x="23" y="11" width="4" height="5" fill="white"/>' },
    { id: "bow", name: "Bow", color: "#eccc68", svg: '<path d="M15 12c12 3 12 23 0 26" stroke="white" stroke-width="3" fill="none"/>' },
    { id: "engine", name: "Engine", color: "#ffa502", svg: '<path d="M18 15h14v15L25 40L18 30z" fill="white"/>' },
    { id: "blinkgun", name: "Blink Gun", color: "#b33939", svg: '<rect x="14" y="20" width="16" height="10" fill="white"/><circle cx="34" cy="25" r="4" fill="white"/>' },
    { id: "gust", name: "Gust", color: "#c1efff", svg: '<path d="M12 20h20M16 26h22M14 32h16" stroke="white" stroke-width="2"/>' },
    { id: "growth", name: "Growth Ray", color: "#ff6b81", svg: '<path d="M25 10v30M15 20l10-10 10 10" stroke="white" stroke-width="3" fill="none"/>' },
    { id: "rock", name: "Rock", color: "#747d8c", svg: '<path d="M12 35l6-18h14l6 18z" fill="white"/>' },
    { id: "missile", name: "Missile", color: "#fa8231", svg: '<rect x="21" y="15" width="8" height="20" fill="white"/><path d="M21 15l4-8 4 8z" fill="white"/>' },
    { id: "spike", name: "Spike", color: "#706fd3", svg: '<path d="M15 35l10-20 10 20z" fill="white"/>' },
    { id: "timestop", name: "Time Stop", color: "#45aaf2", svg: '<circle cx="25" cy="25" r="15" fill="none" stroke="white" stroke-width="3"/><path d="M25 15v10h7" stroke="white" stroke-width="2"/>' },
    { id: "smoke", name: "Smoke", color: "#778ca3", svg: '<circle cx="20" cy="23" r="8" fill="white"/><circle cx="29" cy="27" r="9" fill="white"/>' },
    { id: "platform", name: "Platform", color: "#2ed573", svg: '<rect x="8" y="22" width="34" height="8" rx="2" fill="white"/>' },
    { id: "revival", name: "Revival", color: "#26de81", svg: '<path d="M25 12v26M12 25h26" stroke="white" stroke-width="4"/>' },
    { id: "roll", name: "Roll", color: "#ff7f50", svg: '<circle cx="25" cy="25" r="15" fill="none" stroke="white" stroke-width="3"/>' },
    { id: "shrink", name: "Shrink Ray", color: "#70a1ff", svg: '<path d="M25 40V10M15 30l10 10 10-10" stroke="white" stroke-width="3" fill="none"/>' },
    { id: "blackhole", name: "Black Hole", color: "#371B58", svg: '<circle cx="25" cy="25" r="11" fill="black" stroke="#00ffff" stroke-width="3"/>' },
    { id: "invisibility", name: "Invisibility", color: "#a5b1c2", svg: '<circle cx="25" cy="25" r="12" fill="none" stroke="white" stroke-width="2" stroke-dasharray="4"/>' },
    { id: "meteor", name: "Meteor", color: "#eb3b5a", svg: '<circle cx="28" cy="28" r="9" fill="white"/><path d="M12 12l10 10M18 10l8 14" stroke="white" stroke-width="2"/>' },
    { id: "throw", name: "Throw", color: "#ff793f", svg: '<path d="M15 35c5-15 20-15 20 0" stroke="white" stroke-width="3" fill="none"/>' },
    { id: "push", name: "Push", color: "#a55eea", svg: '<path d="M15 25h20M27 17l8 8-8 8" stroke="white" stroke-width="3" fill="none"/>' },
    { id: "tesla", name: "Tesla Coil", color: "#474787", svg: '<circle cx="25" cy="16" r="6" fill="white"/><rect x="23" y="22" width="4" height="15" fill="white"/>' },
    { id: "mine", name: "Mine", color: "#2d3436", svg: '<circle cx="25" cy="25" r="12" fill="white"/><circle cx="25" cy="25" r="3" fill="red"/>' },
    { id: "teleport", name: "Teleport", color: "#95afc0", svg: '<path d="M10 25h30M32 17l8 8-8 8" stroke="white" stroke-width="3"/>' },
    { id: "drill", name: "Drill", color: "#fed330", svg: '<path d="M25 38L14 18h22z" fill="white"/>' },
    { id: "hook", name: "Grappling Hook", color: "#57606f", svg: '<path d="M25 12v20c0 4-4 4-4 0" stroke="white" stroke-width="3" fill="none"/>' },
    { id: "beam", name: "Beam", color: "#fa8231", svg: '<rect x="10" y="22" width="30" height="6" fill="white"/>' },
    { id: "duplicator", name: "Duplicator", color: "#33d9b2", svg: '<circle cx="17" cy="25" r="6" fill="white"/><circle cx="33" cy="25" r="6" fill="white"/>' },
    { id: "magnet", name: "Magnet Gun", color: "#ff5252", svg: '<path d="M16 20v10h6V20zm12 0v10h6V20z" fill="white"/>' }
];

let selectedIds = [];
const menuEl = document.getElementById('abilitiesMenu');

// Отрисовка меню выбора
abilitiesDatabase.forEach(ab => {
    const card = document.createElement('div');
    card.className = 'ability-card';
    card.id = `card-${ab.id}`;
    card.onclick = () => toggleAbility(ab.id);
    card.innerHTML = `<div class="ability-icon"><svg width="50" height="50" viewBox="0 0 50 50" style="background:${ab.color}; border-radius:10px;">${ab.svg}</svg></div><div class="ability-name">${ab.name}</div>`;
    menuEl.appendChild(card);
});

// Первоначальная загрузка сохраненных связок из памяти
loadSavedCombos();

function toggleAbility(id) {
    const index = selectedIds.indexOf(id);
    if (index > -1) {
        selectedIds.splice(index, 1);
        document.getElementById(`card-${id}`).classList.remove('selected');
    } else {
        if (selectedIds.length >= 3) {
            alert("Максимум можно выбрать только 3 способности!");
            return;
        }
        selectedIds.push(id);
        document.getElementById(`card-${id}`).classList.add('selected');
    }
    document.getElementById('selectCount').innerText = selectedIds.length;
    document.getElementById('saveBtn').disabled = (selectedIds.length !== 3);
}

function saveCombo() {
    if (selectedIds.length !== 3) return;
    const nick = document.getElementById('nickname').value.trim() || "Игрок";
    const cell = document.getElementById('cellName').value.trim() || "Слот_1";
    const chosenAbilities = abilitiesDatabase.filter(ab => selectedIds.includes(ab.id));

    document.getElementById('resNick').innerText = nick;
    document.getElementById('resCell').innerText = cell;
    
    const iconsDiv = document.getElementById('resultIcons');
    iconsDiv.innerHTML = '';
    chosenAbilities.forEach(ab => {
        iconsDiv.innerHTML += `<div class="res-item"><svg width="40" height="40" viewBox="0 0 50 50" style="background:${ab.color}; border-radius:8px;">${ab.svg}</svg><div style="font-size:11px; margin-top:5px;">${ab.name}</div></div>`;
    });

    document.getElementById('comboResult').style.display = 'block';
    
    const syncData = { player: nick, cell: cell, ids: selectedIds };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(syncData))));
    document.getElementById('syncCode').value = encoded;

    // СОХРАНЕНИЕ В ЛОКАЛЬНУЮ ПАМЯТЬ
    let localCombos = JSON.parse(localStorage.getItem('bopl_combos')) || [];
    // Удаляем старую связку с таким же именем ячейки, если она была, чтобы перезаписать
    localCombos = localCombos.filter(c => !(c.cell === cell && c.player === nick));
    localCombos.push(syncData);
    localStorage.setItem('bopl_combos', JSON.stringify(localCombos));

    loadSavedCombos();
}

function importCombo() {
    const code = document.getElementById('syncCode').value.trim();
    if (!code) return alert("Вставьте код синхронизации!");
    try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(code))));
        
        // Добавляем импортированную связку в память
        let localCombos = JSON.parse(localStorage.getItem('bopl_combos')) || [];
        localCombos = localCombos.filter(c => !(c.cell === decoded.cell && c.player === decoded.player));
        localCombos.push(decoded);
        localStorage.setItem('bopl_combos', JSON.stringify(localCombos));

        // Выделяем карточки на экране
        selectedIds.forEach(id => {
            const card = document.getElementById(`card-${id}`);
            if(card) card.classList.remove('selected');
        });
        document.getElementById('nickname').value = decoded.player;
        document.getElementById('cellName').value = decoded.cell;
        selectedIds = [...decoded.ids];
        selectedIds.forEach(id => {
            const card = document.getElementById(`card-${id}`);
            if(card) card.classList.add('selected');
        });
        document.getElementById('selectCount').innerText = selectedIds.length;
        document.getElementById('saveBtn').disabled = (selectedIds.length !== 3);

        saveCombo();
        alert("Успешно импортировано и сохранено в список!");
    } catch (e) {
        alert("Ошибка импорта! Неверный код.");
    }
}

// ФУНКЦИЯ ОТРИСОВКИ СПИСКА СНИЗУ
function loadSavedCombos() {
    const listEl = document.getElementById('savedCombosList');
    if (!listEl) return;
    listEl.innerHTML = '';
    
    const localCombos = JSON.parse(localStorage.getItem('bopl_combos')) || [];
    
    if (localCombos.length === 0) {
        listEl.innerHTML = '<p style="color:#666; font-size:14px; text-align:center;">Список пуст. Создайте или импортируйте первую связку!</p>';
        return;
    }

    localCombos.forEach((combo, index) => {
        const item = document.createElement('div');
        item.className = 'saved-item';
        
        // Находим инфо о способностях по ID
        let iconsHtml = '';
        combo.ids.forEach(id => {
            const ab = abilitiesDatabase.find(a => a.id === id);
            if (ab) {
                iconsHtml += `
                    <div style="display:inline-block; text-align:center; margin-right:15px;">
                        <svg width="30" height="30" viewBox="0 0 50 50" style="background:${ab.color}; border-radius:6px; display:block; margin:0 auto;">${ab.svg}</svg>
                        <span style="font-size:10px; color:#aaa;">${ab.name}</span>
                    </div>`;
            }
        });

        item.innerHTML = `
            <div class="saved-header">
                <div><strong>${combo.cell}</strong> (Игрок: ${combo.player})</div>
                <button class="delete-btn" onclick="deleteCombo(${index})">Удалить</button>
            </div>
${iconsHtml}`;listEl.appendChild(item);});}function deleteCombo(index) {let localCombos = JSON.parse(localStorage.getItem('bopl_combos')) || [];localCombos.splice(index, 1);localStorage.setItem('bopl_combos', JSON.stringify(localCombos));loadSavedCombos();}