import '../styles/less-testing.less'

export function renderCssTests() {
  const tests = [
    `<div class='less-tests'>This is a test with less preprocessor</div>`
  ]

  document.body.innerHTML += `<div class='tests-wrapper'>${tests.join('')}</div>`
}