/**
 * Sækja gögn frá
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
 *
 * sér í lagi, alla jarðskjálfta 4,5+ seinustu 7 daga:
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
 *
 * Ath, í verkefni er afrit af gögnum í `./4.5_week.geojson`, gott
 * að nota það á meðan þróun stendur en skipta svo út.
 */

const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
// const URL = './4.5_week.geojson'

export default async function fetchEarthquakes() {
    try {
        const result = await fetch(URL, {headers: {'Content-Type': 'application/geo+json'}});
        if (result.ok === false) throw new Error('Connection Error');
        return result.json();
    } catch (error) {
        return Promise.resolve({metadata: {status: 400, title: error}});
    }
}
