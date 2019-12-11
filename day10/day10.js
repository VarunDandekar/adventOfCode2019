const fs = require('fs');
const content = fs.readFileSync('day10//input.txt', 'utf8');
let asteroids = [];

content.split('\r\n').forEach((inp, index1) => {
  inp.split("").forEach((x, index2) => {
    if (x === '#') {
      asteroids.push({ x: index2, y: index1 })
    }
  });
});

function calcAngle(a, b) {
  const tan = (b.x - a.x) / (b.y - a.y)
  let ang = (Math.atan2((b.x - a.x), (b.y - a.y))) * (180 / Math.PI);
  return ang
}

function calcDist(a, b) {
  return Math.sqrt(((b.y - a.y) ** 2) + ((b.x - a.x) ** 2));
}

const counts = [];
const lens = [];
asteroids.forEach((asteroid, index1) => {
  const map = [];
  asteroids.forEach((other, index2) => {
    if (index1 !== index2) {
      let angle = calcAngle(asteroid, other);
      if (!map.some(a => Object.is(a, angle))) {
        map.push(angle)
      }
    }
  })
  counts.push(map);
  lens.push(map.length);
});

console.log("part 1- ", Math.max(...lens))

let best = asteroids[lens.indexOf(Math.max(...lens))];
let distFromBest = [];

asteroids.forEach((asteroid) => {
  const ang = calcAngle(best, asteroid);
  const dist = calcDist(best, asteroid)
  if (!(ang == 0 && dist == 0)) {
    distFromBest.push({ ang, dist });
  }
});

distFromBest = distFromBest.sort((a, b) => {
  if (parseFloat(b.ang) == parseFloat(a.ang)) {
    return a.dist - b.dist;
  }
  return parseFloat(b.ang) - parseFloat(a.ang)
});

let angs = []
distFromBest.forEach(a => {
  if (!angs.includes(a.ang))
    angs.push(a.ang)
})

const newmap = {}
distFromBest.forEach(d => {
  if (newmap.hasOwnProperty(d.ang)) {
    newmap[d.ang].push(d.dist);
  } else {
    newmap[d.ang] = [d.dist]
  }
});

const order = [];
while (order.length != asteroids.length - 1) {
  angs.forEach((ang) => {
    if (newmap[ang].length > 0) {
      order.push({ ang, dist: newmap[ang].shift() })
    }
  })
}

//console.log(order)
const out = order[199]

asteroids.some((asteroid) => {
  const ang = calcAngle(best, asteroid);
  const dist = calcDist(best, asteroid)

  if (ang == out.ang && dist == out.dist) {
    console.log('part2', asteroid, out, asteroid.x * 100 + asteroid.y)
    return true;
  }
});



