import { Builder, By, until, WebDriver, Key } from "selenium-webdriver";
import { testCases } from "../data/testCases";
import { API_KEY } from "../config/constants";
import * as fs from "fs";

jest.setTimeout(60000);

describe("Chatbot UI Tests", () => {
  let driver: WebDriver;
  let conversation: { query: string; reply: string; intent: string }[] = [];

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://rba-chatbot-assignment.onrender.com/");
    
    await driver.wait(until.elementLocated(By.css("[data-testid='api-key-input']")), 10000);
    const keyInput = await driver.findElement(By.css("[data-testid='api-key-input']"));
    await keyInput.clear();
    await keyInput.sendKeys(API_KEY);

    const saveBtn = await driver.findElement(By.css("[data-testid='save-key-btn']"));
    await saveBtn.click();

    await driver.wait(until.elementLocated(By.css("[data-testid='chat-card']")), 10000);
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }

    if (conversation.length > 0) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `reports/chatbot-conversation-${timestamp}.txt`;
      if (!fs.existsSync("reports")) {
        fs.mkdirSync("reports");
      }
      
      let logContent = "Chatbot Test Conversation Log\n\n";
      logContent += `Total queries tested: ${conversation.length}\n\n`;

      conversation.forEach((c, idx) => {
        logContent += `${idx + 1}. [${c.intent}] Query: ${c.query}\n`;
        logContent += `   Reply: ${c.reply}\n\n`;
      });

      fs.writeFileSync(filename, logContent);
    }
  });

  it("should load chatbot interface", async () => {
    const chatCard = await driver.findElement(By.css("[data-testid='chat-card']"));
    expect(chatCard).toBeDefined();
    
    const input = await driver.findElement(By.css("input#chat-input"));
    const isEnabled = await input.isEnabled();
    expect(isEnabled).toBe(true);
    
  });

  testCases.forEach(intentData => {
    describe(`Intent: ${intentData.intent}`, () => {
      intentData.queries.forEach((query) => {
        it(`should respond to the message: "${query}"`, async () => {
          const initialBotReplies = await driver.findElements(By.css(".bot"));
          const initialBotReplyCount = initialBotReplies.length;

          await driver.wait(until.elementLocated(By.css("input#chat-input")), 5000);
          
          const input = await driver.findElement(By.css("input#chat-input"));
          
          await input.clear();
          await input.sendKeys(query);
          
          const sendButton = await driver.findElement(By.css("[data-testid='chat-send']"));
          await sendButton.click();
        
          await driver.wait(async () => {
            const botReplies = await driver.findElements(By.css(".bot"));
            return botReplies.length === initialBotReplyCount + 1;
          }, 10000, `No bot reply appeared after "${query}"`);

          const allBotReplies = await driver.findElements(By.css(".bot"));
          const lastBotReply = allBotReplies[allBotReplies.length - 1];
          
          await driver.wait(async () => {
            const text = await lastBotReply.getText();
            return text && text.trim().length > 0;
          }, 8000, `Reply text empty for "${query}"`);

          const replyText = await lastBotReply.getText();
          expect(replyText.trim().length).toBeGreaterThan(0);
          
          conversation.push({ 
            query, 
            reply: replyText.trim(), 
            intent: intentData.intent
          });
        });
      });
    });
  });
});