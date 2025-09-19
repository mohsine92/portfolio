/*SIR Epidemic Equation*/
window.MathJax = {
    tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
    svg: {fontCache: 'global'}
};



/* Function to show each project on the same page // it can be use for a potential MAJ*/

 async function loadProject(file) {
    const content = document.getElementById('content');
    content.innerHTML = '<em>Loading ...</em>';
  
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
      const text = await res.text();
  
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
  
      const links = doc.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!document.querySelector(`link[href="${href}"]`)) {
          const newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = href;
          document.head.appendChild(newLink);
        }
      });
  
      const fragmentSource = doc.querySelector('#project-root') || doc.body;
      content.innerHTML = fragmentSource.innerHTML;
  
    } catch (err) {
      content.innerHTML = `<p style="color:red">Erreur: ${err.message}</p>`;
      console.error(err);
    }
  }

  