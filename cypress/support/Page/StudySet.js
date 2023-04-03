import Utils from "../Utils";
const utilsObj = new Utils();

class StudySet {
  studySetCreate = 'button[data-cy="studysets-create-studyset-button"]';
  studySetName = 'input[data-cy="create-edit-studyset-studyset-name-input"]';
  dateButton = '.mdc-icon-button';
  currentMonth = '.mat-calendar-period-button span.mdc-button__label'
  calenderNextButton = '.mat-calendar-next-button';
  calenderDate = 'tbody.mat-calendar-body tr td';
  toggle = '#toggle';
  createButton = 'button[data-cy="create-edit-studyset-create-button"]';
  studySet = 'div[data-cy="studyset-card"]';
  color='.color-wrapper  [data-color="purple"]'


  clickOnCreateStudySetButton() {
    utilsObj.elementIsPresent(this.studySetCreate);
    cy.get(this.studySetCreate).click();
  }

  enterStudySetName(name) {
    utilsObj.elementIsPresent(this.studySetName);
    cy.get(this.studySetName).type(name);
  }

  selectColor() {
    cy.get(this.color).click();
  }

  clickOnDatePicker() {
    cy.get(this.dateButton).click();
  }

  /**
    * @description Selecting month and year  as 'JUN 2023'
    * @param  {string} month
  */
  selectMonthAndYear(Month) {
    cy.get(this.currentMonth).invoke('text').then(text => {
      let currentMonth = text.toString().trim();
      if (currentMonth != Month) {
        cy.get(this.calenderNextButton).click({ multiple: true });
        this.selectMonthAndYear(Month);
      }
    })
  }

  /**
    * @description Selecting date  as '12'
    * @param  {string} date
  */
  selectDate(date) {
    cy.get(this.calenderDate).each(($el) => {
      if (Cypress.$($el).text().trim() === date) {
        cy.wrap($el).click();
      }
    })
  }

  switchToggle() {
    cy.get(this.toggle).click({ force: true });
  }

  getCreateButtonColor(){
    cy.get(this.createButton).invoke('attr','data-color').should('eq',"3");
  }

  clickOnCreateButton() {
    cy.get(this.createButton).click();
  }

  validateStudySetName(name) {
    cy.contains('p', name).should('be.visible')
  }

  clickOnStudySet() {
    cy.get(this.studySet).eq(0).click();
  }

}
export default StudySet;