const pages = [
    "stpzine/pg-one.png",
    "stpzine/pg-two-three.png",
    "stpzine/pg-four-five.png",
    "stpzine/pg-six-seven.png",
    "stpzine/pg-eight-nine.png",
    "stpzine/pg-ten-eleven.png",
    "stpzine/pg-twelve-thirteen.png",
    "stpzine/pg-fourteen-fifteen.png",
    "stpzine/pg-sixteen.png"
]

let current = 0;
const img = document.getElementById("zine-page");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

next.addEventListener("click", () => {
    if (current < pages.length - 1) {
        current++;
        img.src = pages[current];
    }
});

prev.addEventListener("click", () => {
    if (current > 0) {
        current--;
        img.src = pages[current];
    }
});