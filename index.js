// Game State Variables
let selectedAction = null; // 'carrot', 'berry', 'melon', 'hoe', 'water'
let marketMode = 'sell';  // 'sell' or 'buy'

let inventory = {
    carrot: 1,
    berry: 0,
    melon: 0
};

let gold = 0;

const prices = {
    carrot: { sell: 1, buy: 2 },
    berry:  { sell: 2, buy: 5 },
    melon:  { sell: 3, buy: 10 }
};

// HTML Elements
const carrotBtn = document.getElementById('carrot-button');
const berryBtn = document.getElementById('berry-button');
const melonBtn = document.getElementById('watermelon-button');
const hoeBtn = document.getElementById('diamond-hoe-button');
const waterBtn = document.getElementById('water-button');

const carrotCountEl = document.getElementById('carrot-count');
const berryCountEl = document.getElementById('berry-count');
const melonCountEl = document.getElementById('melon-count');
const goldCountEl = document.getElementById('gold-count');

const modeToggleBtn = document.getElementById('mode-toggle-btn');
const marketActionBtn = document.getElementById('market-action-btn');
const marketCropSelect = document.getElementById('market-crop-select');
const marketAmountInput = document.getElementById('market-amount');

// Update UI counters
function updateUI() {
    carrotCountEl.textContent = inventory.carrot;
    berryCountEl.textContent = inventory.berry;
    melonCountEl.textContent = inventory.melon;
    goldCountEl.textContent = gold;
}

// Clear selected visual outline from all buttons
function clearSelection() {
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('selected'));
}

// Tool / Crop Selection Handler
function selectTool(action, buttonEl) {
    if (selectedAction === action) {
        selectedAction = null; // Unselect if clicked again
        clearSelection();
    } else {
        selectedAction = action;
        clearSelection();
        buttonEl.classList.add('selected');
    }
}

// Event listeners for tools & crops
carrotBtn.addEventListener('click', () => selectTool('carrot', carrotBtn));
berryBtn.addEventListener('click', () => selectTool('berry', berryBtn));
melonBtn.addEventListener('click', () => selectTool('melon', melonBtn));
hoeBtn.addEventListener('click', () => selectTool('hoe', hoeBtn));
waterBtn.addEventListener('click', () => selectTool('water', waterBtn));

// Garden Plots Handler
const plots = document.querySelectorAll('.plot');

plots.forEach(plot => {
    plot.addEventListener('click', () => {

        // 1. WATER BUCKET CLICKED
        if (selectedAction === 'water') {
            plot.classList.add('watered');

            // If a crop was already planted on dry ground, start growing now that it's watered
            if (plot.dataset.cropType && !plot.dataset.growingStarted) {
                startGrowth(plot);
            }
            return;
        }

        // 2. PLANTING CROP CLICKED
        if (['carrot', 'berry', 'melon'].includes(selectedAction)) {
            // Plant only if plot is empty AND player has at least 1 crop in inventory
            if (!plot.classList.contains('planted') && inventory[selectedAction] > 0) {
                inventory[selectedAction]--; // Decrease counter by 1
                updateUI();

                plot.classList.add('planted');
                plot.dataset.cropType = selectedAction;

                let imageSrc = '';
                if (selectedAction === 'carrot') imageSrc = './images/carrot.png';
                if (selectedAction === 'berry') imageSrc = './images/berries.png';
                if (selectedAction === 'melon') imageSrc = './images/melon.png';

                plot.innerHTML = `<img src="${imageSrc}" alt="${selectedAction}" class="grown-crop">`;

                // If plot is ALREADY watered, start growth timer immediately
                if (plot.classList.contains('watered')) {
                    startGrowth(plot);
                }
            }
            return;
        }

        // 3. DIAMOND HOE CLICKED (HARVESTING)
        if (selectedAction === 'hoe') {
            if (plot.classList.contains('ready-to-harvest')) {
                const cropType = plot.dataset.cropType;

                // Increase inventory by 2 (1 planted + 1 grown)
                inventory[cropType] += 2;
                updateUI();

                // Reset Plot
                plot.innerHTML = '';
                plot.classList.remove('planted', 'ready-to-harvest', 'watered');
                delete plot.dataset.cropType;
                delete plot.dataset.growingStarted;
            }
            return;
        }
    });
});

//Helper function to start 4-second countdown

function startGrowth(plot) {
    plot.dataset.growingStarted = "true";
    setTimeout(() => {
        plot.innerHTML += '<span style="file-size: 12px; display:block; color:gold;">(x2 Ready!)</span>';
        plot.classList.add('ready-to-harvest');
    }, 4000);
}

//market stuff

modeToggleBtn.addEventListener('click', () => {
    if (marketMode === 'sell') {
        marketMode = 'buy';
        modeToggleBtn.textContent = 'Switch to Sell';
        marketActivationBtn.textContent = 'Buy';
    } else{
        marketMode = 'sell';
        modeToggleBtn.textContent = 'Switch to Buy';
        marketActionBtn.textContent = 'Sell';
    }
});

marketActionBtn.addEventListener('click', () => {
    const crop = marketCropSelect.value;
    const amount = parseInt(marketAmountInput.value) || 0;

    if (amount <= 0) return;

    if (marketMode === 'sell') {
        if (inventory[crop] >= amount) {
            inventory[crop] -= amount;
            gold+= price[crop].sell *amount;
            updateUI();
        } else {
            alert("You don't have enough ${crop}s to sell!");
        }
    } else if (marketMode === 'buy') {
        const totalCost = prices[crop].buy *amount;
        if (gold>= totalCost) {
            gold -= totalCost;
            inventory[crop] += amount;
            updateUI();
        } else{
            alert("Not enough gold! You need ${totalCost} gold.");
        }
    }
});

updateUI();