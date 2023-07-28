// Store responses in an array
let responses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Function to scroll to the next question after the current question is answered
function scrollToNextQuestion(currentQuestionIndex) {
  const questions = document.querySelectorAll('.question-container');
  const nextIndex = currentQuestionIndex + 1;

  // Scroll to the next question or the calculate button
  const nextQuestion = questions[nextIndex];
  const isLastQuestion = nextIndex === questions.length;
  const targetElement = nextQuestion || document.getElementById('calc-button');

  // Adjust the scroll position to be a little higher for the last question only
  const offset = isLastQuestion ? -300 : 0;
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offset;

  // Scroll to the adjusted position
  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
}

// Function to update the mood score when a question is answered
function updateMoodScore() {
  const questions = document.querySelectorAll('.question');

  // Update responses array with parsed values
  responses = Array.from(questions).map(question => parseFloat(question.value));

  // Get the index of the current question being answered
  const currentQuestionIndex = Array.from(questions).indexOf(this);

  // Scroll to the next question after the current question is answered
  scrollToNextQuestion(currentQuestionIndex);
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
  let moodScore = responses.reduce((acc, response) => acc + response, 0);

  // Calculate the mood score
  moodScore = (5 * moodScore) / 2;
    
  // Round the mood score
  let roundedMoodScore = Math.round(moodScore);

  // Calculate the Juice: sum of mood questions associated with increased mania
  let juice = responses.slice(0, 5).reduce((acc, response) => acc + response, 0);

  // Calculate the Base: sum of mood questions associated with decreased mania
  let base = responses.slice(5).reduce((acc, response) => acc + response, 0);

  // ... (remaining code remains unchanged)
}