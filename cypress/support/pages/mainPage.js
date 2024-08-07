import { APP_NAME, TASK_NAME } from '../constants'

export const mainPage = {
    selectors: {
        filterActive: 'a[href="#/active"]',
        filterAll: 'a[href="#/"]',
        filterCompleted: 'a[href="#/completed"]',
        firstTaskCompleted: 'ul.todo-list > li:first-child.completed',
        firstTaskCheckbox: 'ul.todo-list > li:first-child input.toggle',
        firstTaskDelete: 'ul.todo-list > li:first-child button.destroy',
        header: 'h1',
        lastTaskName: 'ul.todo-list > li:last-child label',
        selected: '.selected',
        tasks: 'ul.todo-list > li',
        tasksActive: 'ul.todo-list > li:not(.completed)',
        tasksCompleted: 'ul.todo-list > li.completed',
        tasksCount: 'span.todo-count',
        toDoInput: '#todo-input'
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
    },

}
