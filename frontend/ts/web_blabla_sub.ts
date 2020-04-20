/*! web_blabla_sub.ts */


//const test_eslint = 'foo';

function f_hello () {
  console.log('Hello from web_blabla_sub.ts')
}

function f_plus_5(x: number): number {
  let r_resp = x;
  r_resp += 5;
  return r_resp;
}

// =================
// export
// =================

export {f_hello, f_plus_5};

