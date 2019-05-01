let log = [];

function* gen() {
  log.push("get");
  yield x => (log.push("wrap"), x);
}

@wrap(...gen())
class A {}

expect(log).toEqual(["get", "wrap"]);
