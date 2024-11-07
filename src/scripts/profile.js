document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const favoritesContainer = document.getElementById('favoritesContainer');

    // Remplir le formulaire avec les données de l'utilisateur
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
        document.getElementById('username').value = userData.username;
        document.getElementById('email').value = userData.email;
    }

    // Afficher les recettes favorites
    const favoriteRecipes = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteRecipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('card', 'mb-2');
        recipeDiv.innerHTML = `
            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
            <div class="card-body">
                <h5 class="card-title">${recipe.title}</h5>
                <button class="btn btn-danger" onclick='removeFromFavorites("${recipe.title}")'>Supprimer des Favoris</button>
            </div>
        `;
        favoritesContainer.appendChild(recipeDiv);
    });

    // Sauvegarder les données du profil
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedUsername = document.getElementById('username').value;
        const updatedEmail = document.getElementById('email').value;
        const updatedPassword = document.getElementById('password').value;

        // Mettre à jour les données dans le localStorage
        let user = JSON.parse(localStorage.getItem('user')) || {};
        user.username = updatedUsername;
        user.email = updatedEmail;

        // Si un nouveau mot de passe est entré, le mettre à jour (ajoutez votre logique de sécurité ici)
        if (updatedPassword) {
            // Hash et sauvegarde du mot de passe (à faire)
            user.password = updatedPassword; // Remplacez ceci par un mécanisme de hashage
        }

        localStorage.setItem('user', JSON.stringify(user));
        alert('Profil mis à jour avec succès !');
    });
});

// Fonction pour supprimer une recette des favoris
function removeFromFavorites(recipeTitle) {
    const updatedFavorites = JSON.parse(localStorage.getItem('favorites')).filter(fav => fav.title !== recipeTitle);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    location.reload(); // Recharger la page pour mettre à jour l'affichage
}
