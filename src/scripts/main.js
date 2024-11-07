const recipesContainer = document.getElementById('recipesContainer');
const searchInput = document.getElementById('search');
const filterBtn = document.getElementById('filterBtn');

// Exemple de recettes fictives avec images de Picsum
const recipes = [
    {
        title: "Recette de Poulet au Curry",
        image: "https://picsum.photos/seed/chicken-curry/400/300",
        ingredients: ["Poulet", "Curry en poudre", "Crème fraîche", "Oignons"],
        instructions: "Faire revenir le poulet et les oignons, ajouter le curry, puis la crème fraîche."
    },
    {
        title: "Salade de Quinoa",
        image: "https://picsum.photos/seed/quinoa-salad/400/300",
        ingredients: ["Quinoa", "Tomates", "Concombre", "Feta"],
        instructions: "Cuire le quinoa, ajouter les légumes coupés et la feta."
    },
    {
        title: "Tarte aux Pommes",
        image: "https://picsum.photos/seed/apple-pie/400/300",
        ingredients: ["Pommes", "Pâte brisée", "Sucre", "Cannelle"],
        instructions: "Préparer la pâte, couper les pommes, et cuire au four."
    },
    {
        title: "Pâtes à la Carbonara",
        image: "https://picsum.photos/seed/carbonara/400/300",
        ingredients: ["Pâtes", "Bacon", "Crème", "Parmesan"],
        instructions: "Faire cuire les pâtes, mélanger avec le bacon et la crème."
    },
    {
        title: "Smoothie aux Fruits",
        image: "https://picsum.photos/seed/fruit-smoothie/400/300",
        ingredients: ["Fruits", "Yaourt", "Miel"],
        instructions: "Mélanger tous les ingrédients au blender."
    }
];

const favoriteRecipes = JSON.parse(localStorage.getItem('favorites')) || [];
let currentRecipe = null; // Variable pour stocker la recette courante

// Fonction pour afficher les recettes
function displayRecipes(filteredRecipes) {
    recipesContainer.innerHTML = '';
    const recipesToDisplay = filteredRecipes || recipes;

    recipesToDisplay.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('col-md-4', 'mb-4');
        recipeDiv.innerHTML = `
            <div class="card h-100 d-flex flex-column">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">Ingrédients : ${recipe.ingredients.join(', ')}</p>
                    <button class="btn btn-primary mt-auto" onclick='openRecipeModal(${JSON.stringify(recipe)})'>Voir Détails</button>
                </div>
            </div>
        `;
        recipesContainer.appendChild(recipeDiv);
    });

    displayFavorites();
}

// Filtrer les recettes en fonction de l'ingrédient saisi
filterBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) {
        showNotification('Veuillez entrer un ingrédient pour filtrer.');
        return;
    }
    const filteredRecipes = recipes.filter(recipe =>
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
    );
    displayRecipes(filteredRecipes);
});

// Fonction pour afficher les favoris
function displayFavorites() {
    const favoritesContainer = document.createElement('div');
    favoritesContainer.classList.add('my-4');
    favoritesContainer.innerHTML = '<h2>Recettes Favorites</h2>';

    if (favoriteRecipes.length === 0) {
        favoritesContainer.innerHTML += '<p>Aucune recette favorite ajoutée.</p>';
    } else {
        favoriteRecipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('col-md-4', 'recipe-card');
            recipeDiv.innerHTML = `
                <div class="card">
                    <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.title}</h5>
                        <p class="card-text">Ingrédients : ${recipe.ingredients.join(', ')}</p>
                        <button class="btn btn-danger" onclick='removeFromFavorites("${recipe.title}")'>Supprimer des Favoris</button>
                    </div>
                </div>
            `;
            favoritesContainer.appendChild(recipeDiv);
        });
    }
    recipesContainer.appendChild(favoritesContainer);
}

// Fonction pour supprimer une recette des favoris
function removeFromFavorites(recipeTitle) {
    const updatedFavorites = favoriteRecipes.filter(fav => fav.title !== recipeTitle);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    showNotification(`${recipeTitle} a été supprimé de vos favoris !`);
    displayFavorites();
}

// Ajouter une recette aux favoris
function addToFavorites(recipe) {
    if (!favoriteRecipes.find(fav => fav.title === recipe.title)) {
        favoriteRecipes.push(recipe);
        localStorage.setItem('favorites', JSON.stringify(favoriteRecipes));
        showNotification(`${recipe.title} a été ajouté à vos favoris !`);
    } else {
        showNotification(`${recipe.title} est déjà dans vos favoris.`);
    }
}

// Afficher une notification
function showNotification(message) {
    const toast = document.getElementById('toast');
    const toastBody = toast.querySelector('.toast-body');
    toastBody.textContent = message;
    toast.style.display = 'block';
    toast.style.opacity = 1;

    setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => {
            toast.style.display = 'none';
        }, 500);
    }, 3000);
}

// Ouvrir la modal avec les détails de la recette
function openRecipeModal(recipe) {
    currentRecipe = recipe; // Mettez la recette actuelle dans une variable

    // Vérifiez si les éléments existent avant de les utiliser
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalIngredients = document.getElementById('modalIngredients');
    const modalInstructions = document.getElementById('modalInstructions');

    if (modalImage && modalTitle && modalIngredients && modalInstructions) {
        modalImage.src = recipe.image;
        modalTitle.innerText = recipe.title;
        modalIngredients.innerText = `Ingrédients : ${recipe.ingredients.join(', ')}`;
        modalInstructions.innerText = `Instructions : ${recipe.instructions}`;

        const modal = $('#recipeModal');
        setupRating(modal[0], recipe); // Configurez le système de notation
        modal.modal('show'); // Ouvre le modal

        // Afficher la note actuelle
        const existingRatings = JSON.parse(localStorage.getItem('ratings')) || {};
        const existingRating = existingRatings[recipe.title] || 0; // Récupérer la note existante
        const stars = modal[0].querySelectorAll('.star');
        stars.forEach(star => {
            const value = star.getAttribute('data-value');
            if (value <= existingRating) {
                star.classList.add('selected'); // Marquer les étoiles sélectionnées
            }
        });
    } else {
        console.error("Un ou plusieurs éléments du modal n'ont pas été trouvés.");
    }
}


// Écouteur pour la recherche en temps réel
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(searchTerm)
        ) || recipe.title.toLowerCase().includes(searchTerm)
    );
    displayRecipes(filteredRecipes);
});
function setupRating(modal, recipe) {
    const stars = modal.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-value');
            showNotification(`Vous avez noté "${recipe.title}" avec ${rating} étoile(s) !`);
            
            // Enregistrer la note dans localStorage
            const existingRatings = JSON.parse(localStorage.getItem('ratings')) || {};
            existingRatings[recipe.title] = rating;
            localStorage.setItem('ratings', JSON.stringify(existingRatings));

            // Mettre à jour l'affichage des étoiles
            stars.forEach(s => s.classList.remove('selected')); // Réinitialiser les étoiles
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('selected'); // Ajouter la classe "selected" aux étoiles
            }
        });
    });
}


// Après avoir vérifié la connexion
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('welcome-message').innerText = `Bienvenue, ${currentUser.username}!`;
}

// Fonction de déconnexion
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    alert('Déconnexion réussie!');
    window.location.href = 'login.html'; // Rediriger vers la page de connexion
});



// Appeler la fonction pour charger les recettes
displayRecipes();
