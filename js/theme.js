// Check if themeColors is stored in localStorage
if (localStorage.getItem('themeColors')) {
    // Parse the stored themeColors
    const { primaryColor, bgColor, primaryColorOpacity } = JSON.parse(localStorage.getItem('themeColors'));
    // Apply the theme colors
    document.documentElement.style.setProperty('--primmary-color', primaryColor);
    document.documentElement.style.setProperty('--bg-color', bgColor);
    document.documentElement.style.setProperty('--primmary-color-30-opacity', primaryColorOpacity);
}