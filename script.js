// Recipe Data
const recipes = [
    {
        id: 1,
        title: "Golden Flapjacks",
        category: "Treat",
        difficulty: "Easy",
        time: "30 minutes",
        servings: "12 Flapjacks",
        image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flapjacks-239a448.jpg?quality=90&resize=440,400",
        description: "Deliciously golden flapjacks made with oats, butter, and golden syrup. Perfect for a sweet treat or snack.",
        ingredients: [
            { amount: "250g", item: "Jumbo Porridge Oats" },
            { amount: "125g", item: "Butter" },
            { amount: "125g", item: "Light-Brown Sugar" },
            { amount: "2-3 Tbsp", item: "Golden Syrup" }
        ],
        equipment: [
            "Food Processor",
            "20x20cm Baking Tin",
            "Measuring Cups and Spoons"
        ],
        steps: [
            "Heat the oven to 200C/180C fan/gas 6.",
            "Put the oats, butter, sugar and golden syrup in a food processor and pulse until mixed.",
            "Lightly butter a 20 x 20cm baking tin and add the mixture. Press into the corners with the back of a spoon so the mixture is flat and score into 12 squares.",
            "Bake for around 15 mins until golden brown."
        ]
    },
    {
        id: 2,
        title: "Tomato Pasta Bake",
        category: "Dinner",
        difficulty: "Medium",
        time: "40 minutes",
        servings: "2 servings",
        image: "https://tse3.mm.bing.net/th/id/OIP.luMbyHYWAkmwh8xHA9nUzwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
        description: "A comforting tomato pasta bake with a cheesy crust. Perfect for a quick and satisfying dinner.",
        ingredients: [
            { amount: "1 can", item: "tomatoes" },
            { amount: "1 can", item: "any vegtables you like" },
            { amount: "225g", item: "pasta" },
            { amount: "1/2 slice", item: "bread" },
            { amount: "35g", item: "cheese" }
        ],
        equipment: [
            "Hob safe pan",
            "Spoon for stirring",
            "Cheese Grater",
            "Drainer for pasta",
            "Oven-safe baking dish"
        ],
        steps: [
            "Put some pasta on the hob until it is cooked.",
            "Whilst the pasta is cooking, grate the cheese and bread to make the topping.",
            "Once pasta is cooked, drain it and put it back in the pan, then add the can of tomatoes and any vegtables you like.",
            "Leave the pasta on for 5 minutes, stirring occasionally, until the sauce has thickened slightly.",
            "Take of heat and pour the pasta into an oven-safe dish, then sprinkle the cheese and bread mixture on top.",
            "Place in the oven or grill until the topping is golden and crispy."
        ]
    }
];

// Global Variables
let filteredRecipes = [...recipes];

// Favorites Management
const favoritesKey = 'rupertg_recipes_favorites';

function getFavorites() {
    const favorites = localStorage.getItem(favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
}

function addToFavorites(recipeId) {
    const favorites = getFavorites();
    if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        saveFavorites(favorites);
        showMessage('Recipe added to favorites!', 'success');
        updateFavoritesDisplay();
        updateFavoriteButton(recipeId, true);
    }
}

function removeFromFavorites(recipeId) {
    let favorites = getFavorites();
    favorites = favorites.filter(id => id !== recipeId);
    saveFavorites(favorites);
    showMessage('Recipe removed from favorites!', 'success');
    updateFavoritesDisplay();
    updateFavoriteButton(recipeId, false);
}

function isFavorite(recipeId) {
    const favorites = getFavorites();
    return favorites.includes(recipeId);
}

function toggleFavorite(recipeId) {
    if (isFavorite(recipeId)) {
        removeFromFavorites(recipeId);
    } else {
        addToFavorites(recipeId);
    }
    // Refresh the display to update favorite button colors
    displayRecipes(filteredRecipes.length > 0 ? filteredRecipes : recipes);
}

function updateFavoriteButton(recipeId, isActive) {
    // Update the favorite button in the recipe card
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        const button = card.querySelector('.favorite-btn i');
        if (button && card.onclick.toString().includes(recipeId)) {
            if (isActive) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        }
    });
}

