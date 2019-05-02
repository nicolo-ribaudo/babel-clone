@wrap(a)
@register(b)
@initialize(c)
@register(d)
@wrap(e)
class A {
  @expose(f)
  #foo;

  @wrap(g)
  @expose(h)
  @wrap(i)
  static #bar() {}

  @register(j)
  @wrap(k)
  @initialize(l)
  @register(m)
  @wrap(n)
  method() {}

  @register(o)
  @initialize(p)
  @register(q)
  foo = 3;
}
