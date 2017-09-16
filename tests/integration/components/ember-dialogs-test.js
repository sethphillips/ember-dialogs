import { moduleForComponent, test } from 'ember-qunit'
import { withChai } from 'ember-cli-chai/qunit'
import hbs from 'htmlbars-inline-precompile'
import { create } from 'ember-cli-page-object'
import {alert} from 'dummy/tests/pages/components/dialogs'
import wait from 'ember-test-helpers/wait'
import $ from 'jquery'

const page = create(alert)
let dialogs, m



moduleForComponent('ember-dialogs', 'Integration | Component | ember dialogs', {
  integration : true,
  beforeEach () {
    page.setContext(this)
    this.inject.service('dialogs')
    dialogs = this.get('dialogs')
  },

  afterEach () {
    page.removeContext()
    $('body').removeClass('-ember-dialogs-block-scrolling')
  },
})



test('basic', withChai(async function (expect) {
  this.render(hbs`{{ember-dialogs}}`)

  let value = false

  m = '#0 Initial: dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(0)

  m = '#0 Initial: backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(0)

  m = '#0 Initial: body hasClass -ember-dialogs-block-scrolling'
  expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).false

  dialogs.alert({
    message : 'lol',
    actionOk () { value = true },
  })

  await wait()

  m = '#1 After triggering dialog: dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(1)

  m = '#1 After triggering dialog: backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(1)

  m = '#1 After triggering dialog: message text'
  expect($('.ember-dialogs-dialog-message').text().trim(), m).equal('lol')

  m = '#1 After triggering dialog: button text'
  expect($('.ember-dialogs-dialog-button').text().trim(), m).equal('OK')

  m = '#1 After triggering dialog: body hasClass -ember-dialogs-block-scrolling'
  expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).true

  $('.ember-dialogs-dialog-button').click()
  await wait()

  m = '#2 After dismissing dialog: dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(0)

  m = '#2 After dismissing dialog: backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(0)

  m = '#2 After dismissing dialog: value'
  expect(value, m).ok

  m = '#2 After dismissing dialog: body hasClass -ember-dialogs-block-scrolling'
  expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).false
}))



test('backdrop click should dismiss', withChai(async function (expect) {
  this.render(hbs`{{ember-dialogs}}`)

  let value = false

  dialogs.alert({
    message : 'lol',
    actionOk () { value = true },
  })
  await wait()

  $('.ember-dialogs-backdrop').click()
  await wait()

  m = 'dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(0)

  m = 'backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(0)

  m = 'value'
  expect(value, m).true
}))



test('backdrop click should not dismiss when backdropClickable=false', withChai(async function (expect) {
  this.render(hbs`{{ember-dialogs}}`)

  let value = false

  dialogs.alert({
    message           : 'lol',
    backdropClickable : false,
    actionOk () { value = true },
  })
  await wait()

  $('.ember-dialogs-backdrop').click()
  await wait()

  m = 'dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(1)

  m = 'backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(1)

  m = 'value'
  expect(value, m).false
}))



test('no backdrop, no action, no blockScrolling', withChai(async function (expect) {
  this.render(hbs`{{ember-dialogs}}`)

  dialogs.alert({
    message        : 'lol',
    backdrop       : false,
    blockScrolling : false,
  })
  await wait()

  m = 'body hasClass -ember-dialogs-block-scrolling'
  expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).false

  $('.ember-dialogs-backdrop').click()
  await wait()

  m = 'dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(1)

  m = 'backdrop existence'
  expect($('.ember-dialogs-backdrop'), m).length(0)

  $('.ember-dialogs-dialog-button').click()
  await wait()

  m = 'dialog existence'
  expect($('.ember-dialogs-dialog'), m).length(0)
}))
