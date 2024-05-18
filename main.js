let data = []
let moves = []
const startCoords = {"y": 0,"x": 0}
const endCoords = {"y": 5,"x": 7}

const GenerateMap = () => {
    data = [
        ["0","0","1","0","0","0","0","0"],
        ["0","1","0","0","0","0","1","0"], 
        ["0","0","1","0","0","0","1","0"], 
        ["0","0","1","0","0","0","1","0"], 
        ["0","0","1","0","0","0","1","0"], 
        ["0","0","0","0","0","0","1","0"]
    ]
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
            moves.push(newElement)
            data[newElement.y][newElement.x] = newElement
        })
    })
    LoadMap()
}

moveBtn.addEventListener("click", () => {
    MoveMap()
})

GenerateMap()

LoadMap()