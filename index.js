const puppeteer = require("puppeteer");

const runScraping = async () => {
  const constantVar = {
    SEARCH_BOX_SELECTOR: "search_text",
  };

  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.opensubtitles.org/en/search/subs");
    await page.screenshot({ path: "example.png" });

    // access DOM
    const subtitles = await page.evaluate(
      async (args) => {
        const searchBox = document.getElementById(
          args.input.SEARCH_BOX_SELECTOR
        );

        return searchBox.className;
      },
      { input: constantVar }
    );
    // filling up movies name
    await page.$eval(
      `#${constantVar.SEARCH_BOX_SELECTOR}`,
      (el) => (el.value = "Wonder Woman")
    );
    await page.waitForSelector(
      "ul[class='ui-multiselect-checkboxes ui-helper-reset'] > li"
    );

    const allTest = await page.$$(
      "ul[class='ui-multiselect-checkboxes ui-helper-reset'] > li"
    );

    const selectLanguages = await page.evaluate(
      (args) => {
        const languages = document.querySelectorAll(
          "ul[class='ui-multiselect-checkboxes ui-helper-reset'] > li input"
        );

        return languages;

        // return titles;
      }
      // { languages: ["english", "vietnamese"] }
    );

    /*   const titles = Array.from(selectLanguages).filter((each) => {

      return each
        .getProperty("title")
        .toLowerCase()
        .contain(["vietnamese", "english"].join(" "));
    }); */

    // console.log(titles);
    await browser.close();
    console.log("success!!");
  } catch (err) {
    console.log(err);
  }
};

runScraping();
