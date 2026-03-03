const updates = document.querySelectorAll(".update");

let u = updates.length - 1;

function turn() {
    updates.forEach((el, i) => {
        el.style.display = i === u ? "block" : "none";
    });
}

document.querySelector(".prev").onclick = () => {
    if (u > 0) u--;
    turn();
};

document.querySelector(".next").onclick = () => {
    if (u < updates.length - 1) u++;
    turn();
};

turn();