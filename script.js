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
        title: "Vegetable Stir-Fry with Teriyaki Sauce",
        category: "Lunch",
        difficulty: "Medium",
        time: "30 minutes",
        servings: "4 servings",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop",
        description: "A colorful and healthy stir-fry with crisp vegetables in a sweet and savory teriyaki sauce.",
        ingredients: [
            { amount: "2 tbsp", item: "vegetable oil" },
            { amount: "1", item: "red bell pepper, sliced" },
            { amount: "1", item: "yellow bell pepper, sliced" },
            { amount: "1 cup", item: "broccoli florets" },
            { amount: "1 cup", item: "snap peas" },
            { amount: "1", item: "carrot, julienned" },
            { amount: "3 cloves", item: "garlic, minced" },
            { amount: "1 tbsp", item: "fresh ginger, minced" },
            { amount: "1/2 cup", item: "teriyaki sauce" },
            { amount: "2 tbsp", item: "soy sauce" },
            { amount: "1 tbsp", item: "cornstarch" },
            { amount: "1/4 cup", item: "water" },
            { amount: "2 cups", item: "cooked rice, for serving" },
            { amount: "2", item: "green onions, sliced" }
        ],
        equipment: [
            "Large wok or skillet",
            "Cutting board and knife",
            "Measuring cups and spoons",
            "Small bowl for sauce",
            "Spatula or tongs"
        ],
        steps: [
            "Heat oil in wok or large skillet over medium-high heat.",
            "Add garlic and ginger, stir-fry for 30 seconds until fragrant.",
            "Add bell peppers, broccoli, snap peas, and carrot. Stir-fry for 4-5 minutes until crisp-tender.",
            "In a small bowl, whisk together teriyaki sauce, soy sauce, cornstarch, and water.",
            "Pour sauce mixture over vegetables, stirring constantly until sauce thickens, about 2-3 minutes.",
            "Serve immediately over cooked rice.",
            "Garnish with sliced green onions."
        ]
    }
];

// Global Variables
let filteredRecipes = [...recipes];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    displayRecipes(recipes);
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
});

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