describe("Test to check if the user's data are propers", () => {
    beforeEach(() => {
      cy.visit('http://192.168.1.14:8080/')
      cy.contains('YCS')
      cy.contains('Sign in').click()
        cy.get('#Username').type("lolo")
        cy.get('#Password').type("lolo22")
        cy.contains('Submit').click()
        cy.location().should((loc)=>{
          expect(loc.pathname).to.eq('/ListSuveys')
        })
        cy.get('nav').should("not.contain","List Users")
        cy.contains('Surveys List') 
        cy.visit('http://192.168.1.14:8080/')
        cy.location().should((loc)=>{
          expect(loc.pathname).to.eq('/ListSuveys')
        })
    })
  
      it('Check data in profile', () => {
        cy.contains('My Profile').click()
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/myProfile')
          })
        cy.get('#username').should("contain","lolo")
        cy.get('#firstname').should("contain","lolo")
        cy.get('#lastname').should("contain","lolo")
        cy.get('#birthdate').should("contain","1999-12-27")
        cy.get('#gender').should("contain","Male")
        cy.get('#phone').should("contain","0123456789")
        cy.get('#email').should("contain","lolo@kk.fd")
      })

      it('Edit data in profile (with test when we submit with missing data)', () => {
        cy.contains('My Profile').click()
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/myProfile')
          })
        cy.get('#username').should("contain","lolo")
        cy.get('#firstname').should("contain","lolo")
        cy.get('#lastname').should("contain","lolo")
        cy.get('#birthdate').should("contain","1999-12-27")
        cy.get('#gender').should("contain","Male")
        cy.get('#phone').should("contain","0123456789")
        cy.get('#email').should("contain","lolo@kk.fd")
        cy.get('#EditProfil').click().then(()=> {
            cy.get('#wherePage').should("contain","You are editing your profile")        
        })
        cy.get('#username').should("contain","lolo")
        cy.get('#firstName').should("have.value","lolo")
        cy.get('#LastName').should("have.value","lolo")
        cy.get('#birthdate').should("have.value","1999-12-27")
        cy.get('#Gender1').should("have.value","Male")
        cy.get('#phone').should("have.value","0123456789")
        cy.get('#email').should("have.value","lolo@kk.fd")
        cy.get('#firstName').clear().should("have.value","")
        cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
        cy.get('#firstName').type("Antoine").should("have.value","Antoine")
        cy.get('#LastName').clear().should("have.value","")
        cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
        cy.get('#LastName').type("Landrieu").should("have.value","Landrieu")
        cy.get('#phone').clear().should("have.value","")
        cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
        cy.get('#phone').type("0652411698").should("have.value","0652411698")
        cy.get('#email').clear().should("have.value","")
        cy.get("form").submit().then(() => {
              cy.get('.error-message')
            })
        cy.get('#email').type("antoine@gmail.com").should("have.value","antoine@gmail.com")
        cy.get("form").submit().then(() => {
            cy.get('.swal-title').contains('Congratulations!') 
            cy.get('.swal-text').contains('You have edited your profile') 
            cy.get('.swal-button').click()
            cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/myProfile')
              })
          })
          cy.get('#username').should("contain","lolo")
          cy.get('#firstname').should("contain","Antoine")
          cy.get('#lastname').should("contain","Landrieu")
          cy.get('#birthdate').should("contain","1999-12-27")
          cy.get('#gender').should("contain","Male")
          cy.get('#phone').should("contain","0652411698")
          cy.get('#email').should("contain","antoine@gmail.com")
        cy.log("We reload the page to check if we keep our data")
        cy.reload()
        cy.get('#username').should("contain","lolo")
          cy.get('#firstname').should("contain","Antoine")
          cy.get('#lastname').should("contain","Landrieu")
          cy.get('#birthdate').should("contain","1999-12-27")
          cy.get('#gender').should("contain","Male")
          cy.get('#phone').should("contain","0652411698")
          cy.get('#email').should("contain","antoine@gmail.com")

        
      })

     
     
    })