function updateFavoritesDisplay() {
    const favorites = getFavorites();
    const favoritesGrid = document.getElementById('favoritesGrid');
    const noFavoritesMessage = document.getElementById('noFavoritesMessage');
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '';
        noFavoritesMessage.style.display = 'block';
        return;
    }
    
    noFavoritesMessage.style.display = 'none';
    favoritesGrid.innerHTML = '';
    
    const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
    
    favoriteRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.onclick = () => openRecipeModal(recipe.id);
        
        recipeCard.innerHTML = `
            <button class="favorite-btn" onclick="event.stopPropagation(); toggleFavorite(${recipe.id})" title="Remove from favorites">
                <i class="fas fa-heart active"></i>
            </button>
            <div class="recipe-image" style="background-image: url('${recipe.image}');"></div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-meta">
                    <span class="recipe-category">${recipe.category}</span>
                    <div class="recipe-difficulty ${recipe.difficulty}">
                        <i class="fas fa-star"></i>
                        <span>${recipe.difficulty}</span>
                    </div>
                </div>
                <div class="recipe-meta">
                    <div class="recipe-time">
                        <i class="fas fa-clock"></i>
                        <span>${recipe.time}</span>
                    </div>
                    <div class="recipe-time">
                        <i class="fas fa-users"></i>
                        <span>${recipe.servings}</span>
                    </div>
                </div>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-actions">
                    <button class="recipe-btn">View Recipe</button>
                    <div class="recipe-time">
                        <i class="fas fa-eye"></i>
                        <span>Click to view</span>
                    </div>
                </div>
            </div>
        `;
        
        favoritesGrid.appendChild(recipeCard);
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    displayRecipes(recipes);
    updateFavoritesDisplay();
    setupMobileMenu();
}

function setupEventListeners() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Close modal when clicking outside
    const modal = document.getElementById('recipeModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Display Functions
function displayRecipes(recipesToShow) {
    const grid = document.getElementById('recipesGrid');
    grid.innerHTML = '';

    if (recipesToShow.length === 0) {
        grid.innerHTML = '<div class="no-recipes"><p>No recipes found. Try adjusting your search or filters.</p></div>';
        return;
    }

    recipesToShow.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.onclick = () => openRecipeModal(recipe.id);
        
        recipeCard.innerHTML = `
            <button class="favorite-btn" onclick="event.stopPropagation(); toggleFavorite(${recipe.id})" title="Add to favorites">
                <i class="fas fa-heart ${isFavorite(recipe.id) ? 'active' : ''}"></i>
            </button>
            <div class="recipe-image" style="background-image: url('${recipe.image}');"></div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-meta">
                    <span class="recipe-category">${recipe.category}</span>
                    <div class="recipe-difficulty ${recipe.difficulty}">
                        <i class="fas fa-star"></i>
                        <span>${recipe.difficulty}</span>
                    </div>
                </div>
                <div class="recipe-meta">
                    <div class="recipe-time">
                        <i class="fas fa-clock"></i>
                        <span>${recipe.time}</span>
                    </div>
                    <div class="recipe-time">
                        <i class="fas fa-users"></i>
                        <span>${recipe.servings}</span>
                    </div>
                </div>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-actions">
                    <button class="recipe-btn">View Recipe</button>
                    <div class="recipe-time">
                        <i class="fas fa-eye"></i>
                        <span>Click to view</span>
                    </div>
                </div>
            </div>
        `;
        
        grid.appendChild(recipeCard);
    });
}

