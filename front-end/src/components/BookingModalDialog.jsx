import React, { useState, useCallback } from "react";
import Modal from "react-modal";

const BookingModalDialog = ({ isOpen, onClose, doctor }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [appointmentTime, setAppointmentTime] = useState();

    const [error, setError] = useState(false);
    const [successfulSubmission, setSuccessfulSubmission] = useState(false);

    const bookAppointment = useCallback(() => {
        setError(false);
        setSuccessfulSubmission(false);

        // TODO: you'd want to inform the user that they need to enter these values
        // rather than silently blocking the submission
        if(!name || !email || !appointmentTime) {
            return;
        }

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/book-appointment?email=${email}&name=${name}&appointmentTime=${appointmentTime}`)
        .then(() => setSuccessfulSubmission(true))
        .catch(err => setError(true));
    }, [name, email, appointmentTime, setError, setSuccessfulSubmission]);

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Example Modal"
        style={{
            overlay: {
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
            },
            content: {
                position: "unset",
                height: "250px",
                width: "250px"
            }
        }}
      > 
        <div className="booking-modal-dialog">
            <p> Booking appointment with {doctor.GPPracticeName} </p>
            <label className="input-with-label">
                Your name
                <input value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label className="input-with-label">
                Email address
                <input value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label className="input-with-label">
                Appointment time
                <input type="datetime-local" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} />
            </label>
            <button onClick={bookAppointment}> 
                Submit 
            </button>
            {
                error
                && <span> There was a problem with your submission </span>
            }
            {
                successfulSubmission
                && <span> Appointment successfully booked </span>
            }
        </div>
      </Modal>
    );
};

export {
    BookingModalDialog
};
