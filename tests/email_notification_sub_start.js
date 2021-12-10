const puppeteer = require('puppeteer');
require('dotenv').config();
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

async function func() {
    var email = process.env.LF_MAIL; //email used for signup and login
    var password = process.env.LF_PASS;// default password for all the accounts
    var cor_name = 'A TEST course for Testing Operation'; // default name for all the orgs

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        //executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',   //windows
        //executablePath: "..\\cdr\\chromedriver_win32\\chromedriver.exe",    //linux
        args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
    });

    var page = await browser.newPage() // a new page is created
    var page_gz = await browser.newPage(); //gz page
    var page_temp_mail = await browser.newPage();
    //when headless=true
    // await page.setViewport({
    //     width: 1920,
    //     height: 1080,
    //     deviceScaleFactor: 1,
    // })
    //when headless=true
    // await page_gz.setViewport({
    //     width: 1920,
    //     height: 1080,
    //     deviceScaleFactor: 1,
    // })
    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);
    await page_gz.setDefaultNavigationTimeout(0);
    await page_temp_mail.setDefaultNavigationTimeout(0);

    await page.bringToFront(); //dashboard page
    const recorder = new PuppeteerScreenRecorder(page);
    await recorder.start("./videos/email_notification_sub_start_LS.mp4"); 

    await page.goto("https://admin-staging.learnforce.cloud/admin/dashboard"); //mentioned site is then reached
    await page.waitForTimeout(5000); // delay for 5 second for website to load

   //login ftn
    const userNameField = await page.waitForSelector('#__next > div > form > div.w-full.mt-6 > input');
    await userNameField.type(email);
    const passwordField = await page.waitForSelector('#__next > div > form > div:nth-child(3) > input');
    await passwordField.type(password)
    await page.waitForTimeout(3500); // delay for 5 second for website to load

    await page.evaluate(() => {
        const button = document.querySelector('#__next > div > form > div.flex.items-center.justify-between.mt-4.w-full > button');
        button.click();
    });

    await page.waitForTimeout(7500); // delay for 5 second for website to load

    await page.waitForTimeout(4500); // delay for 5 second for website to load

    const skipField = await page.waitForSelector('#__next > div > form > div.flex.items-center.justify-between.mt-4.w-full > a');
    await skipField.click();
    //end of skip login
    await page.waitForTimeout(8000) // delay for 8 second for website to load
    await page.waitForTimeout(1500) // delay for 1.5 seconds

    //clicking on notifications settings

    await page.click("#__next > div > div > div.w-64.min-h-screen.bg-lf-sidebar.dark\\:bg-lf-dark-sidebar.text-lf-sidebar-item.shadow.pt-3.flex-col.justify-between.flex.transition-all.ease-in-out.duration-200.fixed.z-50 > div > ul > li:nth-child(7)");
    await page.waitForTimeout(1750);

    //checking 1st and 3rd checkbox
    await page.evaluate(() => {

        //if checkboxes are not checked then it will click them
        const checkbox_1 = document.querySelector('#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div:nth-child(2) > div:nth-child(1) > div > ul > li:nth-child(1) > div.flex.items-center.h-10.cursor-pointer > div > input');
        if (!(checkbox_1.checked)){
            checkbox_1.click();
        }

        const checkbox_3 = document.querySelector('#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div:nth-child(2) > div:nth-child(1) > div > ul > li:nth-child(4) > div.flex.items-center.h-10.cursor-pointer > div > input');
        if (!(checkbox_3.checked)){
            checkbox_3.click();
        }
    });

    //opening gz
    await page_gz.bringToFront()
    const recorder_1 = new PuppeteerScreenRecorder(page_gz);
    await recorder_1.start("./videos/email_notification_sub_start_GZ.mp4"); 

    await page_gz.goto("https://www.geluk.academy/"); //mentioned site is then reached
    await page_gz.waitForTimeout(5000); // delay for 5 second for website to load
    
    //clicking on register
    await page_gz.click("#_next > div > div > div > div > div > div.pt-16.pb-5.sm\\:pt-80.sm\\:pb-6.md\\:pt-10.xl\\:pt-14.mx-auto.container.flex.flex-col.items-center.min-h-screen.overflow-y-auto.px-6.relative.z-40 > div > div.flex.flex-col.items-center.justify-center.mt-12.md\\:mt-0 > div.w-200.md\\:w-291 > div:nth-child(3) > button");
    await page_gz.waitForTimeout(2000); 

    //getting temp mail
    await page_temp_mail.bringToFront();
    await page_temp_mail.goto("https://tempmailo.com/"); //mentioned site is then reached
    await page_temp_mail.waitForTimeout(5000); // delay for 5 second for website to load
    let email_elem = await page_temp_mail.waitForSelector('#i-email', {visible: true,});
    let gz_email = await email_elem.evaluate((tx) => tx.value) //extracting email from the element
    
    //BACK TO GZ 
    //signup
    await page_gz.bringToFront();
    await page_gz.type("input[type='email']", gz_email);
    await page_gz.waitForTimeout(2000); 
    await page_gz.click("#_next > div > div > button.text-foreground.transform.transition-all.ease-in-out.duration-300.hover\\:scale-105.focus\\:scale-105.md\\:hover\\:scale-110.md\\:focus\\:scale-110.mt-10.md\\:mt-16.xl\\:mt-86m.w-200.md\\:w-270.flex.justify-center.items-center.h-65.xl\\:h-55.\\32 xl\\:h-65.focus\\:outline-none.md\\:text-xl.bg-primary.shadow-md.rounded-bord10");
    await page_gz.waitForTimeout(4000); 
    
    await page_gz.type("input[type='password']",password);
    await page_gz.waitForTimeout(2000); 
    await page_gz.click("button[type='submit']");
    await page_gz.waitForTimeout(8000); 
    await page_gz.click("#_next > div > div > div.flex.items-end.h-full > button");
    await page_gz.waitForTimeout(5000); 

    //going to temp mail
    await page_temp_mail.bringToFront();
    await page_temp_mail.click("#apptmo > div > div.i-box > div.primaryCommands > div:nth-child(2) > button");
    await page_temp_mail.waitForTimeout(7500); // delay for 5 second for website to load
    await page_temp_mail.click('#apptmo > div > div.mail-items-container > div.left > ul > li');
    await page_temp_mail.waitForTimeout(6500); // delay for 5.5 second for website to load

    await page_temp_mail.evaluate(() => {
        const button = document.querySelector('#fullmessage').contentDocument.querySelector('a');
        button.click();
    });

    await page_temp_mail.waitForTimeout(5000); // delay for 5 second for website to load

    //go to gz
    //login
    await page_gz.bringToFront()
    await page_gz.waitForTimeout(5000) // delay for 5 second for website to load

    await page_gz.type("#email", gz_email, { delay: 30 });
    await page_gz.type("#password", password, { delay: 30 });

    await page_gz.click("button[type='submit']");
    await page_gz.waitForTimeout(7000);

    //go to ls dashboard
    await page.bringToFront();
    // await page.type("#email", gz_email, { delay: 30 });
    // await page.waitForTimeout(2000);

    // await page.click("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.flex.flex-wrap.w-full.mb-6 > div:nth-child(1) > div > div.px-5.sm\\:px-10.py-5.w-full > form > button");
    // await page.waitForTimeout(3000);

    // //clicking on update
    // await page.evaluate(() => {
    //     const button = document.querySelector("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.xl\\:w-auto.w-full.flex.justify-start.items-left.mt-6 > button");
    //     button.scrollIntoView({
    //         behavior: "smooth",
    //         block: "center",
    //         inline: "center",
    //     });
    // });
    // await page.waitForTimeout(3000);
    // await page.evaluate(() => {
    // const button = document.querySelector("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.xl\\:w-auto.w-full.flex.justify-start.items-left.mt-6 > button");
    //     button.click();
    // });

    





    await recorder.stop();
    await recorder_1.stop();

    await page.screenshot({
        path: "./screenshots/email_notification_sub_start.png",
    });
    console.log("test passed => 'add course'");

    await page.waitForTimeout(2500); // delay for 2 seconds

    await browser.close();

    return "test passed => 'email_notification_sub_start'";
}
;(async () => {
    await func();
})()
// module.exports = { func }