//CSS functions
window.addEventListener('load', () => {
    const storedThemeColors = JSON.parse(localStorage.getItem('themeColors'));

    if (storedThemeColors) {
        // If there are stored theme colors, apply them
        setTheme(storedThemeColors.primaryColor, storedThemeColors.bgColor, storedThemeColors.primaryColorOpacity);
    }
});

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Open and close nav menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close nav menu when a nav-link is clicked
document.querySelectorAll('.nav-link').forEach(n => 
    n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    })
);

//Scrools to the developers section
document.getElementById('developers-nav').addEventListener('click', () => {
    window.scrollTo(0, document.body.scrollHeight);
});

const modal = document.getElementById('theme-modal');
//Opens the theme section
document.getElementById('theme-nav').addEventListener('click', () => {
    if (modal.style.display === 'none') {
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
    }
    else {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
});

function setTheme(primaryColor, bgColor, primaryColorOpacity) {
    document.documentElement.style.setProperty('--primmary-color', primaryColor);
    document.documentElement.style.setProperty('--bg-color', bgColor);
    document.documentElement.style.setProperty('--primmary-color-30-opacity', primaryColorOpacity);
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');

    // Store the theme colors in localStorage
    localStorage.setItem('themeColors', JSON.stringify({ primaryColor, bgColor, primaryColorOpacity }));
}

document.getElementById('theme1').addEventListener('click', () => {
    setTheme('#0c4da2', '#ddf4ff', '#0c4da24d');
});

document.getElementById('theme2').addEventListener('click', () => {
    setTheme('#0ca242', '#ddffe5', '#0ca2424d');
});

document.getElementById('theme3').addEventListener('click', () => {
    setTheme('#d02525', '#ffdddd', '#d025254d');
});

document.getElementById('theme4').addEventListener('click', () => {
    setTheme('#e5901f', '#ffefdd', '#e5901f4d');
});

window.addEventListener('load', () => {
    const storedThemeColors = JSON.parse(localStorage.getItem('themeColors'));

    if (storedThemeColors) {
        // If there are stored theme colors, apply them
        setTheme(storedThemeColors.primaryColor, storedThemeColors.bgColor, storedThemeColors.primaryColorOpacity);
    }
});