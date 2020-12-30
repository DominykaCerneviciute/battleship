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
    const turnDisplay = document.querySelector('#whose-go')
    const infoDisplay = document.querySelector('#info')
    const userSquares = []
    const computerSquares = []
    let isHorizontal = true
    let isGameOver = false
    let currentPlayer = 'user'
    const width = 10
    let gameMode = ""
    let playerNum = 0
    let ready = false
    let enemyReady = false
    let allShipsPlaced = false
    let shotFired = -1
  
    // Select Player Mode

  
    // Single Player
    function startSinglePlayer() {
      gameMode = "singlePlayer"
  
      generate(shipArray[0])
      generate(shipArray[1])
      generate(shipArray[2])
      generate(shipArray[3])
      generate(shipArray[4])
      generate(shipArray[5])
      generate(shipArray[6])
      generate(shipArray[7])
      generate(shipArray[8])
      generate(shipArray[9])

      startButton.addEventListener('click', playGameSingle)
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
          [0, 1],
          [0, 1]
        ]
      },
      {
        name: 'small2',
        directions: [
          [0, 1],
          [0, 1]
        ]
      },
      {
        name: 'small3',
        directions: [
          [0, 1],
          [0, 1]
        ]
      },
      {
        name: 'small4',
        directions: [
          [0, 1],
          [0, 1]
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
  // ??????????????????????????????????????????????? 35min
    //Draw the computers ships in random locations
    function generate(ship) {
      let randomDirection = Math.floor(Math.random() * ship.directions.length)
      let current = ship.directions[randomDirection]
      if (randomDirection === 0) direction = 1
      if (randomDirection === 1) direction = 10
      let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))
  
      const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
      //pakeisti
      const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
      const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)
  
      if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))
  
      else generate(ship)
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
       console.log(shipClass)
      let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
      let shipLastId = lastShipIndex + parseInt(this.dataset.id)
      // console.log(shipLastId)
      const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
      const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
      
      let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
      let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)
  
      selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
  
      shipLastId = shipLastId - selectedShipIndex
       console.log(shipLastId)
  
      if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
        for (let i=0; i < draggedShipLength; i++) {
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', shipClass)
        }
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
      } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
        for (let i=0; i < draggedShipLength; i++) {
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', shipClass)
        }
      } else return
  
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
  
    // Game Logic for Single Player
    function playGameSingle() {
      if (isGameOver) return
      if (currentPlayer === 'user') {
        turnDisplay.innerHTML = 'Your Go'
        computerSquares.forEach(square => square.addEventListener('click', function(e) {
          shotFired = square.dataset.id
          revealSquare(square.classList)
        }))
      }
      if (currentPlayer === 'enemy') {
        turnDisplay.innerHTML = 'Computers Go'
        setTimeout(enemyGo, 1000)
      }
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
      } else {
        enemySquare.classList.add('miss')
      }
      checkForWins()
      currentPlayer = 'enemy'
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
      if (!userSquares[square].classList.contains('boom')) {
        userSquares[square].classList.add('boom')
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
        checkForWins()
      } else if (gameMode === 'singlePlayer') enemyGo()
      currentPlayer = 'user'
      turnDisplay.innerHTML = 'Your Go'
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

  console.log(destroyerCount)
  console.log(submarineCount)
  console.log(cruiserCount)
  console.log(battleshipCount)
  console.log(carrierCount)
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
      startButton.removeEventListener('click', playGameSingle)
    }
    startSinglePlayer()
})