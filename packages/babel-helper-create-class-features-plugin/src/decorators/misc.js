export function hasOwnDecorators(node) {
  return !!(node.decorators && node.decorators.length);
}

export function hasDecorators(node) {
  return hasOwnDecorators(node) || node.body.body.some(hasOwnDecorators);
}
