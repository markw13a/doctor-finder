import React, { useState } from "react";
import { BookingModalDialog } from "./BookingModalDialog";

const BookingButton = ({ doctor }) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    // Putting the modal in here does technically mean that you could have multiple dialogs open at once
    // Don't think that this matters. Shouldn't be possible for user to get things in to that state anyway
    return (
        <>
            <BookingModalDialog 
                isOpen={dialogIsOpen} 
                onClose={() => setDialogIsOpen(false)} 
                doctor={doctor} 
            />
            <button className="booking-button" onClick={() => setDialogIsOpen(true)}>
                Book
            </button>
        </>
    );
};

const DoctorTable = ({ nearbyDoctors }) => {
    if(!nearbyDoctors || nearbyDoctors.length === 0) {
        return null;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th> Practice name </th>
                    <th> Distance (km) </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    nearbyDoctors.map( doctor => (
                        <tr key={doctor.PracticeCode}>
                            <td> { doctor.GPPracticeName } </td>
                            <td> { doctor.distance.toFixed(3) } </td>
                            <td> 
                                <BookingButton doctor={doctor} /> 
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export {
    DoctorTable
};
