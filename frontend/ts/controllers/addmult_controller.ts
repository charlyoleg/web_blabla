/*! addmult_controller */

// typescript declaration
declare var Stimulus : any;

//import { Controller } from "stimulus";


export default class extends Stimulus.Controller {

  static targets = [ "operanda", "operandb", "operandc", "result", "result2" ];

  connect(){
    console.log('Hello from addmult_controller.ts');
  }

  pressCalcul(){
    let res: number = 0;
    res += parseInt(this.operandaTarget.value);
    res += parseInt(this.operandbTarget.value);
    res *= parseInt(this.operandcTarget.value);
    this.resultTarget.value = res;
    this.result2Targets.forEach((item: HTMLParagraphElement, index: number) => {
      item.innerHTML = res.toString();
    });
  }

}
