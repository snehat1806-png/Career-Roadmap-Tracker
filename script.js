// ===============================
// DOM Elements
// ===============================

const addGoalBtn = document.getElementById("addGoalBtn");
const goalContainer = document.getElementById("goalContainer");
const searchInput = document.getElementById("search");

const totalGoals = document.getElementById("totalGoals");
const completedGoals = document.getElementById("completedGoals");
const pendingGoals = document.getElementById("pendingGoals");
const overallProgress = document.getElementById("overallProgress");
const themeToggle = document.getElementById("themeToggle");

// ===============================
// Array + Local Storage
// ===============================

let goals = JSON.parse(localStorage.getItem("goals")) || [];

// ===============================
// Save Goals
// ===============================

function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(goals));
}

// ===============================
// Dashboard
// ===============================

function updateDashboard() {

    totalGoals.textContent = goals.length;

    const completed = goals.filter(goal => goal.completed).length;

    completedGoals.textContent = completed;

    pendingGoals.textContent = goals.length - completed;

    let progress = 0;

    if (goals.length > 0) {
        progress = Math.round((completed / goals.length) * 100);
    }

    overallProgress.textContent = progress + "%";
}

// ===============================
// Display Goals
// ===============================

function displayGoals(searchText = "") {

    goalContainer.innerHTML = "";

    const filteredGoals = goals.filter(goal =>
        goal.title.toLowerCase().includes(searchText.toLowerCase())
    );

    filteredGoals.forEach((goal, index) => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

    <h2>${goal.title}</h2>

    <p>${goal.description}</p>

    <p><strong>Status:</strong>
    ${goal.completed ? "✅ Completed" : "⏳ Pending"}
    </p>

    <button class="completeBtn">
        ${goal.completed ? "Undo" : "Complete"}
    </button>

    <button class="editBtn">
        Edit
    </button>

    <button class="deleteBtn">
        Delete
    </button>

`;
        // Complete Button

        card.querySelector(".completeBtn").addEventListener("click", () => {

            goal.completed = !goal.completed;

            saveGoals();

            displayGoals(searchInput.value);
            generateRoadmap();
            updateDashboard();

        });
        // Edit Button

        card.querySelector(".editBtn").addEventListener("click", () => {

            const newTitle = prompt("Edit Goal Title", goal.title);

            if (!newTitle) return;

            const newDescription = prompt(
                "Edit Goal Description",
                goal.description
            );

            goal.title = newTitle;
            goal.description = newDescription;

            saveGoals();

            displayGoals(searchInput.value);
            generateRoadmap();
            updateDashboard();

        });

        // Delete Button

        card.querySelector(".deleteBtn").addEventListener("click", () => {

            goals.splice(index, 1);

            saveGoals();

            displayGoals(searchInput.value);
            generateRoadmap();
            updateDashboard();

        });

        goalContainer.appendChild(card);

    });

}
const streak = document.getElementById("streak");

streak.textContent = goals.length + " Goals";

// ===============================
// Add Goal
// ===============================

addGoalBtn.addEventListener("click", () => {

    const title = prompt("Enter Goal Title");

    if (!title) return;

    const description = prompt("Enter Goal Description");

    goals.push({

        title,

        description,

        completed: false

    });

    saveGoals();

    displayGoals();  
    generateRoadmap();
    updateDashboard();

});

// ===============================
// Search
// ===============================

searchInput.addEventListener("input", () => {

    displayGoals(searchInput.value);

});
//================================
//Generate Roadmao 
//================================
function generateRoadmap() {

    let graph = "graph TD\n";

    goals.forEach((goal, index) => {

        if (index === 0) {

            graph += `A["${goal.title}"]`;

        } else {

            graph += ` --> N${index}["${goal.title}"]`;

        }

    });

    document.getElementById("roadmapChart").textContent = graph;

    mermaid.run();

}
// ===============================
// Load Data
// ===============================

displayGoals();
generateRoadmap();
updateDashboard();

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});