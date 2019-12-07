const fs = require('fs');

function intCode(prog, index, inputX) {
    let y = [];
    let i;
    for (i = index; i <= prog.length;) {
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
            if (inputX.length == 1) {
                prog[prog[i + 1]] = inputX[0];
            } else {
                prog[prog[i + 1]] = inputX.shift();
            } i += 2;
        } else if (opCode == 4) {
            y.push(par1);
            i += 2;
            return { result: y.pop(), prog, i, halted: false }
        } else if (opCode == 5) {
            if (par1 != 0) {
                i = par2;
            } else {
                i += 3;
            }
        } else if (opCode == 6) {
            if (par1 == 0) {
                i = par2;
            } else {
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
    return { result: y.pop(), prog, i, halted: true }
}

const content = fs.readFileSync('day7//input.txt', 'utf8');
let progCopy = content.split(",").map(a => parseInt(a));

const allResults = [];
let halted = false;
for (let i = 5; i <= 9; i++) { //0
    for (let j = 5; j <= 9; j++) { //1
        if (j === i) continue;
        for (let k = 5; k <= 9; k++) { //2
            if (k === i || k === j) continue;
            for (let l = 5; l <= 9; l++) { //3
                if (l === i || l === j || l === k) continue;
                for (let m = 5; m <= 9; m++) { //4
                    if (m === i || m === j || m === k || m === l) continue;
                    console.log(i, j, k, l, m);
                    const thrusters = [i, j, k, l, m];
                    ///////////////////////////////////////////////////////////////
                    let result = 0;
                    const AmpProgs = {
                        0: { prog: progCopy, index: 0 },
                        1: { prog: progCopy, index: 0 },
                        2: { prog: progCopy, index: 0 },
                        3: { prog: progCopy, index: 0 },
                        4: { prog: progCopy, index: 0 }
                    }
                    for (let amp = 0; amp <= 4; amp++) {
                        const { prog, index } = AmpProgs[amp]
                        const input = [thrusters[amp], result];
                        const output = intCode(prog, index, input); //{ result: y.pop(), prog, i, halted: true }
                        result = output.result;
                        AmpProgs[amp].prog = output.prog;
                        AmpProgs[amp].index = output.i;
                       // halted = output.halted;
                    }
                   while (!halted) {
                        for (let amp = 0; amp <= 4; amp++) {
                            const { prog, index } = AmpProgs[amp]
                            const input = [ result];
                            const output = intCode(prog,index, input);
                            result = output.result;
                            AmpProgs[amp].prog = output.prog;
                            AmpProgs[amp].index = output.i;
                            halted = output.halted;
                        }
                   }
                    console.log(result)
                    allResults.push(result);
                }
            }
        }
    }
}

console.log('part2-', Math.max(...allResults));


