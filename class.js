class Move{
    constructor(x,y,round,distance){
        this.x = x,
        this.y = y,
        this.round = round,
        this.distance = distance
        this.points = this.round + this.distance
    }
     

    ReturnElement = () => {
        const containerDiv = document.createElement("div")

        const round = document.createElement("h4")
        round.innerText = this.round
        const distance = document.createElement("h4")
        distance.innerText = this.distance
        const points = document.createElement("h2")
        points.innerText = this.points

        containerDiv.appendChild(round)
        containerDiv.appendChild(points)
        containerDiv.appendChild(distance)

        return containerDiv
    }

    GetMoves = (data) => {
        let moves = []

        if (this.y > 0 && data[this.y-1][this.x] == "0") {
            moves.push({"y": this.y-1, "x": this.x})   
        }
        if (this.x > 0 && data[this.y][this.x-1] == "0") {
            moves.push({"y": this.y, "x": this.x-1})   
        }
        if (this.y < data.length-1 && data[this.y+1][this.x] == "0") {
            moves.push({"y": this.y+1, "x": this.x})   
        }
        if (this.y < data[0].length-1 && data[this.y][this.x+1] == "0") {
            moves.push({"y": this.y, "x": this.x+1})   
        }

        return moves
    }
}