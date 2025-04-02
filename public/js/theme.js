document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme) {
    body.classList.add(savedTheme)
    updateThemeIcon(savedTheme)
  } else {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (prefersDarkMode) {
      body.classList.add("dark-mode")
      updateThemeIcon("dark-mode")
    } else {
      body.classList.add("light-mode")
      updateThemeIcon("light-mode")
    }
  }

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (body.classList.contains("light-mode")) {
        body.classList.replace("light-mode", "dark-mode")
        localStorage.setItem("theme", "dark-mode")
        updateThemeIcon("dark-mode")
      } else {
        body.classList.replace("dark-mode", "light-mode")
        localStorage.setItem("theme", "light-mode")
        updateThemeIcon("light-mode")
      }
    })
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return

    const icon = themeToggle.querySelector("i")
    if (icon) {
      if (theme === "dark-mode") {
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
      } else {
        icon.classList.remove("fa-sun")
        icon.classList.add("fa-moon")
      }
    }
  }
})

