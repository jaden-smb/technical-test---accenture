describe('Task List', () => {
  beforeEach(() => {
    cy.clearAppStorage();
    cy.visit('/tasks');
  });

  it('displays the task list page with title', () => {
    cy.get('ion-title').should('contain', 'Tareas');
  });

  it('shows empty state when there are no tasks', () => {
    cy.get('app-empty-state').should('be.visible');
    cy.get('app-empty-state').should('contain', 'Sin tareas');
  });

  it('navigates to new task form on fab button click', () => {
    cy.get('ion-fab-button').click();
    cy.url().should('include', '/tasks/new');
    cy.get('ion-title').should('contain', 'Nueva tarea');
  });

  it('navigates to settings page', () => {
    cy.get('ion-button[routerlink="/settings"]').click();
    cy.url().should('include', '/settings');
    cy.get('ion-title').should('contain', 'Configuración');
  });
});

describe('Task Creation', () => {
  beforeEach(() => {
    cy.clearAppStorage();
    cy.visit('/tasks/new');
  });

  it('displays the new task form', () => {
    cy.get('ion-title').should('contain', 'Nueva tarea');
    cy.get('ion-input[formcontrolname="title"]').should('exist');
    cy.get('ion-textarea[formcontrolname="description"]').should('exist');
    cy.get('ion-button[type="submit"]').should('contain', 'Crear tarea');
  });

  it('disables submit button when title is empty', () => {
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
  });

  it('enables submit button when title is filled', () => {
    cy.get('ion-input[formcontrolname="title"]').type('My first task');
    cy.get('ion-button[type="submit"]').should('not.have.attr', 'disabled');
  });

  it('shows validation error when title is touched and empty', () => {
    cy.get('ion-input[formcontrolname="title"]').click();
    cy.focused().blur();
    cy.get('.form-error').should('be.visible').and('contain', 'El título es obligatorio');
  });

  it('creates a task and navigates back to list', () => {
    cy.get('ion-input[formcontrolname="title"]').type('Buy groceries');
    cy.get('ion-textarea[formcontrolname="description"]').type('Milk, eggs, bread');
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('include', '/tasks');
    cy.get('ion-list').should('contain', 'Buy groceries');
  });

  it('creates a task with only a title', () => {
    cy.get('ion-input[formcontrolname="title"]').type('Quick task');
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('include', '/tasks');
    cy.get('ion-list').should('contain', 'Quick task');
  });

  it('navigates back to task list on back button', () => {
    cy.get('ion-back-button').click();
    cy.url().should('include', '/tasks');
  });
});

describe('Task Management', () => {
  beforeEach(() => {
    cy.clearAppStorage();
    cy.visit('/tasks');
    cy.createTask('Test Task', 'Test description');
  });

  it('displays created task in the list', () => {
    cy.get('app-task-item').should('have.length', 1);
    cy.get('app-task-item').should('contain', 'Test Task');
  });

  it('navigates to task detail on item click', () => {
    cy.get('app-task-item ion-item').first().click();
    cy.url().should('match', /\/tasks\/[^/]+$/);
    cy.get('ion-title').should('contain', 'Detalles de la tarea');
  });

  it('toggles task completion from detail page', () => {
    cy.get('app-task-item ion-item').first().click();
    cy.get('ion-title').should('contain', 'Detalles de la tarea');
    cy.get('ion-checkbox').click();
    cy.get('.task-detail__title').should('have.class', 'task-detail__title--done');
  });

  it('navigates to edit page for a task', () => {
    cy.visit('/tasks');
    cy.get('app-task-item ion-button[data-testid="task-options-btn"]').first().click({ force: true });
    cy.get('ion-action-sheet').should('be.visible');
    cy.get('ion-action-sheet button').contains('Editar').click({ force: true });
    cy.url().should('include', '/tasks/edit/');
    cy.get('ion-title').should('contain', 'Editar tarea');
  });

  it('shows delete confirmation alert', () => {
    cy.visit('/tasks');
    cy.get('app-task-item ion-button[data-testid="task-options-btn"]').first().click({ force: true });
    cy.get('ion-action-sheet').should('be.visible');
    cy.get('ion-action-sheet button').contains('Eliminar').click({ force: true });
    cy.get('ion-alert').should('be.visible');
    cy.get('ion-alert').should('contain', 'Eliminar tarea');
  });
});

describe('Task Edit', () => {
  beforeEach(() => {
    cy.clearAppStorage();
    cy.visit('/tasks');
    cy.createTask('Editable Task');
  });

  it('pre-fills the form with existing task data', () => {
    cy.visit('/tasks');
    cy.get('app-task-item ion-button[data-testid="task-options-btn"]').first().click({ force: true });
    cy.get('ion-action-sheet').should('be.visible');
    cy.get('ion-action-sheet button').contains('Editar').click({ force: true });
    cy.get('ion-title').should('contain', 'Editar tarea');
    cy.get('ion-input[formcontrolname="title"]').should('have.value', 'Editable Task');
  });
});
