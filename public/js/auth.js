document.addEventListener("DOMContentLoaded", () => {
  // Login and Signup Modal Functionality
  const loginBtn = document.getElementById("login-btn")
  const signupBtn = document.getElementById("signup-btn")
  const mobileLoginBtn = document.getElementById("mobile-login-btn")
  const mobileSignupBtn = document.getElementById("mobile-signup-btn")
  const loginModal = document.getElementById("login-modal")
  const signupModal = document.getElementById("signup-modal")
  const switchToSignup = document.getElementById("switch-to-signup")
  const switchToLogin = document.getElementById("switch-to-login")

  // Open login modal
  function openLoginModal() {
    if (loginModal) {
      loginModal.style.display = "flex"
      if (signupModal) signupModal.style.display = "none"
    }
  }

  // Open signup modal
  function openSignupModal() {
    if (signupModal) {
      signupModal.style.display = "flex"
      if (loginModal) loginModal.style.display = "none"
    }
  }

  // Event listeners for opening modals
  if (loginBtn) loginBtn.addEventListener("click", openLoginModal)
  if (signupBtn) signupBtn.addEventListener("click", openSignupModal)
  if (mobileLoginBtn) mobileLoginBtn.addEventListener("click", openLoginModal)
  if (mobileSignupBtn) mobileSignupBtn.addEventListener("click", openSignupModal)

  // Switch between login and signup
  if (switchToSignup) {
    switchToSignup.addEventListener("click", (e) => {
      e.preventDefault()
      openSignupModal()
    })
  }

  if (switchToLogin) {
    switchToLogin.addEventListener("click", (e) => {
      e.preventDefault()
      openLoginModal()
    })
  }

  // Login form submission
  const loginForm = document.getElementById("login-form")
  const loginMessage = document.getElementById("login-message")

  if (loginForm && loginMessage) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("login-email").value
      const password = document.getElementById("login-password").value

      // Simple validation
      if (!email || !password) {
        loginMessage.textContent = "Please fill in all fields"
        loginMessage.style.color = "var(--danger-color)"
        return
      }

      // Simulate login process
      loginMessage.textContent = "Logging in..."
      loginMessage.style.color = "var(--primary-color)"

      // Simulate API call
      setTimeout(() => {
        // For demo purposes, we'll just simulate a successful login
        loginMessage.textContent = "Login successful! Redirecting..."
        loginMessage.style.color = "var(--success-color)"

        // Simulate redirect after login
        setTimeout(() => {
          loginModal.style.display = "none"
          // In a real app, you would redirect or update UI for logged-in state
          updateUIForLoggedInUser(email)
        }, 1500)
      }, 1500)
    })
  }

  // Signup form submission
  const signupForm = document.getElementById("signup-form")
  const signupMessage = document.getElementById("signup-message")

  if (signupForm && signupMessage) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("signup-name").value
      const email = document.getElementById("signup-email").value
      const password = document.getElementById("signup-password").value
      const confirmPassword = document.getElementById("signup-confirm").value
      const termsChecked = document.getElementById("terms").checked

      // Simple validation
      if (!name || !email || !password || !confirmPassword) {
        signupMessage.textContent = "Please fill in all fields"
        signupMessage.style.color = "var(--danger-color)"
        return
      }

      if (password !== confirmPassword) {
        signupMessage.textContent = "Passwords do not match"
        signupMessage.style.color = "var(--danger-color)"
        return
      }

      if (!termsChecked) {
        signupMessage.textContent = "Please agree to the Terms of Service"
        signupMessage.style.color = "var(--danger-color)"
        return
      }

      // Simulate signup process
      signupMessage.textContent = "Creating account..."
      signupMessage.style.color = "var(--primary-color)"

      // Simulate API call
      setTimeout(() => {
        // For demo purposes, we'll just simulate a successful signup
        signupMessage.textContent = "Account created successfully! Redirecting..."
        signupMessage.style.color = "var(--success-color)"

        // Simulate redirect after signup
        setTimeout(() => {
          signupModal.style.display = "none"
          // In a real app, you would redirect or update UI for logged-in state
          updateUIForLoggedInUser(name)
        }, 1500)
      }, 1500)
    })
  }

  // Update UI for logged-in user
  function updateUIForLoggedInUser(nameOrEmail) {
    // This is a simplified version for demo purposes
    // In a real app, you would update multiple UI elements

    const authButtons = document.querySelector(".auth-buttons")
    const mobileAuth = document.querySelector(".mobile-auth")

    if (authButtons) {
      authButtons.innerHTML = `
                <div class="user-menu">
                    <button class="btn btn-outline user-btn">
                        <i class="fas fa-user"></i> ${nameOrEmail.split("@")[0]}
                    </button>
                    <div class="user-dropdown">
                        <a href="#"><i class="fas fa-user-circle"></i> Profile</a>
                        <a href="#"><i class="fas fa-bookmark"></i> Saved Papers</a>
                        <a href="#"><i class="fas fa-cog"></i> Settings</a>
                        <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            `
    }

    if (mobileAuth) {
      mobileAuth.innerHTML = `
                <button class="btn btn-outline">
                    <i class="fas fa-user"></i> ${nameOrEmail.split("@")[0]}
                </button>
                <button id="mobile-logout-btn" class="btn btn-primary">Logout</button>
            `
    }

    // Add event listener for logout
    const logoutBtn = document.getElementById("logout-btn")
    const mobileLogoutBtn = document.getElementById("mobile-logout-btn")

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault()
        // In a real app, you would handle logout logic
        // For demo, we'll just reload the page
        window.location.reload()
      })
    }

    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener("click", () => {
        // In a real app, you would handle logout logic
        // For demo, we'll just reload the page
        window.location.reload()
      })
    }

    // Add user dropdown toggle
    const userBtn = document.querySelector(".user-btn")
    const userDropdown = document.querySelector(".user-dropdown")

    if (userBtn && userDropdown) {
      userBtn.addEventListener("click", () => {
        userDropdown.classList.toggle("active")
      })

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
          userDropdown.classList.remove("active")
        }
      })
    }

    // Add styles for user dropdown
    const style = document.createElement("style")
    style.textContent = `
            .user-menu {
                position: relative;
            }
            
            .user-btn {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .user-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                width: 200px;
                background-color: white;
                border-radius: var(--border-radius);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                padding: 10px 0;
                margin-top: 10px;
                display: none;
                z-index: 100;
            }
            
            .dark-mode .user-dropdown {
                background-color: var(--card-bg-dark);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            .user-dropdown.active {
                display: block;
            }
            
            .user-dropdown a {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 15px;
                color: inherit;
                transition: background-color var(--transition-speed);
            }
            
            .user-dropdown a:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }
            
            .dark-mode .user-dropdown a:hover {
                background-color: rgba(255, 255, 255, 0.05);
            }
        `

    document.head.appendChild(style)
  }
})

