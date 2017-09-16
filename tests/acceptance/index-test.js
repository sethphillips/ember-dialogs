import { test } from 'qunit'
import { withChai } from 'ember-cli-chai/qunit'
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance'

import page from 'dummy/tests/pages/index'

moduleForAcceptance('Acceptance | index')

let m



test('initial state', withChai(async function (expect) {
  await visit('/')

  m = "backdrop existence"
  expect(page.backdrop.exists, m).false

  m = "dialog existence"
  expect(page.dialog.exists, m).false
}))




test('alert', withChai(async function (expect) {
  await visit('/')
  await page.alertTrigger.click()

  m = "#0 Initial: value"
  expect(page.alertValue.text, m).equal("false")

  m = "#0 Initial: backdrop visibility"
  expect(page.backdrop.visible, m).true

  m = "#0 Initial: alert visibility"
  expect(page.dialog.visible, m).true

  m = "#0 Initial: alert message text"
  expect(page.dialog.message.text, m).equal("Value will be toggled from false to true.")

  m = "#0 Initial: alert ok button text"
  expect(page.dialog.buttonOk.text, m).equal("Yup")

  await page.dialog.buttonOk.click()

  m = "#1 After click on OK: value"
  expect(page.alertValue.text, m).equal("true")

  m = "#1 After click on OK: backdrop visibility"
  expect(page.backdrop.visible, m).false

  m = "#1 After click on OK: alert visibility"
  expect(page.dialog.visible, m).false
}))
