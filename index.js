
let selectedCrop = null;

const carrotBtn = document.getElementById('carrot-button');
const berryBtn = document.getElementById('berry-button');
const melonBtn = document.getElementById('watermelon-button');

carrotBtn.addEventListener('click', () => {
    selectedCrop = 'carrot';
    console.log("Selected: Carrot");
});

berryBtn.addEventListener('click', () => {
    selectedCrop = 'berry';
    console.log("Selected: Berry");
});

melonBtn.addEventListener('click', () => {
    selectedCrop = 'melon';
    console.log("Selected: Melon");
});

// Select all the garden plots
const plots = document.querySelectorAll('.plot');

plots.forEach(plot => {
    plot.addEventListener('click', () => {
        // Only plant if a crop is selected AND the plot is empty
        if (selectedCrop && !plot.classList.contains('planted')) {
            plot.classList.add('planted');
            
            if (selectedCrop === 'carrot') {
                plot.innerHTML = '<img src="./images/carrot.png" alt="Carrot" class="grown-crop">';
            } else if (selectedCrop === 'berry') {
                plot.innerHTML = '<img src="./images/berries.png" alt="Berry" class="grown-crop">';
            } else if (selectedCrop === 'melon') {
                plot.innerHTML = '<img src="./images/melon.png" alt="Melon" class="grown-crop">';
            }
            
            // Timer to double / make ready to harvest (set to 4 seconds for testing)
            setTimeout(() => {
                plot.innerHTML += '<span style="font-size: 12px; display:block; color:gold;">(x2 Ready!)</span>';
                plot.classList.add('ready-to-harvest');
            }, 4000);

            // Reset selection
            selectedCrop = null;
        }    
    });
});