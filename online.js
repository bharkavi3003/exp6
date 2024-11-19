// Example set of quotations and questions
const quotations = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "In the end, we will remember not the words of our enemies, but the silence of our friends. – Martin Luther King Jr.",
    "Life is 10% what happens to us and 90% how we react to it. – Charles R. Swindoll"
];

const questions = [
    "What does this quotation mean to you?",
    "How relevant is this quotation in today's world? (Rate 1-5)",
    "Who might benefit most from this quote?",
    "Which author resonates with you the most and why?",
    "Can you relate this quotation to a personal experience?"
];

// Function to get 5 random questions
function getRandomQuestions() {
    const randomQuestions = [];
    while (randomQuestions.length < 5) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (!randomQuestions.includes(questions[randomIndex])) {
            randomQuestions.push(questions[randomIndex]);
        }
    }
    return randomQuestions;
}

// Function to display the quotation and questions
function displaySurvey() {
    const randomQuotation = quotations[Math.floor(Math.random() * quotations.length)];
    document.getElementById('quotation-container').innerHTML = `<p><strong>Quotation:</strong><br>${randomQuotation}</p>`;

    const randomQuestions = getRandomQuestions();
    let questionsHtml = '<form id="survey-form">';
    randomQuestions.forEach((question, index) => {
        questionsHtml += `
            <div class="question">
                <label for="q${index}">${question}</label><br>
                <input type="text" id="q${index}" name="q${index}" required>
            </div>
        `;
    });
    questionsHtml += '</form>';
    document.getElementById('questions-container').innerHTML = questionsHtml;
}

// Handle form submission
document.getElementById('submit-btn').addEventListener('click', () => {
    const form = document.getElementById('survey-form');
    if (form.checkValidity()) {
        document.getElementById('thank-you-message').style.display = 'block';
    } else {
        alert("Please answer all the questions before submitting.");
    }
});

// Display the survey on page load
displaySurvey();
