import React, { useState, useCallback } from "react";
import { 
    ButtonGroup, 
    Button 
} from "@material-ui/core";

const SampleValues = ({setLatitude, setLongitude}) => {
    return (
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Button onClick={() => {
                setLatitude(58.209);
                setLongitude(-6.385);
            }}>
                Stornoway
            </Button>
            <Button onClick={() => {
                setLatitude(55.864);
                setLongitude(-4.252);
            }}>
                Glasgow
            </Button>
            <Button onClick={() => {
                setLatitude(55.953251);
                setLongitude(-3.188267);
            }}>
                Edinburgh
            </Button>
        </ButtonGroup>
    );
};

const LocationControls = ({ setNearbyDoctors }) => {
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [error, setError] = useState();

    const fetchDoctorData = useCallback(() => {
        // Reset API error state
        setError();
        
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/doctors?longitude=${longitude}&latitude=${latitude}`)
        .then(res => res.json())
        .then(nearbyDoctors => setNearbyDoctors(nearbyDoctors))
        .catch(err => setError(err));
    }, [latitude, longitude, setNearbyDoctors, setError]);

    return (
        <div className="location-controls">
            <div className="inputs"> 
                <label>
                    Latitude
                    <input value={latitude} onChange={e => setLatitude(e.target.value)} />
                </label>
                <label>
                    Longitude
                    <input value={longitude} onChange={e => setLongitude(e.target.value)} />
                </label>
                <button onClick={fetchDoctorData}>
                    Search
                </button>
                {
                    error
                    && (
                        <span>
                            An error has occurred with your search 
                        </span>
                    )
                }
            </div>
            <SampleValues setLatitude={setLatitude} setLongitude={setLongitude} />
        </div>
    );
};

export {
    LocationControls
};
