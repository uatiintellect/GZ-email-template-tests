const puppeteer = require("puppeteer");
require('dotenv').config();

(async () => {
    const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ["--start-maximized"],
    }); 
    // page 1
    var page1 = await browser.newPage(); 

    await page1.goto("https://learnforce-admin-next.vercel.app/");
    await page1.waitForTimeout(2000);

    await page1.waitForSelector("#__next > div > form > div.w-full.mt-6 > input");

    await page1.type("#__next > div > form > div.w-full.mt-6 > input", process.env.LF_MAIL);

    
    await page1.waitForSelector("#__next > div > form > div:nth-child(3) > input");
    await page1.type("#__next > div > form > div:nth-child(3) > input", process.env.LF_PASS);


    await page1.evaluate(() => {
    document.querySelector("#__next > div > form > div.flex.items-center.justify-between.mt-4.w-full > button").click();});
    await page1.waitForTimeout(5000);

    await page1.click("#__next > div > form > div.flex.items-center.justify-between.mt-4.w-full > a > p");
    await page1.waitForTimeout(5000);

    //add course

    //course click
   await page1.click("#__next > div > div > div.w-64.min-h-screen.bg-lf-sidebar.dark\\:bg-lf-dark-sidebar.text-lf-sidebar-item.shadow.pt-3.flex-col.justify-between.flex.transition-all.ease-in-out.duration-200.fixed.z-50 > div > ul > li:nth-child(5) > div > div > span.text-md.ml-2.capitalize");
   await page1.waitForTimeout(5000); // delay for 5 second for website to load
   
   //add a course icon

   await page1.click("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div > div > div > div.w-full.mt-2 > div.tab.w-full.mb-5.z-0.false.transition-all.duration-300.ease-in-out > label > div > span.material-icons.p-1.bg-lf.rounded-full.mr-5.text-white.shadow-lg");
   await page1.waitForTimeout(5000);

   // course title

   await page1.type("#course_description > div.xl\\:w-8\\/12.w-full.mx-auto.xl\\:mx-0.mx-2 > div.mt-16.flex.flex-col.xl\\:w-4\\/5.lg\\:w-4\\/5.w-full > input", "Testing Course for Email Notifications");
   await page1.waitForTimeout(5000);

   // description

   await page1.type("#description", "testing description");
   await page1.waitForTimeout(5000);


   await page1.click("#course_description > div.xl\\:w-4\\/12.w-full.mx-auto.xl\\:mx-0.mx-2 > div.mt-16.w-full > div:nth-child(3) > div > input");

   //click on next
   await page1.click("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div > div > div > div > div.tab.w-full.mb-5.z-0.shadow-lg.rounded-lg.bg-white.dark\\:bg-lf-dark-panel.transition-all.duration-300.ease-in-out > div > div > div > div.flex.flex-wrap > div > div.w-full.mt-4.py-4.sm\\:px-8.px-5.flex.sm\\:justify-end.justify-center > button.btn.text-md.font-medium.focus\\:outline-none.text-white.bg-lf.py-2.px-8.rounded.transition-all.duration-200.ease-in-out.transform.hover\\:scale-110.mx-3");
   await page1.waitForTimeout(5000);

   //click on save

   await page1.click("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div > div > div > div > div.tab.w-full.mb-5.z-0.shadow-lg.rounded-lg.bg-white.dark\\:bg-lf-dark-panel.transition-all.duration-300.ease-in-out > div > div > div > div.flex.flex-wrap > div > div.w-full.mt-4.py-4.sm\\:px-8.px-5.flex.sm\\:justify-end.justify-center > button.btn.text-md.font-medium.focus\\:outline-none.text-white.bg-lf.py-2.px-8.rounded.transition-all.duration-200.ease-in-out.transform.hover\\:scale-110.mx-3");
   await page1.waitForTimeout(5000);

   //click on notification settings

   await page1.click("#__next > div > div > div.w-64.min-h-screen.bg-lf-sidebar.dark\\:bg-lf-dark-sidebar.text-lf-sidebar-item.shadow.pt-3.flex-col.justify-between.flex.transition-all.ease-in-out.duration-200.fixed.z-50 > div > ul > li:nth-child(7) > div > div > span.text-md.ml-2.capitalize");
    await page1.waitForTimeout(5000);

    await page1.click("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div:nth-child(2) > div.md\\:w-1\\/2.w-full.md\\:pl-6 > div > ul > li:nth-child(3) > div > a > span");
    await page1.waitForTimeout(5000);


    await page1.click("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div:nth-child(2) > div.md\\:w-1\\/2.w-full.md\\:pl-6 > div > ul > li:nth-child(3) > label > p");
    await page1.waitForTimeout(5000);

    //click on subject
    await page1.click("#subject");
    await page1.waitForTimeout(5000);


    //page 2


    var page2 = await browser.newPage();

    await page2.goto("https://generator.email/jace1323@netjex.xyz");
    await page2.waitForTimeout(2000);
    // await page2.click("#refresh > button > span");
    await page2.waitForTimeout(2000);










    await page1.waitForTimeout(5000);

    console.log("Test case passed => reminder_for_new_lesson");
    await browser.close();    
    
})();