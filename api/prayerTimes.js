const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const url = "https://mosquefinder.co.uk/markaz-as-salafi-bi-manchester/salaah-timings";
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Find all the 'td' elements with class 'text-center' within the specified table
    const targetElements = $('.tw.widget-timming tbody tr td.text-center');

    // Create an object to store the extracted values
    const prayerTimes = {};

    // Access the elements by their order
    const fajr = targetElements.eq(0).text().trim();
    const sunrise = targetElements.eq(1).text().trim();
    const dhuhr = targetElements.eq(2).text().trim();
    const asr = targetElements.eq(3).text().trim();
    const maghrib = targetElements.eq(4).text().trim();
    const isha = targetElements.eq(5).text().trim();

    // Store the values in the object
    prayerTimes["Fajr"] = fajr;
    prayerTimes["Sunrise"] = sunrise;
    prayerTimes["Dhuhr"] = dhuhr;
    prayerTimes["Asr"] = asr;
    prayerTimes["Maghrib"] = maghrib;
    prayerTimes["Isha"] = isha;

    const jsonData = {
      fajrTime: fajr,
      sunriseTime: sunrise,
      dhuhrTime: dhuhr,
      asrTime: asr,
      maghribTime: maghrib,
      ishaTime: isha,
    };

    console.log("Data fetched successfully:", jsonData);

    res.json(jsonData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
