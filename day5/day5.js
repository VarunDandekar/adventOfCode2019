const fs = require('fs');
let y = [];

function intCode(prog, inputX) {
    for (let i = 0; i <= prog.length;) {
        console.log(prog[i])
        const instruction = String(prog[i]);
        const opCode = instruction.slice(-2);
        const par1Mode = instruction.slice(-3, -2) || 0;
        const par2Mode = instruction.slice(-4, -3) || 0;
        const par1 = par1Mode == 1 ? prog[i + 1] : prog[prog[i + 1]];
        const par2 = par2Mode == 1 ? prog[i + 2] : prog[prog[i + 2]];

        if (opCode == 1) {
            prog[prog[i + 3]] = par1 + par2;
            i += 4;
        } else if (opCode == 2) {
            prog[prog[i + 3]] = par1 * par2;
            i += 4;
        } else if (prog[i] == 3) {
            prog[prog[i + 1]] = inputX;
            i += 2;
        } else if (opCode == 4) {
            y.push(par1);
            i += 2;
        } else if (opCode == 5) {
            if (par1 != 0) {
                i = par2;
            } else{
                i += 3;
            }
        } else if (opCode == 6) {
            if (par1 == 0) {
                i = par2;
            } else{
                i += 3;
            }
        } else if (opCode == 7) {
            if (par1 < par2) {
                prog[prog[i + 3]] = 1;
            } else {
                prog[prog[i + 3]] = 0;
            }
            i += 4;
        } else if (opCode == 8) {
            if (par1 == par2) {
                prog[prog[i + 3]] = 1;
            } else {
                prog[prog[i + 3]] = 0;
            }
            i += 4;
        } else if (prog[i] == 99) {
            break;
        }
    }
}

const content = fs.readFileSync('day5//input.txt', 'utf8');
let input = content.split(",").map(a => parseInt(a));
intCode(input, 1);
console.log("part 1 - ", y[y.length - 1]);

input = content.split(",").map(a => parseInt(a));
intCode(input, 5);
console.log("part 2 - ", y[y.length - 1]);