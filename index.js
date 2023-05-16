import puppeteer from 'puppeteer';

// get .env
import dotenv from 'dotenv';

dotenv.config();


const user = process.env.KAS_USER;
const pass = process.env.KAS_PASS;


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://all-inkl.com/login/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Type into search box
    await page.type('#username_kas', user);
    await page.type('#password_kas', pass);
    // press enter
    await page.keyboard.press('Enter');
    //
    // // Wait and click on first result
    // const searchResultSelector = '.search-box__link';
    // await page.waitForSelector(searchResultSelector);
    // await page.click(searchResultSelector);
    //
    // // Locate the full title with a unique string
    // const textSelector = await page.waitForSelector(
    //     'text/Customize and automate'
    // );
    // const fullTitle = await textSelector?.evaluate(el => el.textContent);
    //
    // // Print the full title
    // console.log('The title of this blog post is "%s".', fullTitle);
    //
    // await browser.close();
})();