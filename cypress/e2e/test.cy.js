import FlashCard from "../support/Page/FlashCard";
import HomePage from "../support/Page/HomePage";
import StudySet from "../support/Page/StudySet";
import Utils from "../support/Utils";

let testData;
const utilsObj = new Utils();
const homeObj = new HomePage();
const studySetObj = new StudySet();
const flashCardObj = new FlashCard();

describe('Creation of Studyset and Flashcard', () => {
  before(() => {
    cy.fixture('data').then(data => {
      testData = data;
    });
  });

  it('Login to StudySmarter application', () => {
    cy.register(testData.registerUrl, testData.email, testData.password);
    cy.login(testData.loginUrl, testData.email, testData.password);
    cy.patchUserDetails(testData.patchRequestUrl);
    cy.visit(testData.url);
    utilsObj.validatePageTitle(testData.homePageTitle);
  })

  it('Create Study Set', () => {
    cy.login(testData.loginUrl,testData.email, testData.password);
    cy.visit(testData.url);
    homeObj.clickOnLibrary();
    utilsObj.validatePageTitle(testData.libraryPageTitle);
    studySetObj.clickOnCreateStudySetButton();
    studySetObj.enterStudySetName(testData.studySetName);
    studySetObj.selectColor();
    studySetObj.getCreateButtonColor();
    studySetObj.clickOnDatePicker();
    studySetObj.selectMonthAndYear(testData.monthYear);
    studySetObj.selectDate(testData.date);
    studySetObj.switchToggle();
    studySetObj.clickOnCreateButton();
    studySetObj.validateStudySetName(testData.studySetName);
  })

  it('Create Flash Card', () => {
    cy.login(testData.loginUrl,testData.email, testData.password);
    cy.visit(testData.url);
    homeObj.clickOnLibrary();
    flashCardObj.clickOnFlashCardTab();
    flashCardObj.clickOnCreateFlashCardButton();
    flashCardObj.enterQuestion(testData.question);
    flashCardObj.enterAnswer(testData.answer);
    flashCardObj.clickOnShareSelection();
    flashCardObj.selectShareOption(testData.shareOption);
    flashCardObj.clickOnCreate();
  })

  it('Validate Created FlashCard', () => {
    cy.login(testData.loginUrl,testData.email, testData.password);
    cy.visit(testData.url);
    homeObj.clickOnLibrary();
    studySetObj.clickOnStudySet();
    flashCardObj.clickOnFlashCardTab();
    flashCardObj.validateFlashCardIsPresent(testData.question);
  })

  it('Delete FlashCard', () => {
    cy.login(testData.loginUrl,testData.email, testData.password);
    cy.visit(testData.url);
    homeObj.clickOnLibrary();
    studySetObj.clickOnStudySet();
    flashCardObj.clickOnFlashCardTab();
    flashCardObj.clickOnMenuButton();
    flashCardObj.selectDeleteOption();
    flashCardObj.clickOnOk();
    flashCardObj.validateFlashCardIsNotPresent();
  })
}) 