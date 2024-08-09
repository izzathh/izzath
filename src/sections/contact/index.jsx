import React, { lazy, useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";

const SentNotify = lazy(() => import('../../components/notification'))

const Contact = ({
    errors,
    mailContent,
    validateField,
    handleSendEmail,
    isLoading
}) => {

    const [positionHitmeup, setPositionHitmeup] = useState({ x: 0, y: 0 });
    const [clientName, setClientName] = useState('');

    const handlePositionAndEmail = async () => {
        console.log('mailContent:', mailContent.name);
        setClientName(mailContent.name)
        const isSent = await handleSendEmail()
        if (isSent) {
            setPositionHitmeup({ x: 0, y: 0 })
            const x = document.getElementById('toast')
            x.className = 'show';
            setTimeout(() => {
                x.className = x.className.replace("show", "")
            }, 5000);
            setClientName('')
        }
    }

    useEffect(() => {
        const container = document.getElementById('hit-me-up');

        const updatePosition = (event) => {
            const rect = container.getBoundingClientRect();
            setPositionHitmeup({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            });
        };

        const hideCursorBox = () => {
            setPositionHitmeup({ x: 0, y: 0 });
        };

        container.addEventListener('mousemove', updatePosition);
        container.addEventListener('mouseleave', hideCursorBox);

        return () => {
            container.removeEventListener('mousemove', updatePosition);
            container.removeEventListener('mouseleave', hideCursorBox);
        };
    }, []);

    return (
        <>
            <span className="experience-content-start"></span>
            <div className="contact-contents">
                <div className="contact-heading">
                    <h1>Contact</h1>
                    <h2>Got a problem to solve?</h2>
                    <p><span>Imagine a great site:</span> elegant, smooth navigation, akin to a starry journey. Beautiful visuals, captivating content. Let's craft something outstanding.</p>
                </div>
                <div className="contact-fields">
                    <div>
                        <label id="label-flex" htmlFor="name">
                            NAME
                            {errors.name && (
                                <span className="errors name">{errors.name}</span>
                            )}
                        </label>
                        <input
                            id={`name ${errors.name ? 'name-error' : ''}`}
                            name="name"
                            type="text"
                            value={mailContent.name}
                            onChange={validateField}
                        />
                    </div>
                    <div>
                        <label id="label-flex" htmlFor="email">
                            {errors.email && (
                                <span className="errors">{errors.email}</span>
                            )}
                            EMAIL
                        </label>
                        <input
                            id={`email ${errors.email ? 'email-error' : ''}`}
                            name="email"
                            type="text"
                            value={mailContent.email}
                            onChange={validateField}
                        />
                    </div>
                    <div>
                        <label id="label-flex" htmlFor="message">
                            {errors.message && (
                                <span className="errors">{errors.message.split('$')[0].trim()}</span>
                            )}
                            MESSAGE
                            {errors.message && (
                                <span className="errors">{errors.message.split('$')[1]}</span>
                            )}
                        </label>
                        <textarea
                            rows={10}
                            cols={10}
                            name="message"
                            value={mailContent.message}
                            id={`message ${errors.message ? 'message-error' : ''}`}
                            onChange={validateField}
                        >
                        </textarea>
                    </div>
                    <div>
                        <a href="mailto:mohammedizzathh@gmail.com" title="hit me up">
                            mohammedizzathh@gmail.com
                        </a>
                        <button
                            onClick={handlePositionAndEmail}
                            id="hit-me-up"
                            className={`${isLoading ? 'btn-bg-black' : ''}`}
                        >
                            {positionHitmeup.y !== 0 && positionHitmeup.x !== 0 && !isLoading && (
                                <div className="rocket-gif"></div>
                            )}
                            {isLoading && <FiLoader />}
                            {!isLoading && (
                                <span
                                    className={`${positionHitmeup.y && positionHitmeup.x && !isLoading ? 'add-bg-for-span' : ''}`}
                                    style={{
                                        position: 'relative',
                                        top: `${positionHitmeup.y}px`,
                                        left: `${positionHitmeup.x}px`,
                                        backgroundColor: 'rgb(245 245 245)',
                                        color: 'rgb(24 24 24)',
                                    }}

                                >Hit me up</span>
                            )}
                        </button>
                    </div>
                </div>
                {/* <SentNotify client={clientName} /> */}
            </div>
        </>
    )
}

export default Contact