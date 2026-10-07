function makeTextFloat(selector) {
    const element = document.querySelector(selector);
    const text = element.textContent;
    element.innerHTML = '';
    element.style.userSelect = 'none';
    
    const letters = [];

    text.split('').forEach(ch => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.cursor = 'default';

    if (ch === ' ') {
        span.style.width = '0.28em';
        span.textContent = '\u00A0'; // non-breaking space
    } else {
        span.textContent = ch;
    }

    span.x = 0;
    span.y = 0;
    span.r = 0;

    span.target_x = 0;
    span.target_y = 0;
    span.target_r = 0;

    span.phase = Math.random() * Math.PI * 2;
    span.hovered = false;

    span.addEventListener('mouseover', () => span.hovered = true);
    span.addEventListener('mouseout', () => span.hovered = false);

    element.appendChild(span);
    letters.push(span);
    });

    let t = 0;

    function animateLetters() {
        t += 0.02;

        letters.forEach(span => {
            const phase = span.phase;

            if (span.hovered) {
                span.target_x = Math.sin(t * 1.3 + phase) * 10;
                span.target_y = Math.cos(t * 1.1 + phase * 1.4) * 10;
                span.target_r = Math.sin(t * 0.9 + phase * 0.7) * 10 * 0.8;
            } else {
                span.target_x = 0;
                span.target_y = 0;
                span.target_r = 0;
            }

            const lerpSpeed = span.hovered ? 0.25 : 0.02;
            span.x += (span.target_x - span.x) * lerpSpeed;
            span.y += (span.target_y - span.y) * lerpSpeed;
            span.r += (span.target_r - span.r) * lerpSpeed;
            
            span.style.transform =
                `translate(${span.x.toFixed(2)}px, ${span.y.toFixed(2)}px) ` +
                `rotate(${span.r.toFixed(2)}deg)`;
        });

        requestAnimationFrame(animateLetters);
    }
    animateLetters();
}

makeTextFloat('#heading');