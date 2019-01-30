const findBodyNode = (tree) => {
  const { tagName, children } = tree;
  if (tagName && tagName === 'body') return tree;
  if (children && children.length > 0) {
    for (let i = 0; i < children.length; i++ ) {
      const res = findBodyNode(children[i]);
      if (res) return res;
    }
  }
  else return;
}

module.exports = () => {
  return (tree) => {
    const bodyNode = findBodyNode(tree);
    bodyNode.tagName = 'div';
    return bodyNode;
  }
}