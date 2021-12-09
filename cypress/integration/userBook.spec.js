/// <reference types="cypress" />

describe('User Book actions', () => {

  // I don't think these are possible without great effort

  // 10. User annotates an image
  // 17. User imports Internet archive video
  // 18. User annotates a video

  // 1. User creates a book
  it('logs in a creates a book', () => {
    cy.loginScalar();
    cy.get('a').contains('Dashboard').click();
    cy.get('a').contains('My account').click();
    cy.get('input[value="New book title"]').type('Cypress Test Book');
    cy.get('input[value="Create"]').click();
  });

  // 3. User creates a page
  it('User creates a page', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.createPage('Test Page', 'This is a test page');
  });

  // 4. User imports image from Internet Archive
  it('Imports image from Internet Archive', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.get('ul[id="ScalarHeaderMenuImportList"]').invoke('show');
    cy.get('li').contains("Affiliated archives").trigger('mouseover');
    cy.get('a').contains("Internet Archive").click();
    cy.get('input[name="sq"]').type("foo");
    cy.get('input[value="Search"][class="btn btn-default"]').click();
    cy.wait(3000);
    cy.get('input[type="checkbox"]').first().check();
    cy.get('a').contains('Import selected').click();
    cy.get('a').contains('Continue').click();
    cy.wait(2000);
    cy.get('h5').contains('Import successful').should('have.length', 1);
    
  });

  // 5. User adds linked media to a page
  it('Adds linked media to a page', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.get('a[id="editIcon"]').click();
    cy.wait(4000);
    cy.typeAndSelectCke("Linked media text");
    cy.wait(2000);
    cy.get('a[title="Insert Scalar Media Link"]').click();
    cy.wait(2000);
    cy.get('tbody[class="node_rows"]').children('tr').first().click();
    cy.get('input[value="Continue"]').click();
    cy.get('input[value="Save and view"]').click();
  });

  // 6. User adds inline media to a page
  it('Adds inline media to a page', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.get('a[id="editIcon"]').click();
    cy.wait(4000);
    cy.get('a[title="Insert Inline Scalar Media Link"]').click();
    cy.wait(2000);
    cy.get('tbody[class="node_rows"]').children('tr').first().click();
    cy.get('input[value="Continue"]').click();
  });


  // 7. User adds a note to a page
  it('Adds scalar note to a page', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.get('a[id="editIcon"]').click();
    cy.wait(4000);
    cy.typeAndSelectCke("Note text");
    cy.wait(1000);
    cy.get('a[title="Insert Scalar Note"]').click();
    cy.wait(1000)
    cy.get('a').contains('Create page on-the-fly').click()
    cy.wait(1000)
    cy.get('input[id="onthefly-title"]').type('On');
    cy.get('input[id="onthefly-desc"]').type('The');
    cy.get('textarea[id="onthefly-content"]').type('Fly');
    cy.get('a').contains('Save and link').click();
    cy.get('input[value="Continue"]').click();
  });

  // 8. User creates a path
  it('Creates a path', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.wait(1000);
    cy.createPage('Test Page 2', 'This is a second test page');
    cy.wait(1000);
    cy.createPage('Test Page 3', 'This is a third test page');
    cy.wait(1000);
    cy.get('a[id="editIcon"]').click();
    cy.wait(3000);
    cy.get('li').contains('Relationships').click();
    cy.wait(1000);
    cy.get('a[href="#path-pane"]').click();
    cy.get('a').contains('choose the items that it contains').click();
    cy.get('input[type="checkbox"]').filter(':visible').first().check();
    cy.get('a').contains('Add Selected').click();
    cy.wait(2000);
    cy.contains('This page is a path which contains').should('have.length', 1)
    cy.get('input').contains('Save and view').click();
    cy.wait(1000);
  });

  // 9. User creates a tag
  it('Creates tags', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.get('a[id="editIcon"]').click();
    cy.wait(3000);
    cy.get('li').contains('Relationships').click();
    cy.wait(1000);
    cy.get('a[href="#tag-pane"]').click();
    cy.get('a').contains('choose the items that it tags').click();
    cy.get('input[type="checkbox"]').filter(':visible').first().check();
    cy.get('a').contains('Add Selected').click();
    cy.wait(2000);
    cy.contains('This page is a tag of').should('have.length', 1);
    cy.get('input').contains('Save and view').click();
    cy.wait(1000);
  });

  // 11. User hides a page
  it('Hides a page', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.createPage('Test Page 4', 'This is a fourth test page');
    cy.get('a[id="deleteIcon"]').click();
    cy.contains('This page is hidden to the public').should('have.length', 1);
  });

  // 12. User adds items to the table of contents
  it('Adds items to the table of contents', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.get('a[id="optionsIcon"]').click();
    cy.contains('Add table of contents item').click();
    cy.get('label').contains('Pages').click();
    cy.wait(1000)
    cy.get('label').contains('Check all').click();
    cy.get('a').contains('Add Selected').click();
    cy.get('ol').children('li').should('have.length', 4);
  });

  // 13. User accesses index
  it('User accesses index', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.get('ul[class="dropdown-menu mainMenuDropdown"]').invoke('show');
    cy.get('li[id="indexLink"]').click();
    cy.wait(1000);
    cy.get('li').contains('Paths').click();
    cy.get('tr').should('have.length', 1);
    cy.get('li').contains('Tags').click();
    cy.get('tr').should('have.length', 1);
    cy.get('li').contains('Pages').click();
    cy.get('tr').should('have.length', 4);
    cy.get('li').contains('Media').click();
    cy.get('tr').should('have.length', 1);
  });

  // 14. User accesses a recent item
  it('User accesses a recent item', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.wait(1000);
    cy.get('a[id="wayfindingIcon"]').trigger('mouseover');
    cy.get('li[id="recent_menu"]').trigger('mouseover');
    cy.get('li[id="recent_menu"]').children('ul').children().first().click();
  });

  // 15. User accesses the "current" visualization
  it('User accesses the "current" visualization', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.wait(1000);
    cy.get('a[id="wayfindingIcon"]').trigger('mouseover');
    cy.get('li[id="vis_menu"]').trigger('mouseover');
    cy.get('li[id="vis_menu"]').children('ul').children().first().click();
    cy.wait(1000);
    cy.get('h2').contains('Visualization').should('have.length', 1);
  });

  // 16. User performs a search
  it('Performs a search', () => {
    cy.loginScalar();
    cy.get('a').contains('Cypress Test Book').click();
    cy.get('a[id="searchIcon"]').click();
    cy.get('input[title="Search this book"]').type('foo{enter}');
    cy.get('h2').contains('Search Results').should('have.length', 1);
  });

  //this should be last
  it('deletes the book', () => {
    cy.loginScalar();
    cy.get('a').contains('Dashboard').click();
    cy.get('a').contains('Tools').click();
    cy.get('input[value="get_recent_book_list"]').next('input').click();
    cy.get('a').contains('Cypress Test Book').prev('label').click();
    cy.get('input[value="Delete selected books"]').click();
    cy.contains('error').should('have.length', 0);
  });

});