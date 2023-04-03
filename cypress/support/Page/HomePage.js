import Utils from "../Utils";
const utilsObj = new Utils();

class HomePage {
    library = '.nav-text';

    clickOnLibrary() {
        utilsObj.elementIsPresent(this.library);
        cy.get(this.library).contains('Library').click({ force: true });
    }
}
export default HomePage;