/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      clearAppStorage(): Chainable<void>;
      createTask(title: string, description?: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('clearAppStorage', () => {
  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
    indexedDB.deleteDatabase('_ionicstorage');
  });
});

Cypress.Commands.add('createTask', (title: string, description?: string) => {
  cy.get('ion-fab-button').click();
  cy.get('ion-input[formcontrolname="title"]').type(title);
  if (description) {
    cy.get('ion-textarea[formcontrolname="description"]').type(description);
  }
  cy.get('ion-button[type="submit"]').click();
  cy.url().should('include', '/tasks').and('not.include', '/tasks/new');
});

export {};
