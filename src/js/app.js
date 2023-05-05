import 'normalize.css'
import '../scss/app.scss'

/* Your JS Code goes here */
// DEV
// eslint-disable-next-line import/no-extraneous-dependencies
import loadPixelperfect from 'pixelperfect-tool'

window.pixelperfect = {
  breakpoints: [320, 768, 1400],
  folder: 'http://ydpn.ru/flatwell/pp/',
}

loadPixelperfect()
// DEV
