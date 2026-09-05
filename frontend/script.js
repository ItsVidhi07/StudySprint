console.log("Study Sprint Javascript is connected!");

const form = document.querySelector("#study-form");

const subjectInput = document.querySelector("#subject");
const topicInput = document.querySelector("#topic");
const hoursInput = document.querySelector("#hours");
const minutesInput = document.querySelector("#minutes");

const sessionsList = document.querySelector("#sessions-list");
const totalTime = document.querySelector("#total-time");
const durationError = document.querySelector("#duration-error");

const sessions = [];

console.log(form);
console.log(subjectInput);
console.log(topicInput);
console.log(hoursInput);
console.log(minutesInput);
console.log(sessionsList);
console.log(totalTime);
console.log(durationError);


function formatDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) {
        return `${minutes}m`;
    }

    if (minutes === 0) {
        return `${hours}h`;
    }

    return `${hours}h ${minutes}m`;
}


function calculateTotal() {
    let total = 0;

    sessions.forEach(function(session) {
        total += session.duration;
    });

    return total;
}


function renderSessions() {
    sessionsList.innerHTML = "";

    sessions.forEach(function(session) {
        const sessionCard = document.createElement("article");

        sessionCard.classList.add("session-card");

        sessionCard.innerHTML = `
            <button class="delete-btn" data-id="${session.id}" aria-label="Delete session">×</button>
            <h3>📚 ${session.subject}</h3>
            <p>${session.topic}</p>
            <span>${formatDuration(session.duration)}</span>
        `;

        const deleteButton = sessionCard.querySelector(".delete-btn");

        deleteButton.addEventListener("click", function() {
            const id = Number(deleteButton.dataset.id);

            const index = sessions.findIndex(function(session) {
                return session.id === id;
            });

            sessions.splice(index, 1);

            renderSessions();
        });

        sessionsList.appendChild(sessionCard);
    });

    const total = calculateTotal();

    totalTime.textContent = formatDuration(total);
}


form.addEventListener("submit", function(event) {
    event.preventDefault();

    const subject = subjectInput.value;
    const topic = topicInput.value;

    const hours = Number(hoursInput.value) || 0;
    const minutes = Number(minutesInput.value) || 0;

    const duration = hours * 60 + minutes;

    if (duration === 0) {
        durationError.textContent = "Please enter a study duration.";
        return;
    }

    const session = {
        id: Date.now(),
        subject: subject,
        topic: topic,
        duration: duration
    };

    sessions.push(session);

    renderSessions();

    form.reset();

    durationError.textContent = "";
});


renderSessions();