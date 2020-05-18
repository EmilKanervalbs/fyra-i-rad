

//variabler för att hålla höjd, just nu går endast 6 och 7 pga dålig css

var height = 6;
var width = 7;


const menu = document.getElementById("menuWrapper");
const gameWrapper = document.getElementById("gameWrapper"); 
const winBox = document.getElementById("winBox");



//förbestämda positioner man ska kolla för att se om någon har vunnit
const winPos = [[-1, -2, -3], [-8, -16, -24], [-7, -14, -21], [-6, -12, -18], [1, 2, 3], [8, 16, 24], [7, 14, 21], [6, 12, 18]];

//sätta variabler

var gameOver = false;

var turn = 0; //variabel för att hålla koll på rundorna

var AI = false;

var AIblock = false;


// ok gör så att ai lägger till 10 så den vet att man ska igga skiten


// createGame();

// startGame(2);

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
  }

  console.log("game elements created");
}



function startGame(x) {
  document.getElementById("gameZone").innerHTML = "";
  createGame();

  if (x == 1) {
    AI = true;
  } else {
    AI = false;
  }

  menuWrapper.classList.add("hidden");
  gameWrapper.classList.remove("hidden");

}

function GameOver(winner) {
  console.log("GAAAAME OVER");
  gameOver = true;
  let winTitle = winner.toUpperCase() + " won";
  let winMessage = "";

  if (winner == "tie") {
    winMessage = "No one won, bruh"
    winTitle = "TIE";
  } else {
    winMessage = "Congrats!";
    winTitle = winner.toUpperCase() + " WON";

  }

  document.getElementById("winTitle").innerHTML = winTitle;
  document.getElementById("winText").innerHTML = winMessage;

  winBox.classList.remove("hidden");
  

}


function endGame() {
  gameWrapper.classList.add("hidden");
  menuWrapper.classList.remove("hidden");
  winBox.classList.add("hidden");
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
      if (turn % 2 == 0) 
      {
      document.getElementsByClassName("gameSquare")[pos].classList.add("red");
      } 
      else if (turn % 2 == 1) {
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
        GameOver("tie");
        console.log("issa tie bruh");
        //document.getElementById("longest").innerHTML = "ingen vann, game over";
      }


      //viktig break som bryter for-loopen om den hittar en tom ruta
      break;

    }

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

  if (turn % 2 == 0) {
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

  //for loop som går igenom alla winPos för att kolla i alla riktningar
  for (let i = 0; i < winPos.length; i++) 
  {
    // console.log(winPos[i].length);

    //ytterligare for loop som kollar varje riktning
    for (let j = 0; j < winPos[i].length; j++) 
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
      
      GameOver(p);

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

  if (turn % 2 == 0) {
    p = "red";
    n = "blue";
  } else {
    p = "blue";
    n = "red";
  }


  for (let z = 0; z < width; z++) { //loopar genom alla kolumner
    let pos = 0;

    for (let i = height - 1; i >= 0; i--) { //hittar högsta fria position i varje kolumn

      pos = i * width + z; 

      if (board[pos].className == "gameSquare") { //kollar om positionen den hittade är tom
        break; //om den är det så går den vidare till nästa
      } 
      
    
    }

    if (board[pos].className != "gameSquare") { //om den valda positionen inte är tom, eftersom loopen inte kan ge resultat
      continue;
    }

    //kör en koll på längsta härifrån

    

    let winDir = [0, 0, 0, 0, 0, 0, 0, 0];
    let wrongDir = [0, 0, 0, 0, 0, 0, 0, 0];

    let a = true;
    let b = true;

    //for loop som går igenom alla winPos för att kolla i alla riktningar
    for (let i = 0; i < winPos.length; i++) 
    {
      a = true; //variabler som kontrollerar om den kollar rätt eller fel färg
      b = true;
      // console.log(winPos[i].length);

      //ytterligare for loop som kollar varje riktning
      for (let j = 0; j < winPos[i].length; j++) 
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
        play(z + 11);
        console.log(p + " " + z + 1 + " WIN");
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
        counter = z + 1;
      }
      
        //lägg till counterlength
      
    }
    
    if (longestcolx < longest) 
    {
      longestcol = z + 1;
      longestcolx = longest;
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


gör så att det är rött eller blått i multiplayer där uppe och att när man hovrar så går det ner.



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