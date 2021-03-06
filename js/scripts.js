const cards = document.querySelectorAll('.memory-card');
let start = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matched = 0;
let moves = 0;
let timer_final = 0;
let stop = false;

// Scoring system from 1 to 3 stars to shorten code
let ratingStars = document.getElementsByClassName('fa-star');
let	stars3 = 18;
let	stars2 = 22;
let star1 = 30;

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random()*12);
		card.style.order = randomPos;
	});
})();

function flipCard (){
	if (!start){
		Timer();
		start = true;
	};
	moves++; 
	rating(moves);
	document.getElementById('moves').textContent = moves;
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');
	
	if	(!hasFlippedCard){
		//first click
		hasFlippedCard = true;
		firstCard = this;

		return;
	} 
	//second click
	secondCard = this;

	checkForMatch();
}

function checkForMatch(){
	let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;
	//do cards match?
	isMatch ? disableCards() : unflipCards();
	if (matched >=6){
		completed();
	} 
}

function disableCards(){
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
	matched++
}

function unflipCards(){
	lockBoard = true;

	setTimeout( () => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		
		lockBoard = false;
		resetBoard();
	}, 1200);
}

function resetBoard(){
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function completed() {
	document.getElementById('ResultModal').style.display='block';
	scrstars = document.getElementById('score-panel');
	$("#modal-content").append(scrstars);
	stop = true;
}

// Adds a score from 1 to 3 stars depending on the amount of moves done
function rating() {
	let rating = 3;
    if (moves > stars3 && moves < stars2) {
        ratingStars[0].classList.remove("fas");
        ratingStars[0].classList.add("far");
        stars3 = 100;
    } else if (moves > stars2 && moves < star1) {
       ratingStars[1].classList.remove("fas");
       ratingStars[1].classList.add("far");
       stars2 = 100;
    } 
    return { score: rating };
}

//Initiates timer
function Timer () {
        let i = 1;
		let timer = setInterval(function() {
		if (stop){
    		clearInterval(timer);
    	}
    	document.getElementById('timer').textContent = i;
    	i++;
    	timer_final=i;
    }, 1000);   
};

cards.forEach(card => card.addEventListener ('click', flipCard));
