import puppeteer from 'puppeteer';
// get .env
import dotenv from 'dotenv';

dotenv.config();
const user = process.env.KAS_USER;
const pass = process.env.KAS_PASS;
const options = {
    subdomain: 'test',
}


async function createSubdomain() {
    const browser = await puppeteer.launch({
        headless: false,
        // slowMo: 100,
    })
    const page = await browser.newPage();

    await page.goto('https://all-inkl.com/login/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Type into search box
    await page.type('#username_kas', user);
    await page.type('#password_kas', pass);
    // press enter
    await page.keyboard.press('Enter');

    // Wait and click on first result
    await page.waitForSelector('.navigation_box');
    await page.click('a ::-p-text(Subdomain)');

    // lets create a subdomain click
    await page.waitForSelector('a ::-p-text(Neue Subdomain anlegen)')
    await page.click('a ::-p-text(Neue Subdomain anlegen)')

    // wait for subdomain creation field
    await page.waitForSelector('p ::-p-text(Subdomainname)')
    await page.type('input[name="subdomain"]', options.subdomain);

    // wait a second
    await new Promise(r => setTimeout(r, 1000));

    // click on input with value speichern
    await page.click('input[value="speichern"]');

    // now lets install wordpress
    await page.waitForSelector('a ::-p-text(Software-Installation)')

    // select an option that begins with the word WordPress on #software_id
    // await page.select('#software_id', 'WordPress');




    // // Locate the full title with a unique string
    // const textSelector = await page.waitForSelector(
    //     'text/Customize and automate'
    // );
    // const fullTitle = await textSelector?.evaluate(el => el.textContent);
    //
    // // Print the full title
    // console.log('The title of this blog post is "%s".', fullTitle);
    //
    // Take a screenshot
    // await page.screenshot({path: 'screenshot.png'});

    // await browser.close();
}

await createSubdomain();