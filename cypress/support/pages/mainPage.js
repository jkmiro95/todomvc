import { APP_NAME, TASK_NAME } from '../constants'

export const mainPage = {
    selectors: {
        filterActive: 'a[href="#/active"]',
        filterAll: 'a[href="#/"]',
        filterCompleted: 'a[href="#/completed"]',
        firstTaskCompleted: '[data-testid="todo-item"]:first-child.completed',
        firstTaskCheckbox: '[data-testid="todo-item"]:first-child [data-testid="todo-item-toggle"]',
        firstTaskDelete: '[data-testid="todo-item"]:first-child [data-testid="todo-item-button"]',
        header: 'h1',
        lastTaskName: '[data-testid="todo-item"]:last-child [data-testid="todo-item-label"]',
        selected: '.selected',
        tasks: '[data-testid="todo-item"]',
        tasksActive: '[data-testid="todo-item"]:not(.completed)',
        tasksCompleted: '[data-testid="todo-item"].completed',
        tasksCount: 'span.todo-count',
        toDoInput: '[data-testid="text-input"]'
    },

    addTask: (name = TASK_NAME) => {
        cy.get(mainPage.selectors.toDoInput).type(`${name}{enter}`)

        return cy.get(mainPage.selectors.lastTaskName).should(($task) => {
            expect($task).to.contain(name)
        })
    },

    assertPageHasLoaded: () => {
        cy.get(mainPage.selectors.header).should(($header) => {
            expect($header).to.contain(APP_NAME)
        })

        return cy.get(mainPage.selectors.toDoInput).should('be.visible')
    },

    filterByActive: () => {
        cy.get(mainPage.selectors.filterActive).click()
        cy.get(`${mainPage.selectors.filterActive}${mainPage.selectors.selected}`).should('be.visible')
        cy.get(mainPage.selectors.tasksActive).should('be.visible')
        cy.get(mainPage.selectors.tasksCompleted).should('not.exist')
    },

    filterByAll: () => {
        cy.get(mainPage.selectors.filterAll).click()
        cy.get(`${mainPage.selectors.filterAll}${mainPage.selectors.selected}`).should('be.visible')
        cy.get(mainPage.selectors.tasksActive).should('be.visible')
        cy.get(mainPage.selectors.tasksCompleted).should('be.visible')
    },

    filterByCompleted: () => {
        cy.get(mainPage.selectors.filterCompleted).click()
        cy.get(`${mainPage.selectors.filterCompleted}${mainPage.selectors.selected}`).should('be.visible')
        cy.get(mainPage.selectors.tasksActive).should('not.exist')
        cy.get(mainPage.selectors.tasksCompleted).should('be.visible')
    },

    getNumberOfActiveTasks: () => {
        return cy.get(mainPage.selectors.tasksCount).then((elem) => {
                const txtArray = elem.text().split(' ')
                return +txtArray[0]
        })
    },

    markFirstTaskAsDone: () => {
        cy.get(mainPage.selectors.firstTaskCheckbox).click()

        return cy.get(mainPage.selectors.firstTaskCompleted).should('be.visible')
    },

    removeTask: () => {
        cy.get(mainPage.selectors.firstTaskDelete).click({force: true})

        return cy.get(mainPage.selectors.tasks).should('not.exist')
    }
}
