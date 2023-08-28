  // scritps.js

  //global variables

  const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let count1=0;
  let count2=0;
  let matches1=0;
  let matches2=0;
  let mod=0;
  let player1=1
  let player2=2
  let playerTurn=player1;
 
  let audio = document.querySelector('audio');
  document.getElementById('container2').style.display='none'
  document.getElementById('container').style.display='none'
  document.getElementById('header-p1').style.color='green'
  
//function for flipping the cards,increment the counter for the player that made the move and check if the first card flipped matches the second card that was flipped
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
    if(playerTurn==player1){
        count1+=1;
        document.getElementById('miscari-p1').innerHTML='Moves P1 :'+count1;
    console.log(Math.round(count1))
    secondCard = this;
    lockBoard = true;
    }
   else if(playerTurn==player2){
    count2+=1;
    
    document.getElementById('miscari-p2').innerHTML='Moves P2 :'+count2;
    console.log(Math.round(count2))
    secondCard = this;
    lockBoard = true;
   }

    checkForMatch();

//highlight the current player to see faster whose turn is
    if(playerTurn===player1){
        playerTurn=player2
        document.getElementById('header-p2').style.color='green'
        document.getElementById('header-p1').style.color='rgb(112, 1, 1)'
    }
    else{
        playerTurn=player1;
        document.getElementById('header-p2').style.color='rgb(112, 1, 1)'
        document.getElementById('header-p1').style.color='green'
    }
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
  
  
  //set the game mode on 4x4 grid
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


//disable card if they match so they can't be selected again and increment the score for the player that made the match
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('disabled');
    secondCard.classList.add('disabled');
    if(playerTurn===player1){
        matches1+=1;
        document.getElementById('matches-p1').innerHTML='Matches :'+matches1;
        playerTurn=player2
    }
    else if(playerTurn===player2){
        matches2+=1;
        document.getElementById('matches-p2').innerHTML='Matches :'+matches2;
        playerTurn=player1;
    }
    

    resetBoard();
    
//checking win conditions and display the winner
    if((matches1==4)&&(mod==0)){
      document.getElementById('matches-p1').style.display='none'
      document.getElementById('miscari-p1').style.display='none'
      document.getElementById('matches-p2').style.display='none'
      document.getElementById('miscari-p2').style.display='none'
      document.getElementById('win').style.display='block'
      document.getElementById('win').innerHTML=`P1 won`
      document.getElementById('game1').classList.remove("display");
       }
       else if((matches2==4)&&(mod==0)){
        document.getElementById('win').innerHTML=`P2 won`
        document.getElementById('matches-p1').style.display='none'
        document.getElementById('miscari-p1').style.display='none'
        document.getElementById('matches-p2').style.display='none'
        document.getElementById('miscari-p2').style.display='none'
        document.getElementById('win').style.display='block'
        document.getElementById('game1').classList.remove("display");
       }
       if((matches1==5)&&(mod==1)){
        document.getElementById('win').innerHTML=`P1 won`
        document.getElementById('matches-p1').style.display='none'
        document.getElementById('miscari-p1').style.display='none'
        document.getElementById('matches-p2').style.display='none'
        document.getElementById('miscari-p2').style.display='none'
        document.getElementById('win').style.display='block'
        document.getElementById('game2').classList.remove("display");
       }
       else if((matches2==5)&&(mod==1))
       {
        document.getElementById('win').innerHTML=`P2 won`
        document.getElementById('matches-p1').style.display='none'
        document.getElementById('miscari-p1').style.display='none'
        document.getElementById('matches-p2').style.display='none'
        document.getElementById('miscari-p2').style.display='none'
        document.getElementById('win').style.display='block'
        document.getElementById('game2').classList.remove("display");
       }
       else if((matches1==3)&&(mod==0)&&(matches2==3)){
        document.getElementById('win').innerHTML=`Tie`
        document.getElementById('matches-p1').style.display='none'
        document.getElementById('miscari-p1').style.display='none'
        document.getElementById('matches-p2').style.display='none'
        document.getElementById('miscari-p2').style.display='none'
        document.getElementById('win').style.display='block'
        document.getElementById('game1').classList.remove("display");
       }
       else if((matches1==4)&&(mod==1)&&(matches2==4)){
        document.getElementById('win').innerHTML=`Tie`
        document.getElementById('matches-p1').style.display='none'
        document.getElementById('miscari-p1').style.display='none'
        document.getElementById('matches-p2').style.display='none'
        document.getElementById('miscari-p2').style.display='none'
        document.getElementById('win').style.display='block'
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
    count1=0;
    matches1=0;
    count2=0;
    matches2=0;
    soundStop()
    document.getElementById('matches-p1').innerHTML='Matches Player 1 :'+matches1;
    document.getElementById('miscari-p1').innerHTML='Moves Player 1 :'+count1;
    document.getElementById('matches-p2').innerHTML='Matches Player 2 :'+matches2;
    document.getElementById('miscari-p2').innerHTML='Moves Player 2 :'+count2;
    shuffle()

    //reset the 3x4 game
    if(mod==0){
    document.getElementById("optionsDlg").style.display = "block";
    document.getElementById('game1').classList.remove("display");
    cards.forEach(card => card.classList.remove('disabled'));
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.addEventListener('click', flipCard));
    document.getElementById('win').style.display='none'
    document.getElementById('matches-p1').style.display='block'
    document.getElementById('miscari-p1').style.display='block'
    document.getElementById('matches-p2').style.display='block'
    document.getElementById('miscari-p2').style.display='block'
    }

//reset the 4x4 game
    else if (mod==1){
      document.getElementById("optionsDlg").style.display = "block";
    document.getElementById('game2').classList.remove("display");
    cards.forEach(card => card.classList.remove('disabled'));
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.addEventListener('click', flipCard));
    document.getElementById('win').style.display='none'
    document.getElementById('matches-p1').style.display='block'
    document.getElementById('miscari-p1').style.display='block'
    document.getElementById('matches-p2').style.display='block'
    document.getElementById('miscari-p2').style.display='block'
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

//redirect to menu

function menu(){
  location.href="menu.html"
}


