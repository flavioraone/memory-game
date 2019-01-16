const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matched = 0;
let moves = 0;
let timer_final = 0;

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random()*12);
		card.style.order = randomPos;
	});
})();

(function Timer () {
    
    let i = 1;

    let timer = setInterval(function() {
        document.getElementById('timer').textContent = 'TIMER: ' + i;
        i++;
        timer_final=i;
        if(i > 60) {
            clearInterval(timer);
            resetBoard()
        }
    }, 1000);
}
());

function flipCard (){
	moves++;
	document.getElementById('moves').textContent = 'MOVES: ' + moves;
	console.log('move' + moves);
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
	console.log("Match: " + matched);
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
	}, 1500);
}

function resetBoard(){
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];

}

function completed() {
	document.getElementById('ResultModal').style.display='block';
	document.getElementById('moves-modal').textContent = 'MOVES: ' + moves;
	document.getElementById('timer-modal').textContent = 'TIMER: ' + timer_final;
	var score=document.getElementById('score');
	console.log(score);
	/*switch (moves) {
		case <=18:
			score.append("<span>&#9734 &#9734 &#9734 &#9734 &#9734</span>");
			break;
		case >18 && <= 27:
			score.append("<span>&#9734 &#9734 &#9734 &#9734</span>");
		case >27 && <= 36:
			score.append("<span>&#9734 &#9734 &#9734</span>");
			break;
		case >36 && <= 45:
			score.append("<span>&#9734 &#9734</span>");
			break;
		case >45:
			score.append("<span>&#9734</span>");
			break;
	}*/

}

cards.forEach(card => card.addEventListener ('click', flipCard));

document.getElementById("start").addEventListener("click", unflipCards());

