const puppeteer = require('puppeteer');
require('dotenv').config();
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

async function func() {
    var email = process.env.LF_MAIL; //email used for signup and login
    var password = process.env.LF_PASS;// default password for all the accounts
    var cor_name = 'A TEST course for Testing Operation'; // default name for all the orgs

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        //executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',   //windows
        //executablePath: "..\\cdr\\chromedriver_win32\\chromedriver.exe",    //linux
        args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
    });

    var page = await browser.newPage() // a new page is created
    var page_gz = await browser.newPage(); //gz page
    var page_temp_mail = await browser.newPage();   //temp-mail page
    //when headless=true
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    })
    //when headless=true
    await page_gz.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    })
    //Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);
    await page_gz.setDefaultNavigationTimeout(0);
    await page_temp_mail.setDefaultNavigationTimeout(0);

    await page.bringToFront(); //dashboard page
    // const recorder = new PuppeteerScreenRecorder(page);
    // await recorder.start("./videos/email_notification_sub_start_LS.mp4"); 

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
    await page.waitForTimeout(5500) // delay for 5.5 seconds


    //clicking on notifications settings
    await page.waitForSelector("#__next > div > div > div.w-64.min-h-screen.bg-lf-sidebar.dark\\:bg-lf-dark-sidebar.text-lf-sidebar-item.shadow.pt-3.flex-col.justify-between.flex.transition-all.ease-in-out.duration-200.fixed.z-50 > div > ul > li:nth-child(8)");
    await page.click("#__next > div > div > div.w-64.min-h-screen.bg-lf-sidebar.dark\\:bg-lf-dark-sidebar.text-lf-sidebar-item.shadow.pt-3.flex-col.justify-between.flex.transition-all.ease-in-out.duration-200.fixed.z-50 > div > ul > li:nth-child(8)");
    await page.waitForTimeout(13050);

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
    // const recorder_1 = new PuppeteerScreenRecorder(page_gz);
    // await recorder_1.start("./videos/email_notification_sub_start_GZ.mp4"); 

    await page_gz.goto("https://www.geluk.academy/"); //mentioned site is then reached
    await page_gz.waitForTimeout(5000); // delay for 5 second for website to load
    
    //clicking on register
    await page_gz.click("#_next > div > div > div > div > div > div.pt-16.pb-5.sm\\:pt-80.sm\\:pb-6.md\\:pt-10.xl\\:pt-14.mx-auto.container.flex.flex-col.items-center.min-h-screen.overflow-y-auto.px-6.relative.z-40 > div > div.flex.flex-col.items-center.justify-center.mt-12.md\\:mt-0 > div.w-200.md\\:w-291 > div:nth-child(3) > button");
    await page_gz.waitForTimeout(2000); 

    //getting temp mail
    await page_temp_mail.bringToFront();
    // const recorder_2 = new PuppeteerScreenRecorder(page_temp_mail);
    // await recorder_2.start("./videos/email_notification_sub_start_tmp.mp4"); 
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
    await page_gz.waitForTimeout(10000);

    //go to ls dashboard
    await page.bringToFront();
    await page.waitForTimeout(3000);
    await page.type("#email1", gz_email, { delay: 30 });
    await page.waitForTimeout(2000);

    await page.click("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.flex.flex-wrap.w-full.mb-6 > div:nth-child(1) > div > div.px-5.sm\\:px-10.py-5.w-full > form > button");
    await page.waitForTimeout(3000);

    //clicking on update
    await page.evaluate(() => {
        const button = document.querySelector("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.xl\\:w-auto.w-full.flex.justify-start.items-left.mt-6 > button");
        button.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    });
    await page.waitForTimeout(3000);
    await page.evaluate(() => {
    const button = document.querySelector("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.xl\\:w-auto.w-full.flex.justify-start.items-left.mt-6 > button");
        button.click();
    });

    //clicking on organization and getting the liscence code
    await page.waitForTimeout(4000);

    await page.click("#__next > div > div > div.w-64.min-h-screen.bg-lf-sidebar.dark\\:bg-lf-dark-sidebar.text-lf-sidebar-item.shadow.pt-3.flex-col.justify-between.flex.transition-all.ease-in-out.duration-200.fixed.z-50 > div > ul > li:nth-child(4)");

    await page.waitForTimeout(3500);

    await page.click("#draggable_0 > div > div");
    await page.waitForTimeout(2500);
    await page.click("#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div > div > div.w-full.px-1\\.5 > div > div.justify-between.flex-wrap.hidden.sm\\:block.rounded-tr.rounded-tl.border-b > div > ul > li:nth-child(4)");
    await page.waitForTimeout(2500);
    await page.click("#draggable_0 > div > div > div.flex.items-center > div:nth-child(1) > div.p-2\\.5.sm\\:block.hidden");
    await page.waitForTimeout(3500);
    
    //scrolling to the license code
    let license_code = await page.evaluate(() => {
        let code_elem = document.querySelector("#draggable_0 > div > div > div.px-5.mb-5.overflow-hidden.tab-content.active > div > form > div:nth-child(1) > div.pt-6 > div > div > div > input");
        code_elem.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
        return code_elem.value;
    });

    await page.waitForTimeout(3000);
    
    //going to GZ page and finishing up the sign up process.
    await page_gz.bringToFront();
    await page_gz.waitForTimeout(2000);
    await page_gz.type("input[placeholder='Naam']", "Tester");
    await page_gz.waitForTimeout(1000);

    await page_gz.click("#_next > div > div > div > button");
    await page_gz.waitForTimeout(3000);

    //enetering license code 

    for(let i=0;i<license_code.length;i++){

        let selector =
          "#_next > div > div > div.flex.flex-col.h-full.items-center.justify-between.w-full.mt-11.xl\\:mt-14.\\32 xl\\:mt-5m > div.py-7 > div > div:nth-child(" +
          (i + 1) +
          ") > input";
        
          await page_gz.type(selector,license_code.substring(i,i+1),{delay:17});
    }
    await page_gz.waitForTimeout(2000);
    await page_gz.click("#_next > div > div > div.flex.flex-col.h-full.items-center.justify-between.w-full.mt-11.xl\\:mt-14.\\32 xl\\:mt-5m > button");
    await page_gz.waitForTimeout(15000);

    await page_gz.waitForSelector("#_next > div > div > div.flex.flex-col.h-full.items-center.justify-between.w-full.mt-11.xl\\:mt-14.\\32 xl\\:mt-5m > form > div > button");

    await page_gz.evaluate(() => {
        let button = document.querySelector("#_next > div > div > div.flex.flex-col.h-full.items-center.justify-between.w-full.mt-11.xl\\:mt-14.\\32 xl\\:mt-5m > form > div > button");
        button.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
        button.click();
    });
    
    await page_gz.waitForTimeout(6000);

    await page_temp_mail.bringToFront();
    await page_temp_mail.waitForTimeout(8500); 
    await page_temp_mail.click("#apptmo > div > div.i-box > div.primaryCommands > div:nth-child(2) > button");
    await page_temp_mail.waitForTimeout(10000); 
    await page_temp_mail.click('#apptmo > div > div.mail-items-container > div.left > ul > li');
    await page_temp_mail.waitForTimeout(6500);


    // await recorder.stop();
    // await recorder_1.stop();
    // await recorder_2.stop();

    await page_temp_mail.screenshot({
        path: "./screenshots/email_notification_sub_start.png",
    });
    console.log("test passed => 'email_notification_subscription_start'");
    console.log("deleting temp mail");
    
    await page.bringToFront();
    await page.waitForTimeout(2500); // delay for 2 seconds
    await page.click(
        "#__next > div > div > div.w-64.min-h-screen.bg-lf-sidebar.dark\\:bg-lf-dark-sidebar.text-lf-sidebar-item.shadow.pt-3.flex-col.justify-between.flex.transition-all.ease-in-out.duration-200.fixed.z-50 > div > ul > li:nth-child(8)"
    );
    await page.waitForTimeout(6750);

    var index = 0;
    var it = 3;
    var items_arr = await page.$$(
      "#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.flex.flex-wrap.w-full.mb-6 > div:nth-child(1) > div > div.px-5.sm\\:px-10.py-5.w-full > div"
    );
    index = items_arr.length;
    var r_val = 0;
    for (let i = 0; i < index; i++) {
        await page.waitForTimeout(10) // delay for 0.01 second for website to load

        var cor_element = await page.$(
          "#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.flex.flex-wrap.w-full.mb-6 > div:nth-child(1) > div > div.px-5.sm\\:px-10.py-5.w-full > div:nth-child(" +
            it +
            ") > div > div.sm\\:text-md.text-sm.flex-grow.md\\:pl-5.pl-0.dark\\:text-lf-dark-text"
        );
        var cor_name_element_text = await page.evaluate(
            (tex) => tex.textContent,
            cor_element
        )
        if (gz_email === cor_name_element_text) {
            r_val = it
            let element_found = await page.$(
              "#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.flex.flex-wrap.w-full.mb-6 > div:nth-child(1) > div > div.px-5.sm\\:px-10.py-5.w-full > div:nth-child(" +
                it +
                ") > div > div.sm\\:text-md.text-sm.flex-grow.md\\:pl-5.pl-0.dark\\:text-lf-dark-text"
            );
           (await element_found).evaluate((c) =>
                c.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center',
                })
            )
         //console.log("test passed => 'add course'")
         await page.waitForTimeout(3000) // delay for 3 second for website to load
            element_found = await page.$(
              "#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.flex.flex-wrap.w-full.mb-6 > div:nth-child(1) > div > div.px-5.sm\\:px-10.py-5.w-full > div:nth-child(" +
                it +
                ") > div > button"
            );
           (await element_found).click();
         break
        }
        it = it + 1;

    }
    await page.waitForTimeout(3000) // delay for 3 second for website to load
    await page.evaluate(() => {
        const button = document.querySelector(
            "#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.xl\\:w-auto.w-full.flex.justify-start.items-left.mt-6 > button"
        );
        button.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
            });
        });
    await page.waitForTimeout(3000);
    await page.evaluate(() => {
        const button = document.querySelector(
            "#__next > div > div > div.w-full.min-h-screen.bg-lf-bg.dark\\:bg-transparent.sm\\:pl-64.pl-14 > div > div > div.xl\\:w-auto.w-full.flex.justify-start.items-left.mt-6 > button"
            );
            button.click();
    });
    await page.waitForTimeout(3000);

    await browser.close();

    return "test passed => 'email_notification_subscription_start'";
}
;(async () => {
    await func();
})()
// module.exports = { func }