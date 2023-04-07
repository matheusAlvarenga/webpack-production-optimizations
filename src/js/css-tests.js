import '../styles/less-testing.less'
import '../styles/sass-testing.scss'

export function renderCssTests() {
  const tests = [
    `<div class='less-tests'>This is a test with less preprocessor</div>`,
    `<div class='sass-tests'>This is a test with sass preprocessor</div>`,
  ]

  document.body.innerHTML += `<div class='tests-wrapper'>${tests.join('')}</div>`
}