import fetch from "node-fetch";
import fs from "fs";
import Parser from "rss-parser";

const YOUTUBE_CHANNEL_ID = "UCIqfZ4wqEoC6x6x-zyPCL8g";
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
}

// YouTube
const youtubeData = await fetch(YOUTUBE_FEED_URL);
const youtubeBody = await youtubeData.text();
if (!youtubeData)
    throw new Error(`Error fetching YOUTUBE data from ${YOUTUBE_VIDEOS_URL}`);

try {
    const parser = new Parser({
        customFields: {
            item: [["media:group", "media:group", { keepArray: true }]]
        }
    });
    (async () => {
        try {
            function msToTime(ms) {
                let seconds = (ms / 1000).toFixed(1);
                let minutes = (ms / (1000 * 60)).toFixed(0);
                let hours = (ms / (1000 * 60 * 60)).toFixed(0);
                let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
                let month = (ms / (1000 * 60 * 60 * 24 * 30)).toFixed(0);
                let year = (ms / (1000 * 60 * 60 * 24 * 30 * 12)).toFixed(0);
                if (seconds < 60) return seconds + " сек. назад";
                else if (minutes < 60) return minutes + " мин. назад";
                else if (hours < 24) return hours + " час. назад";
                else if (days < 30) return hours + " дн. назад";
                else if (month < 12) return month + " мес. назад";
                else return "более года назад";
            }

            const data = [];
            const feed = await parser.parseString(youtubeBody);
            for (let i = 0; i < 4; i++) {
                const item = feed.items[i];
                const timeForPublication = msToTime((new Date() - new Date(item.pubDate)));
                const thumbnail =
                    item["media:group"]?.[0]?.["media:thumbnail"]?.[0]?.["$"];
                data.push({
                    title: item.title,
                    pubDate: timeForPublication,
                    href: item.link,
                    thumbnail: thumbnail ? thumbnail : null
                });
            }
            fs.writeFileSync("data/youtube.json", JSON.stringify(data));
            console.log("Youtube feed fetched");
        } catch (err) {
            throw new Error("Error parsing and writing YOUTUBE data");
        }
    })();
} catch (err) {
    throw new Error("Error parsing and writing YOUTUBE data");
}
