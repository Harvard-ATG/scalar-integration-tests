// ***********************************************
// For comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add('loginScalar', () => {
  cy.visit("/");
  cy.get('a').contains('Sign in').click();
  cy.get('a').contains('Login with email/password').click();
  cy.get('input[name="email"]').type(Cypress.env('testUser'));
  cy.get('input[name="password"]').type(Cypress.env('testPassword'));
  cy.get('input[type="submit"]').click();
});

Cypress.Commands.add('createPage', (title, description) => {
  // Assumes that the user is logged in already
  cy.get('a[id="newIcon"]').click();
  cy.wait(3000);
  cy.get('input[id="title"]').type(title);
  cy.get('input[id="page_description"]').type(description);
  cy.get('input[value="Save and view"]').click();
  cy.wait(2000);
});

Cypress.Commands.add('typeAndSelectCke', (text) => {
  cy.get("iframe.cke_wysiwyg_frame").then(function($iframe) {
    cy.wait(1000);
    const iframeBody = $iframe.contents().find("body");
    cy.wrap(iframeBody[0]).type(`${text}{selectall}`);
  });
});

Cypress.Commands.add('addManifest', (title, bookNamePrefix, manifest, timeout, wait) => {
  cy.get(`a[href$="${bookNamePrefix}/new.edit?type=media&"]`).click({force: true})
  cy.wait(wait || 3000);
  cy.get('#title').type(title, { timeout: timeout || 30000 })
  cy.get('#page_description').type(title)
  cy.get('#media_file_url').type(manifest)
  cy.get('select[name="media-type"]').select('IIIF manifest')
  cy.get('input[value="Save and view"]').click()
});