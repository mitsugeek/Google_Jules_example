document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.createElement('button');
  themeToggleButton.id = 'theme-toggle';
  themeToggleButton.innerText = 'Toggle Theme';
  document.body.prepend(themeToggleButton);

  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggleButton.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      theme = 'light';
    } else {
      theme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
});