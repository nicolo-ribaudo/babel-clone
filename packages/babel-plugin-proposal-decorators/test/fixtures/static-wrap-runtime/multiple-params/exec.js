const log = [];

@wrap(x => (log.push(2), x), log.push(1))
class A {}

expect(log).toEqual([1, 2]);
