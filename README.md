The theme this week was outside, so I made a gardin

CONTROLS:
    -You can click the crops (carrots, berries, and melons), the tools (waterbucket and hoe)
    -Use the waterbucket to water the garden on the left
    -Click a crop and then click the plot you just watered, this plants the crop
    -Wait for the crop to grow, and then select the hoe and then click the grown crop to harvest it
    -Then you can sell your crops to the market, or buy more if you have the gold for it. 
GOAL:
    -Make as much gold as you want 




I just wanted to make a garden similar to Terra, and thought it is pretty good especially because of the CSS stuff.

---------------------------------
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Garden</title>
  <link rel="stylesheet" href="style.css">
</head>




<body>



<h1 id="garden-title">My Little Garden</h1>
<hr width="90%" size="4" color="black" >
<br>


<div id="game-container">
    
    <!--LEFT SIDE OF THE SCREEN (PLOTS)-->
    <div id="garden-grid">
        <!--FARMING PLOTS-->
        <div class="plot" data-index="0"> </div>
        <div class="plot" data-index="1"> </div>
        <div class="plot" data-index="2"> </div>
        <div class="plot" data-index="3"> </div>
        <div class="plot" data-index="4">gardens </div>
        <div class="plot" data-index="5"> </div>
        <div class="plot" data-index="6"> </div>
        <div class="plot" data-index="7"> </div>
        <div class="plot" data-index="8"> </div>
    </div>




    <!--RIGHG SIDE OF SCREEN (SELL, CROPS, TOOLS)-->
    <div id="sidebar">
         <!--Market box-->
        <div id= "sell-box">
            <div id=""market-header">
                <button id="mode-toggle-btn">Switch to Buy</button>
                <div id="gold-display">Gold: <span id="gold-count">0</span></div>
            </div>

            <div id="market-controls">
                <select id="market-crop-select">
                    <option value="carrot">Carrot</option>
                    <option value="berry">Berry</option>
                    <option value="melon">Melon</option>
                </select>
                <input type="number" id="market-amount" value="1" min="1" style="width: 50px;">
                <button id="market-action-btn">Sell</button>
            </div>
        </div>

        <!--CROPS AND TOOLS BUTTONS-->
        <div id="crop selections">
            <div class="crop-container">
                <button class="tool-btn" id="carrot-button" ><img src="./images/carrot.png" alt="Carrots"></button>
                <span class="crop-count" id="carrot-count">1</span>
            </div>

            <div class="crop-container">
                <button class="tool-btn" id="berry-button" ><img src="./images/berries.png" alt="Berries"></button>
                <span class="crop-count" id="berry-count">0</span>
            </div>

            <div class="crop-container">
                <button class="tool-btn" id="watermelon-button"><img src="./images/melon.png" alt="Melon"></button>
                <span class="crop-count" id="berry-count">0</span>
            </div>
        </div>
    
        <!--TOOLS BUTTONS-->
        <div>
            <button class="tool-btn" id="diamond-hoe-button" ><img src="images/diamond hoe.png" alt="Diamond hoe"></button>
            <button class="tool-btn" id="water-button" ><img src="images/water.png" alt="Water"></button>
        </div>
    </div>
</div>


<script src="index.js"></script>


</body>
</html>
