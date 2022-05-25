import fetch from "node-fetch";
import fs from "fs";
import { parse } from "node-html-parser";
import Parser from "rss-parser";

const HABR_URL =
    "https://habr.com/ru/rss/company/leroy_merlin/blog/?fl=ru&mobile=no";

if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
}

// Habr
const getHabrArticleImage = async (articleUrl) => {
    if (!articleUrl) return null;

    const imgRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i;

    const articleData = await fetch(articleUrl);
    let articleDataText = await articleData.text();
    if (articleDataText) {
        const html = parse(articleDataText);
        const article = html.getElementsByTagName("article").toString();

        const firstImg =
            article.match(imgRegex)?.length > 0 && article.match(imgRegex)[0];
        if (firstImg) return firstImg;
    }
    return null;
};

const habrData = await fetch(HABR_URL);
const habrBody = await habrData.text();
if (!habrBody) throw new Error(`Error fetching HABR data from ${HABR_URL}`);

const parser = new Parser();
(async () => {
    try {
        const data = [];
        const feed = await parser.parseString(habrBody);

        for (let i = 0; i < 3; i++) {
            const item = feed.items[i];
            const itemDate = new Date(item.pubDate).toLocaleString("ru", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
            const img = await getHabrArticleImage(item.link);
            data.push({
                title: item.title,
                date: itemDate,
                href: item.link,
                img: img ? img : null
            });
        }
        fs.writeFileSync("data/habr.json", JSON.stringify(data));
        console.log("Habr fetched");
    } catch (err) {
        throw new Error("Error parsing and writing HABR data");
    }
})();
