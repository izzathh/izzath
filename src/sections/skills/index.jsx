import React, { useEffect, useState } from "react";
import { IoLogoNodejs } from "react-icons/io";
import { FaReact, FaCss3Alt, FaAws } from "react-icons/fa";
import { SiMongodb, SiTypescript } from "react-icons/si";
import { DiMysql } from "react-icons/di";
import { GiArtificialIntelligence } from "react-icons/gi";

const Skills = ({ skillsViews }) => {

    const skills = [
        { id: 1, target: 100, inView: skillsViews.skills1.inView },
        { id: 2, target: 90, inView: skillsViews.skills2.inView },
        { id: 3, target: 100, inView: skillsViews.skills3.inView },
        { id: 4, target: 70, inView: skillsViews.skills4.inView },
        { id: 5, target: 100, inView: skillsViews.skills5.inView },
        { id: 6, target: 50, inView: skillsViews.skills6.inView },
        { id: 7, target: 100, inView: skillsViews.skills7.inView },
        { id: 8, target: 90, inView: skillsViews.skills8.inView },
    ];

    const [progress, setProgress] = useState({
        skill1: 0,
        skill2: 0,
        skill3: 0,
        skill4: 0,
        skill5: 0,
        skill6: 0,
        skill7: 0,
        skill8: 0
    });

    useEffect(() => {
        skills.forEach(skill => {
            if (skill.inView) {
                const interval = setInterval(() => {
                    setProgress(prevProgress => {
                        const newProgress = { ...prevProgress };
                        const skillKey = `skill${skill.id}`;
                        if (newProgress[skillKey] < skill.target) {
                            newProgress[skillKey] += 1;
                        } else {
                            clearInterval(interval);
                        }
                        return newProgress;
                    });
                }, 22);
                return () => clearInterval(interval);
            }
        });
    }, [skills.map(skill => skill.inView).join(',')]);

    return (
        <>
            <span className="experience-content-start"></span>
            <div className="my-skills-heading">
                <h1>My Skills</h1>
            </div>
            <div className={`skills-cont`}>
                <div className="skills-one">
                    <div className="skill">
                        <IoLogoNodejs />
                        <div
                            ref={skillsViews.skills1.ref}
                            className={`skill-content progress-100 ${progress.skill1 < 100 && skillsViews.skills1.inView ? 'start-skill-progress' : ''}`}
                        >
                            <div>
                                <p>Node JS</p>
                                <p>{progress.skill1}%</p>
                            </div>
                            <span></span>
                        </div>
                    </div>
                    <div className="skill">
                        <FaReact />
                        <div
                            ref={skillsViews.skills2.ref}
                            className={`skill-content progress-90 ${progress.skill2 < 90 && skillsViews.skills2.inView ? 'start-skill-progress' : ''}`}
                        >
                            <div>
                                <p>React JSX</p>
                                <p>{progress.skill2}%</p>
                            </div>
                            <span></span>
                        </div>
                    </div>
                    <div className="skill">
                        <SiMongodb />
                        <div
                            ref={skillsViews.skills3.ref}
                            className={`skill-content progress-100 ${progress.skill3 < 100 && skillsViews.skills3.inView ? 'start-skill-progress' : ''}`}
                        >
                            <div>
                                <p>Mongo DB</p>
                                <p>{progress.skill3}%</p>
                            </div>
                            <span></span>
                        </div>
                    </div>
                    <div className="skill last-skill">
                        <DiMysql />
                        <div
                            ref={skillsViews.skills4.ref}
                            className={`skill-content progress-70 ${progress.skill4 < 70 && skillsViews.skills4.inView ? 'start-skill-progress' : ''}`}
                        >
                            <div>
                                <p>MySql</p>
                                <p>{progress.skill4}%</p>
                            </div>
                            <span className="mysql-percentage"></span>
                        </div>
                    </div>
                </div>
                <div className="skills-two">
                    <div className="skill">
                        <FaCss3Alt />
                        <div
                            ref={skillsViews.skills5.ref}
                            className={`skill-content progress-100 ${progress.skill5 < 100 && skillsViews.skills5.inView ? 'start-skill-progress' : ''}`}
                        >
                            <div>
                                <p>CSS</p>
                                <p>{progress.skill5}%</p>
                            </div>
                            <span></span>
                        </div>
                    </div>
                    <div className="skill">
                        <SiTypescript />
                        <div
                            ref={skillsViews.skills6.ref}
                            className={`skill-content progress-50 ${progress.skill6 < 50 && skillsViews.skills6.inView ? 'start-skill-progress' : ''}`}
                        >
                            <div>
                                <p>TypeScript</p>
                                <p>{progress.skill6}%</p>
                            </div>
                            <span></span>
                        </div>
                    </div>
                    <div className="skill">
                        <FaAws />
                        <div
                            ref={skillsViews.skills7.ref}
                            className={`skill-content progress-100 ${progress.skill7 < 100 && skillsViews.skills7.inView ? 'start-skill-progress' : ''}`}
                        >
                            <div>
                                <p>AWS - S3</p>
                                <p>{progress.skill7}%</p>
                            </div>
                            <span></span>
                        </div>
                    </div>
                    <div className="skill last-skill">
                        <GiArtificialIntelligence />
                        <div
                            ref={skillsViews.skills8.ref}
                            className={`skill-content progress-90 ${progress.skill8 < 90 && skillsViews.skills8.inView ? 'start-skill-progress' : ''}`}
                        >
                            <div>
                                <p>AI - ChatBot</p>
                                <p>{progress.skill8}%</p>
                            </div>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Skills