import { Builder, By, until, WebDriver } from "selenium-webdriver";

jest.setTimeout(30000);

describe("Chatbot UI Tests", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://rba-chatbot-assignment.onrender.com/");

    const keyInput = await driver.findElement(By.css("[data-testid='api-key-input']"));
    await keyInput.sendKeys("B0T_1N_TH3_B4NK");

    const saveBtn = await driver.findElement(By.css("[data-testid='save-key-btn']"));
    await saveBtn.click();
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  it("should load chatbot interface", async () => {
    const chatCard = await driver.findElement(By.css("[data-testid='chat-card']"));
    expect(chatCard).toBeDefined();
  });
});
