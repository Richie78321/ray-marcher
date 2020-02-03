var SCREEN_DIM = 1000;
function setup() {
    createCanvas(SCREEN_DIM, SCREEN_DIM);
    noLoop();
}

function mouseClicked()
{
    draw();
}

function draw() {
    clear();
    let circleOrigin = new Vector(500, 500);
    let circleRadius = 100;
    let boundLine = new Line(new Vector(800, 500), new Vector(-1, -1));

    var marchObjects = [
        new MarchObject(distToCircle(circleOrigin, circleRadius), drawCircle(circleOrigin, circleRadius)),
        new MarchObject(distToLine(boundLine), drawLine(boundLine))
    ];

    let marchStart = new Vector(0, 500);
    let marchDirection = new Vector(mouseX, mouseY).subtract(marchStart);
    var marchData = doMarch(new Line(marchStart, marchDirection), marchObjects);

    //Draw march objects
    for (let i = 0; i < marchObjects.length; i++) marchObjects[i].drawObj();

    //Draw march data
    drawMarchData(marchData.raySteps);
}

var POINT_DIAMETER = 10;
function drawMarchData(marchData)
{
    for (let i = 0; i < marchData.length; i++)
    {
        fill(255, 204, 0);
        stroke(255, 204, 0);
        //circle(marchData[i].position.x, marchData[i].position.y, POINT_DIAMETER);
        fill(0, 0, 0, 0);
        stroke(0, 0, 0);
        circle(marchData[i].position.x, marchData[i].position.y, marchData[i].nextDist * 2);
        if (i < marchData.length - 1)
        {
            line(marchData[i].position.x, marchData[i].position.y, marchData[i + 1].position.x, marchData[i + 1].position.y);
        }
        console.log("Here");
    }
}

function distToLine(line)
{
    return function(vec)
    {
        var originToPoint = line.origin.subtract(vec);
        var parallelProj = line.direction.multiply(line.direction.dot(originToPoint));
        return originToPoint.subtract(parallelProj).magnitude();
    }
}

function drawLine(lineVal)
{
    return function()
    {
        var firstPoint = lineVal.origin.add(lineVal.direction.multiply(SCREEN_DIM * Math.sqrt(2)));
        var secondPoint = lineVal.origin.add(lineVal.direction.multiply(-SCREEN_DIM * Math.sqrt(2)));
        line(firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y);
    }
}

function distToCircle(origin, radius)
{
    return function(vec)
    {
        return Math.max(0, vec.subtract(origin).magnitude() - radius);
    };
}

function drawCircle(origin, radius)
{
    return function()
    {
        fill(0, 0, 0);
        stroke(0, 0, 0);
        circle(origin.x, origin.y, radius * 2);
    }
}