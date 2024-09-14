const user = {
    email: 'colegawin@gmail.com',
    password: 'Letmein'
  };
  
  // Handle login
  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    if (email === user.email && password === user.password) {
      // Save user session (simple simulation using localStorage)
      localStorage.setItem('loggedIn', 'true');
      
      // Redirect to dashboard
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('error-msg').innerText = 'Invalid email or password';
    }
  });
  