document.addEventListener("DOMContentLoaded", () => {

  const spreads = document.querySelectorAll(".spread");
  let current = 0;

  function showSpread(i) {
    spreads.forEach(s => s.style.display = "none");
    spreads[i].style.display = "block";
  }
	
	spreads[0].style.display = "block";
	
  next.onclick = () => {
    if (current < spreads.length - 1) current++;
    showSpread(current);
  };

  prev.onclick = () => {
    if (current > 0) current--;
    showSpread(current);
  };

  showSpread(current);
});