function openRecipeModal(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const modal = document.getElementById('recipeModal');
    const modalContent = document.getElementById('modalRecipeContent');
    
    modalContent.innerHTML = `
        <div class="recipe-detail">
            <div class="recipe-header">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-detail-image">
                <div>
                    <h2 class="recipe-detail-title">${recipe.title}</h2>
                    <div class="recipe-detail-meta">
                        <div class="meta-item">
                            <i class="fas fa-utensils"></i>
                            <span>${recipe.category}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-star"></i>
                            <span>${recipe.difficulty}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${recipe.time}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-users"></i>
                            <span>${recipe.servings}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="recipe-actions-detail">
                <button class="action-btn download-btn" onclick="downloadRecipeSheet(${recipe.id})">
                    <i class="fas fa-download"></i>
                    Download Recipe Sheet
                </button>
                <button class="action-btn guide-btn" onclick="openRecipeGuide(${recipe.id})">
                    <i class="fas fa-play-circle"></i>
                    Start Cooking Guide
                </button>
            </div>

            <div class="recipe-content-detail">
                <div class="recipe-ingredients">
                    <h4 class="recipe-section-title">Ingredients</h4>
                    <ul class="ingredient-list">
                        ${recipe.ingredients.map(ing => `
                            <li class="ingredient-item">
                                <span class="ingredient-amount">${ing.amount}</span>
                                <span>${ing.item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="recipe-equipment">
                    <h4 class="recipe-section-title">Equipment Needed</h4>
                    <ul class="equipment-list">
                        ${recipe.equipment.map(eq => `
                            <li class="equipment-item">
                                <i class="fas fa-check-circle"></i>
                                <span>${eq}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="recipe-steps" style="grid-column: 1 / -1;">
                    <h4 class="recipe-section-title">Instructions</h4>
                    <ol class="step-list">
                        ${recipe.steps.map((step, index) => `
                            <li class="step-item">
                                <div class="step-number">${index + 1}</div>
                                <div class="step-content">${step}</div>
                            </li>
                        `).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('recipeModal');
    modal.style.display = 'none';
}

function openRecipeGuide(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    // Store current recipe data for guide
    window.currentGuideRecipe = recipe;
    window.currentGuideStep = 0;
    window.completedIngredients = new Set();
    
    // Show guide modal
    const guideModal = document.getElementById('recipeGuideModal');
    guideModal.style.display = 'block';
    
    // Initialize guide
    initGuide(recipe);
}

function initGuide(recipe) {
    // Update header
    document.querySelector('.guide-recipe-name').textContent = recipe.title;
    
    // Calculate total steps
    const totalSteps = recipe.steps.length + 2; // +2 for ingredients and equipment
    document.getElementById('guide-total-steps').textContent = totalSteps;
    
    // Show first step
    showGuideStep(0);
}

function showGuideStep(stepIndex) {
    window.currentGuideStep = stepIndex;
    const stepCard = document.getElementById('guide-step-card');
    const recipe = window.currentGuideRecipe;
    
    // Update progress
    updateGuideProgress();
    
    // Update navigation buttons
    const backButton = document.getElementById('guide-back-btn');
    const nextButton = document.getElementById('guide-next-btn');
    
    backButton.style.display = stepIndex === 0 ? 'none' : 'flex';
    
    // Check if this is the last step (completion step)
    const isLastStep = stepIndex === getTotalGuideSteps() - 1;
    
    if (isLastStep) {
        nextButton.textContent = 'Done';
        nextButton.innerHTML = 'Done';
        nextButton.onclick = function() {
            exitGuide();
        };
    } else {
        nextButton.textContent = 'Next';
        nextButton.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        nextButton.onclick = function() {
            nextGuideStep();
        };
    }
    
    if (stepIndex === 0) {
        // Ingredients step
        stepCard.innerHTML = `
            <div class="guide-step-icon">
                <i class="fas fa-shopping-basket"></i>
            </div>
            <h2 class="guide-step-title">Gather Ingredients</h2>
            <p class="guide-step-subtitle">Get all the ingredients ready before you start cooking</p>
            <div class="guide-ingredients-list">
                ${recipe.ingredients.map((item, index) => `
                    <div class="guide-ingredient-item">
                        <div class="guide-ingredient-checkbox" onclick="toggleGuideIngredient(${index})" id="guide-ingredient-${index}">
                            <i class="fas fa-check" style="display: none;"></i>
                        </div>
                        <div class="guide-ingredient-amount">${item.amount || ''}</div>
                        <span>${item.item || item}</span>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (stepIndex === 1) {
        // Equipment step
        stepCard.innerHTML = `
            <div class="guide-step-icon">
                <i class="fas fa-mortar-pestle"></i>
            </div>
            <h2 class="guide-step-title">Prepare Equipment</h2>
            <p class="guide-step-subtitle">Set up all the tools you'll need</p>
            <div class="guide-equipment-list">
                ${recipe.equipment.map(item => `
                    <div class="guide-equipment-item">
                        <div class="guide-equipment-icon">
                            <i class="fas fa-utensils"></i>
                        </div>
                        <h4>${item}</h4>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        // Steps step - fix the indexing issue
        const stepNum = stepIndex - 2; // Changed from stepIndex - 1 to stepIndex - 2
        const step = recipe.steps[stepNum];
        
        if (step) {
            stepCard.innerHTML = `
                <div class="guide-step-icon">
                    <i class="fas fa-cooking"></i>
                </div>
                <h2 class="guide-step-title">Step ${stepNum + 1}</h2>
                <p class="guide-step-subtitle">Follow this step carefully</p>
                <div class="guide-step-content">
                    <div class="guide-step-instruction">
                        <div class="guide-step-number">${stepNum + 1}</div>
                        <p>${step}</p>
                    </div>
                </div>
            `;
        } else {
            // Completion step
            stepCard.innerHTML = `
                <div class="guide-step-icon">
                    <i class="fas fa-check-circle" style="color: #27ae60;"></i>
                </div>
                <h2 class="guide-step-title">Recipe Complete! 🎉</h2>
                <p class="guide-step-subtitle">Great job! You've completed the recipe.</p>
                <p style="color: #666; margin-top: 20px;">Enjoy your delicious creation!</p>
            `;
        }
    }
}

function toggleGuideIngredient(index) {
    const checkbox = document.getElementById(`guide-ingredient-${index}`);
    if (checkbox.classList.contains('checked')) {
        checkbox.classList.remove('checked');
        checkbox.querySelector('i').style.display = 'none';
        window.completedIngredients.delete(index);
    } else {
        checkbox.classList.add('checked');
        checkbox.querySelector('i').style.display = 'block';
        window.completedIngredients.add(index);
    }
}

function updateGuideProgress() {
    const totalSteps = getTotalGuideSteps();
    const currentStep = window.currentGuideStep;
    const progressFill = document.getElementById('guide-progress-fill');
    const currentStepDisplay = document.getElementById('guide-current-step');
    
    currentStepDisplay.textContent = currentStep + 1;
    
    const percentage = ((currentStep + 1) / totalSteps) * 100;
    progressFill.style.width = percentage + '%';
}

function getTotalGuideSteps() {
    const recipe = window.currentGuideRecipe;
    return recipe.steps.length + 2; // +2 for ingredients and equipment
}

function nextGuideStep() {
    const totalSteps = getTotalGuideSteps();
    if (window.currentGuideStep < totalSteps - 1) {
        showGuideStep(window.currentGuideStep + 1);
    }
}

function prevGuideStep() {
    if (window.currentGuideStep > 0) {
        showGuideStep(window.currentGuideStep - 1);
    }
}

function exitGuide() {
    const guideModal = document.getElementById('recipeGuideModal');
    guideModal.style.display = 'none';
}

// Search and Filter Functions
function searchRecipes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const difficultyFilter = document.getElementById('difficultyFilter').value;

    filteredRecipes = recipes.filter(recipe => {
        // Search matching - check title, description, and ingredients
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) || 
                             recipe.description.toLowerCase().includes(searchTerm) ||
                             recipe.ingredients.some(ing => ing.item.toLowerCase().includes(searchTerm));
        
        // Category filtering - handle "all" case with case-insensitive comparison
        const matchesCategory = categoryFilter.toLowerCase() === 'all' || recipe.category.toLowerCase() === categoryFilter.toLowerCase();
        
        // Difficulty filtering - handle "all" case with case-insensitive comparison
        const matchesDifficulty = difficultyFilter.toLowerCase() === 'all' || recipe.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    displayRecipes(filteredRecipes);
}

function filterRecipes() {
    searchRecipes(); // Re-run search with current filters
}

// Download Functions
function downloadRecipeSheet(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    // Create a proper HTML document for PDF conversion
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${recipe.title} - RupertG Recipes</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 40px; 
            line-height: 1.6; 
            color: #333;
        }
        h1 { 
            color: #2c3e50; 
            border-bottom: 3px solid #ff9400; 
            padding-bottom: 10px; 
            font-size: 36px; 
            text-align: center;
            margin-bottom: 10px;
        }
        h2 { 
            color: #2c3e50; 
            border-bottom: 2px solid #ff9400; 
            padding-bottom: 5px; 
            font-size: 24px; 
            margin-top: 30px; 
        }
        h3 { 
            color: #2c3e50; 
            font-size: 20px; 
            margin-top: 20px; 
        }
        .header-info { 
            display: flex; 
            justify-content: center;
            gap: 30px; 
            margin: 20px 0 40px 0; 
            color: #666; 
            font-size: 16px; 
            flex-wrap: wrap;
        }
        .category-badge { 
            background: #ff9400; 
            color: white; 
            padding: 8px 16px; 
            border-radius: 20px; 
            font-weight: bold; 
            font-size: 14px; 
        }
        .section { 
            margin: 30px 0; 
        }
        .ingredients-list, .equipment-list { 
            list-style: none; 
            padding: 0; 
        }
        .ingredients-list li, .equipment-list li { 
            padding: 10px 0; 
            border-bottom: 1px solid #eee; 
            font-size: 16px;
        }
        .steps-list { 
            list-style: none; 
            padding: 0; 
        }
        .steps-list li { 
            margin: 15px 0; 
            padding: 15px; 
            background: #f8f9fa; 
            border-left: 4px solid #ff9400; 
            border-radius: 4px;
            font-size: 16px;
        }
        .step-number { 
            background: #ff9400; 
            color: white; 
            width: 30px; 
            height: 30px; 
            border-radius: 50%; 
            display: inline-flex; 
            align-items: center; 
            justify-content: center; 
            font-weight: bold; 
            margin-right: 15px; 
        }
        .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #ddd; 
            color: #666; 
            font-size: 14px; 
            text-align: center; 
        }
        .description { 
            font-size: 16px; 
            line-height: 1.8; 
            color: #555; 
        }
    </style>
</head>
<body>
    <h1>${recipe.title}</h1>
    <div class="header-info">
        <span><strong>Difficulty:</strong> ${recipe.difficulty}</span>
        <span><strong>Time:</strong> ${recipe.time}</span>
        <span><strong>Servings:</strong> ${recipe.servings}</span>
    </div>
    
    <div class="section">
        <h2>Description</h2>
        <p class="description">${recipe.description}</p>
    </div>

    <div class="section">
        <h2>Ingredients</h2>
        <ul class="ingredients-list">
            ${recipe.ingredients.map(ing => `<li><strong>${ing.amount}</strong> - ${ing.item}</li>`).join('')}
        </ul>
    </div>

    <div class="section">
        <h2>Equipment Needed</h2>
        <ul class="equipment-list">
            ${recipe.equipment.map(eq => `<li>• ${eq}</li>`).join('')}
        </ul>
    </div>

    <div class="section">
        <h2>Instructions</h2>
        <ol class="steps-list">
            ${recipe.steps.map((step, index) => `
                <li>
                    <div style="display: flex; align-items: flex-start;">
                        <div class="step-number">${index + 1}</div>
                        <div>${step}</div>
                    </div>
                </li>
            `).join('')}
        </ol>
    </div>

    <div class="footer">
        <p>Recipe Downloaded From RupertG Recipes</p>
    </div>
</body>
</html>
    `;

    // Create blob and download as HTML (can be printed to PDF)
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.title.replace(/\s+/g, '_')}_Recipe_Sheet.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage('Recipe sheet downloaded! If you wish to print, open the file in your browser and press Ctrl+P.', 'success');
}

function printRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    // Create print content
    const printContent = document.getElementById('printContent');
    printContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h1>${recipe.title}</h1>
            <p style="color: #666;">${recipe.description}</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Recipe Info</h3>
                <p><strong>Category:</strong> ${recipe.category}</p>
                <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
                <p><strong>Time:</strong> ${recipe.time}</p>
                <p><strong>Servings:</strong> ${recipe.servings}</p>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Ingredients</h3>
                <ul>
                    ${recipe.ingredients.map(ing => `<li><strong>${ing.amount}</strong> - ${ing.item}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Equipment</h3>
                <ul>
                    ${recipe.equipment.map(eq => `<li>• ${eq}</li>`).join('')}
                </ul>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h3>Instructions</h3>
                <ol>
                    ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        </div>
    `;

    // Trigger print
    window.print();
}

function downloadPowerPoint(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    // Create a proper HTML document for PowerPoint conversion
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${recipe.title} - Teacher Presentation</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 900px; 
            margin: 0 auto; 
            padding: 40px; 
            line-height: 1.6; 
            color: #333;
        }
        h1 { 
            color: #2c3e50; 
            border-bottom: 3px solid #ff9400; 
            padding-bottom: 10px; 
            font-size: 36px; 
            text-align: center;
            margin-bottom: 10px;
        }
        h2 { 
            color: #2c3e50; 
            border-bottom: 2px solid #ff9400; 
            padding-bottom: 5px; 
            font-size: 28px; 
            margin-top: 30px; 
        }
        h3 { 
            color: #2c3e50; 
            font-size: 22px; 
            margin-top: 25px; 
        }
        .header-info { 
            display: flex; 
            justify-content: center;
            gap: 30px; 
            margin: 20px 0 40px 0; 
            color: #666; 
            font-size: 16px; 
            flex-wrap: wrap;
        }
        .category-badge { 
            background: #ff9400; 
            color: white; 
            padding: 8px 16px; 
            border-radius: 20px; 
            font-weight: bold; 
            font-size: 14px; 
        }
        .section { 
            margin: 30px 0; 
        }
        .ingredients-list, .equipment-list { 
            list-style: none; 
            padding: 0; 
        }
        .ingredients-list li, .equipment-list li { 
            padding: 10px 0; 
            border-bottom: 1px solid #eee; 
            font-size: 16px;
        }
        .steps-list { 
            list-style: none; 
            padding: 0; 
        }
        .steps-list li { 
            margin: 15px 0; 
            padding: 15px; 
            background: #f8f9fa; 
            border-left: 4px solid #ff9400; 
            border-radius: 4px;
            font-size: 16px;
        }
        .step-number { 
            background: #ff9400; 
            color: white; 
            width: 30px; 
            height: 30px; 
            border-radius: 50%; 
            display: inline-flex; 
            align-items: center; 
            justify-content: center; 
            font-weight: bold; 
            margin-right: 15px; 
        }
        .highlight-box { 
            background: #fff3cd; 
            border: 1px solid #ffeaa7; 
            border-radius: 8px; 
            padding: 20px; 
            margin: 20px 0; 
        }
        .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #ddd; 
            color: #666; 
            font-size: 14px; 
            text-align: center; 
        }
        .grid-layout { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 20px; 
        }
        @media print {
            body { padding: 20px; }
            h1 { font-size: 28px; }
            h2 { font-size: 22px; }
            h3 { font-size: 18px; }
        }
    </style>
</head>
<body>
    <h1>${recipe.title}</h1>
    <div class="header-info">
        <span class="category-badge">${recipe.category}</span>
        <span><strong>Difficulty:</strong> ${recipe.difficulty}</span>
        <span><strong>Time:</strong> ${recipe.time}</span>
        <span><strong>Servings:</strong> ${recipe.servings}</span>
    </div>
    
    <div class="section">
        <h2>Description</h2>
        <p>${recipe.description}</p>
    </div>

    <div class="section">
        <h2>Ingredients List</h2>
        <p>Here's everything you'll need to make this delicious recipe:</p>
        
        <div class="grid-layout">
            <div>
                <h3>Dry Ingredients</h3>
                <ul class="ingredients-list">
                    ${recipe.ingredients.filter((ing, index) => index % 2 === 0).map(ing => `<li><strong>${ing.amount}</strong> - ${ing.item}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h3>Wet Ingredients & Others</h3>
                <ul class="ingredients-list">
                    ${recipe.ingredients.filter((ing, index) => index % 2 !== 0).map(ing => `<li><strong>${ing.amount}</strong> - ${ing.item}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Equipment Needed</h2>
        <p>Make sure you have all the necessary tools before starting:</p>
        
        <div class="grid-layout">
            <div>
                <ul class="equipment-list">
                    ${recipe.equipment.slice(0, Math.ceil(recipe.equipment.length / 2)).map(eq => `<li>• ${eq}</li>`).join('')}
                </ul>
            </div>
            <div>
                <ul class="equipment-list">
                    ${recipe.equipment.slice(Math.ceil(recipe.equipment.length / 2)).map(eq => `<li>• ${eq}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Step-by-Step Instructions</h2>
        <p>Follow these steps carefully to create a perfect dish:</p>
        <ol class="steps-list">
            ${recipe.steps.map((step, index) => `
                <li>
                    <div style="display: flex; align-items: flex-start;">
                        <div class="step-number">${index + 1}</div>
                        <div>${step}</div>
                    </div>
                </li>
            `).join('')}
        </ol>
    </div>

    <div class="highlight-box">
        <h3>Cooking Tips & Summary</h3>
        <h4>Pro Tips:</h4>
        <ul>
            <li>Always read through the recipe before starting</li>
            <li>Prepare all ingredients before beginning (mise en place)</li>
            <li>Follow the steps in order for best results</li>
            <li>Don't rush - cooking should be enjoyable!</li>
        </ul>
        
        <h4>Recipe Summary:</h4>
        <ul>
            <li><strong>Category:</strong> ${recipe.category}</li>
            <li><strong>Difficulty:</strong> ${recipe.difficulty}</li>
            <li><strong>Time:</strong> ${recipe.time}</li>
            <li><strong>Servings:</strong> ${recipe.servings}</li>
            <li><strong>Key Skills:</strong> Following instructions, measuring, timing</li>
        </ul>
    </div>

    <div class="footer">
        <p>recipes.rupertg.co.uk</p>
    </div>
</body>
</html>
    `;

    // Create blob and download as HTML (can be printed to PDF or converted to PPT)
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.title.replace(/\s+/g, '_')}_Teacher_Presentation.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showMessage('Teacher presentation downloaded! Open in browser and print to PDF.', 'success');
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add smooth scrolling for all navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Initialize mobile bottom navigation
    initMobileNavigation();
});

// Mobile Bottom Navigation Functions
function initMobileNavigation() {
    // Add click handlers for bottom nav links
    const navLinks = document.querySelectorAll('.mobile-bottom-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Add scroll listener to update active navigation
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Initial check
    updateActiveNavigation();
}

function updateActiveNavigation() {
    const sections = ['favorites', 'recipes', 'recipeSubmission'];
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Find which section is currently in view
    for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if section is in view (with some offset)
            if (currentScroll >= sectionTop - windowHeight / 3 && currentScroll < sectionTop + sectionHeight - windowHeight / 3) {
                setActiveNavLink(sections[i]);
                break;
            }
        }
    }
}

function setActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.mobile-bottom-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkSection = link.getAttribute('data-section');
        
        // Map data-section to actual section IDs
        let actualSectionId = linkSection;
        if (linkSection === 'submit') {
            actualSectionId = 'recipeSubmission';
        }
        
        if (actualSectionId === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
        
        // Handle close button click (using event delegation)
        nav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' || e.target.textContent === '✕') {
                nav.classList.remove('active');
            }
        });
    }
}

function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Insert at top of body
    document.body.insertBefore(messageDiv, document.body.firstChild);

    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Initialize the application
initializeApp();
