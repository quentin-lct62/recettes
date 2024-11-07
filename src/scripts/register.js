document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        alert('Cet email est déjà utilisé.');
    } else {
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Inscription réussie ! Vous pouvez vous connecter maintenant.');
        window.location.href = 'login.html'; // Rediriger vers la page de connexion
    }
});
