
let called = false;
let args;

const replacement = class {};
let original;

const fn = jest.fn().mockReturnValue(replacement);

@wrap(fn)
class A { static _ = (original = A) }

expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(original);
expect(A).toBe(replacement);
