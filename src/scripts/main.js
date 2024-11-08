const recipesContainer = document.getElementById('recipesContainer');
const searchInput = document.getElementById('search');
const filterBtn = document.getElementById('filterBtn');
<<<<<<< HEAD
<<<<<<< HEAD

// Exemple de recettes fictives avec images de Picsum
=======
=======
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
const paginationContainer = document.getElementById('paginationControls');
const favoritesContainer = document.getElementById('favoritesContainer');
const favoritesSection = document.getElementById('favoritesSection');

<<<<<<< HEAD
>>>>>>> Ajout des fonctionnalités de favoris, pagination, et gestion des commentaires
=======
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
    // Ajoutez d'autres recettes si nécessaire
];

const favoriteRecipes = JSON.parse(localStorage.getItem('favorites')) || [];
let currentRecipe = null;
const RECIPES_PER_PAGE = 6;
let currentPage = 1;

// Fonction pour afficher les recettes avec pagination
function displayRecipes(filteredRecipes) {
    recipesContainer.innerHTML = '';
    const recipesToDisplay = filteredRecipes || recipes;
    const start = (currentPage - 1) * RECIPES_PER_PAGE;
    const end = start + RECIPES_PER_PAGE;
    const paginatedRecipes = recipesToDisplay.slice(start, end);

    paginatedRecipes.forEach(recipe => {
<<<<<<< HEAD
>>>>>>> Ajout des fonctionnalités de favoris, pagination, et gestion des commentaires
=======
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('col-md-4', 'mb-4');
        recipeDiv.innerHTML = `
            <div class="card h-100 d-flex flex-column">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">Ingrédients : ${recipe.ingredients.join(', ')}</p>
                    <button class="btn btn-primary mt-auto" onclick='openRecipeModal(${JSON.stringify(recipe)})'>Voir Détails</button>
<<<<<<< HEAD
<<<<<<< HEAD
=======
                    <button class="btn btn-secondary mt-2" onclick='addToFavorites(${JSON.stringify(recipe)})'>Ajouter aux Favoris</button>
>>>>>>> Ajout des fonctionnalités de favoris, pagination, et gestion des commentaires
=======
                    <button class="btn btn-secondary mt-2" onclick='addToFavorites(${JSON.stringify(recipe)})'>Ajouter aux Favoris</button>
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
                </div>
            </div>
        `;
        recipesContainer.appendChild(recipeDiv);
    });
<<<<<<< HEAD
<<<<<<< HEAD

    displayFavorites();
}

// Filtrer les recettes en fonction de l'ingrédient saisi
=======
=======
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
    displayPaginationControls(recipesToDisplay.length);
}

// Fonction pour afficher les contrôles de pagination
function displayPaginationControls(totalRecipes) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.classList.add('btn', 'btn-secondary', 'mr-2');
        prevButton.innerText = 'Précédent';
        prevButton.onclick = () => changePage(currentPage - 1);
        paginationContainer.appendChild(prevButton);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('btn', 'btn-light', 'mr-2');
        pageButton.innerText = i;
        if (i === currentPage) pageButton.classList.add('active');
        pageButton.onclick = () => changePage(i);
        paginationContainer.appendChild(pageButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.classList.add('btn', 'btn-secondary');
        nextButton.innerText = 'Suivant';
        nextButton.onclick = () => changePage(currentPage + 1);
        paginationContainer.appendChild(nextButton);
    }
}

function changePage(page) {
    currentPage = page;
    displayRecipes();
}

// Fonction pour filtrer les recettes
<<<<<<< HEAD
>>>>>>> Ajout des fonctionnalités de favoris, pagination, et gestion des commentaires
=======
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
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

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
// Fonction pour ouvrir la modal de recette
function openRecipeModal(recipe) {
    currentRecipe = recipe;
    document.getElementById('modalImage').src = recipe.image;
    document.getElementById('modalTitle').innerText = recipe.title;
    document.getElementById('modalIngredients').innerText = `Ingrédients : ${recipe.ingredients.join(', ')}`;
    document.getElementById('modalInstructions').innerText = `Instructions : ${recipe.instructions}`;

    displayComments(recipe.title);
    setupRating(document.querySelector('#recipeModal'), recipe);
    $('#recipeModal').modal('show');
}

// Fonction pour gérer les favoris
<<<<<<< HEAD
>>>>>>> Ajout des fonctionnalités de favoris, pagination, et gestion des commentaires
=======
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
function addToFavorites(recipe) {
    if (!favoriteRecipes.find(fav => fav.title === recipe.title)) {
        favoriteRecipes.push(recipe);
        localStorage.setItem('favorites', JSON.stringify(favoriteRecipes));
        showNotification(`${recipe.title} a été ajouté à vos favoris !`);
    } else {
        showNotification(`${recipe.title} est déjà dans vos favoris.`);
    }
}

