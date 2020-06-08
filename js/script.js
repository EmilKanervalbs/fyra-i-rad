

//variabler för att hålla höjd, just nu går endast 6 och 7 pga dålig css

var height = 6;
var width = 7;


const menuWrapper = document.getElementById("menuWrapper");
const gameWrapper = document.getElementById("gameWrapper"); 
const winBox = document.getElementById("winBox");
const multiplayerWrapper = document.getElementById("multiplayerWrapper");
const roundOverBox = document.getElementById("roundOverBox");



//förbestämda positioner man ska kolla för att se om någon har vunnit
const winPos = [[-1, -2, -3], [-8, -16, -24], [-7, -14, -21], [-6, -12, -18], [1, 2, 3], [8, 16, 24], [7, 14, 21], [6, 12, 18]];

const aiCheck = [3, 2, 4, 1, 5, 0, 6]; //förutbestämd ordning som AI:n ska checka i

//sätter olika variabler som används

var gameOver = false; //håller koll på om spelet är över eller inte

var turn = 0; //variabel för att hålla koll på rundorna

var AI = false; //om ai är på eller inte

var AIblock = false; //om det är ai:ns tur eller inte

var casual = true;

var roundCount = 0;

var p1Score = 0;
var p2Score = 0;

var goal = 0;


const p1scoreDIV = document.getElementById("p1score");
const p2scoreDIV = document.getElementById("p2score");



//kvar:
//sätta score på sidan och konstant uppdatera
// checka om någon har vunnit

/*
setTimeout(() => {
  Multiplayer();
}, 50)
*/


//skapa spelområdet
function createGame() {
/*
  for (let i = 0; i < width; i++) {
    let x = document.createElement("button");
    x.onclick = () => play(i+1);
    x.innerHTML = "add " + (i + 1);

    document.getElementById("buttonRow").appendChild(x);
  }
  */
  for (let i = 0; i < height * width; i++) {
    let x = document.createElement("div");
    let y = document.createElement("div");

    y.innerHTML = i;

    x.appendChild(y);
    x.className = "gameSquare";
    
    document.getElementById("gameZone").appendChild(x);

    turn = 0;
    gameOver = false;
    if (roundCount % 2 == 0) document.getElementById("buttonRow").className = "redButton";
    else document.getElementById("buttonRow").className = "blueButton";
  }

  console.log("game elements created");
}


function Multiplayer() {

  menuWrapper.classList.add("animOut");

  setTimeout(() => {
    multiplayerWrapper.classList.add("animIn");
    multiplayerWrapper.classList.remove("hidden");
    menuWrapper.classList.add("hidden");
    menuWrapper.classList.remove("animOut");
    setTimeout(() => {
      multiplayerWrapper.classList.remove("animIn");
  
    }, 1050);
  }, 950);

}

function StartMulti() {
  casual = false;
  goal = document.getElementById("countInput").value;
  console.log(goal);

  document.getElementById("goalDiv").innerHTML = "Först till " + goal;

  setTimeout(() => {
    document.getElementById("multiplayerStats").classList.remove("hidden");
    document.getElementById("multiplayerStats").classList.add("animRight");

    setTimeout(() => {
    document.getElementById("multiplayerStats").classList.remove("animRight");
    }, 1000);

  },1000);
  

  StartGame(2);

}


function ContinueMulti() {
  roundCount++;
  roundOverBox.classList.add("hidden");

  gameWrapper.classList.add("animOut");

  setTimeout(() => {
    gameWrapper.classList.add("hidden");
    
    gameWrapper.classList.remove("animOut");
    StartGame(2);

  }, 950);

}


