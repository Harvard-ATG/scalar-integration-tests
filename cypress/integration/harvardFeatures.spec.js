import { onlyOn } from '@cypress/skip-test'
onlyOn('harvard-test', ()=> {
  describe("Harvard-specific Features", () => {
    // Test if login features Harvard key login
    // https://github.com/Harvard-ATG/scalar/pull/2
    it("Check if login features Harvard key option", () => {
      cy.visit("/");
      cy.get("a").contains("Sign in").click();
      cy.get("a").contains("Continue with Harvard Key System");
    });

    // https://github.com/Harvard-ATG/scalar-plugin-harvardsettings
    it('Checks if "Harvard Settings" is present in menu tabs', () => {
      cy.loginScalar();
      cy.get("a").contains("Dashboard").click();
      cy.get("a").contains("Harvard Settings");
      cy.get("a").contains("My account").click();
      cy.get('input[value="New book title"]').type("Features Test Book");
      cy.get('input[value="Create"]').click();
    });
    //   https://github.com/Harvard-ATG/scalar/pull/3
    it("Allow book owner to search for users by name or email.", () => {
      cy.loginScalar();
      cy.get("a").contains("Dashboard").click();
      cy.get('select[name="book_id"]').select("Features Test Book").wait(3000);
      cy.get('a[href="#tabs-users"]').contains("Book users").click();
      cy.get("#connect_book_user_link")
        .contains("Add a user (admin)")
        .click()
        .wait(3000);
      // lookup by email
      cy.get('input[name="searchValue"]')
        .type(Cypress.env("testUser"))
        .wait(3000);
      cy.get('div[class="results"]').contains(Cypress.env("testUser"));
      //  lookup by user full name
      cy.get('input[name="searchValue"]').clear();
      cy.get('input[name="searchValue"]')
        .type(Cypress.env("testUserFullName"))
        .wait(3000);
      cy.get('div[class="results"]').contains(Cypress.env("testUserFullName"));
    });

    // https://github.com/Harvard-ATG/scalar/pull/18
    it('Checks if "My Pages" and "My Media" is present in "Categories" "Media" tab respectively', () => {
      cy.loginScalar();
      cy.get("a").contains("Dashboard").click();
      cy.get("a").contains("My account").click();
      cy.get('select[name="book_id"]').select("Features Test Book");
      cy.wait(3000);
      cy.get('a[href="#tabs-categories"]')
        .contains("Categories")
        .click({ force: true });
      cy.get('input[id="my_pages"]').click().wait(3000);
      cy.get('a[href="#tabs-media"]').contains("Media").click({ force: true });
      cy.get('input[id="my_media"]').click();
    });

    //   https://github.com/Harvard-ATG/scalar/pull/16
    it("Test Mirador fix - multiple mirador instances on the page", () => {
      const bookNamePrefix = "features-test-book";
      cy.loginScalar();
      cy.get("a").contains("Dashboard").click();
      cy.get("a").contains("My account").click();
      cy.get('select[name="book_id"]').select("Features Test Book");
      cy.wait(3000);
      cy.get("a").contains("Back to book").click();
      cy.wait(3000);

      // Add example art museum manifest
      cy.addManifest(
        "168614",
        bookNamePrefix,
        "https://iiif.harvardartmuseums.org/manifests/object/168614"
      ).wait(3000);
      cy.addManifest(
        "342292",
        bookNamePrefix,
        "https://iiif.harvardartmuseums.org/manifests/object/342292"
      ).wait(3000);
      // add to page
      cy.get(`a[href$="${bookNamePrefix}/new.edit"]`).click();
      cy.get("#title").type("Test Page", { timeout: 30000 });
      cy.get("#page_description").type("Test Page");
      cy.get("#cke_37").click();
      cy.wait(3000);
      cy.get("tbody")
        .find('td[property="description"]')
        .contains("168614")
        .click();
      cy.get('input[value="Continue"]').click({ timeout: 30000 });
      cy.get("#cke_37").click();
      cy.wait(3000);
      cy.get("tbody")
        .find('td[property="description"]')
        .contains("342292")
        .click();
      cy.get('input[value="Continue"]').click({ timeout: 30000 });
      cy.get('input[value="Save and view"]').click().wait(3000);

      // check if contains 2 mirador instances
      cy.get('div[class="mosaic-root"]').should("have.length", 2);

      // delete media
      cy.wait(5000);
      cy.get('a[tabindex="-1"]').contains("Account").click({ force: true });
      cy.wait(3000);
      cy.get('a[href="#tabs-media"]')
        .contains("Media")
        .click({ timeout: 30000 })
        .wait(4000);
      cy.get("#check_all").click();
      cy.get('input[value="Delete selected files"]').click().wait(4000);

      // delete pages
      cy.get('a[href="#tabs-pages"]')
        .contains("Pages")
        .click({ timeout: 30000 })
        .wait(4000);
      cy.get("#check_all").click();
      cy.get('input[value="Delete selected content"]').click().wait(4000);

      // delete book
      cy.get('a[href="#tabs-tools"]').contains("Tools").click().wait(4000);
      cy.get('input[value="get_recent_book_list"]').next("input").click();
      cy.get("a").contains("Features Test Book").prev("label").click();
      cy.get('input[value="Delete selected books"]').click();
      cy.contains("error").should("have.length", 0);
    });
  });
});