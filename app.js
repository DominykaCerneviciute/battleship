document.addEventListener('DOMContentLoaded', () => {
    const userGrid = document.querySelector('.grid-user')
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
    const userSquares = []
    const computerSquares = []
    let isHorizontal = true
    let isGameOver = false
    let currentPlayer = 'None'
    const width = 10
    let gameMode = ""
    var name = "";
    let playerNum = 0
    let ready = false
    let enemyReady = false
    let allShipsPlaced = false
    let shotFired = -1
    let numOfPcShipsLeft = 0;
    let numOfUserShipsLeft = 0;
  
    console.log(userGrid)
    // Select Player Mode

    submitButton.addEventListener('click', getInputValue);
    resetButton.addEventListener('click', resetGame);

    function getInputValue(){
      name = document.getElementById("UserName").value; 
      document.getElementById("UserName").value = "";
      document.getElementById("yourName").innerHTML = name;
        usname.hidden = true;
        submitButton.hidden = true;
        labelForName.hidden = true;
      if(numOfPcShipsLeft === 10 && numOfUserShipsLeft === 10){
        rotateButton.disabled = true;
        startButton.disabled = false;

      }

    }

    // function resetGame(){
    //   location.reload();
    // }

 function resetGame(){
      currentPlayer = 'None'
      numOfPcShipsLeft = 0;
      numOfUserShipsLeft = 0;
      for(var i=0; i<userSquares.length; i++){
        userSquares[i].className = 'square' ;
       }
       for(var i=0; i<computerSquares.length; i++){
         computerSquares[i].className = 'square' ;
       }
      // createBoard(userGrid, userSquares)
      // createBoard(computerGrid, computerSquares)
      name = "";
      document.getElementById("yourName").innerHTML = name;
      usname.hidden = false;
      submitButton.hidden = false;
      labelForName.hidden = false;
      displayGrid = document.querySelector('.grid-display')
      startSinglePlayer()

    }

    // Single Player
    function startSinglePlayer() {
      gameMode = "singlePlayer"
  
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
    createBoard(computerGrid, computerSquares)
  
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



      //shipLocationVerification()
        
   // if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      if (isHorizontal && locationValid) {
        numOfUserShipsLeft++;
        for (let i=0; i < draggedShipLength; i++) {
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', shipClass)
        }
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
      // } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
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
        rotateButton.disabled = true;
      }
///https://forums.whirlpool.net.au/archive/1737034
      displayGrid.removeChild(draggedShip)
      if(!displayGrid.querySelector('.ship')) allShipsPlaced = true
    }
  
    function dragEnd() {
      // console.log('dragend')
    }
  
    function playerReady(num) {
      let player = `.p${parseInt(num) + 1}`
      document.querySelector(`${player} .ready span`).classList.toggle('green')
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
        setTimeout(enemyGo, 1000)
      }
    }

    function revealSquare(classList) {
      const enemySquare = computerGrid.querySelector(`div[data-id='${shotFired}']`)
      const obj = Object.values(classList)
      if (!enemySquare.classList.contains('boom') && currentPlayer === 'user' && !isGameOver) {
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
      }
      if (obj.includes('taken')) {
        enemySquare.classList.add('boom')
        currentPlayer = 'user'
      } else {
        enemySquare.classList.add('miss')
        currentPlayer = 'enemy'
      }
      checkForWins()
      
      if(gameMode === 'singlePlayer') playGameSingle()
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
      if (gameMode === 'singlePlayer') square = Math.floor(Math.random() * userSquares.length)
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
          setTimeout(enemyGo, 1000)
        } else {
          userSquares[square].classList.add('miss')
          currentPlayer = 'user'
          turnDisplay.innerHTML = 'Your Go'
        }

        checkForWins()
        //currentPlayer = 'enemy'
      } else if (gameMode === 'singlePlayer') enemyGo()

    }
  
    function checkForWins() {
      let enemy = 'computer'
      if (small1Count === 1 || small2Count === 1 || small3Count === 1 || small4Count === 1
       || mid1Count === 2 || mid2Count === 2 || mid3Count === 2 || big1Count === 3 || big2Count === 3 || hugeCount === 4) {
        infoDisplay.innerHTML = `You sunk the ${enemy}'s ship`
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
        || PCmid1Count === 2 || PCmid2Count === 2 || PCmid3Count === 2 || PCbig1Count === 3 || big2Count === 3 || PChugeCount === 4) {
          infoDisplay.innerHTML = `${enemy} sunk your ship`
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
        infoDisplay.innerHTML = "YOU WIN"
        gameOver()
      }
      if ((PCsmall1Count + PCsmall2Count + PCsmall3Count + PCsmall4Count + PCmid1Count + PCmid2Count + PCmid3Count + PCbig1Count + PCbig2Count + PChugeCount) === 100) {
        infoDisplay.innerHTML = `${enemy.toUpperCase()} WINS`
        gameOver()
      }
    }
  
    function gameOver() {
      isGameOver = true
      currentPlayer = 'None'
      startButton.removeEventListener('click', startGame)
      
    }
    startSinglePlayer()
})