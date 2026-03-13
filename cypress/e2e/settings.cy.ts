describe('Settings Page', () => {
  beforeEach(() => {
    cy.visit('/settings');
  });

  it('displays the settings page with title', () => {
    cy.get('ion-title').should('contain', 'Configuración');
  });

  it('shows feature flags section', () => {
    cy.get('ion-item').should('contain', 'Categorías de tareas');
  });

  it('shows app version info', () => {
    cy.get('.app-info').should('contain', 'Prueba Técnica - Accenture 2026');
    cy.get('.app-info').should('contain', 'Presentado por: Santiago Montoya');
  });

  it('navigates back to tasks on back button', () => {
    cy.get('ion-back-button').click();
    cy.url().should('include', '/tasks');
  });
});
