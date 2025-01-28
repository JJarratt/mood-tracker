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

  let moodResult = '';

  // // Determine the mood result based on the mood score
  // if (moodScore >= 90) {
  //   moodResult = 'Extreme mood elevation';
  // } else if (moodScore >= 80) {
  //   moodResult = 'Memorable mood elevation';
  // } else if (moodScore >= 70) {
  //   moodResult = 'Substantial mood elevation';
  // } else if (moodScore >= 60) {
  //   moodResult = 'Significant mood elevation';
  // } else if (moodScore >= 51) {
  //   moodResult = 'Slight mood elevation';
  // } else if (moodScore === 50) {
  //   moodResult = 'Ok (so-so)';
  // } else if (moodScore >= 40) {
  //   moodResult = 'Mildly low mood';
  // } else if (moodScore >= 30) {
  //   moodResult = 'Moderately low mood';
  // } else if (moodScore >= 20) {
  //   moodResult = 'Seriously low mood';
  // } else if (moodScore >= 10) {
  //   moodResult = 'Severely low mood';
  // } else {
  //   moodResult = 'Extremely low mood';
  // }

  // Simplified mood results
  if (roundedMoodScore > 50) {
    moodResult = 'Your Mood is Up';
  } else if (roundedMoodScore === 50) {
    moodResult = 'Your Mood is Ok (So-So)';
  } else {
    moodResult = 'Your Mood is Down';
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
  document.getElementById('result').textContent += `${formattedTime}\n\n\n\n`;

  // Mood results
  document.getElementById('result').textContent += `Mood Score:\n\n${roundedMoodScore}\n\n\n`;
  document.getElementById('result').textContent += `${moodResult}`;

  // DISCLAIMER
  // document.getElementById('result').textContent += `\n\n\n\n\n`;
  // document.getElementById('result').textContent += `NOT MEDICAL ADVICE`;

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
