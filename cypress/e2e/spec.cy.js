import { BASE_URL } from '../support/constants'
import { mainPage } from '../support/pages/mainPage'

describe('template spec', () => {
  beforeEach(() => {
    cy.visit(BASE_URL)
  })
  it('asserts page has loaded', () => {
    mainPage.assertPageHasLoaded()
  }),
  it('adds a task', () => {
    mainPage.addTask()
  }),
  it('marks the task as done', () => {
    mainPage.addTask()
    mainPage.getNumberOfActiveTasks()
      .then(number => {
        cy.wrap(number).as('beforeNumber')
      })
    mainPage.markFirstTaskAsDone()
    mainPage.getNumberOfActiveTasks()
      .then(number => {
        cy.wrap(number).as('afterNumber')
      })
    cy.get('@beforeNumber').then(beforeNumber => {
      cy.get('@afterNumber').then(afterNumber => {
        expect(beforeNumber).to.be.greaterThan(afterNumber)
      })
    })
  })
  it('deletes the task', () => {
    mainPage.addTask()
    mainPage.removeTask()
  }),
  it('checks filters', () => {
    mainPage.addTask('Will be completed')
    mainPage.addTask('Will be active')
    mainPage.markFirstTaskAsDone()
    mainPage.filterByActive()
    mainPage.filterByAll()
    mainPage.filterByCompleted()
  })
})
