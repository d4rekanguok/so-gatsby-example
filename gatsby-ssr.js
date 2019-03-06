const { Helmet } = require('react-helmet');

exports.onRenderBody = () => {
  const helmet = Helmet.renderStatic();
  console.log(helmet.title.toComponent())
  console.log(helmet.link.toComponent())
  console.log(helmet.meta.toComponent())
  console.log(helmet.noscript.toComponent())
  console.log(helmet.script.toComponent())
  console.log(helmet.style.toComponent())
}