<<<<<<< HEAD
<<<<<<< HEAD
// Afficher une notification
function showNotification(message) {
    const toast = document.getElementById('toast');
    const toastBody = toast.querySelector('.toast-body');
    toastBody.textContent = message;
    toast.style.display = 'block';
    toast.style.opacity = 1; // Rend le toast visible

    setTimeout(() => {
        toast.style.opacity = 0; // Diminue l'opacité pour l'effet de disparition
        setTimeout(() => {
            toast.style.display = 'none'; // Cache le toast après la disparition
        }, 500); // Temps d'attente avant de cacher le toast
    }, 3000); // Affiche le toast pendant 3 secondes
}



// Ouvrir la modal avec les détails de la recette
function openRecipeModal(recipe) {
    currentRecipe = recipe; // Mettez la recette actuelle dans une variable
    document.getElementById('modalImage').src = recipe.image;
    document.getElementById('modalTitle').innerText = recipe.title;
    document.getElementById('modalIngredients').innerText = `Ingrédients : ${recipe.ingredients.join(', ')}`;
    document.getElementById('modalInstructions').innerText = `Instructions : ${recipe.instructions}`;

    const modal = $('#recipeModal');
    setupRating(modal[0], recipe); // Configurez le système de notation
    displayComments(recipe.title); // Afficher les commentaires de la recette
    modal.modal('show'); // Ouvre le modal

    // Gérer l'envoi de commentaire
    document.getElementById('submitCommentBtn').onclick = () => {
        const commentInput = document.getElementById('commentInput');
        const newComment = commentInput.value.trim();

        if (newComment) {
            const comments = JSON.parse(localStorage.getItem('comments')) || {};
            if (!comments[currentRecipe.title]) {
                comments[currentRecipe.title] = []; // Créer un tableau pour la recette si ce n'est pas encore fait
            }
            comments[currentRecipe.title].push(newComment); // Ajouter le nouveau commentaire
            localStorage.setItem('comments', JSON.stringify(comments)); // Sauvegarder les commentaires
            commentInput.value = ''; // Réinitialiser le champ de texte
            displayComments(currentRecipe.title); // Mettre à jour l'affichage des commentaires

            // Afficher une notification
            showNotification('Commentaire ajouté avec succès !'); // Notification de succès
        } else {
            showNotification('Veuillez entrer un commentaire.'); // Alerte si le champ est vide
        }
    };
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
=======
// Fonction pour gérer la notation
>>>>>>> Ajout des fonctionnalités de favoris, pagination, et gestion des commentaires
=======
// Fonction pour gérer la notation
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
function setupRating(modal, recipe) {
    const stars = modal.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-value');
            showNotification(`Vous avez noté "${recipe.title}" avec ${rating} étoile(s) !`);
<<<<<<< HEAD
<<<<<<< HEAD
            
            // Enregistrer la note dans localStorage
=======
>>>>>>> Ajout des fonctionnalités de favoris, pagination, et gestion des commentaires
=======
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
            const existingRatings = JSON.parse(localStorage.getItem('ratings')) || {};
            existingRatings[recipe.title] = rating;
            localStorage.setItem('ratings', JSON.stringify(existingRatings));

<<<<<<< HEAD
<<<<<<< HEAD
            // Mettre à jour l'affichage des étoiles
            stars.forEach(s => s.classList.remove('selected')); // Réinitialiser les étoiles
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('selected'); // Ajouter la classe "selected" aux étoiles
=======
            stars.forEach(s => s.classList.remove('selected'));
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('selected');
>>>>>>> Ajout des fonctionnalités de favoris, pagination, et gestion des commentaires
=======
            stars.forEach(s => s.classList.remove('selected'));
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('selected');
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
            }
        });
    });
}

<<<<<<< HEAD
<<<<<<< HEAD

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

