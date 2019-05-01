let log = [];

function* gen() {
  log.push("get");
  yield () => log.push("init");
}

@initialize(...gen())
class A {}

expect(log).toEqual(["get"]);

log = [];
new A();

expect(log).toEqual(["init"]);