function StartGame(x) {
  document.getElementById("gameZone").innerHTML = "";
  createGame();

  if (x == 1) {
    AI = true;
  } else {
    AI = false;
  }

  menuWrapper.classList.add("animOut");
  multiplayerWrapper.classList.add("animOut");
  

  setTimeout(() => {
    gameWrapper.classList.add("animIn");
    gameWrapper.classList.remove("hidden");
    menuWrapper.classList.add("hidden");
    menuWrapper.classList.remove("animOut");
    multiplayerWrapper.classList.add("hidden");
    multiplayerWrapper.classList.remove("animOut");
    setTimeout(() => {
      gameWrapper.classList.remove("animIn");
  
    }, 1050);
  }, 950);
  
}

function GameOver(winner) {
  console.log("GAAAAME OVER");
  gameOver = true;
  let winTitle = winner.toUpperCase() + "VANN";
  let winMessage = "";
  let winnerSV = "";
  
  document.getElementById("buttonRow").className = "";


  if (winner == "tie") {
    winMessage = "Ingen vann, bruh"
    winTitle = "LIKA";
  } else {
    winMessage = "Bra gjort!";
    if (winner == "red") winnerSV = "röd";
    if (winner == "blue") winnerSV = "blå";
    winTitle = winnerSV.toUpperCase() + " VANN";

  }

  if (AI && winner == "blue") {
    winMessage = ":(";
    winTitle = "DU FÖRLORADE";
  } else if (AI && winner == "red") {
    winTitle = "DU VANN";
  }

  document.getElementById("winTitle").innerHTML = winTitle;
  document.getElementById("winText").innerHTML = winMessage;

  setTimeout(() => {
    winBox.classList.remove("hidden");
  }, 1000);


  

}

function MainMenu() {

  casual = true;

  multiplayerWrapper.classList.add("animOut");
  // winBox.classList.add("animOut");
  winBox.classList.add("hidden");


  setTimeout(() => {
    multiplayerWrapper.classList.add("hidden");
    multiplayerWrapper.classList.remove("animOut");
    // winBox.classList.remove("animOut");
    menuWrapper.classList.add("animIn");

    menuWrapper.classList.remove("hidden");
    setTimeout(() => {
      menuWrapper.classList.remove("animIn");
    }, 1050);

  }, 950);
  
}

function EndGame() {
  gameWrapper.classList.add("animOut");
  // winBox.classList.add("animOut");
  winBox.classList.add("hidden");
  roundOverBox.classList.add("hidden");

  roundCount = 0;
  p1Score = 0;
  p2Score = 0;



  document.getElementById("multiplayerStats").classList.add("animLeft");

  setTimeout(() => {
    document.getElementById("multiplayerStats").classList.add("hidden");
    document.getElementById("multiplayerStats").classList.remove("animLeft");
    p1scoreDIV.innerHTML= "Spelare 1: 0";
    p2scoreDIV.innerHTML = "Spelare 2: 0";

  }, 950);



  casual = true;


  setTimeout(() => {
    gameWrapper.classList.add("hidden");
    gameWrapper.classList.remove("animOut");
    // winBox.classList.remove("animOut");
    menuWrapper.classList.add("animIn");

    menuWrapper.classList.remove("hidden");
    setTimeout(() => {
      menuWrapper.classList.remove("animIn");
    }, 1050);

  }, 950);
  
}


function RoundEnd(winner) {

  console.log("Round over");
  gameOver = true;
  let winTitle = winner.toUpperCase() + "VANN";
  let winMessage = "";
  
  document.getElementById("buttonRow").className = "";



  if (winner == "tie") {
    winMessage = "Ingen vann, bruh"
    winTitle = "LIKA";
  } 
  
  else 
  {
    winMessage = "Bra gjort!";
    if (winner == "red")
    {
      console.log("YEEETASTT");
      p1Score++;
      winTitle = "SPELARE 1 VANN";
    }
    else if (winner == "blue") 
    {
      p2Score++;
      console.log("yayayayayaya");

      winTitle = "SPELARE 2 VANN";
    }
  }

  if (p1Score == goal || p2Score == goal) {
    document.getElementById("continueMultiButton").classList.add("hidden");
  }

  p1scoreDIV.innerHTML = "Spelare 1: " + p1Score;
  p2scoreDIV.innerHTML = "Spelare 2: " + p2Score
  /*
  if (AI && winner == "blue") {
    winMessage = ":(";
    winTitle = "DU FÖRLORADE";
  } else if (AI && winner == "red") {
    winTitle = "DU VANN";
  }
*/
  document.getElementById("winTitle2").innerHTML = winTitle;
  document.getElementById("winText2").innerHTML = winMessage;

  setTimeout(() => {
    roundOverBox.classList.remove("hidden");
  }, 1000);
}



