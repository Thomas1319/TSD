describe('Tests filter functions', () => {
    beforeEach(() => {
      cy.visit('http://192.168.1.14:8080/')
      cy.contains('Sign in').click()
      cy.get('#Username').type("lolo")
      cy.get('#Password').type("lolo22")
      cy.contains('Submit').click()
      cy.wait(300)
      cy.location().should((loc)=>{
        expect(loc.pathname).to.eq('/ListSuveys')
      })
    })
    
      it('Filter survey list with category', () => {
        cy.contains("Napoleon")
        cy.get("#Category").select("History").then(() => {
            cy.contains('Vote').click()
            cy.get('.statement').should("contain","Do you know Napoleon ?")
            cy.visit('http://192.168.1.14:8080/')
          })
          cy.get("#Category").select("Cultural(movies, books ...)").then(() => {
            cy.contains('Vote').click()
            cy.get('.statement').should("contain","Do you prefer :")
          })
        
      })

      it('Filter survey list by serach', () => {
        cy.contains("Napoleon")
        cy.get("#search").type("M").should("have.value","M").then(() => {
            cy.contains('Vote').click()
            cy.get('.statement').should("contain","Do you prefer :")
            cy.visit('http://192.168.1.14:8080/')
          })
          cy.get("#search").clear().type("S").should("have.value","S").then(() => {
            cy.contains('Vote').click()
            cy.get('.statement').should("contain","What french food do you like ?")
          })
        
      })

})