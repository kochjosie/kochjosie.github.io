const catImgs = ["homepage_assets/cat-closed-mouth.png", "homepage_assets/cat-open-mouth.png"];
const bulbImgs = ["homepage_assets/bulb-off.png", "homepage_assets/bulb-on.png"];

let currentCatIdx = 0;
let currentBulbIdx = 0;

window.addEventListener('load', () => {
    currentCatIdx = Math.floor(Math.random() * 2);
    currentBulbIdx = Math.floor(Math.random() * 2);

    document.getElementById("cat-img").src=catImgs[currentCatIdx];
    document.getElementById("lightbulb-img").src=bulbImgs[currentBulbIdx];

    // CLICKS AFTER ORIGINAL LOAD
    document.getElementById("cat-img").addEventListener('click', () => {
        currentCatIdx = (currentCatIdx == 0 ? 1 : 0);
        document.getElementById("cat-img").src=catImgs[currentCatIdx];
    })

    document.getElementById("lightbulb-img").addEventListener('click', () => {
        currentBulbIdx = (currentBulbIdx == 0 ? 1 : 0);
        document.getElementById("lightbulb-img").src=bulbImgs[currentBulbIdx];
    })
})