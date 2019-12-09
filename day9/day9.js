const fs = require('fs');
let y = [];

function intCode(prog, inputX) {
    let base = 0;
    let i = 0;
    while (1) {
        const instruction = String(prog[i]);
        const opCode = instruction.slice(-2);
        const par1Mode = instruction.slice(-3, -2) || 0;
        const par2Mode = instruction.slice(-4, -3) || 0;
        const par3Mode = instruction.slice(-5, -4) || 0;
        const par1 = par1Mode == 2 ? prog[prog[i + 1] + base] : (par1Mode == 1 ? prog[i + 1] : prog[prog[i + 1]]);
        const par2 = par2Mode == 2 ? prog[prog[i + 2] + base] : (par2Mode == 1 ? prog[i + 2] : prog[prog[i + 2]]);
       // const par3 = par3Mode == 2 ? prog[i + 1] + base : (par2Mode == 1 ? prog[i + 2] : prog[prog[i + 2]]);

        if (opCode == 1) {
            prog[par3Mode ==2 ?prog[i + 3] + base : prog[i + 3]] = (par1 + par2) || 0;
            i += 4;
        } else if (opCode == 2) {
            prog[par3Mode ==2 ?prog[i + 3] + base : prog[i + 3]] = (par1 * par2) || 0;
            i += 4;
        } else if (opCode == 3) {
            // if (par1Mode == 2) {
            //     prog[par1Modeprog[i + 1] + base] = inputX || 0;
            // } else {
                prog[par1Mode ==2 ?prog[i + 1] + base : prog[i + 1]] = inputX || 0;
          //  }
            i += 2;
        } else if (opCode == 4) {
            y.push(par1);
            i += 2;
        } else if (opCode == 5) {
            if (par1 != 0) {
                i = par2 || 0;
            } else {
                i += 3;
            }
        } else if (opCode == 6) {
            if (par1 == 0) {
                i = par2 || 0;
            } else {
                i += 3;
            }
        } else if (opCode == 7) {
            if (par1 < par2) {
                prog[par3Mode ==2 ?prog[i + 3] + base : prog[i + 3]] = 1;
            } else {
                prog[par3Mode ==2 ?prog[i + 3] + base : prog[i + 3]] = 0;
            }
            i += 4;
        } else if (opCode == 8) {
            if (par1 == par2) {
                prog[par3Mode ==2 ?prog[i + 3] + base : prog[i + 3]] = 1;
            } else {
                prog[par3Mode ==2 ?prog[i + 3] + base : prog[i + 3]] = 0;
            }
            i += 4;
        } else if (opCode == 9) {
            base += par1;
            i += 2;
        } else if (prog[i] == 99) {
            break;
        }
    }
}

const content = fs.readFileSync('day9//input.txt', 'utf8');
// let input = content.split(",").map(a => parseInt(a));
// intCode(input, 1);
// console.log('par1- ',y);

input = content.split(",").map(a => parseInt(a));
intCode(input, 2);
console.log("part 2 - ", y[y.length - 1]);