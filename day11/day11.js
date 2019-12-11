const fs = require("fs");
let y = [];
const r_0 = { u: -1, d: 1, l: 0, r: 0 };
const r_1 = { u: 1, d: -1, l: 0, r: 0 };
const c_0 = { u: 0, d: 0, l: 1, r: -1 };
const c_1 = { u: 0, d: 0, l: -1, r: 1 };
const dirs_0 = { u: "l", d: "r", l: "d", r: "u" };
const dirs_1 = { u: "r", d: "l", l: "u", r: "d" };
const area = { "0_0": 1 };
let r = 0;
let c = 0;
let dir = "u";
let rcOut = false;

function intCode(prog, inputX) {
  let base = 0;
  let i = 0;
  while (1) {
    const instruction = String(prog[i]);
    const opCode = instruction.slice(-2);
    const par1Mode = instruction.slice(-3, -2) || 0;
    const par2Mode = instruction.slice(-4, -3) || 0;
    const par3Mode = instruction.slice(-5, -4) || 0;
    const par1 =
      par1Mode == 2
        ? prog[prog[i + 1] + base]
        : par1Mode == 1
        ? prog[i + 1]
        : prog[prog[i + 1]];
    const par2 =
      par2Mode == 2
        ? prog[prog[i + 2] + base]
        : par2Mode == 1
        ? prog[i + 2]
        : prog[prog[i + 2]];
    // const par3 = par3Mode == 2 ? prog[i + 1] + base : (par2Mode == 1 ? prog[i + 2] : prog[prog[i + 2]]);

    if (opCode == 1) {
      prog[par3Mode == 2 ? prog[i + 3] + base : prog[i + 3]] = par1 + par2 || 0;
      i += 4;
    } else if (opCode == 2) {
      prog[par3Mode == 2 ? prog[i + 3] + base : prog[i + 3]] = par1 * par2 || 0;
      i += 4;
    } else if (opCode == 3) {
      // prog[par1Mode == 2 ? prog[i + 1] + base : prog[i + 1]] = inputX || 0; //day 9
      inputX = area[`${r}_${c}`];
      prog[par1Mode == 2 ? prog[i + 1] + base : prog[i + 1]] = inputX || 0;
      i += 2;
    } else if (opCode == 4) {
      //  y.push(par1); //day9
      if (!rcOut) {
        area[`${r}_${c}`] = par1;
        rcOut = true;
      } else {
        if (par1 == 0) {
          r = r + r_0[dir];
          c = c + c_0[dir];
          dir = dirs_0[dir];
        } else if (par1 == 1) {
          r = r + r_1[dir];
          c = c + c_1[dir];
          dir = dirs_1[dir];
        }
        rcOut = false;
      }
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
        prog[par3Mode == 2 ? prog[i + 3] + base : prog[i + 3]] = 1;
      } else {
        prog[par3Mode == 2 ? prog[i + 3] + base : prog[i + 3]] = 0;
      }
      i += 4;
    } else if (opCode == 8) {
      if (par1 == par2) {
        prog[par3Mode == 2 ? prog[i + 3] + base : prog[i + 3]] = 1;
      } else {
        prog[par3Mode == 2 ? prog[i + 3] + base : prog[i + 3]] = 0;
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

const content = fs.readFileSync("day11//input.txt", "utf8");
let code = content.split(",").map(a => parseInt(a));

// intCode(code, area['0_0']);
// console.log('part 1', Object.keys(area).length)

intCode(code, area["0_0"]);
console.log(area);

const r_c = Object.keys(area).map(obj => obj.split("_").map(a => parseInt(a)));

const maxR = Math.max(...r_c.map(x=>x[0]));
const maxC = Math.max(...r_c.map(x=>x[1]));
console.log(maxR, maxC);
let line = "";
for (let i = 0; i <= maxR; i++) {
  for (let j = 0; j <=maxC; j++) {
    if (area[`${i}_${j}`] == 1) {
      line += "o";
    } else {
      line += " ";
    }
  }
  line += "\n";
}

console.log("part2-")
console.log(line) //JELEFGHP
