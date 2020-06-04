// Read in JSON here and assign to static variable
// Keep in memory rather than read in each time endpoint is called
import doctorsJSON from "./doctors.json";

const toRadians = deg => (deg/180) * Math.PI;
const RADIUS_OF_EARTH = 6371;
/**
 * Calculates the distance "as the crow flies" between two lat/long co-ordinates
 * Equations got from https://www.movable-type.co.uk/scripts/latlong.html
 * Using less precise "Equirectangular approximation"
 * Reckon we're safe to ignore the curvature of the Earth as we'll only be looking at calculating distances between places in Scotland
 * @param point1 {latitude: 0, longitude: 0}
 * @param point2 {latitude: 0, longitude: 0}
 */
const distanceBetweenPoints = (point1, point2) => {
    const dLat = toRadians(point2.latitude - point1.latitude);
    const dLong = toRadians(point2.longitude - point1.longitude);

    const x = dLong * Math.cos(toRadians(point2.latitude + point2.latitude)/2);
    const distance = Math.sqrt(x*x + dLat*dLat) * RADIUS_OF_EARTH;

    return distance;
};

const doctors = (ctx, next) => {
    const point1 = ctx.request.query;

    if(!point1.longitude || !point1.latitude) {
        ctx.status = 400;
        ctx.body = "longitude and latitude must be passed via query string";
    }

    // Run through array of doctors and, for each of these, calculate distance from co-ordinates given 
    // Have ~1000 entries so this should be reasonably performant
    let doctorsWithDistanceFromPoint1 = doctorsJSON.map(doctor => ({
        ...doctor,
        distance: distanceBetweenPoints(point1, doctor)
    }));
    // Sort by shortest distance
    doctorsWithDistanceFromPoint1 = doctorsWithDistanceFromPoint1.sort((a, b) => a.distance - b.distance);

    // Return top 15 results
    ctx.status = 200;
    ctx.body = doctorsWithDistanceFromPoint1.slice(0, 15);
};

export {
    doctors
};