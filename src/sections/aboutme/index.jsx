import React, { useEffect, useState } from "react";

const About = ({ izzathBg }) => {

    const [position, setPosition] = useState({ x: -9999, y: -9999 });

    useEffect(() => {
        const container = document.getElementById('about-me-img-id');

        const updatePosition = (event) => {
            const rect = container.getBoundingClientRect();
            setPosition({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            });
        };

        const hideCursorBox = () => {
            setPosition({ x: -9999, y: -9999 });
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
            <div className="about-me-heading">
                <h1>About Me</h1>
            </div>
            <div className="about-me-contents">
                <div className="my-introduction">
                    <h1>Intro</h1>
                    <p>I have over 2+ years experience in web development with Node JS and React JS. My journey into web development has been a thrilling ride, and I've honed my skills over several years. With a strong foundation in Express JS, I thrive in creating dynamic and user-friendly web applications.</p>
                    <p>My expertise extends to database management, with hands-on experience in MySQL and MongoDB. I firmly believe in continuous learning. Whenever I encounter something new or challenging, I take it as an opportunity to expand my knowledge. Research, learn, and implement - that's the mantra I follow. It's all about satisfaction in delivering quality work.</p>
                    <p><strong>• Node.js Expertise:</strong> Proficient in Node.js development, harnessing its asynchronous capabilities to create efficient and responsive applications.</p>
                    <p><strong>• MySQL Sequelize Integration:</strong> Proficient in integrating MySQL databases with Node.js applications using Sequelize, an ORM that simplifies database interactions.</p>
                    <p><strong>• Robust Error Handling:</strong> Expertise in implementing comprehensive error handling strategies, ensuring smooth application flow even in challenging scenarios.</p>
                    <p><strong>• Express.js Mastery:</strong> Skilled in building RESTful APIs and web applications using the Express.js framework for streamlined communication.</p>
                    <p><strong>• MongoDB Integration:</strong> Proficiency in integrating MongoDB as a flexible and scalable database solution for dynamic applications.</p>
                    <p><strong>• Full Stack Competence:</strong> Well - versed in both frontend and backend development, delivering end - to - end solutions that cover the entire spectrum.</p >
                    <p><strong>• Asynchronous Programming:</strong> Adept at managing asynchronous operations using callbacks, Promises, and async/await for smooth application flow.</p >
                    <p><strong>• API Architecture:</strong> Experience in designing and developing APIs that prioritize user experience and seamless data flow.</p >
                    <p><strong>• Code Quality:</strong> Committed to maintaining clean and modular code, promoting maintainability, scalability, and collaboration.</p>
                    <h2>Besides my profession, my passion for photography & cricket is never ending</h2>
                </div>
                <div id="about-me-img-id" className="about-me-image">
                    <div className="borderline-name-bg-2">
                        <p>Mohammed Izzath</p>
                    </div>
                    <img
                        src={`${izzathBg[0]['izzath-bg-2']}`}
                        alt="Dev Image"
                    />
                    <img
                        style={{
                            filter: 'grayscale(0)',
                            clipPath: `inset(${position.y - 50}px calc(100% - ${position.x + 50}px) calc(100% - ${position.y + 50}px) ${position.x - 50}px)`,
                        }}
                        className="overlay-image"
                        src={`${izzathBg[0]['izzath-bg-2']}`}
                        alt="Dev Image"
                    />
                    <div className="cursor-box-overlay">
                        <div
                            className="cursor-box"
                            style={{
                                left: `${position.x}px`,
                                top: `${position.y + 15}px`,
                            }}
                        >
                            <div className="camera-overlay">
                                <div className="corner top-left"></div>
                                <div className="corner top-right"><span></span></div>
                                <div className="corner bottom-left"></div>
                                <div className="corner bottom-right"></div>
                                <div className="center-plus"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About