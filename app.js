const questions = [
	{
		question: 'What is JavaScript?',
		answers: [
			{text: 'A type of database', correct: false},
			{text: ' A programming language used to create interactive effects within web browsers.'
, correct: true},
			{text: ' A text editor', correct: false},
			{text: 'An operating system', correct: false},
		]
	},
	{
		question: 'Which of the following is not a data type in JavaScript?',
		answers: [
			{text: 'String', correct: false},
			{text: 'Boolean', correct: false},
			{text: 'Float', correct: true},
			{text: 'Undefined', correct: false},
		]
	},
	{
		question: 'Which keyword is used to declare a variable that cannot be reassigned?',
		answers: [
			{text: 'var', correct: false},
			{text: 'let', correct: false},
			{text: 'const', correct: true},
			{text: 'static', correct: false},
		]
	},
	{
		question: 'Which of the following is the correct way to declare a function in JavaScript?',
		answers: [
			{text: 'def myFunction() {}', correct: false},
			{text: 'function myFunction() {}', correct: true},
			{text: 'function: myFunction() {}', correct: false},
			{text: 'myFunction() {} = function', correct: false},
		]
	},
	{
		question: "What is the difference between 'let' and 'var'?",
		answers: [
			{text: 'let is function-scoped, while var is block-scoped', correct: false},
			{text: 'let allows re-declaration within the same scope, while var does not.', correct: false},
			{text: 'let is block-scoped, while var is function-scoped', correct: true},
			{text: 'There is no difference.', correct: false},
		]
	},
	{
		question: 'Which of the following is a valid arrow function?',
		answers: [
			{text: 'const add = (a, b) -> { return a + b; }', correct: false},
			{text: 'const add = (a, b) => { return a + b; }', correct: false},
			{text: 'const add = (a, b) => a + b', correct: false},
			{text: 'Both B and ', correct: true},
		]
	},
	{
		question: 'What is a higher-order function?',
		answers: [
			{text: 'A function that takes a string as an argume', correct: false},
			{text: ' A function that returns an object.', correct: false},
			{text: 'A function that takes another function as an argument or returns a function', correct: true},
			{text: 'A function that does not return any value', correct: false},
		]
	}
	
];

const questionEL = document.getElementById('question')
const answerBtn = document.getElementById('answers-btn')
const nextBtn = document.getElementById('next-btn')


let currentQuestionIndex = 0;
let score = 0;


const startQuiz = () =>{
	currentQuestionIndex = 0;
	score = 0;
	nextBtn.innerHTML = "Next"
	showQuestion();
}




const showQuestion = () =>{
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionEL.innerHTML = questionNo + ". " + currentQuestion.question;

	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerBtn.appendChild(button);
		if(answer.correct){
			button.dataset.correct = answer.correct;
		}

		button.addEventListener('click', selectAnswer);

	});
}

const resetState = () =>{
	nextBtn.style.display = "none";

	while(answerBtn.firstChild){
		answerBtn.removeChild(answerBtn.firstChild);
	}
}

const selectAnswer = (e) =>{
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++
	}else{
		selectedBtn.classList.add("incorrect")
	}

	Array.from(answerBtn.children).forEach(button => {
		if (button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = true;
	});

	nextBtn.style.display = "block"
}

const showScore = () =>{
	resetState();
	questionEL.innerHTML = `You Scored ${score} out of ${questions.length}!`;
	nextBtn.innerHTML = "Play Again!";
	nextBtn.style.display = "block"
}

const handleNextBtn = () =>{
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	}else{
		showScore();
	}
}

nextBtn.addEventListener("click", ()=>{
	if(currentQuestionIndex < questions.length){
		handleNextBtn();
	}else{
		startQuiz();
	}
})

startQuiz()