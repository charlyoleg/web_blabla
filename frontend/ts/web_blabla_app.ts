/*! web_blabla_app.ts */

// typescript declaration
declare var Stimulus : any;


import {f_hello} from './web_blabla_sub.js';

//import { Application } from '@stimulus/core';
import addMulipli from './controllers/addmult_controller.js';



// =========================
// Stimulus init
// =========================

const stimulus_app = Stimulus.Application.start();
stimulus_app.register("addmult", addMulipli);
stimulus_app.register("addimulti", addMulipli); // for the cloned and renamed component
console.log("Stimulus is started");


// =========================
// Other parts
// =========================

console.log("Hello from rouleau_app.ts");
f_hello();