function play(column) {

  if (gameOver) return; //om gameOver är true är spelet över och ingen ska få lägga fler


  if (AIblock && column < 10) return; //yeetar om AI:n väntar på att lägga


  if (column > 10) column -= 10;

  //rensar den gula markeringen så att resten av koden fungerar som den ska
  for (let i = 0; i < document.getElementsByClassName("checked").length;) {
    document.getElementsByClassName("checked")[0].classList.remove("checked");
  }

  //for loop för att lägga rutan
  for (let i = height - 1; i >= 0; i--) {

    let pos = i * width + column - 1;

    //om className är "gameSquare" vet man att den är tom eftersom en fylld ruta skulle ha "gameSquare red" eller "gameSquare blue"
    if (document.getElementsByClassName("gameSquare")[pos].className == "gameSquare") 
    {
      //turn % 2 == 0 är spelare 1 eller röd och % 2 = 1 är spelare 2 är blå
      if ((turn + roundCount % 2) % 2 == 0) 
      {
      document.getElementsByClassName("gameSquare")[pos].classList.add("red");
      } 
      else if ((turn + roundCount % 2) % 2 == 1) {
        document.getElementsByClassName("gameSquare")[pos].classList.add("blue");
      }


      //kollar om någon har vunnit, vilket sätter gameOver variabeln
      HasWon(pos);

      //ökar ökar rundräknaren
      turn++;

      if (gameOver) break;

      //om rund-räknaren når samma värde som mängden totala rutor och gameOver inte stämmer så kommer den att säga att ingen vann
      if (turn == document.getElementsByClassName("gameSquare").length) 
      {
        // gameOver = true;
        if (casual) {
          GameOver("tie");
        } else {
          RoundEnd("tie");
        }
        console.log("issa tie bruh");
        //document.getElementById("longest").innerHTML = "ingen vann, game over";
      }


      //viktig break som bryter for-loopen om den hittar en tom ruta
      break;

    }

  }


  if (gameOver) return;

  if ((turn + roundCount % 2) % 2 == 0) {
    document.getElementById("buttonRow").className = "redButton";
  } else {
    document.getElementById("buttonRow").className = "blueButton";

  }

  if (AI && turn % 2 == 1) {
    AIblock = true;

    let AItimer = (Math.random() + 1) * 1000;
    
    setTimeout(() => {
      ai();
      AIblock = false;
    }, AItimer);
    
  }

}


