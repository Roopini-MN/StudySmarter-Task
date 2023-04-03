import Utils from "../Utils";
const utilsObj = new Utils();

class FlashCard {
    flashcardTab = '#flashcardsTab';
    flashCardCreateButton = 'button[data-cy="flashcard-grid-actions-create-button"]';
    flashCardQuestion = '[data-cy="create-edit-flashcard-question-input"]';
    flashCardAnswer = '[data-cy="create-edit-flashcard-answer-input"]';
    flashCardShareSelection = '[data-cy="share-selection-public-button"]';
    flashCardOption = '.options-dropdown ui-option'
    flashCardCreate = '[data-cy="create-flashcard-create-edit-button"]';
    flashCardItem = '.question.fr-view';
    flashCardMenu = '[data-cy="single-flashcard-toolbar-menu-button"]';
    deleteOption = '.ui-menu-item.delete';
    okButton = '[data-cy="simple-dialog-buttons"] .ui-primary-button';
    noFlashCardText = '[data-cy="no-flashcards-text"]';

    clickOnFlashCardTab() {
        cy.get(this.flashcardTab).click();
    }

    clickOnCreateFlashCardButton() {
        utilsObj.elementIsPresent(this.flashCardCreateButton);
        cy.get(this.flashCardCreateButton).click();
    }

    enterQuestion(question) {
        cy.get(this.flashCardQuestion).clear();
        cy.get(this.flashCardQuestion).type(question);
    }

    enterAnswer(answer) {
        cy.get(this.flashCardAnswer).clear();
        cy.get(this.flashCardAnswer).type(answer);
    }

    clickOnShareSelection() {
        utilsObj.elementIsPresent(this.flashCardShareSelection);
        cy.get(this.flashCardShareSelection).click();
    }

    /**
     * @description Selecting share option as 'Private'
     * @param  {string} option
     */
    selectShareOption(option) {
        cy.get(this.flashCardOption).each(el => {
            let text = el.text();
            if (text == option) {
                cy.wrap(el).click();
            }
        })
    }

    clickOnCreate() {
        utilsObj.elementIsPresent(this.flashCardCreate);
        cy.get(this.flashCardCreate).click();
    }

    validateFlashCardIsPresent(question) {
        utilsObj.elementIsPresent(this.flashCardItem);
        cy.get(this.flashCardItem).eq(0).invoke('text').should('eq', question);
    }

    validateFlashCardIsNotPresent() {
        utilsObj.elementIsPresent(this.noFlashCardText);

    }

    clickOnMenuButton() {
        utilsObj.elementIsPresent(this.flashCardMenu);
        cy.get(this.flashCardMenu).click();
    }

    selectDeleteOption() {
        cy.get(this.deleteOption).click();
    }

    clickOnOk() {
        cy.get(this.okButton).click();
    }

}
export default FlashCard;