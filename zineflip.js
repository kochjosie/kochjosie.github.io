const pages = document.querySelectorAll(".page");

let u = 0;

function turn() {
    pages.forEach((el, i) => {
        el.style.display = i === u ? "block" : "none";
    });
}

document.querySelector(".prev").onclick = () => {
    if (u > 0) u--;
    turn();
};

document.querySelector(".next").onclick = () => {
    if (u < pages.length - 1) u++;
    turn();
};

turn();