function HasWon(pos) {

  let board = document.getElementsByClassName("gameSquare");

  // console.log(board[pos].classList);
  // console.log(board[pos].classList[1]);

  // console.log(turn % 2);

  //tom variabel
  let p = "";

  if ((turn + roundCount % 2) % 2  == 0) {
    p = "red";
  } else {
    p = "blue";
  }

  // console.log(p);

  // console.log(board[pos]);

  // console.log(board[pos].classList);



  p = board[pos].classList[1];



  //array som bara innehåller antal korrekta i varje riktning "winDirection"
  let winDir = [0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < winPos.length; i++) //for loop som går igenom alla winPos för att kolla i alla riktningar
  {

    for (let j = 0; j < winPos[i].length; j++) //ytterligare for loop som kollar varje riktning
    {

      //variabel för att slippa räkna ut varje gång senare
      let checkPos = pos + winPos[i][j];

      //block nedan kollar efter att den inte är helt ute och cyklar när den letar
      //dvs att om den är för nära en kant så skulle en horisontell eller diagnoal hoppa till fel kolumn och rad

      if (checkPos >= board.length || checkPos < 0) { //kollar om positionen den letar efter är utanför spelytan och går direkt till nästa i
        break;
      } 
      else if ((i == 0 || i == 4)&& Math.floor(checkPos / 7) != Math.floor(pos / 7)) //om de horisontella rutorna inte är på rätt rad avbryter den 
      {
        // console.log("AAAAAAAAAA " + i + " " + j );
        break;
      }
      else if (i != 0 && i != 4 && Math.abs(Math.floor(pos / 7) - Math.floor(checkPos / 7)) != j + 1) //om skillnaden i rader inte är korrekt avbryter den
      {
        break;
      }

      //lägger till den gula markeringen för att berätta att den checkar en ruta
      // board[checkPos].classList.add("checked"); AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

      //kollar om rutan den checkar har samma färg som rutan man precis placerade
      if (board[checkPos].classList[1] == p) 
      {
        // console.log("ya yeet");
        winDir[i]++;
      } 
      else 
      {
        break;
      }
    }
  }


  let longest = 0; //variabel för att se vad den längsta axeln är 

  for (let i = 0; i < 4; i++) {
    let length = winDir[i] + winDir[i + 4] + 1;
    if (length > longest) {
      longest = length;
    }
    
    //om längden är 4 eller mer, dvs det finns 4 i rad någonstans, så kommer den kasta skiten i luften och säga att någon vann
    if (length >= 4) {
      

      // gameOver = true;
      console.log("game over " + p + " won");
      
      if (casual) {
        GameOver(p);
      } else {
        RoundEnd(p);
      }

      break;
      
    }
  }

  //debug sak som låter mig se den längsta varje runda
  //document.getElementById("longest").innerHTML = longest;


  if (gameOver) 
  {
    // document.getElementById("longest").innerHTML = p + " won";
  }


}


//lägg till unfavourable variabel, om längden < 6 - height eller nåt 


