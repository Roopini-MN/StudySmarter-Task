// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/// <reference types="Cypress" />

const filename = 'cypress/fixtures/user.json';

Cypress.Commands.add('register', (url, email, pass) => {
    cy.session([email, pass], () => {
        cy.visit("https://demo.studysmarter-test.de/");
        cy.request({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                email: email,
                platform: "web",
                language: "en",
                signup_location: "webapp",
                delayed_confirmation_possible: true,
                password: pass,
            }
        }).then((response)=> {
            expect(response.status).to.eq(201);
        })
    })
})

Cypress.Commands.add('login', (url, email, pass) => {
    cy.visit('https://demo.studysmarter-test.de/');
    cy.request({
        method: 'POST',
        url: url,
        body: {
            username: email,
            password: pass
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        let userId = response.body.id;
        let token = response.body.token;
        window.localStorage.setItem('currentUser', `{"token":"${response.body.token}","id":${response.body.id},"language":"${response.body.language}"}`);
        cy.readFile(filename).then((obj) => {
            obj.userid = userId;
            obj.token = token;
            cy.writeFile(filename, obj)
        })
    })
})

Cypress.Commands.add('patchUserDetails', (url) => {
    cy.readFile(filename).then(value => {
        cy.request({
            method: 'PATCH',
            url: url + value.userid + '/',
            headers: {
                'Authorization': 'Token ' + value.token
            },
            body: {
                university: 1,
                degree: 1,
                course_of_studies: 3,
                study_start_year: 2023,
                onboarding_completed: true
            }
        }).then((response)=> {
            expect(response.status).to.eq(200);
        })
    })
})