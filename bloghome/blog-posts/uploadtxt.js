async function loadPost() {
  const container = document.getElementById('text');
  const file = container.dataset.src;

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Couldn't load ${file}`);
    const text = await response.text();

    text
      .replace(/\r\n/g, '\n')    // normalize Windows line endings
      .split(/\n\s*\n/)          // split on blank lines
      .map(p => p.trim())
      .filter(p => p.length)
      .forEach(p => {
        const el = document.createElement('div');
        el.className = 'paragraph';
        el.textContent = p;
        container.appendChild(el);
      });
  } catch (err) {
    container.textContent = 'Sorry, this post failed to load.';
    console.error(err);
  }
}

loadPost();