function ai() {
  let board = document.getElementsByClassName("gameSquare");

  // console.log(board[pos].classList);
  // console.log(board[pos].classList[1]);

  // console.log(turn % 2);

  //tom variabel
  let p = "";
  let n = "";

  let counter = -1;

  let longestcol = 0; //variabel för den kolumn med längst streak
  let longestcolx = 0; //variabel för längden i longestcol

  if ((turn + roundCount % 2 ) % 2 == 0) {
    p = "red";
    n = "blue";
  } else {
    p = "blue";
    n = "red";
  }

  let checkCol = 0;

  for (let z = 0; z < width; z++) { //loopar genom alla kolumner
    let pos = 0;

    checkCol = aiCheck[z];


    for (let i = height - 1; i >= 0; i--) { //hittar högsta fria position i varje kolumn

      pos = i * width + checkCol; 

      console.log(z + ": " + pos);

      if (board[pos].className == "gameSquare") { //kollar om positionen den hittade är tom
        break; //om den är det så går den vidare till nästa
      } 
      
    
    }

    if (board[pos].className != "gameSquare") { //om den valda positionen inte är tom, eftersom loopen inte kan kolla om den är utanför
      continue;
    }

    //kör en koll på längsta härifrån

    

    let winDir = [0, 0, 0, 0, 0, 0, 0, 0];
    let wrongDir = [0, 0, 0, 0, 0, 0, 0, 0];

    let a = true;
    let b = true;

    
    for (let i = 0; i < winPos.length; i++) //for loop som går igenom alla winPos för att kolla i alla riktningar
    {

      a = true; //variabler som kontrollerar om den kollar rätt eller fel färg
      b = true;
      

      //ytterligare for loop som kollar varje riktning
      for (let j = 0; j < winPos[i].length; j++) 
      {
        

        
        let checkPos = pos + winPos[i][j]; //variabel för att slippa räkna ut checkPos varje gång


        //block nedan kollar efter att den inte är helt ute och cyklar när den letar
        //dvs att om den är för nära en kant så skulle en horisontell eller diagnoal hoppa till fel kolumn och rad

        if (checkPos >= board.length || checkPos < 0) { //kollar om positionen den letar efter är utanför spelytan och går direkt till nästa i
          break;
        } 
        else if ((i == 0 || i == 4)&& Math.floor(checkPos / 7) != Math.floor(pos / 7)) //om de horisontella rutorna inte är på rätt rad avbryter den 
        {
          // console.log("AAAAAAAAAA " + i + " " + j )
          break;
        }
        else if (i != 0 && i != 4 && Math.abs(Math.floor(pos / 7) - Math.floor(checkPos / 7)) != j + 1) //om skillnaden i rader inte är korrekt avbryter den
        {
          break;
        }

        //lägger till den gula markeringen för att berätta att den checkar en ruta
        // board[checkPos].classList.add("checked"); AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

        //kollar om rutan den checkar har samma färg som rutan man precis placerade
        if (board[checkPos].classList[1] == p && a) 
        {
          // console.log("ya yeet");
          winDir[i]++;
          b = false;
        } 
        else if (board[checkPos].classList[1] == n && b) {
          wrongDir[i]++;
          a = false;
        }
        else 
        {
          break;
        }
      }
    }

    let longest = 0; //variabel för att se vad den längsta axeln är 

    for (let i = 0; i < 4; i++) {
      let length = winDir[i] + winDir[i + 4] + 1;
      if (length > longest) {
        longest = length;
        
        // console.log("longest/length " + longest + " " + length);
      }

      if (length >= 4) {
        play(aiCheck[z] + 11);
        console.log(p + " " + (aiCheck[z] + 1) + " WIN");
        return;
      }
      
 
      
    }

    let nlongest = 0;

    for (let i = 0; i < 4; i++) {
      let length = wrongDir[i] + wrongDir[i + 4] + 1;
      if (length > nlongest) {
        nlongest = length;
      }

      if (length >= 4) {
        counter = aiCheck[z] + 1;
      }
      
        //lägg till counterlength
      
    }
    
    if (longestcolx < longest) 
    {
      longestcol = aiCheck[z] + 1;
      longestcolx = longest;
    }

    if (turn < 2) {
      play (Math.floor(Math.random() * 3) + 13);
      return;
    }






    // console.log("col: " + z + " pos: " + pos + " longest: " + longest + " longest2: " + nlongest + " color: " + p + " longest column:" + longestcol);


  }
  if (counter != -1) {
    play(counter + 10);
    console.log(p + " " + counter + " BLOCK")
  } else {
    play(longestcol + 10);
    console.log(p + " " + longestcol + " LONGEST");
  }
  

//ai lägger där den inte borde, lägger på ställe med 1 istället för ställe med 2

}


/*



SAKER SOM KAN FÖRBÄTTRAS:

göra så att den inte ser longest om det inte går att läga 4, dvs att den är för när en kant, uppe borde vara lätt

göra så att det finns en funktion som letar upp det ideella stället att placera på, reukrsion blir möjligt






grid areas





hur ska ai fungera?

kan någon vinna direkt?

kolla igenom och se vilken position som skulle ge längst radda?

kolla sedan igenom varje position igen för att se om det går att göra den längre?
kanske försöka se om motståndaren kan blockera och ta den där det finns minst som moståndaren kan stoppa






går det att vinna direkt?       -lägg om longest = 3
  sätt där man vinner

kan moståndaren vinna direkt?    -lägg om longest = 3
  placera så att motståndaren inte kan vinna

hitta den längsta streaken man har där man kan lägga och lägg där - leta största longest och lägg


*/