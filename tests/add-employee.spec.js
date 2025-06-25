const { test, expect } = require('@playwright/test');
const loginData = JSON.parse(JSON.stringify(require("../utils/loginData.json")));
 

test('login and add employees', async ({ page }) => {

//  client login
  await page.goto('https://sandbox-login.brighthr.com/login');
  await page.locator("#username").fill(loginData.username);
  await page.locator("#password").fill(loginData.password);
  await page.getByRole('button',{name:"Login"}).click();

//  add employee
  const today = new Date();
  const formatted = today.toDateString();
  const ariaLabel = `aria-label="${formatted}"`;

  await page.getByRole('link', { name: 'Employees' }).click();
  await page.getByRole('button', { name: 'Add employee' }).click();
  await page.getByRole('textbox', { name: 'First name' }).click();
  await page.getByRole('textbox', { name: 'First name' }).fill('Lukman');
  await page.getByRole('textbox', { name: 'Last name' }).fill('Ade');
  await page.getByRole('textbox', { name: 'Email address' }).fill('kunlyy2k2@yahoo.com');
  await page.getByRole('textbox', { name: 'Phone number (optional)' }).click();
  await page.getByRole('textbox', { name: 'Phone number (optional)' }).fill('07713477139');
  await page.click('[data-testid="input-selector"]');
  await page.click(`.DayPicker-Day[${ariaLabel}]`);
  await page.getByRole('textbox', { name: 'Job title (optional)' }).fill('Software Analyst');
  await page.getByRole('button', { name: 'Save new employee' }).click();

// add another employee
  await page.getByRole('button', { name: 'Add another employee' }).click();
  await page.locator('#firstName').fill('Ola');
  await page.locator('#lastName').fill('Lukman');
  await page.locator('#email').fill('test@testing.com');
  await page.locator('#phoneNumber').fill('07713377733');
  await page.click('[data-testid="input-selector"]');
  await page.click(`.DayPicker-Day[${ariaLabel}]`);
  await page.locator('#jobTitle').fill('QA Analyst');
  await page.getByRole('button', { name: 'Save new employee' }).click();

// navigate to employee tab and verify that both employees are displayed
  await page.getByRole('button',{name:"Close modal"}).click();
  await expect(page.locator("//div[contains(@class,'flex flex-col w-full h-full')]//div[1]//div[1]//div[2]")).toBeVisible();


});
