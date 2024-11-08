const recipesContainer = document.getElementById('recipesContainer');
const searchInput = document.getElementById('search');
const filterBtn = document.getElementById('filterBtn');
const paginationContainer = document.getElementById('paginationControls');
const favoritesContainer = document.getElementById('favoritesContainer');
const favoritesSection = document.getElementById('favoritesSection');

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
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('col-md-4', 'mb-4');
        recipeDiv.innerHTML = `
            <div class="card h-100 d-flex flex-column">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">Ingrédients : ${recipe.ingredients.join(', ')}</p>
                    <button class="btn btn-primary mt-auto" onclick='openRecipeModal(${JSON.stringify(recipe)})'>Voir Détails</button>
                    <button class="btn btn-secondary mt-2" onclick='addToFavorites(${JSON.stringify(recipe)})'>Ajouter aux Favoris</button>
                </div>
            </div>
        `;
        recipesContainer.appendChild(recipeDiv);
    });
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
function addToFavorites(recipe) {
    if (!favoriteRecipes.find(fav => fav.title === recipe.title)) {
        favoriteRecipes.push(recipe);
        localStorage.setItem('favorites', JSON.stringify(favoriteRecipes));
        showNotification(`${recipe.title} a été ajouté à vos favoris !`);
    } else {
        showNotification(`${recipe.title} est déjà dans vos favoris.`);
    }
}

// Fonction pour gérer la notation
function setupRating(modal, recipe) {
    const stars = modal.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-value');
            showNotification(`Vous avez noté "${recipe.title}" avec ${rating} étoile(s) !`);
            const existingRatings = JSON.parse(localStorage.getItem('ratings')) || {};
            existingRatings[recipe.title] = rating;
            localStorage.setItem('ratings', JSON.stringify(existingRatings));

            stars.forEach(s => s.classList.remove('selected'));
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('selected');
            }
        });
    });
}

// Fonction pour afficher les commentaires
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

// Notification
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

    if (favoriteRecipes.length === 0) {
        favoritesContainer.innerHTML = '<p class="col-12 text-center">Aucune recette favorite ajoutée.</p>';
    } else {
        favoriteRecipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('col-md-12', 'mb-4');
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

// Fonction pour supprimer une recette des favoris
function removeFromFavorites(recipeTitle) {
    const updatedFavorites = favoriteRecipes.filter(fav => fav.title !== recipeTitle);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    favoriteRecipes.splice(0, favoriteRecipes.length, ...updatedFavorites);
    displayFavorites();
}

// Initialiser les sections favorites
document.addEventListener("DOMContentLoaded", () => {
    favoritesSection.style.display = 'none'; // Assurez-vous que cette section est masquée au départ
    displayFavorites(); // Pour initialiser l'affichage
});

// Charger les recettes au démarrage
displayRecipes();
