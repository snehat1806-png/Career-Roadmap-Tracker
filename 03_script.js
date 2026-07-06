// ======================
// Get HTML Elements
// ======================

const addGoalBtn = document.getElementById("addGoalBtn");
const goalContainer = document.getElementById("goalContainer");
const searchInput = document.getElementById("search");

const totalGoals = document.getElementById("totalGoals");
const completedGoals = document.getElementById("completedGoals");
const pendingGoals = document.getElementById("pendingGoals");
const overallProgress = document.getElementById("overallProgress");

// ======================
// Add Goal
// ======================

addGoalBtn.addEventListener("click", function () {

    const goalName = searchInput.value.trim();

    if (goalName === "") {
        alert("Please enter a goal!");
        return;
    }

    // Create Card
    const card = document.createElement("div");
    card.classList.add("goal-card");

    card.innerHTML = `
        <h3>${goalName}</h3>

        <p class="status">Status : Pending</p>

        <div class="btn-group">

            <button class="complete-btn">
                ✔ Complete
            </button>

            <button class="delete-btn">
                🗑 Delete
            </button>

        </div>
    `;

    // Get Elements Inside Card
    const completeBtn = card.querySelector(".complete-btn");
    const deleteBtn = card.querySelector(".delete-btn");
    const status = card.querySelector(".status");

    // ======================
    // Complete Button
    // ======================

    completeBtn.addEventListener("click", function () {

        if (status.textContent === "Status : Pending") {

            status.textContent = "Status : Completed ✅";

        } else {

            status.textContent = "Status : Pending";

        }

        updateDashboard();

    });

    // ======================
    // Delete Button
    // ======================

    deleteBtn.addEventListener("click", function () {

        card.remove();

        updateDashboard();

    });

    // Add Card to Page
    goalContainer.appendChild(card);

    // Clear Input
    searchInput.value = "";

    // Update Dashboard
    updateDashboard();

});

// ======================
// Dashboard Function
// ======================

function updateDashboard() {

    const cards = document.querySelectorAll(".goal-card");
    const completed = document.querySelectorAll(".goal-card .status");

    let completedCount = 0;

    completed.forEach(function (item) {

        if (item.textContent === "Status : Completed ✅") {

            completedCount++;

        }

    });

    const total = cards.length;
    const pending = total - completedCount;

    totalGoals.textContent = total;
    completedGoals.textContent = completedCount;
    pendingGoals.textContent = pending;

    if (total === 0) {

        overallProgress.textContent = "0%";

    } else {

        const progress = Math.round((completedCount / total) * 100);
        overallProgress.textContent = progress + "%";

    }

}
//Search input 
searchInput.addEventListener("input", function () {
const searchText = searchInput.value.toLowerCase();

const cards = document.querySelectorAll(".goal-card");

cards.forEach(function(card){

    const goalTitle = card.querySelector("h3").textContent.toLowerCase();

    if(goalTitle.includes(searchText)){

        card.style.display = "block";

    }else{

        card.style.display = "none";

    }

});
});