function displayComments(recipeTitle) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Vider la liste des commentaires
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    
    if (comments[recipeTitle]) {
        comments[recipeTitle].forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('border-bottom', 'pb-2', 'mb-2');
            commentDiv.innerText = comment; // Affiche chaque commentaire
            commentsList.appendChild(commentDiv);
        });
    }
}
// Modifier la soumission de commentaire pour inclure la date
document.getElementById('submitCommentBtn').addEventListener('click', () => {
    const commentInput = document.getElementById('commentInput');
    const newComment = commentInput.value.trim(); // Vérifiez si le commentaire est vide

    if (newComment) {
        const comments = JSON.parse(localStorage.getItem('comments')) || {};
        if (!comments[currentRecipe.title]) {
            comments[currentRecipe.title] = []; // Créer un tableau pour la recette si ce n'est pas encore fait
        }

        // Ajoutez la date et l'heure au commentaire
        const timestamp = new Date().toLocaleString(); // Format de la date
        comments[currentRecipe.title].push({ text: newComment, date: timestamp }); // Stockez l'objet avec le commentaire et la date
        localStorage.setItem('comments', JSON.stringify(comments)); // Sauvegarder les commentaires
        commentInput.value = ''; // Réinitialiser le champ de texte
        displayComments(currentRecipe.title); // Mettre à jour l'affichage des commentaires

        // Afficher une notification
        showNotification('Commentaire ajouté avec succès !'); // Notification de succès
    } else {
        // Afficher une notification si le champ est vide
        showNotification('Veuillez entrer un commentaire.'); 
    }
});


document.getElementById('submitCommentBtn').addEventListener('click', () => {
    const commentInput = document.getElementById('commentInput');
    const newComment = commentInput.value.trim();
    
    if (newComment) {
        const comments = JSON.parse(localStorage.getItem('comments')) || {};
        if (!comments[currentRecipe.title]) {
            comments[currentRecipe.title] = []; // Créer un tableau pour la recette si ce n'est pas encore fait
        }
        comments[currentRecipe.title].push(newComment); // Ajouter le nouveau commentaire
        localStorage.setItem('comments', JSON.stringify(comments)); // Sauvegarder les commentaires
        commentInput.value = ''; // Réinitialiser le champ de texte
        displayComments(currentRecipe.title); // Mettre à jour l'affichage des commentaires

        // Afficher une notification
        showNotification('Commentaire ajouté avec succès !'); // Notification de succès
    } else {
        showNotification('Veuillez entrer un commentaire.'); // Alerte si le champ est vide
    }
});
function displayComments(recipeTitle) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Vider la liste avant d'afficher les commentaires

    if (comments[recipeTitle]) {
        comments[recipeTitle].forEach((comment, index) => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('border-bottom', 'pb-2', 'mb-2'); // Ajouter des styles
            commentDiv.innerHTML = `
                ${comment.text} <br>
                <small class="text-muted">${comment.date}</small> <!-- Afficher la date -->
            `;

            // Ajoutez le bouton de suppression
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Supprimer';
            deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
            deleteBtn.onclick = () => {
                deleteComment(recipeTitle, index);
            };

            commentDiv.appendChild(deleteBtn); // Ajouter le bouton à la div du commentaire
            commentsList.appendChild(commentDiv);
        });
    } else {
        commentsList.innerHTML = '<p>Aucun commentaire pour cette recette.</p>';
    }
}


// Fonction pour supprimer un commentaire
function deleteComment(recipeTitle, commentIndex) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    comments[recipeTitle].splice(commentIndex, 1); // Supprimer le commentaire à l'index donné

    // Si le tableau est vide après suppression, supprimer la clé de l'objet
    if (comments[recipeTitle].length === 0) {
        delete comments[recipeTitle];
    }

    localStorage.setItem('comments', JSON.stringify(comments)); // Sauvegarder les commentaires
    displayComments(recipeTitle); // Mettre à jour l'affichage des commentaires

    showNotification('Commentaire supprimé avec succès !'); // Notification de succès
}


// Appeler la fonction pour charger les recettes
=======
// Fonction pour afficher les commentaires avec options de modification et suppression
=======
// Fonction pour afficher les commentaires
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
function displayComments(recipeTitle) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';

    if (comments[recipeTitle]) {
        comments[recipeTitle].forEach((comment, index) => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('border-bottom', 'pb-2', 'mb-2');
            commentDiv.innerHTML = `
                <div>
                    <p>${comment.text}</p>
                    <small class="text-muted">${comment.date}</small>
                </div>
            `;
            const editBtn = document.createElement('button');
            editBtn.innerText = 'Modifier';
            editBtn.classList.add('btn', 'btn-warning', 'btn-sm', 'mr-2');
            editBtn.onclick = () => editComment(recipeTitle, index);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Supprimer';
            deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteBtn.onclick = () => deleteComment(recipeTitle, index);

            commentDiv.appendChild(editBtn);
            commentDiv.appendChild(deleteBtn);
            commentsList.appendChild(commentDiv);
        });
    } else {
        commentsList.innerHTML = '<p>Aucun commentaire pour cette recette.</p>';
    }
}

