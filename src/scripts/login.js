document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Connexion réussie !');
        window.location.href = 'index.html'; // Rediriger vers la page principale
    } else {
        alert('Email ou mot de passe incorrect.');
    }
});
