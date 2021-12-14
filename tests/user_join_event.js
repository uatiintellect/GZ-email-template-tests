const puppeteer = require("puppeteer");
require('dotenv').config();

(async () => {

    const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ["--start-maximized"],
    }); 

    var page1 = await browser.newPage(); 

    // await page1.setViewport({
    //     width: 1920,
    //     height: 1080,
    //     deviceScaleFactor: 1,
    //   });
    // await page1.setDefaultNavigationTimeout(0);

    await page1.goto("https://www.geluk.academy/");
    await page1.waitForTimeout(5000); // delay for 5 second

    //click on Login
    await page1.evaluate(() => { document.querySelector("#_next > div > div > div > div > div > div.pt-16.pb-5.sm\\:pt-80.sm\\:pb-6.md\\:pt-10.xl\\:pt-14.mx-auto.container.flex.flex-col.items-center.min-h-screen.overflow-y-auto.px-6.relative.z-40 > div > div.flex.flex-col.items-center.justify-center.mt-12.md\\:mt-0 > div.w-200.md\\:w-291 > div.flex.justify-center.md\\:pt-12.\\32 xl\\:pt-16 > button").click();

    });


    //login
    // type email
    await page1.waitForSelector("#email");
    let User_Email= "moviwoc162@simdpi.com";
    await page1.type("#email", User_Email);

    // type password
    await page1.waitForSelector("#password");
    let User_Password = "test1234";
    await page1.type("#password", User_Password);

    //click volgende
    await page1.evaluate(() => {
    document.querySelector("#_next > div > div > form > div.mt-8.lg\\:mt-6.xl\\:mt-9.flex.justify-center.text-center.\\32 xl\\:mt-5 > button").click();});
    await page1.waitForTimeout(9000);

    //Again login
    // type email
    await page1.waitForSelector("#email");
    // let user_email = "bosquiman@gmailni.com";
    await page1.type("#email", User_Email);

    // type password
    await page1.waitForSelector("#password");
    await page1.type("#password", User_Password);

    //click volgende
    await page1.evaluate(() => {
    document.querySelector("#_next > div > div > form > div.mt-8.lg\\:mt-6.xl\\:mt-9.flex.justify-center.text-center.\\32 xl\\:mt-5 > button").click();});
    await page1.waitForTimeout(5000);
    

    // click on menu dropdown

    let dropdown_t = page1.waitForXPath(
    '//*[@id="_next"]/div/div[1]/div[1]/div/div/div/div/div/p',
    { visible: true });
    // (await dropdown_t).focus();
    (await dropdown_t).click()
    await page1.waitForTimeout(1000)
    await page1.keyboard.press('ArrowDown')
    await page1.keyboard.press('Enter')
    await page1.waitForTimeout(8000)
    
    // //user profile
    // await page1.click("#_next > div > div.relative.z-30 > div:nth-child(1) > div > div > div > div > div > div > div.absolute.mt-4.right-0.transition-all.duration-300.ease-in-out.opacity-1 > ul > a > li");
    // await page1.waitForTimeout(1500)

    // // click on event
    // await page1.click("#_next > div > div > div.relative.z-30 > div.mb-96.bg-white.z-30.lg\\:pb-32.min-h-screen > div > div.mt-20 > div.overflow-x-hidden > div > div.xl\\:w-1\\/3.mt-8.md\\:mt-16.xl\\:mt-0.w-full > div > p");
    // await page1.waitForTimeout(3500)


    // click on event cross icon

    await page1.click("#_next > div > div.relative.z-30 > div.mb-96.bg-white.z-30.lg\\:pb-32.min-h-screen > div > div.container.mx-auto.mt-4 > div.w-full.md\\:pl-8.xl\\:pl-12 > div > div > div > div > div > div > ul > li > div > div > button > svg");
    await page1.waitForTimeout(3500);


    await page1.click("#_next > div > div.relative.z-30 > div.mb-96.bg-white.z-30.lg\\:pb-32.min-h-screen > div > div.container.mx-auto.mt-4 > div.w-full.md\\:pl-8.xl\\:pl-12 > div > div > div > div > div > div > ul > li > div > div > button");
    await page1.waitForTimeout(3500);


    await page1.waitForSelector("#_next > div > div.relative.z-30 > div.mb-96.bg-white.z-30.lg\\:pb-32.min-h-screen > div > div.container.mx-auto.mt-4 > div.w-full.md\\:pl-8.xl\\:pl-12 > div:nth-child(2) > div.w-full.h-full.pb-20 > div > div > div.flex.flex-col.items-center.mt-8.lg\\:mt-0.w-full.relative > div.mt-4.w-full > textarea");
    let event = "Interested";
    await page1.type("#_next > div > div.relative.z-30 > div.mb-96.bg-white.z-30.lg\\:pb-32.min-h-screen > div > div.container.mx-auto.mt-4 > div.w-full.md\\:pl-8.xl\\:pl-12 > div:nth-child(2) > div.w-full.h-full.pb-20 > div > div > div.flex.flex-col.items-center.mt-8.lg\\:mt-0.w-full.relative > div.mt-4.w-full > textarea", event);

    await page1.evaluate(() => {
        document.querySelector("#_next > div > div.relative.z-30 > div.mb-96.bg-white.z-30.lg\\:pb-32.min-h-screen > div > div.container.mx-auto.mt-4 > div.w-full.md\\:pl-8.xl\\:pl-12 > div:nth-child(2) > div.w-full.h-full.pb-20 > div > div > div.flex.flex-col.items-center.mt-8.lg\\:mt-0.w-full.relative > div.py-6 > button").click();});


    // click on cross icon
    await page1.click("#_next > div > div.relative.z-30 > div.mb-96.bg-white.z-30.lg\\:pb-32.min-h-screen > div > div.container.mx-auto.mt-4 > div.w-full.md\\:pl-8.xl\\:pl-12 > div:nth-child(2) > div.w-full.h-full.pb-20 > div > button > svg");
    await page1.waitForTimeout(5000);

    
    //open new page1
    var page2 = await browser.newPage();

    await page2.goto("https://learnforce-admin-next.vercel.app/");
    await page2.waitForTimeout(2000);

    await page2.waitForSelector("#__next > div > form > div.w-full.mt-6 > input");
    
    await page2.type("#__next > div > form > div.w-full.mt-6 > input", process.env.LF_MAIL);

    
    await page2.waitForSelector("#__next > div > form > div:nth-child(3) > input");
    
    await page2.type("#__next > div > form > div:nth-child(3) > input", process.env.LF_PASS);


    await page2.evaluate(() => {
    document.querySelector("#__next > div > form > div.flex.items-center.justify-between.mt-4.w-full > button").click();});
    await page2.waitForTimeout(5000);


    await page2.click("#__next > div > form > div.flex.items-center.justify-between.mt-4.w-full > a > p");
    await page2.waitForTimeout(5000);

    
    //click on notification settings

    await page2.click("#__next > div > div > div.w-64.min-h-screen.bg-lf-sidebar.dark\\:bg-lf-dark-sidebar.text-lf-sidebar-item.shadow.pt-3.flex-col.justify-between.flex.transition-all.ease-in-out.duration-200.fixed.z-50 > div > ul > li:nth-child(9) > div > div > span.text-md.ml-2.capitalize");
    await page2.waitForTimeout(3000);

    await page2.click("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div > div.sm\\:mt-6.mt-10 > div > div.justify-between.flex-wrap.hidden.sm\\:block.rounded-tr.rounded-tl.border-b > div > ul > li.text-md.text-gray-500.dark\\:text-lf-dark-text.pt-3.flex.items-center.hover\\:text-lf.dark\\:hover\\:text-lf-dark.cursor-pointer > div > span")
    await page2.waitForTimeout(3000);

    await page2.click("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div > div.sm\\:mt-6.mt-10 > div > div.justify-between.flex-wrap.hidden.sm\\:block.rounded-tr.rounded-tl.border-b > div > ul > li.text-md.text-gray-500.dark\\:text-lf-dark-text.pt-3.flex.items-center.hover\\:text-lf.dark\\:hover\\:text-lf-dark.cursor-pointer > div > span")
    await page2.waitForTimeout(3000);



    // new page 3

    var page3 = await browser.newPage();

    await page3.goto("https://generator.email/jonemo@convoith.com");
    await page3.waitForTimeout(2000);
    // await page3.click("#refresh > button > span");
    await page3.waitForTimeout(2000);

    //screenshot
    await page3.screenshot({ path: './screenshots/email_notify.png' });


    await page3.waitForTimeout(500000);

    console.log("Test case passed => user join event");
    await browser.close();    
    
})();