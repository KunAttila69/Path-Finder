let data = []
let moves = []
const startCoords = {"y": 0,"x": 0}
let endCoords

const GenerateMap = () => {
    data = [
        ["0","0","1","0","0","0","0","0","0","0"],
        ["0","0","1","0","1","0","1","0","1","0"], 
        ["0","0","1","0","1","0","1","0","1","0"], 
        ["0","0","1","0","1","0","1","0","1","0"], 
        ["0","0","1","0","1","0","0","0","1","0"], 
        ["0","0","1","0","0","0","0","0","1","0"], 
        ["0","0","1","0","0","0","1","0","1","0"], 
        ["0","0","1","0","1","1","1","1","1","0"], 
        ["0","0","0","0","0","0","0","0","0","0"]
    ]
    endCoords = {"y": data.length-1,"x": data[0].length-1}
    data[startCoords.y][startCoords.x] = moves[0] = new Move(startCoords.x,startCoords.y,1,CalculateDistance(startCoords.y,startCoords.x))
    data[endCoords.y][endCoords.x] = "e"
}

const LoadMap = () => {
    container.innerHTML = ""
    data.forEach(line => {
        const tRow = document.createElement("tr")
        line.forEach(column => {
            const tElement = document.createElement("td")

            switch (column) {
                case "0":
                    tElement.classList.add("tile")
                    break;
                
                case "1":
                    tElement.classList.add("wall")
                    break;
            
                case "e":
                    tElement.classList.add("end")
                    break;

                default:
                    tElement.classList.add("start") 
                    if (column.bestTile) {
                        tElement.style.backgroundColor = "yellow"
                    }
                    tElement.appendChild(column.ReturnElement())
                    break;
            }

            tRow.appendChild(tElement)
        })
        container.appendChild(tRow)
    })
}

const CalculateDistance = (y,x) => {
    return Math.sqrt(Math.pow(endCoords.y-y,2)+Math.pow(endCoords.x-x,2)).toFixed(2)
}

const MoveMap = () => {
    moves.filter(x => x.GetMoves(data).length > 0).forEach(move => {
        move.GetMoves(data).forEach(newMove => {
            const newElement = new Move(newMove.x,newMove.y,move.round+1,CalculateDistance(newMove.y,newMove.x))
            if (!newMove.isEnd) {
                moves.push(newElement)
                data[newElement.y][newElement.x] = newElement
            }else{
                End(newElement)
            }
        })
    })
    LoadMap()
}

const End = (endTile) => { 
    for (let index = endTile.round-1; index > 0; index--) {
        const roundMoves = moves.filter(move => move.round == index) 

        let bestMove = roundMoves[0]
        if (roundMoves.length > 1) {
            roundMoves.forEach(move => {
                bestMove = move.points < bestMove.points ? move : bestMove
            })
        } 

        data[bestMove.y][bestMove.x].bestTile = true 
    }
}

moveBtn.addEventListener("click", () => {
    MoveMap()
})

GenerateMap()

LoadMap()