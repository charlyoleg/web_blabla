// web_blabla_core.test.ts

import * as yop_core from "./web_blabla_core";

test("dummy age computation", () => {
  expect(yop_core.calcAge(1)).toBe(2019);
});

test("concrete age computation", () => {
  expect(yop_core.calcAge(1978)).toBe(42);
});

test("simple birth-year computation", () => {
  expect(yop_core.calcBirthYear(21)).toBe(1999);
});

test("looking at yop_core activities", () => {
  expect(yop_core.callActivities().visit_stat).toMatch(/visit counts:/);
});
