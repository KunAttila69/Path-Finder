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
}