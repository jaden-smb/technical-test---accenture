describe('Category List', () => {
  beforeEach(() => {
    cy.clearAppStorage();
    cy.visit('/categories');
  });

  it('displays the categories page with title', () => {
    cy.get('ion-title').should('contain', 'Categorías');
  });

  it('shows empty state when there are no categories', () => {
    cy.get('app-empty-state').should('be.visible');
    cy.get('app-empty-state').should('contain', 'Sin categorías');
  });

  it('navigates to new category form on fab button click', () => {
    cy.get('ion-fab-button').click();
    cy.url().should('include', '/categories/new');
    cy.get('ion-title').should('contain', 'Nueva categoría');
  });
});

describe('Category Creation', () => {
  beforeEach(() => {
    cy.clearAppStorage();
    cy.visit('/categories/new');
  });

  it('displays the new category form', () => {
    cy.get('ion-title').should('contain', 'Nueva categoría');
    cy.get('ion-input[formcontrolname="name"]').should('exist');
    cy.get('.category-form__color-picker').should('exist');
    cy.get('ion-button[type="submit"]').should('contain', 'Crear categoría');
  });

  it('disables submit button when name is empty', () => {
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
  });

  it('enables submit button when name is filled', () => {
    cy.get('ion-input[formcontrolname="name"]').type('Work');
    cy.get('ion-button[type="submit"]').should('not.have.attr', 'disabled');
  });

  it('shows color swatches for color selection', () => {
    cy.get('.category-form__color-swatch').should('have.length', 8);
  });

  it('selects a color swatch and shows checkmark', () => {
    cy.get('.category-form__color-swatch').eq(2).click();
    cy.get('.category-form__color-swatch--selected').should('have.length', 1);
    cy.get('.category-form__color-swatch--selected ion-icon[name="checkmark"]').should('exist');
  });

  it('creates a category and navigates back to list', () => {
    cy.get('ion-input[formcontrolname="name"]').type('Personal');
    cy.get('.category-form__color-swatch').eq(3).click();
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('include', '/categories');
    cy.get('ion-list').should('contain', 'Personal');
  });

  it('shows validation error when name is touched and empty', () => {
    cy.get('ion-input[formcontrolname="name"]').click();
    cy.focused().blur();
    cy.get('.form-error').should('be.visible').and('contain', 'El nombre es obligatorio');
  });
});
