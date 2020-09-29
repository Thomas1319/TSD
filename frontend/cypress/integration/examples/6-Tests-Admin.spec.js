describe('Test for delete user function', () => {
    beforeEach(() => {
      cy.visit('http://192.168.1.14:8080/')
      cy.contains('YCS')
      cy.contains('Sign in').click()
        cy.get('#Username').type("Antoine123")
        cy.get('#Password').type("12345")
        cy.contains('Submit').click()
        cy.location().should((loc)=>{
          expect(loc.pathname).to.eq('/ListSuveys')
        })
        cy.get('nav').should("contain","List Users")
        cy.contains('Surveys List') 
        cy.visit('http://192.168.1.14:8080/')
        cy.location().should((loc)=>{
          expect(loc.pathname).to.eq('/ListSuveys')
        })
    })

    it('Delete a user', () => {
        cy.get('nav').contains('List Users').click()
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/ListUsers')
          })
        cy.get('#wherePage').should("contain","User list")
        cy.get('#lolo').contains("Delete").click().then(() => {
            cy.get('.swal-title').contains('Are you sure to have to delete this user?') 
            cy.get('.swal-button--cancel').click().then(()=> {
                cy.get("#lolo")
            }) 
          })
          cy.get("#lolo")
          cy.get('#lolo').contains("Delete").click().then(() => {
            cy.get('.swal-title').contains('Are you sure to have to delete this user?') 
            cy.get('.swal-button--confirm').click().then(()=> {
                cy.wait(500)
                cy.get('.swal-title').contains('Deleted!') 
                cy.get('.swal-text').contains('The user has been deleted.') 
                cy.get('.swal-button').click()
                cy.get("#lolo").not()
            })     
          })
          cy.get("#lolo").not()
        

      })

})