// Fonction pour ajouter un nouveau commentaire
document.getElementById('submitCommentBtn').addEventListener('click', () => {
    const commentInput = document.getElementById('commentInput');
    const newComment = commentInput.value.trim();

    if (newComment) {
        const comments = JSON.parse(localStorage.getItem('comments')) || {};
        if (!comments[currentRecipe.title]) {
            comments[currentRecipe.title] = [];
        }
        const timestamp = new Date().toLocaleString();
        comments[currentRecipe.title].push({ text: newComment, date: timestamp });
        localStorage.setItem('comments', JSON.stringify(comments));
        commentInput.value = '';
        displayComments(currentRecipe.title);
        showNotification('Commentaire ajouté avec succès !');
    } else {
        showNotification('Veuillez entrer un commentaire.');
    }
});

// Fonctions pour modifier et supprimer des commentaires
function editComment(recipeTitle, commentIndex) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    const commentToEdit = comments[recipeTitle][commentIndex];
    const newCommentText = prompt('Modifiez votre commentaire:', commentToEdit.text);

    if (newCommentText && newCommentText.trim()) {
        comments[recipeTitle][commentIndex].text = newCommentText.trim();
        localStorage.setItem('comments', JSON.stringify(comments));
        displayComments(recipeTitle);
        showNotification('Commentaire modifié avec succès !');
    }
}

function deleteComment(recipeTitle, commentIndex) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    comments[recipeTitle].splice(commentIndex, 1);
    if (comments[recipeTitle].length === 0) {
        delete comments[recipeTitle];
    }
    localStorage.setItem('comments', JSON.stringify(comments));
    displayComments(recipeTitle);
    showNotification('Commentaire supprimé avec succès !');
}

<<<<<<< HEAD
=======
// Notification
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
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
<<<<<<< HEAD
function toggleFavorites() {
    if (favoritesSection.style.display === 'none' || !favoritesSection.style.display) {
        displayFavorites();
        favoritesSection.style.display = 'block';
        recipesContainer.style.display = 'none';
        paginationContainer.style.display = 'none';
    } else {
        favoritesSection.style.display = 'none';
        recipesContainer.style.display = 'flex';
        paginationContainer.style.display = 'flex';
    }
}
function displayFavorites() {
    favoritesContainer.innerHTML = '';
=======

// Fonction pour basculer l'affichage des favoris
function toggleFavorites() {
    const recipesContainer = document.getElementById('recipesContainer');
    const favoritesSection = document.getElementById('favoritesSection');

    if (favoritesSection.style.display === 'none' || favoritesSection.style.display === '') {
        displayFavorites();
        favoritesSection.style.display = 'flex';
        recipesContainer.style.display = 'none';
    } else {
        favoritesSection.style.display = 'none';
        recipesContainer.style.display = 'flex';
    }
}

// Fonction pour afficher les favoris
function displayFavorites() {
    favoritesContainer.innerHTML = '';

>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
    if (favoriteRecipes.length === 0) {
        favoritesContainer.innerHTML = '<p class="col-12 text-center">Aucune recette favorite ajoutée.</p>';
    } else {
        favoriteRecipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
<<<<<<< HEAD
            recipeDiv.classList.add('col-md-4', 'mb-4');
=======
            recipeDiv.classList.add('col-md-12', 'mb-4');
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
            recipeDiv.innerHTML = `
                <div class="card h-100 d-flex flex-column">
                    <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${recipe.title}</h5>
                        <p class="card-text">Ingrédients : ${recipe.ingredients.join(', ')}</p>
                        <button class="btn btn-danger mt-auto" onclick='removeFromFavorites("${recipe.title}")'>Supprimer des Favoris</button>
                    </div>
                </div>
            `;
            favoritesContainer.appendChild(recipeDiv);
        });
    }
}
<<<<<<< HEAD
=======

// Fonction pour supprimer une recette des favoris
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
function removeFromFavorites(recipeTitle) {
    const updatedFavorites = favoriteRecipes.filter(fav => fav.title !== recipeTitle);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    favoriteRecipes.splice(0, favoriteRecipes.length, ...updatedFavorites);
    displayFavorites();
<<<<<<< HEAD
    showNotification(`${recipeTitle} a été supprimé de vos favoris !`);
}

// Charger les recettes au démarrage
>>>>>>> Ajout des fonctionnalités de favoris, pagination, et gestion des commentaires
=======
}

// Initialiser les sections favorites
document.addEventListener("DOMContentLoaded", () => {
    favoritesSection.style.display = 'none'; // Assurez-vous que cette section est masquée au départ
    displayFavorites(); // Pour initialiser l'affichage
});

// Charger les recettes au démarrage
>>>>>>> Ajout des fichiers initiaux : README, LICENSE, et src/
displayRecipes();
