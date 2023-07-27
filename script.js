// Store responses in variables
let q1_response = 0;
let q2_response = 0;
let q3_response = 0;
let q4_response = 0;
let q5_response = 0;
let q6_response = 0;
let q7_response = 0;
let q8_response = 0;
let q9_response = 0;
let q10_response = 0;

// Function to scroll to the next question after the current question is answered
function scrollToNextQuestion(event) {
    const questions = document.querySelectorAll('.question-container');
    const currentQuestion = event.target.closest('.question-container');
    const currentIndex = Array.from(questions).indexOf(currentQuestion);
    const nextIndex = currentIndex + 1;

    // Scroll to the next question or the calculate button
    const nextQuestion = questions[nextIndex];
    const isLastQuestion = nextIndex === questions.length;
    const targetElement = nextQuestion || document.getElementById('calc-button');

    // Adjust the scroll position to be a little higher (e.g., 50 pixels) for the last question only
    const offset = isLastQuestion ? -300 : 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;

    // Scroll to the adjusted position
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
}

// Function to update the mood score when a question is answered
function updateMoodScore() {
    const questions = document.querySelectorAll('.question');
    q1_response = parseFloat(questions[0].value);
    q2_response = parseFloat(questions[1].value);
    q3_response = parseFloat(questions[2].value);
    q4_response = parseFloat(questions[3].value);
    q5_response = parseFloat(questions[4].value);
    q6_response = parseFloat(questions[5].value);
    q7_response = parseFloat(questions[6].value);
    q8_response = parseFloat(questions[7].value);
    q9_response = parseFloat(questions[8].value);
    q10_response = parseFloat(questions[9].value);

    // Scroll to the next question after the current question is answered
    scrollToNextQuestion(event);
}

// Add event listeners to each select element to update the mood score when a question is answered
const selectElements = document.querySelectorAll('.question');
selectElements.forEach(select => {
    select.addEventListener('change', updateMoodScore);
});

// Function to calculate the mood based on user responses
function calculateMood() {

    // Reset the content of the result element
    document.getElementById('result').textContent = "";

    // Get mood score from individual responses
    let moodScore = q1_response + q2_response + q3_response + q4_response + q5_response + q6_response + q7_response + q8_response + q9_response + q10_response;

    // Calculate the mood score
    moodScore = (5 * moodScore) / 2;
    
    // Round the mood score
    let roundedMoodScore = Math.round(moodScore);

    // Calculate the Juice: sum of mood questions associated with increased mania
    let juice = 0;
    juice = q1_response + q2_response + q3_response + q4_response + q5_response; // default juice

    // Calculate the Base: sum of mood questions associated with decreased mania
    let base = 0;
    base = q6_response + q7_response + q8_response + q9_response + q10_response; // default base

    let moodResult = '';

    // Determine the mood result based on the mood score
    if (moodScore >= 90) {
        moodResult = 'Extreme mood elevation';
    } else if (moodScore >= 80) {
        moodResult = 'Memorable mood elevation';
    } else if (moodScore >= 70) {
        moodResult = 'Substantial mood elevation';
    } else if (moodScore >= 60) {
        moodResult = 'Significant mood elevation';
    } else if (moodScore >= 51) {
        moodResult = 'Slight mood elevation';
    } else if (moodScore === 50) {
        moodResult = 'Ok (so-so)';
    } else if (moodScore >= 40) {
        moodResult = 'Mildly low mood';
    } else if (moodScore >= 30) {
        moodResult = 'Moderately low mood';
    } else if (moodScore >= 20) {
        moodResult = 'Seriously low mood';
    } else if (moodScore >= 10) {
        moodResult = 'Severely low mood';
    } else {
        moodResult = 'Extremely low mood';
    }

    // Get the current date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    // Get the current time
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    // Date and time
    document.getElementById('result').textContent += `\n${formattedDate}\n`;
    document.getElementById('result').textContent += `${formattedTime}\n\n`;

    // Mood results
    document.getElementById('result').textContent += `Your mood score is ${roundedMoodScore}\n`;
    document.getElementById('result').textContent += `${moodResult}`;
    //document.getElementById('result').textContent += `\n\nJuice (1-5): ${juice}.`;
    //document.getElementById('result').textContent += `\nBase (6-10): ${base}.`;

    // DISCLAIMER
    document.getElementById('result').textContent += `\n\n\n\n\n\n`;
    document.getElementById('result').textContent += `NOT MEDICAL ADVICE`;

    // Scroll to the results section
    const resultElement = document.getElementById('result');
    resultElement.scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    // Get all select elements and set their value to the initial "disabled" option
    const selectElements = document.querySelectorAll('.question');
    selectElements.forEach(select => {
        select.value = select.querySelector('option[selected]').value;
    });

    // Reset the results section
    document.getElementById('result').textContent = "";

    // Scroll back to the top of the form after resetting
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
