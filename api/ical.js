export default async function handler(req, res) {
res.setHeader(“Access-Control-Allow-Origin”, “*”);
res.setHeader(“Access-Control-Allow-Methods”, “GET”);

const { url } = req.query;
if (!url) return res.status(400).json({ error: “missing url” });

try {
const response = await fetch(decodeURIComponent(url), {
headers: {
“User-Agent”: “Mozilla/5.0 (compatible; CalendarBot/1.0)”,
“Accept”: “text/calendar, */*”,
},
});

```
if (!response.ok) {
  return res.status(response.status).json({ error: "fetch failed", status: response.status });
}

const text = await response.text();

if (!text.includes("BEGIN:VCALENDAR")) {
  return res.status(422).json({ error: "not a valid ical" });
}

res.setHeader("Content-Type", "text/calendar; charset=utf-8");
res.setHeader("Cache-Control", "s-maxage=300");
return res.status(200).send(text);
```

} catch (e) {
return res.status(500).json({ error: e.message });
}
}
