document.addEventListener('DOMContentLoaded', () => {
    const userGrid = document.querySelector('.grid-user')
    const userGridOverlay = document.querySelector('.grid-user-overlay')
    const computerGridOverlay = document.querySelector('.grid-computer-overlay')
    const computerGrid = document.querySelector('.grid-computer')
    const displayGrid = document.querySelector('.grid-display')
    const ships = document.querySelectorAll('.ship')
    const small1 = document.querySelector('.small1-container')
    const small2 = document.querySelector('.small2-container')
    const small3 = document.querySelector('.small3-container')
    const small4 = document.querySelector('.small4-container')
    const mid1 = document.querySelector('.mid1-container')
    const mid2 = document.querySelector('.mid2-container')
    const mid3 = document.querySelector('.mid3-container')
    const big1 = document.querySelector('.big1-container')
    const big2 = document.querySelector('.big2-container')
    const huge = document.querySelector('.huge-container')
    const startButton = document.querySelector('#start')
    const rotateButton = document.querySelector('#rotate')
    const resetButton = document.querySelector('#reset')
    const turnDisplay = document.querySelector('#whose-go')
    const infoDisplay = document.querySelector('#info')
    const submitButton = document.querySelector('#submitButton')
    const usname = document.querySelector('#UserName')
    const labelForName = document.querySelector('#labelForInput')
    const PcShipsInfo = document.querySelector('#PcInfo')
    const UserShipsInfo = document.querySelector('#yourInfo')
    const sendButton = document.querySelector('#sendButton')
    const yourMessage = document.querySelector('#msg')
    const messageBox = document.getElementById("messageBoard")
    const messageinput = document.getElementById("messageInput")
    const playButton = document.getElementById("playAgain")
    const smallships = document.querySelector('.small')
    const mediumships = document.querySelector('.medium')
    const bigships = document.querySelector('.big')
    const hugeships = document.querySelector('.veryBig')
    const userSquares = []
    const userGridOverlaySquares = []
    const computerGridOverlaySquares = []
    const computerSquares = []
    let isHorizontal = true
    let isGameOver = false
    let currentPlayer = 'None'
    const width = 10
    var name = "";
    let shotFired = -1
    let numOfPcShipsLeft = 0;
    let numOfUserShipsLeft = 0;
  
   

    submitButton.addEventListener('click', getInputValue);
    resetButton.addEventListener('click', resetGame);
    sendButton.addEventListener('click', sendMessage);

    function sendMessage(){

      const one_message = document.createElement('div')
      one_message.className = 'oneMessage'


      messageBox.appendChild(one_message)

      ms = name + ": " 
      ms2 = yourMessage.value;
      var message = document.createTextNode(ms);
      var message2 = document.createTextNode(ms2);
      const text = document.createElement('p')
      const text2 = document.createElement('p')
      text.className = 'textMessage';
      text2.className = 'textMessage2';
      text.appendChild(message);
      text2.appendChild(message2);
      one_message.appendChild(text)
      one_message.appendChild(text2)

      messageBox.insertBefore(one_message, messageBox.firstChild);;
      msg.value = "";

    }


    function getInputValue(){
      name = document.getElementById("UserName").value; 
      document.getElementById("UserName").value = "";
      document.getElementById("yourName").innerHTML = name;
        usname.hidden = true;
        submitButton.hidden = true;
        labelForName.hidden = true;
      if(numOfPcShipsLeft === 10 && numOfUserShipsLeft === 10){
        rotateButton.hidden = true;
        startButton.hidden = false;
        rotateButton.disabled = true;
        startButton.disabled = false;
      }
    }

    // function resetGame(){
    //   location.reload();
    // }

 function resetGame(){
      sendButton.disabled = true;
      if(!isHorizontal) rotate();
      currentPlayer = 'None'
      isGameOver = false;
      numOfPcShipsLeft = 0;
      numOfUserShipsLeft = 0;

      
      var list = document.getElementById("messageBoard"); 
      var k = list.childNodes.length;
      while(k>0){
        list.removeChild(list.childNodes[0]);
        k--;
      }

      for(var i=0; i<userSquares.length; i++){
        userSquares[i].className = 'square' ;
       }
       for(var i=0; i<computerSquares.length; i++){
         computerSquares[i].className = 'square' ;
       }

       rotateButton.hidden = false;
       sendButton.disabled = true;
       messageinput.hidden = true;
       messageBox.hidden = true;
       playButton.disabled = true;
       playButton.hidden = true;

      name = "";
      document.getElementById("yourName").innerHTML = name;
      usname.hidden = false;
      submitButton.hidden = false;
      labelForName.hidden = false;
      rotateButton.disabled = false;
      turnDisplay.hidden = true ;
      UserShipsInfo.innerHTML = "";
      PcShipsInfo.innerHTML = "";
      infoDisplay.innerHTML = "";

      small1Count = 0
      small2Count = 0
      small3Count = 0
      small4Count = 0
      mid1Count = 0
      mid2Count = 0
      mid3Count = 0
      big1Count = 0
      big2Count = 0
      hugeCount = 0

      PCsmall1Count = 0
      PCsmall2Count = 0
      PCsmall3Count = 0
      PCsmall4Count = 0
      PCmid1Count = 0
      PCmid2Count = 0
      PCmid3Count = 0
      PCbig1Count = 0
      PCbig2Count = 0
      PChugeCount = 0

      if(!hugeships.contains(huge)) hugeships.appendChild(huge);
      if(!bigships.contains(big2)) bigships.appendChild(big2);
      if(!bigships.contains(big1)) bigships.insertBefore(big1, big2);
      if(!mediumships.contains(mid3)) mediumships.appendChild(mid3);
      if(!mediumships.contains(mid2)) mediumships.insertBefore(mid2, mid3);
      if(!mediumships.contains(mid1)) mediumships.insertBefore(mid1, mid2);
      if(!smallships.contains(small4)) smallships.appendChild(small4);
      if(!smallships.contains(small3)) smallships.insertBefore(small3, small4);
      if(!smallships.contains(small2)) smallships.insertBefore(small2, small3);
      if(!smallships.contains(small1)) smallships.insertBefore(small1, smallships.firstChild);

      startSinglePlayer()
    }

    // Single Player
    function startSinglePlayer() {
  
      generate(shipArray[9])
      generate(shipArray[8])
      generate(shipArray[7])
      generate(shipArray[6])
      generate(shipArray[5])
      generate(shipArray[4])
      generate(shipArray[3])
      generate(shipArray[2])
      generate(shipArray[1])
      generate(shipArray[0])

      startButton.addEventListener('click', startGame)
    }

    function createBoardDisplay(grid, squares) {
      for (let i = 0; i < (width+1)*(width+1); i++) {
        const square = document.createElement('div')
        square.className = 'square-overlay'
        square.dataset.id = i
        grid.appendChild(square)
        squares.push(square)
      }
      var textA = document.createTextNode ('A');
      var textB = document.createTextNode ('B');
      var textC = document.createTextNode ('C');
      var textD = document.createTextNode ('D');
      var textE = document.createTextNode ('E');
      var textF = document.createTextNode ('F');
      var textG = document.createTextNode ('G');
      var textH = document.createTextNode ('H');
      var textI = document.createTextNode ('I');
      var textJ = document.createTextNode ('J');

      var text1 = document.createTextNode ('1');
      var text2 = document.createTextNode ('2');
      var text3 = document.createTextNode ('3');
      var text4 = document.createTextNode ('4');
      var text5 = document.createTextNode ('5');
      var text6 = document.createTextNode ('6');
      var text7 = document.createTextNode ('7');
      var text8 = document.createTextNode ('8');
      var text9 = document.createTextNode ('9');
      var text10 = document.createTextNode ('10');

      squares[1].appendChild(textA);
      squares[2].appendChild(textB);
      squares[3].appendChild(textC);
      squares[4].appendChild(textD);
      squares[5].appendChild(textE);
      squares[6].appendChild(textF);
      squares[7].appendChild(textG);
      squares[8].appendChild(textH);
      squares[9].appendChild(textI);
      squares[10].appendChild(textJ);

      squares[11].appendChild(text1);
      squares[22].appendChild(text2);
      squares[33].appendChild(text3);
      squares[44].appendChild(text4);
      squares[55].appendChild(text5);
      squares[66].appendChild(text6);
      squares[77].appendChild(text7);
      squares[88].appendChild(text8);
      squares[99].appendChild(text9);
      squares[110].appendChild(text10);
    }

    //Create Board
    function createBoard(grid, squares) {
      for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        square.className = 'square'
        square.dataset.id = i
        grid.appendChild(square)
        squares.push(square)
      }
    }
    createBoard(userGrid, userSquares)

    createBoardDisplay(userGridOverlay, userGridOverlaySquares)

    createBoard(computerGrid, computerSquares)

    createBoardDisplay(computerGridOverlay, computerGridOverlaySquares)
    

    //Ships
    const shipArray = [
      {
        name: 'small1',
        directions: [
          [0],
          [0]
        ]
      },
      {
        name: 'small2',
        directions: [
          [0],
          [0]
        ]
      },
      {
        name: 'small3',
        directions: [
          [0],
          [0]
        ]
      },
      {
        name: 'small4',
        directions: [
          [0],
          [0]
        ]
      },
      {
        name: 'mid1',
        directions: [
          [0, 1],
          [0, width]
        ]
      },
      {
        name: 'mid2',
        directions: [
          [0, 1],
          [0, width]
        ]
      },
      {
        name: 'mid3',
        directions: [
          [0, 1],
          [0, width]
        ]
      },
      {
        name: 'big1',
        directions: [
          [0, 1, 2],
          [0, width, width*2]
        ]
      },
      {
        name: 'big2',
        directions: [
          [0, 1, 2],
          [0, width, width*2]
        ]
      },
      {
        name: 'huge',
        directions: [
          [0, 1, 2, 3],
          [0, width, width*2, width*3]
        ]
      },
    ]

    //Draw the computers ships in random locations
    function generate(ship) {
       let randomDirection = Math.floor(Math.random() * ship.directions.length)
      let current = ship.directions[randomDirection]
      if (randomDirection === 0) direction = 1
      if (randomDirection === 1) direction = 10
      let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))
  
      const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
      var isGoodLocation = shipLocationVerification(current, randomStart, randomDirection, computerSquares)
    
      if (!isTaken && isGoodLocation){ current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))
      numOfPcShipsLeft++;
    }
      else generate(ship)
    
    }
    
    function shipLocationVerification(ship,start, direction, squares){
      var shipBeg = ship[0] + start;
      var shipEnd = ship[ship.length - 1] + start

      if(shipBeg > 99 | shipBeg < 0) return false // Iseina uz ribu
      if(shipEnd > 99 | shipEnd < 0) return false // Iseina uz ribu

      if(direction == 0){
        var shipBeginning = Math.floor(shipBeg / 10);
        var shipEnding = Math.floor(shipEnd / 10);
        if(shipBeginning != shipEnding) return false;
      }
      
      
      for (let i = 0; i < ship.length; i++){

        var coordinate = ship[i]

        if(!shipCoordinateBlockVerification(start + coordinate - 10, squares, start)) return  false;
        if(!shipCoordinateBlockVerification(start + coordinate + 10, squares, start)) return false;

        if(!shipCoordinateBlockVerification(start + coordinate - 11, squares, start) 
        && (((start + coordinate - 11) % 10) != 9)) return false;

        if(!shipCoordinateBlockVerification(start + coordinate + 9, squares, start) 
        && (((start + coordinate + 9) % 10) != 9)) return false;
        
        if(!shipCoordinateBlockVerification(start + coordinate - 1, squares, start) 
        && (((start + coordinate - 1) % 10) != 9)) return false;


        if(!shipCoordinateBlockVerification(start + coordinate + 11, squares, start) 
        && (((start + coordinate + 11) % 10) != 0)) return false;
      
        if(!shipCoordinateBlockVerification(start + coordinate + 1, squares, start) 
        && (((start + coordinate + 1) % 10) != 0)) return false;

        if(!shipCoordinateBlockVerification(start + coordinate - 9, squares, start) 
        && (((start + coordinate - 9) % 10) != 0)) return false;

      }
      return true;

    }
    function shipCoordinateBlockVerification(coordinates, squares, start)
    {
      if(coordinates < 0) return true;
      if(coordinates > 99) return true;
      if(squares[coordinates].classList.contains('taken'))return false;

      return true
    }
    //Rotate the ships
    function rotate() {
      small1.classList.toggle('small1-vertical')
      small2.classList.toggle('small2-vertical')
      small3.classList.toggle('small3-vertical')
      small4.classList.toggle('small4-vertical')
      mid1.classList.toggle('mid1-vertical')
      mid2.classList.toggle('mid2-vertical')
      mid3.classList.toggle('mid3-vertical')
      big1.classList.toggle('big1-vertical')
      big2.classList.toggle('big2-vertical')
      huge.classList.toggle('huge-vertical')

      if (isHorizontal) {
        isHorizontal = false
        // console.log(isHorizontal)
        return
      }
      if (!isHorizontal) {
        isHorizontal = true
        // console.log(isHorizontal)
        return
      }
    }
    rotateButton.addEventListener('click', rotate)
  
    //move around user ship
    ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragover', dragOver))
    userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
    userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
    userSquares.forEach(square => square.addEventListener('drop', dragDrop))
    userSquares.forEach(square => square.addEventListener('dragend', dragEnd))

    //For User Shooting
    computerSquares.forEach(square => square.addEventListener('click', function(e) {
      if(currentPlayer === 'user'){
        shotFired = square.dataset.id
        revealSquare(square.classList)
      }
    }))
  
    let selectedShipNameWithIndex
    let draggedShip
    let draggedShipLength
  
    ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
      selectedShipNameWithIndex = e.target.id
    }))
  
    function dragStart() {
      draggedShip = this
      draggedShipLength = this.childNodes.length
     // console.log(draggedShip)
    }
  
    function dragOver(e) {
      e.preventDefault()
    }
  
    function dragEnter(e) {
      e.preventDefault()
    }
  
    function dragLeave() {
    }
  
    function dragDrop() {
      let shipNameWithLastId = draggedShip.lastChild.id
      let shipClass = shipNameWithLastId.slice(0, -2)
      let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
      let shipLastId = lastShipIndex + parseInt(this.dataset.id)

      selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
  
      shipLastId = shipLastId - selectedShipIndex

      var direction;
      if (isHorizontal) direction = 0
      else direction = 1

      var selectedShipFromArray = shipArray.find( item => item.name == shipClass);
      
      shipFirstCoordinates = parseInt(this.dataset.id) - selectedShipIndex + 0;
      var locationValid = shipLocationVerification(selectedShipFromArray.directions[direction], shipFirstCoordinates, direction ,userSquares)

        
   // if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      if (isHorizontal && locationValid) {
        numOfUserShipsLeft++;
        for (let i=0; i < draggedShipLength; i++) {
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', shipClass)
        }
      } else if (!isHorizontal && locationValid) {
        numOfUserShipsLeft++;
        for (let i=0; i < draggedShipLength; i++) {
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', shipClass)
        }
      } else return
      console.log(numOfUserShipsLeft)

      if(numOfUserShipsLeft !== 10 && name === "") {
        startButton.disabled = true;
        rotateButton.disabled = false;
      }

      else if(numOfUserShipsLeft === 10 && name === ""){
        startButton.disabled = true;
        rotateButton.disabled = true;
      }

      else if(numOfUserShipsLeft === 10 && name !== ""){
        startButton.disabled = false;
        startButton.hidden = false;
        rotateButton.disabled = true;
        rotateButton.hidden = true;
      }


      if(smallships.contains(draggedShip)){ smallships.removeChild(draggedShip)}
      if(mediumships.contains(draggedShip)){mediumships.removeChild(draggedShip)}
      if(bigships.contains(draggedShip)){bigships.removeChild(draggedShip)}
      if(hugeships.contains(draggedShip)){ hugeships.removeChild(draggedShip)}
     
    }
  
    function dragEnd() {
      // console.log('dragend')
    }
  

    let small1Count = 0
    let small2Count = 0
    let small3Count = 0
    let small4Count = 0
    let mid1Count = 0
    let mid2Count = 0
    let mid3Count = 0
    let big1Count = 0
    let big2Count = 0
    let hugeCount = 0
  
    // Game Logic for Single Player
    function startGame(){
      sendButton.disabled = false;
      messageinput.hidden = false;
      messageBox.hidden = false;
      rotateButton.hidden = true;
      startButton.hidden = true;
      UserShipsInfo.innerHTML = 'You have ' + numOfUserShipsLeft + ' ships'
      PcShipsInfo.innerHTML = 'Computer has ' + numOfPcShipsLeft + ' ships'
      currentPlayer = 'user'
      playGameSingle();
    }

    function playGameSingle() {
      startButton.disabled = true;
      if (isGameOver) return  
      if (currentPlayer === 'user') {
        turnDisplay.innerHTML = 'Your Go'
        turnDisplay.hidden = false;
      }
      if (currentPlayer === 'enemy') {
        turnDisplay.innerHTML = 'Computers Go'
        turnDisplay.hidden = false;
        setTimeout(enemyGo, 1000)
      }
    }

    function revealSquare(classList) {
      const enemySquare = computerGrid.querySelector(`div[data-id='${shotFired}']`)
      const obj = Object.values(classList)
      if (!enemySquare.classList.contains('boom') && currentPlayer === 'user' && !isGameOver && !enemySquare.classList.contains('miss')) {
        if (obj.includes('small1')) small1Count++
        if (obj.includes('small2')) small2Count++
        if (obj.includes('small3')) small3Count++
        if (obj.includes('small4')) small4Count++
        if (obj.includes('mid1')) mid1Count++
        if (obj.includes('mid2')) mid2Count++
        if (obj.includes('mid3')) mid3Count++
        if (obj.includes('big1')) big1Count++
        if (obj.includes('big2')) big2Count++
        if (obj.includes('huge')) hugeCount++

        if (obj.includes('taken')) {
          enemySquare.classList.add('boom')
          infoDisplay.innerHTML = ``
          currentPlayer = 'user'
        } else {
          enemySquare.classList.add('miss')
          infoDisplay.innerHTML = ``
          currentPlayer = 'enemy'
        }
        checkForWins()
        playGameSingle()
      }
      
    }
  

    let PCsmall1Count = 0
    let PCsmall2Count = 0
    let PCsmall3Count = 0
    let PCsmall4Count = 0
    let PCmid1Count = 0
    let PCmid2Count = 0
    let PCmid3Count = 0
    let PCbig1Count = 0
    let PCbig2Count = 0
    let PChugeCount = 0
  
    function enemyGo(square) {
      square = Math.floor(Math.random() * userSquares.length)
      if (!userSquares[square].classList.contains('boom') && !userSquares[square].classList.contains('miss')) {
        //userSquares[square].classList.add('boom')

        if (userSquares[square].classList.contains('small1')) PCsmall1Count++
        if (userSquares[square].classList.contains('small2')) PCsmall2Count++
        if (userSquares[square].classList.contains('small3')) PCsmall3Count++
        if (userSquares[square].classList.contains('small4')) PCsmall4Count++
        if (userSquares[square].classList.contains('mid1')) PCmid1Count++
        if (userSquares[square].classList.contains('mid2')) PCmid2Count++
        if (userSquares[square].classList.contains('mid3')) PCmid3Count++
        if (userSquares[square].classList.contains('big1')) PCbig1Count++
        if (userSquares[square].classList.contains('big2')) PCbig2Count++
        if (userSquares[square].classList.contains('huge')) PChugeCount++

        if (userSquares[square].classList.contains('taken')) {
          userSquares[square].classList.add('boom')
          currentPlayer = 'enemy'
          infoDisplay.innerHTML = ``
          checkForWins()
          if(!isGameOver){
            setTimeout(enemyGo, 1000)
          }
          
        } else {
          userSquares[square].classList.add('miss')
          currentPlayer = 'user'
          infoDisplay.innerHTML = ``
          turnDisplay.innerHTML = 'Your Go'
        }

        checkForWins()
        //currentPlayer = 'enemy'
      } else enemyGo()

    }
  
    function checkForWins() {
      let enemy = 'computer'
      if (small1Count === 1 || small2Count === 1 || small3Count === 1 || small4Count === 1
       || mid1Count === 2 || mid2Count === 2 || mid3Count === 2 || big1Count === 3 || big2Count === 3 || hugeCount === 4) {
        infoDisplay.innerHTML = `You sunk ${enemy}'s ship`
        numOfPcShipsLeft--;
        PcShipsInfo.innerHTML = 'Computer has ' + numOfPcShipsLeft + ' ships left'
        if(small1Count === 1) small1Count = 10
        if(small2Count === 1) small2Count = 10
        if(small3Count === 1) small3Count = 10
        if(small4Count === 1) small4Count = 10
        if(mid1Count === 2) mid1Count = 10
        if(mid2Count === 2) mid2Count = 10
        if(mid3Count === 2) mid3Count = 10
        if(big1Count === 3) big1Count = 10
        if(big2Count === 3) big2Count = 10
        if(hugeCount === 4)  hugeCount = 10
      }

      if (PCsmall1Count === 1 || PCsmall2Count === 1 || PCsmall3Count === 1 || PCsmall4Count === 1
        || PCmid1Count === 2 || PCmid2Count === 2 || PCmid3Count === 2 || PCbig1Count === 3 || PCbig2Count === 3 || PChugeCount === 4) {
          infoDisplay.innerHTML = `${enemy} sunk your ship`
          numOfUserShipsLeft--;
          UserShipsInfo.innerHTML = 'You have ' + numOfUserShipsLeft + ' ships left'
          if(PCsmall1Count === 1) PCsmall1Count = 10
          if(PCsmall2Count === 1) PCsmall2Count = 10
          if(PCsmall3Count === 1) PCsmall3Count = 10
          if(PCsmall4Count === 1) PCsmall4Count = 10
          if(PCmid1Count === 2) PCmid1Count = 10
          if(PCmid2Count === 2) PCmid2Count = 10
          if(PCmid3Count === 2) PCmid3Count = 10
          if(PCbig1Count === 3) PCbig1Count = 10
          if(PCbig2Count === 3) PCbig2Count = 10
          if(PChugeCount === 4)  PChugeCount = 10
        }

      if ((small1Count + small2Count + small3Count + small4Count + mid1Count + mid2Count + mid3Count + big1Count + big2Count + hugeCount) === 100) {
        infoDisplay.innerHTML = name + " WON"
        gameOver()
      }
      if ((PCsmall1Count + PCsmall2Count + PCsmall3Count + PCsmall4Count + PCmid1Count + PCmid2Count + PCmid3Count + PCbig1Count + PCbig2Count + PChugeCount) === 100) {
        infoDisplay.innerHTML = `${enemy.toUpperCase()} WON`
        gameOver()
      }
    }
  
    function gameOver() {
      isGameOver = true
      turnDisplay.hidden = true;
      playButton.disabled = false;
      playButton.hidden = false;
      playButton.addEventListener('click', resetGame)
      startButton.removeEventListener('click', resetGame)
      
    }
    startSinglePlayer()
})