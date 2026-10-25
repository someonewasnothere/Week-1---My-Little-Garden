# Week 1 - Garden




let selectedAction = null; 
let marketMode='sell';

let inventory = {
    carrot:1,
    berry:0,
    melon:0
};

let gold=0;

const prices = {
    carrot: {sell: 2, buy: 1},
    berry: {sell: 5, buy: 2},
    melon:{sell: 10, buy: 6}
};

let selectedCrop = null;

const carrotBtn = document.getElementById('carrot-button');
const berryBtn = document.getElementById('berry-button');
const melonBtn = document.getElementById('watermelon-button');
const hoeBtn= document.getElementById('diamond-hoe-button');
const waterBtn = document.getElementById('water-button');

const carrotCountEl = document.getElementById('carrot-count');
const berryCountEl = document.getElementById('berry-count');
const melonCountEl = document.getElementById('melon-count');
const goldCountEl = document.getElementById('gold-count');

const modeTogglwBtn = document.getElementById('mode-toggle-btn');
const marketActionBtn = document.getElementById('market-action-btn');
const marketCropSelect = document.getElementById('market-crop-select');
const marketAmountInput = document.getElementById('market-amount');

function updateUI(){
    carrotCountEl.textContent = inventory.carrot;
    berryCountEl.textContent = inventory.berry;
    melonCountEl.textContent = inventory.melon;
    goldCountEl.textContent = gold;
}

function clearSelection(){
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('selected'));
}

function selectTool(action, buttonEl){
    if (selectedAction === action) {
        selectedAction = null;
        clearSelection();
    } else{
        selectedAction = action;
        clearSelection();
        buttonEl.classList.add('selected');
    }
}

carrotBtn.addEventListener('click', () => selectTool ('carrot', carrotBtn));
berryBtn.addEventListener('click', () => selectTool('berry', berryBtn));
melonBtn.addEventListener('click', () => selectTool('melon', melonBtn));
hoeBtn.addEventListener('click', () => selectTool('hoe', hoeBtn));
waterBtn.addEventListener('click', () => selectTool('water',waterBtn));

const plots = document.querySelectorAll('.plot');

plots.forEach(plot => {
    plot.addEventListener('click', () => {
        if (selectedAction === 'water') {
            plot.classList.add('watered');

            if (plot.dataset.cropType && !plot.dataset.growingStarted){
                startGrowth(plot);
            }
            return;
        }

        if (['carrot','berry','melon'].includes(selectedAction)){
            if (!plot.classList.contains('planted') && inventory[selectedAction] > 0){
                inventory[selectedAction]--;
                updateUI();

                plot.classList.add('planted');
                plot.dataset.cropType = selectedAction;

                let imageSrc = '';
                if (selectedAction ==='carrot') imageSrc = './images/carrot.png';
                if (selectedAction === 'berry') imageSrc = './images/berries.png';
                if (selectedAction === 'melon') imageSrc = './images/melon.png';

                plot.innerHTML = '<img src="${imageSrc}" alt="${selectedAction}" class="grown-crop">';

                if (plot.classList.contains('watered')) {
                    startGrowth(plot);
                }
            }
            return;
        }

        if (selectedAction === 'hoe') {
            if (plot.classList.contains('ready-to-harvest')){
                const cropType = plot.dataset.cropType;
                
                inventory[cropType] += 2;
                updateUI();

                plot.innerHTML = '';
                plot.classList.remove('planted','ready-to-harvest','watered');
                delete plot.dataset.cropType;
                delete plot.dataset.growingStarted;
            }
            return;
        }
    });
});

function startGrowth(plot) {
    plot.dataset.growingStarted = "true";
    setTimeout(() => {
        plot.innerHTML += '<span style="font-size: 12px; display:block; color:gold;">(x2Ready!)</span>';
        plot.classList.add('ready-to-harvest');
    }, 4000);
}

modeToggleBtn.addEventListener('click',() => {
    if (marketMode === 'sell') {
        marketMode = 'buy';
        modeToggleBtn.textContent = 'Switch to Sell';
        marketActionBtn.textContent = 'Buy';
    }else {
        marketMode = 'sell';
        modeToggleBtn.textContent = 'Switch to buy';
        marketActionBtn.textContent = 'Sell';
    }
});

marketActionBtn.addEventListener('click',() => {
    const selectedCrop = marketCropSelect.value;
    const amount = parseInt(marketAmountInput.value) || 0;

    if (amount <= 0) return;

    if (marketMode === 'sell') {
        if (inventory[selectedCrop] >= amount) {
            inventory[selectedCrop] -= amount;
            gold += cropPrices [selectedCrop].sell *amount;
            updateUI();
        } else{
            alert("You don't have enough crops to sell!");
        }
    } else if (marketMode === 'buy') {
        const totalCost = cropPrices [selectedCrop].buy *amount;
        if (gold >= totalCost) {
            gold -= totalCost;
            inventory[selectedCrop] += amount;
            updateUI();
        }else{
            alert('Not enough gold! You need ${totalCost} gold.');
        }
    }
});

updateUI();
