// Have a bunch of GP data that includes postcodes
// Good start, but we cannot calculate distances between postcodes
// Will need to convert to long/lat or easting/northing if we are to do that
import fetch from "node-fetch";
import chunk from "lodash.chunk";
import fs from "fs";
import doctors from "./doctors";

const main = async() => {
    // Quite awkward to process the data like this,
    // but want to be kind to the API authors.
    // Make eighteen requests rather than 1000+
    let postcodes = doctors.reduce((postcodes, doctor) => {
        postcodes.push(doctor.Postcode);
        return postcodes;
    }, []);

    // Need to split array in to groups of 100 as API does not allow for more than 100 postcodes to be posted at once
    postcodes = chunk(postcodes, 100);

    // Get array of location data for all of the GP postcodes
    let locationData = [];
    for(let i = 0; i < postcodes.length; i++) {
        const postcodesChunk = postcodes[i];
        const data = await fetch("http://api.postcodes.io/postcodes", {
            method: "POST", 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postcodes: postcodesChunk })
        });
        const res = await data.json();
        const json = res.result.reduce((data, result) => {
            data.push(result.result);
            return data;
        }, []);

        locationData = [
            ...locationData,
            ...json
        ];
    }

    // Augment GP data with more precise location data obtained
    let out = doctors.map(doctor => {
        const { Postcode } = doctor;
        const { eastings, northings, longitude, latitude } = locationData.find(location => location && location.postcode === Postcode) || {};

        return ({
            ...doctor,
            eastings,
            northings,
            longitude,
            latitude
        });
    });
    // Filter out any results which we could not obtain location data for (appears there were about three)
    out = out.filter(doctor => doctor.eastings || doctor.latitude);

    fs.writeFile("doctors.json", JSON.stringify(out), err => console.warn(err));
};
main();
