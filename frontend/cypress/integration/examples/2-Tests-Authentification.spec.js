describe('Authentification (Sign up + Sign in)', () => {
    beforeEach(() => {
      cy.visit('http://192.168.1.14:8080/')
    })
    
      it('Visit Your Custom Survey', () => {
        cy.contains('YCS') 
        
      })
  
      it('Sign up without enter credentials', () => {
        cy.contains('Sign up').click()
        cy.contains('Submit').click().then(() => {
          cy.get('.error-message')
        })
        //We enter the username only
        cy.get('#Username').type("lolo")
        cy.contains('Submit').click().then(() => {
          cy.get('.error-message')
        })

        cy.get('#FirstName').type("lolo")
        cy.contains('Submit').click().then(() => {
            cy.get('.error-message')
          })

        cy.get('#LastName').type("lolo")
        cy.contains('Submit').click().then(() => {
            cy.get('.error-message')
          })

        cy.get('#Birthdate').type("1999-12-27")
        cy.contains('Submit').click().then(() => {
            cy.get('.error-message')
          })

        cy.get('#Phone').type("0123456789")
        cy.contains('Submit').click().then(() => {
            cy.get('.error-message')
          })

        cy.get('#Email').type("lolo@kk.fd")
        cy.contains('Submit').click().then(() => {
            cy.get('.error-message')
          })

        cy.get('#Password').type("lolo")
        cy.contains('Submit').click().then(() => {
            cy.get('.error-message')
          })
          
        cy.get('#ConfirmPassword').type("lolo")
        cy.contains('Submit').click().then(() => {
              cy.get('.error-message')
            })
         
        cy.get('#Email').clear()
        cy.get('#Gender1').type("lolo").check()
        cy.contains('Submit').click().then(() => {
            cy.get('.error-message')
          })
  
      })

      it('Sign up with wrong number phone', () => {
        cy.contains('Sign up').click()
        
        cy.get('#Username').type("lolo")
        cy.get('#FirstName').type("lolo")
        cy.get('#LastName').type("lolo")
        cy.get('#Birthdate').type("1999-12-27")
        cy.get('#Phone').type("azert")
        cy.get('#Email').type("lolo@kk.fd")
        cy.get('#Password').type("lolo")
        cy.get('#ConfirmPassword').type("lolo")
        cy.get('#Gender1').check()
        cy.contains('Submit').click().then(() => {
            cy.get('.swal-text').contains('You entered a wrong number phone') 
            cy.get('.swal-button').click()
          })
  
      })

      it('Sign up with wrong confirmation password', () => {
        cy.contains('Sign up').click()
        
        cy.get('#Username').type("lolo")
        cy.get('#FirstName').type("lolo")
        cy.get('#LastName').type("lolo")
        cy.get('#Birthdate').type("1999-12-27")
        cy.get('#Phone').type("0123456789")
        cy.get('#Email').type("lolo@kk.fd")
        cy.get('#Password').type("lolo")
        cy.get('#ConfirmPassword').type("lolo2")
        cy.get('#Gender1').check()
        cy.contains('Submit').click().then(() => {
            cy.get('.swal-text').contains("You didn't enter 2 times the same password") 
            cy.get('.swal-button').click()
          })
  
      })

      it('Sign up', () => {
        cy.contains('Sign up').click()
        
        cy.get('#Username').type("lolo")
        cy.get('#FirstName').type("lolo")
        cy.get('#LastName').type("lolo")
        cy.get('#Birthdate').type("1999-12-27")
        cy.get('#Phone').type("0123456789")
        cy.get('#Email').type("lolo@kk.fd")
        cy.get('#Password').type("lolo22")
        cy.get('#ConfirmPassword').type("lolo22")
        cy.get('#Gender1').check()
        cy.contains('Submit').click().then(() => {
            cy.get('.swal-text').contains("You have been registered!") 
            cy.get('.swal-button').click()
          })
        cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/SignIn')
        })
  
      })
  
      it('Log in without enter credentials', () => {
        cy.contains('Sign in').click()
        cy.contains('Submit').click().then(() => {
          cy.get('.error-message')
        })
        //We enter the username only
        cy.get('#Username').type("lolo")
        cy.contains('Submit').click().then(() => {
          cy.get('.error-message')
        })
  
        //We enter the password only
        cy.get('#Username').clear()
        cy.get('#Password').type("lol")
        cy.contains('Submit').click().then(() => {
          cy.get('.error-message')
        })
  
      })
  
      it('Log in with wrong username', () => {
        cy.contains('Sign in').click()
        cy.get('#Username').type("lolo789")
        cy.get('#Password').type("lol")
        cy.contains('Submit').click().then(() => {
          cy.get('.swal-text').contains('The username is wrong') 
          cy.get('.swal-button').click()
        })
        
      })
  
      it('Log in with wrong password', () => {
        cy.contains('Sign in').click()
        cy.get('#Username').type("lolo")
        cy.get('#Password').type("lol")
        cy.contains('Submit').click().then(() => {
          cy.get('.swal-text').contains('The password is wrong') 
          cy.get('.swal-button').click()
        })
  
      })
  
      it('Log in with proper credentials', () => {
        cy.contains('Sign in').click()
        cy.get('#Username').type("lolo")
        cy.get('#Password').type("lolo22")
        cy.contains('Submit').click()
        cy.location().should((loc)=>{
          expect(loc.pathname).to.eq('/ListSuveys')
        })
        cy.contains('Surveys List') 
        cy.visit('http://192.168.1.14:8080/')
        cy.location().should((loc)=>{
          expect(loc.pathname).to.eq('/ListSuveys')
        })
      })
  
     
    })