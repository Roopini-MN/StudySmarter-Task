class Utils{

    /**
     * @description get the title and validate with given string
     * @param {String} pageTitle: title of the page
     */
    validatePageTitle(pageTitle){
        cy.title().should('include',pageTitle);   
    }

   /**
     * @description get the element and validate if element is present
     * @param {String} element: element to be validated
     */
   elementIsPresent(element){
       cy.get(element).should('exist').and('be.visible');
    }
}
export default Utils;