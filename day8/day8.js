const fs = require('fs');
const content = fs.readFileSync('day8//input.txt', 'utf8');
let input = content.split("");


const WIDTH = 25;
const HEIGHT = 6;
const pages = [];
const numberOfPages = Math.ceil(input.length / (WIDTH * HEIGHT));
let index = 0;
let done = false;

const numZeros = [];
const numOnes = [];
const numTwos = [];

for (let i = 0; i < numberOfPages; i++) {
    page = [];
    let zeros = 0;
    let ones = 0;
    let twos = 0;
    for (let j = 0; j < HEIGHT; j++) {
        line = [];
        for (k = 0; k < WIDTH; k++) {

            if (index === input.length) {
                done = true;
                break;
            }

            line.push(input[index]);
            if (input[index] == 0) {
                zeros += 1;
            } else if (input[index] == 1) {
                ones += 1;
            } else if (input[index] == 2) {
                twos += 1;
            }
            index++;
        }
        page.push(line);
        if (done) {
            break;
        }
    }
    pages.push(page);
    numZeros.push(zeros);
    numOnes.push(ones);
    numTwos.push(twos);
    if (done) {
        break;
    }
}

const pageWithFewestZeros = numZeros.indexOf(Math.min(...numZeros));

console.log('part 1- ', numOnes[pageWithFewestZeros] * numTwos[pageWithFewestZeros])

const msg = [];
for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
        for (let k = 0; k < numberOfPages; k++) {
            if (pages[k][i][j] != 2) {
                msg.push(pages[k][i][j]);
                break;
            }
        }
        if(k>= numberOfPages){
            msg.push(2);
        }
    }
}

index = 0;
let drawing = ""
for(let i=0; i<HEIGHT; i++){
    for(let j=0; j<WIDTH; j++){
        if(msg[index]==1){
            drawing += 'o'
        }
        if(msg[index]==0){
            drawing += ' '
        }
        index++
    }
    drawing+='\n';
}
console.log('part2');
console.log(drawing)
