import fetch from "node-fetch";
import fs from "fs";
import { parse } from "node-html-parser";

const VACANCIES_URL = "https://rabota.leroymerlin.ru/it";

if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
}

// Vacancies
const vacanciesData = await fetch(VACANCIES_URL);
const vacanciesDataText = await vacanciesData.text();
if (!vacanciesDataText)
    throw new Error(`Error fetching VACANCIES data from ${VACANCIES_URL}`);

try {
    const html = parse(vacanciesDataText);

    let vacanciesCards = html.querySelectorAll(".card--vacancy");
    vacanciesCards = vacanciesCards.slice(0, 4); // Grab first 4 vacancies

    const vacanciesCardsJson = vacanciesCards.map((vacancy) => {
        const id = vacancy.querySelector(".btn--base").attrs.href;
        const title = vacancy.querySelector(".title").innerHTML;
        const experience = vacancy.querySelector(
            "[itemprop=experienceRequirements]"
        ).textContent;

        return {
            id: id.replace("/vacancies/", "").replace("/application", ""),
            href: `https://rabota.leroymerlin.ru${id.replace(
                "/application",
                ""
            )}`,
            title,
            experience: experience.replaceAll("\n", "").replaceAll("  ", "")
        };
    });

    fs.writeFileSync("data/vacancies.json", JSON.stringify(vacanciesCardsJson));
    console.log("Vacancies fetched");
} catch (err) {
    throw new Error("Error parsing and writing VACANCIES data");
}
