const log = [];

@initialize(log.push(1), log.push(2))
class A {}

expect(log).toEqual([1, 2]);
