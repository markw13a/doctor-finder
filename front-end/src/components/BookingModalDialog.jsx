import React, { useState } from "react";
import Modal from "react-modal";

const BookingModalDialog = ({ isOpen, onClose }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [appointmentTime, setAppointmentTime] = useState();

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Example Modal"
      > 
        <input value={name} onChange={e => setName(e.target.value)} />
        <input value={email} onChange={e => setEmail(e.target.value)} />
        <input type="date" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} />
        <button> Submit </button>
      </Modal>
    );
};

export {
    BookingModalDialog
};
