// web_blabla_sub.test.ts

import * as suby from "./web_blabla_sub";

test("testi one", () => {
  expect(suby.f_plus_5(1)).toBe(6);
});

test("testo two", () => {
  expect(suby.f_plus_5(-6)).toBe(-1);
});


