import csvWriter from "csv-writer"
import csv from "csv-parser"
import fs from "fs"

async function loadClothes() {
    return new Promise((resolve, reject) => {
        const clothes = [];
        fs.createReadStream("articles.csv")
            .pipe(csv())
            .on('data', (data) => clothes.push(data))
            .on('end', () => resolve(clothes))
            .on('error', (err) => reject(err));
    });
}

async function writeFilteredCSV(filteredData, outputFileName) {
    const createCsvWriter = csvWriter.createObjectCsvWriter;
    const csvWriterInstance = createCsvWriter({
        path: outputFileName,
        header: Object.keys(filteredData[0]).map(key => ({ id: key, title: key })),
    });

    try {
        await csvWriterInstance.writeRecords(filteredData);
        console.log(`Filtered data has been written to ${outputFileName}`);
    } catch (err) {
        console.error("Error writing CSV file:", err);
    }
}

const prod_g_name = ["Underwear", "Socks & Tights", "Nightwear"]
const ind_g_name = ["Baby/Children"]
const ind_name = ["Lingeries/Tights"]
const clothes = await loadClothes();
const clothesFilter = clothes.filter(item => {
    return (
        !prod_g_name.includes(item.product_group_name) &&
        !ind_g_name.includes(item.index_group_name) &&
        !ind_name.includes(item.index_name)
    )}
);

writeFilteredCSV(clothesFilter, "hm_filtered.csv");


