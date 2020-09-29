describe('Test connection while not logged in', () => {
    beforeEach(() => {
      cy.visit('http://192.168.1.14:8080/')
    })
    
      it('Visit website without authorization', () => {
        cy.visit('http://192.168.1.14:8080/myProfile/')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
        cy.visit('http://192.168.1.14:8080/ListSuveys/')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
        cy.visit('http://192.168.1.14:8080/CreateSurvey/')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
        cy.visit('http://192.168.1.14:8080/ListUsers/')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
        cy.visit('http://192.168.1.14:8080/EditSurvey/3')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
        cy.visit('http://192.168.1.14:8080/CreateQuestion/category/title')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
        cy.visit('http://192.168.1.14:8080/AddQuestion/8')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
        cy.visit('http://192.168.1.14:8080/EditQuestion/3')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
        cy.visit('http://192.168.1.14:8080/EditMyProfile/8')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
        cy.visit('http://192.168.1.14:8080/Vote/category/title/4/2')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
        cy.visit('http://192.168.1.14:8080/Consult/category/title/idS')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
        
      })

      it('Visit page for admin while logged in', () => {
        cy.contains('Sign in').click()
        cy.get('#Username').type("lolo2")
        cy.get('#Password').type("toto123")
        cy.contains('Submit').click()
        cy.location().should((loc)=>{
          expect(loc.pathname).to.eq('/ListSuveys')
        })
        cy.visit('http://192.168.1.14:8080/ListUsers/')
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/ListSuveys')
        })
        
    })
  
    })