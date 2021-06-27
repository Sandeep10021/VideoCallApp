import React from 'react';

const getButtonClass = (icon, enabled) => classnames(`btn-action fa ${icon}`, { disable: !enabled });

const Input = ({ setMessage, sendMessage, message}) => (
    <form className="form">
        <input
        className="input"
        type="text"
        placeholder="Type Your Message..."
        value={message}
        onChange={({ target: {value}}) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter'? sendMessage(event): null}
        />
        <button type="button" className={getButtonClass('fa-paper-plane', e)} className="fa-paper-plane" onClick={e => sendMessage(e)}>Send Message</button>
    </form>
)

export default Input;