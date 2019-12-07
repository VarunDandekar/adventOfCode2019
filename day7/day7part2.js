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
            prog[prog[i + 1]] = inputX.shift();
            i += 2;
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
//let progCopy = content.split(",").map(a => parseInt(a));
let amplifiers
const allResults = [];
for (let i = 5; i <= 9; i++) { //0
    for (let j = 5; j <= 9; j++) { //1
        if (j === i) continue;
        for (let k = 5; k <= 9; k++) { //2
            if (k === i || k === j) continue;
            for (let l = 5; l <= 9; l++) { //3
                if (l === i || l === j || l === k) continue;
                for (let m = 5; m <= 9; m++) { //4
                    if (m === i || m === j || m === k || m === l) continue;
                    const thrusters = [i, j, k, l, m];
                    amplifiers = {
                        0: {
                            prog: content.split(",").map(a => parseInt(a)),
                            index: 0,
                            input: [thrusters[0], 0],
                            output: 0
                        },
                        1: {
                            prog: content.split(",").map(a => parseInt(a)),
                            index: 0,
                            input: [thrusters[1]],
                            output: 0
                        },
                        2: {
                            prog: content.split(",").map(a => parseInt(a)),
                            index: 0,
                            input: [thrusters[2]],
                            output: 0
                        },
                        3: {
                            prog: content.split(",").map(a => parseInt(a)),
                            index: 0,
                            input: [thrusters[3]],
                            output: 0
                        },
                        4: {
                            prog: content.split(",").map(a => parseInt(a)),
                            index: 0,
                            input: [thrusters[4]],
                            output: 0
                        }
                    }
                    let halted = false;
                    let output;

                    while (!halted) {
                        for (let amp = 0; amp <= 4; amp++) {
                            const { prog, index, input } = amplifiers[amp];
                            output = intCode(prog, index, input);
                            amplifiers[amp].prog = output.prog;
                            amplifiers[amp].index = output.i;
                            amplifiers[(amp + 1) % 5].input.push(output.result);
                            if (output.result) {
                                amplifiers[amp].output = output.result
                            }
                        }
                        halted = output.halted
                        allResults.push(amplifiers[4].output);
                    }

                    ///////////////////////////////////////////////////////////////
                }
            }
        }
    }
}

console.log('part 2-', Math.max(...allResults));
