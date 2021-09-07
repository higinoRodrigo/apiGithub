let diaNoite = document.querySelector('.Noite_Dia')
let icone = document.querySelector('.toggle')
const toggle = document.querySelector('.toggleDarkMode')
const html = document.querySelector('html')
const metaTheme = document.querySelector('meta[name=theme-color]')

const userTheme = localStorage.getItem('userTheme')

const themes = {
  light: {
    whiteDefault: '#000',
    blackDefault: '#fff',
    background: '#f4f4f4',
    contraste: '#fff',
  },
  dark: {
    whiteDefault: '#fff',
    blackDefault: '#000',
    background: '#141c2f',
    contraste: '#1f2a48',
  },
}

function changeColors(theme) {
  const themeColors = themes[theme]
  Object.keys(themeColors).map(function (key) {
    html.style.setProperty(`--${key}`, themeColors[key])
  })
  metaTheme.setAttribute('content', themeColors['background']);
}

function setTheme(theme) {
  changeColors(theme)
  localStorage.setItem('userTheme', theme)
}

toggle.addEventListener('click', () => {
  function setIconTitle() {
    if (diaNoite.innerHTML == 'noite' && icone.classList.contains('ri-moon-line')){
      icone.classList.remove('ri-moon-line')
      icone.classList.add('ri-sun-line')
      diaNoite.innerHTML = 'dia'
      return diaNoite, icone, setTheme('light')
    }
    if (diaNoite.innerHTML == 'dia' && icone.classList.contains('ri-sun-line')){
      icone.classList.remove('ri-sun-line')
      icone.classList.add('ri-moon-line')
      diaNoite.innerHTML = 'noite'

      return diaNoite, icone, setTheme('dark')
    }
  }
  setIconTitle()
})

if (userTheme) {
  setTheme(userTheme)
} else {
  setTheme(toggle.matches ? 'dark' : 'light')
}

if (userTheme == 'light') {
  icone.classList.remove('ri-moon-line')
  icone.classList.add('ri-sun-line')
  diaNoite.innerHTML = 'dia'
}
