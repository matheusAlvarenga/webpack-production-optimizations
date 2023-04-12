import '../styles/less-testing.less'
import '../styles/sass-testing.scss'

import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

const jssStyles = {
  'jssTests': {
    backgroundColor: 'green',
    fontSize: '20px',
    color: 'white'
  }
}

const { classes } = jss.createStyleSheet(jssStyles).attach()

export function renderCssTests() {
  const tests = [
    `<div class='less-tests'>This is a test with less preprocessor</div>`,
    `<div class='sass-tests'>This is a test with sass preprocessor</div>`,
    `<div class=${classes.jssTests}>This is a test with jss</div>`,
  ]

  document.body.innerHTML += `<div class='tests-wrapper'>${tests.join('')}</div>`
}