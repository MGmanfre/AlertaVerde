
const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
};

const STORAGE_KEY = 'alerta-verde-theme';

const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

let currentTheme = THEMES.LIGHT;

document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
});
function initializeTheme() {
    loadTheme();
    setupThemeToggleListeners();
    applyTheme(currentTheme);
    setupSystemThemeListener();
}
function loadTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
        currentTheme = savedTheme;
    } else {
        currentTheme = detectSystemTheme();
    }
}
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return THEMES.DARK;
    }
    return THEMES.LIGHT;
}

function setupThemeToggleListeners() {
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
}

function setupSystemThemeListener() {
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleSystemThemeChange);
    }
}

function handleSystemThemeChange(e) {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (!savedTheme) {
        const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
        setTheme(newTheme);
    }
}

function toggleTheme() {
    const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    setTheme(newTheme);
}

/**
 * Set specific theme
 */
function setTheme(theme) {
    if (!Object.values(THEMES).includes(theme)) {
        console.warn('Invalid theme:', theme);
        return;
    }
    
    currentTheme = theme;
    applyTheme(theme);
    saveTheme(theme);
}

function applyTheme(theme) {
    document.documentElement.removeAttribute('data-theme');
    
    if (theme === THEMES.DARK) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    updateThemeToggleIcons(theme);
    dispatchThemeChangeEvent(theme);
}

function updateThemeToggleIcons(theme) {
    const isDark = theme === THEMES.DARK;
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        themeToggle.setAttribute('aria-label', isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro');
    }
    
    if (mobileThemeToggle) {
        const icon = mobileThemeToggle.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        mobileThemeToggle.setAttribute('aria-label', isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro');
    }
}
function saveTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
        console.warn('Failed to save theme preference:', error);
    }
}

function dispatchThemeChangeEvent(theme) {
    const event = new CustomEvent('themechange', {
        detail: { theme: theme }
    });
    document.dispatchEvent(event);
}

function getCurrentTheme() {
    return currentTheme;
}

function isDarkTheme() {
    return currentTheme === THEMES.DARK;
}

function resetToSystemTheme() {
    localStorage.removeItem(STORAGE_KEY);
    const systemTheme = detectSystemTheme();
    setTheme(systemTheme);
}

window.AlertaVerdeTheme = {
    setTheme,
    getCurrentTheme,
    isDarkTheme,
    toggleTheme,
    resetToSystemTheme,
    THEMES
};

document.addEventListener('themechange', (e) => {
    console.log('Theme changed to:', e.detail.theme);
});

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.body.classList.add('theme-transitions');
    }, 100);
});

const themeTransitionStyle = document.createElement('style');
themeTransitionStyle.textContent = `
    .theme-transitions,
    .theme-transitions *,
    .theme-transitions *:before,
    .theme-transitions *:after {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
        transition-delay: 0s !important;
    }
`;
document.head.appendChild(themeTransitionStyle);

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
});

if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reducedMotionStyle = document.createElement('style');
    reducedMotionStyle.textContent = `
        .theme-transitions,
        .theme-transitions *,
        .theme-transitions *:before,
        .theme-transitions *:after {
            transition: none !important;
        }
    `;
    document.head.appendChild(reducedMotionStyle);
}
