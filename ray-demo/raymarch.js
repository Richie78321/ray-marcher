function Vector(x, y)
{
    this.x = x;
    this.y = y;
    this.magnitude = function() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    this.normalize = function() {
        let mag = this.magnitude();
        return new Vector(this.x /= mag, this.y /= mag);
    }
    this.add = function(vec)
    {
        return new Vector(this.x + vec.x, this.y + vec.y);
    }
    this.subtract = function(vec) 
    {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }
    this.multiply = function(scalar)
    {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    this.dot = function(vec)
    {
        return this.x * vec.x + this.y * vec.y;
    }
}

function Line(origin, direction)
{
    this.origin = origin;
    this.direction = direction.normalize();
}

function MarchObject(distTo, drawObj)
{
    this.distTo = distTo;
    this.drawObj = drawObj;
}

var MAX_STEPS = 100;
var INTERSECTION_THRESHOLD = 0.001;
function doMarch(line, marchObjects)
{
    var marchData = {
        raySteps: []
    };
    var currentPos = line.origin;

    var nextDist = minDist(currentPos, marchObjects);
    for (let i = 0; i < MAX_STEPS && nextDist > INTERSECTION_THRESHOLD; i++)
    {
        marchData.raySteps.push({
            position: currentPos,
            nextDist: nextDist
        });
        currentPos = currentPos.add(line.direction.multiply(nextDist));
        nextDist = minDist(currentPos, marchObjects);
    }
    marchData.raySteps.push({
        position: currentPos,
        nextDist: nextDist
    });

    return marchData;
}

function minDist(position, marchObjects)
{
    var dist = Number.MAX_VALUE;
    for (let i = 0; i < marchObjects.length; i++)
    {
        let objDist = marchObjects[i].distTo(position);
        if (objDist < dist)
        {
            dist = objDist;
        }
    }

    return Math.max(0, dist);
}