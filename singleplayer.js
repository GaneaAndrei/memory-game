  // scritps.js


  //global variables
  const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let count=0;
  let matches=0;
  let mod=0;
 
  let audio = document.querySelector('audio');
  document.getElementById('container2').style.display='none'
  document.getElementById('container').style.display='none'


//function for flipping the cards,increment the counter and check if the first card flipped matches the second card that was flipped
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
    count+=1;
    console.log(Math.round(count))
    secondCard = this;
    lockBoard = true;
    document.getElementById('miscari').innerHTML='Moves :'+count;
    checkForMatch();
  }


  //set the game mode on 3x4 grid
 const startButton=document.getElementById("start").addEventListener("click",function(event){
  document.getElementById('game1').classList.toggle("display");
  mod=0;
  shuffle()
  document.getElementById("optionsDlg").style.display = "none";
  document.getElementById('container2').style.display='none'
  document.getElementById('container').style.display='flex'
 })


//set the game mod on 4x4 grid
 const startButton2=document.getElementById("start2").addEventListener("click",function(event){
  document.getElementById('game2').classList.toggle("display");
  mod=1;
  shuffle()
  document.getElementById("optionsDlg").style.display = "none";
  document.getElementById('container').style.display='none'
  document.getElementById('container2').style.display='flex'
 })


 //check if two card that are flipped match each other
  function checkForMatch() {
    let isMatch = firstCard.dataset.christmas === secondCard.dataset.christmas;
    isMatch ? disableCards() : unflipCards();
  }

  //disable card if they match so they can't be selected again and increment the score
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('disabled');
    secondCard.classList.add('disabled');
    matches+=1;
    document.getElementById('matches').innerHTML='Matches :'+matches;
    

    resetBoard();
    
//checking win conditions and display the winner
    if((matches==6)&&(mod==0)){
      document.getElementById('matches').style.display='none'
      document.getElementById('miscari').style.display='none'
      document.getElementById('win').style.display='block'
      document.getElementById('win').innerHTML=`Felicitari!Ai castigat jocul realizand ${count} miscari!`
      document.getElementById('game1').classList.remove("display");
     }
     if((matches==8)&&(mod==1)){
      document.getElementById('matches').style.display='none'
      document.getElementById('miscari').style.display='none'
      document.getElementById('win').style.display='block'
      document.getElementById('win').innerHTML=`Felicitari!Ai castigat jocul realizand ${count} miscari!`
      document.getElementById('game2').classList.remove("display");
     }
  }

  
//unflip the card if they don't match
  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }


  //shuffle the cards
 function shuffle() {

   cards.forEach(card => {

     let ramdomPos = Math.floor(Math.random() * 12);

     card.style.order = ramdomPos;

   });
   
 };

  cards.forEach(card => card.addEventListener('click', flipCard));



//reset the game
  function resetGame(){
    count=0;
    matches=0;
    document.getElementById('matches').innerHTML='Matches :'+matches;
    document.getElementById('miscari').innerHTML='Moves :'+count;
    shuffle()
    soundStop()
//reset the 3x4 game
    if(mod==0){
    document.getElementById("optionsDlg").style.display = "block";
    document.getElementById('game1').classList.remove("display");
    cards.forEach(card => card.classList.remove('disabled'));
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.addEventListener('click', flipCard));
    document.getElementById('win').style.display='none'
    document.getElementById('matches').style.display='block'
    document.getElementById('miscari').style.display='block'
    }
//reset the 4x4 game
    else if (mod==1){
      document.getElementById("optionsDlg").style.display = "block";
    document.getElementById('game2').classList.remove("display");
    cards.forEach(card => card.classList.remove('disabled'));
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.addEventListener('click', flipCard));
    document.getElementById('win').style.display='none'
    document.getElementById('matches').style.display='block'
    document.getElementById('miscari').style.display='block'
    }
  }
  function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

//functions for audio

function soundPlay(){
  audio.play()
 }
 function soundStop(){
  audio.pause()
 }

//redirect to main menu

 function menu(){
  location.href="menu.html"
}
