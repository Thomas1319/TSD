describe('Test functions related to Survey', () => {
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
      cy.contains('Create a Survey').click()
      cy.location().should((loc)=>{
        expect(loc.pathname).to.eq('/CreateSurvey')
      })
    })
    
      it('Submit witout enter parameter', () => {
        cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
        cy.get('#name').type("unitTest").should("have.value","unitTest");
        cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
        cy.get('#name').clear().should("have.value","");
        cy.get('#Category').select('Health').should("have.value","Health");
        cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
        
      })

      it('Submit to create new survey with proper parameter', () => {
        cy.get('#Category').select('Health').should("have.value","Health");
        cy.get('#name').type("unitTest").should("have.value","unitTest");
        cy.get("form").submit().then(() => {
            cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/CreateQuestion/Health/unitTest')
              })
          })
        
      })

      it('Submit to create new question without parameter', () => {
        cy.get('#Category').select('Health').should("have.value","Health");
        cy.get('#name').type("unitTest").should("have.value","unitTest");
        cy.get("form").submit().then(() => {
            cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/CreateQuestion/Health/unitTest')
              })
          })
          cy.contains('unitTest')
          cy.contains('Health')
          cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
          cy.get('#statement').type("Do you think it's a unit test?").should("have.value","Do you think it's a unit test?");
          cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
          cy.get('#Answer1').type("Yes").should("have.value","Yes");
          cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
          cy.get('#Answer2').type("No").should("have.value","No");
          cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })

          cy.get('#answerType1').check()
          cy.get('#Answer1').clear().should("have.value","");
          cy.get("form").submit().then(() => {
            cy.get('.error-message')
          })
          cy.contains("Save Survey").click().then(() => {
            cy.get('.error-message')
          })
        
        
      })

     it('Create Survey with 2 questions', () => {
        cy.get('#Category').select('Health').should("have.value","Health");
        cy.get('#name').type("unitTest").should("have.value","unitTest");
        cy.get("form").submit().then(() => {
            cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/CreateQuestion/Health/unitTest')
              })
          })
          cy.contains('unitTest')
          cy.contains('Health')
          cy.get('#statement').type("Do you think it's a unit test?").should("have.value","Do you think it's a unit test?");
          cy.get('#Answer1').type("Yes").should("have.value","Yes");
          cy.get('#Answer2').type("No").should("have.value","No");
          cy.get('#answerType1').check()
          cy.get("form").submit().then(() => {
            cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/CreateQuestion/Health/unitTest')
              })  
              cy.get('#statement').should("have.value","");
              cy.get('#Answer1').should("have.value","");
              cy.get('#Answer2').should("have.value","");
          })
          cy.get('#answerType2').check()
          cy.get('#statement').type("Right now, are you hungry?").should("have.value","Right now, are you hungry?");
          cy.get('#Answer1').type("Yes").should("have.value","Yes");
          cy.get('#Answer2').type("No").should("have.value","No");
          cy.get('#Answer3').type("A little").should("have.value","A little");
          cy.contains("Save Survey").click().then(() => {
            cy.get('.swal-title').contains('Survey Created!') 
            cy.get('.swal-button').click()
            cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/ListSuveys')
              })
          })
      })

      it('Vote the survey', () => {
        cy.visit('http://192.168.1.14:8080/')
        cy.wait(1000)
        cy.contains('Result').click()
        cy.get('#1').should("contain","0");
        cy.get('#2').should("contain","0");
        cy.contains('My Profile').click()
        cy.location().should((loc)=>{
          expect(loc.pathname).to.eq('/myProfile')
        })
        cy.contains('Vote').click()
        cy.get('.statement').should("contain","Do you think it's a unit test?")
        cy.get('.NumberQ').should("contain","1")
        cy.get("form").submit().then(() => {
          cy.get('.error-message')
        })
        cy.get('#Answer1').check()
        cy.get("form").submit().then(() => {
          cy.get('.NumberQ').should("contain","2")
        })
        cy.get("form").submit().then(() => {
          cy.get('.error-message')
        })
        cy.get('#Answer2').check()
        cy.get('#Answer3').check()
        cy.get("form").submit().then(() => {
          cy.get('.swal-title').contains('Survey completed!') 
            cy.get('.swal-text').contains('Thank you :)') 
            cy.get('.swal-button').click()
          cy.location().should((loc)=>{
            expect(loc.pathname).to.eq('/ListSuveys')
          })
        })
        cy.wait(1000)
        cy.contains('Result').click()
        cy.get('#1').should("contain","1");
        cy.get('#2').should("contain","2");

        
      })

       it('Add a question to the survey (with all test with missed parameters', () => {
            cy.visit('http://192.168.1.14:8080/')
            cy.wait(1000)
            cy.contains('Edit').click()
            cy.get("#surveyTitle").should("contain","unitTest")
            cy.get('#NewQuestion').click()
            cy.get("#surveyTitle").should("contain","unitTest")
            cy.get("#numberQ").should("contain","3")
            cy.get("form").submit().then(() => {
              cy.get('.error-message')
            })
            cy.get('#statement').type("Do you think it's another question for unit test?").should("have.value","Do you think it's another question for unit test?");
            cy.get('#Answer1').type("Yes").should("have.value","Yes");
            cy.get("form").submit().then(() => {
              cy.get('.error-message')
            })
            cy.get('#Answer2').type("No").should("have.value","No");
            cy.get("form").submit().then(() => {
              cy.get('.error-message')
            })
            cy.get('#Answer3').type("I don't care").should("have.value","I don't care");
            cy.get("form").submit().then(() => {
              cy.get('.error-message')
            })
            cy.get('#answerType1').check()
            cy.get('#Answer2').clear().should("have.value","");
            cy.get("form").submit().then(() => {
              cy.get('.error-message')
            })
            cy.get('#Answer2').type("No").should("have.value","No");
            cy.get("form").submit().then(() => {
              cy.get('.swal-title').contains('Added question!') 
              cy.get('.swal-text').contains('You add a new question to your survey') 
              cy.get('.swal-button').click()
              cy.get("#listSurvey").should("contain","Do you think it's another question for unit test?")
            }) 
          })

          it('Edit the 1st question of the survey (with all tests with missed parameters)', () => {
            cy.visit('http://192.168.1.14:8080/')
            cy.wait(1000)
            cy.contains('Edit').click()
            cy.get("#surveyTitle").should("contain","unitTest")
            cy.get('#1').contains("Edit").click()
            cy.get("#surveyTitle").should("contain","unitTest")
            cy.get("#numberQ").should("contain","1")
            cy.get("#TitlePage").should("contain","You are editing a question")
            cy.get("#TitlePage").should("contain","You are editing a question")
            cy.get('#statement').should("have.value","Do you think it's a unit test?");
            cy.get('#Answer1').should("have.value","Yes");
            cy.get('#Answer2').should("have.value","No");
            cy.get('#Answer2').clear().should("have.value","");
            cy.get("form").submit().then(() => {
              cy.get('.error-message')
            })
            cy.log("Check if it will take account the error if we leave the form")
            cy.visit('http://192.168.1.14:8080/')
            cy.wait(1000)
            cy.contains('Edit').click()
            cy.get("#surveyTitle").should("contain","unitTest")
            cy.get('#1').contains("Edit").click()
            cy.get("#surveyTitle").should("contain","unitTest")
            cy.get("#numberQ").should("contain","1")
            cy.get("#TitlePage").should("contain","You are editing a question")
            cy.get("#TitlePage").should("contain","You are editing a question")
            cy.get('#statement').should("have.value","Do you think it's a unit test?");
            cy.get('#Answer1').should("have.value","Yes");
            cy.get('#Answer2').should("have.value","No");
            cy.get('#Answer1').clear().should("have.value","");
            cy.get("form").submit().then(() => {
              cy.get('.error-message')
            })
            cy.get('#Answer1').type("Yes").should("have.value","Yes");
            cy.get('#statement').clear().should("have.value","");
            cy.get("form").submit().then(() => {
              cy.get('.error-message')
            })
            cy.get('#statement').type("Do you think it's a unit test? V2").should("have.value","Do you think it's a unit test? V2");
            cy.get('#Answer2').type(", I don't").should("have.value","No, I don't");
            cy.get('#Answer3').type("Another answer for unit test").should("have.value","Another answer for unit test");
            cy.get("form").submit().then(() => {
              cy.get('.swal-text').contains('Congratulations! You edited a question.') 
              cy.get('.swal-button').click()
              cy.get("#listSurvey").should("contain","Do you think it's a unit test? V2")
            })

          })

            it('Delete a question', () => {
              cy.visit('http://192.168.1.14:8080/')
              cy.wait(1000)
              cy.contains('Edit').click()
              cy.get("#listSurvey")
              cy.get("#surveyTitle").should("contain","unitTest")

              cy.get('#2').contains("Delete").click().then(() => {
                cy.get('.swal-title').contains('Are you sure to have to delete this Question?') 
                cy.get('.swal-button--cancel').click().then(()=> {
                    cy.get("#listSurvey").contains("Right now, are you hungry?")
                })     
              })
              cy.get("#listSurvey").contains("Right now, are you hungry?")
              cy.wait(1000)
              cy.get('#2').contains("Delete").click().then(() => {
                cy.get('.swal-title').contains('Are you sure to have to delete this Question?') 
                cy.get('.swal-button--confirm').click().then(()=> {
                    cy.wait(200)
                    cy.get("#listSurvey").not().contains("Right now, are you hungry?")
                })     
              })
              cy.get("#listSurvey").not().contains("Right now, are you hungry?")
            
          })

          it('Vote the UPDATED survey (check if answers and question have been udapted correctly)', () => {
            cy.visit('http://192.168.1.14:8080/')
            cy.wait(1000)
            cy.contains('Result').click()
            cy.get('#1').should("contain","1");
            cy.get('#2').should("contain","0");
            cy.contains('My Profile').click()
            cy.location().should((loc)=>{
              expect(loc.pathname).to.eq('/myProfile')
            })
            cy.contains('Vote').click()
            cy.get('.statement').should("contain","Do you think it's a unit test? V2")
            cy.get('.NumberQ').should("contain","1")
            cy.get('#Answer3').should("have.value","Another answer for unit test")
            cy.get('#Answer1').should("have.value","Yes")
            cy.get('#Answer2').should("have.value","No, I don't")
            cy.get("form").submit().then(() => {
              cy.get('.error-message')
            })
            cy.get('#Answer3').check()
            cy.get("form").submit().then(() => {
              cy.get('.NumberQ').should("contain","2")
              cy.get('.statement').should("contain","Do you think it's another question for unit test?")
            })
            cy.get("form").submit().then(() => {
              cy.get('.error-message')
            })
            cy.get('#Answer3').should("have.value","I don't care")
            cy.get('#Answer1').should("have.value","Yes")
            cy.get('#Answer2').should("have.value","No")
            cy.get('#Answer2').check()

            cy.get("form").submit().then(() => {
              cy.get('.swal-title').contains('Survey completed!') 
                cy.get('.swal-text').contains('Thank you :)') 
                cy.get('.swal-button').click()
              cy.location().should((loc)=>{
                expect(loc.pathname).to.eq('/ListSuveys')
              })
            })

            cy.wait(1000)
            cy.contains('Result').click()
            cy.get('#1').should("contain","2");
            cy.get('#2').should("contain","1");
    
            
              })


    

      

    

    it('Delete the survey', () => {
        cy.contains('Surveys List').click()
        cy.contains('Delete').click().then(() => {
            cy.get('.swal-title').contains('Are you sure to have to delete this survey?') 
            cy.get('.swal-button--confirm').click()
            cy.wait(1000)
               // cy.get('.swal-text').contains('The survey has been deleted.') 
                cy.get('.swal-button').click()
           
        })
    })
  
   })