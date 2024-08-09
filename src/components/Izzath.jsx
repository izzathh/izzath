import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { usePortfolio } from "../hooks/globeVars"
import izzathBg from "../assets/json/images.json"
import '@aws-amplify/ui-react/styles.css';
import { parallaxElements } from "../parallax/parallax";
import { useInView } from 'react-intersection-observer';
import { projects } from '../assets/json/aboutProject.json'
import { emailFormValidation } from "../schema/validations";
import * as Yup from "yup"

const ContactLazy = lazy(() => import('../sections/contact'))
const AboutMeLazy = lazy(() => import('../sections/aboutme'))
const SkillsLazy = lazy(() => import('../sections/skills'))

const useInterval = (callback, delay) => {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

const Izzath = () => {
    const {
        scrollY,
        getZoomLevel,
        openMenu,
        openLinksMenu,
        scrollToContainer,
        sendEmail,
        isLoading,
        setIsLoading
    } = usePortfolio();

    const [mailContent, setMailContent] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    const projectOneView = useInView();
    const projectTwoView = useInView();
    const projectThreeView = useInView();
    const projectFourView = useInView();

    const expOne = useInView();
    const expTwo = useInView();
    const expThree = useInView();

    const skillsViews = {
        skills1: useInView(),
        skills2: useInView(),
        skills3: useInView(),
        skills4: useInView(),
        skills5: useInView(),
        skills6: useInView(),
        skills7: useInView(),
        skills8: useInView()
    };

    const [hasPlayed, setHasPlayed] = useState({
        projectone: false,
        projecttwo: false,
        projectthree: false,
        projectfour: false
    });

    const [projectContent, setProjectContent] = useState({
        projectOne1: "",
        projectOne2: "",
        projectTwo1: "",
        projectTwo2: "",
        projectThree1: "",
        projectThree2: "",
        projectFour1: "",
        projectFour2: ""
    })

    useEffect(() => {
        if (projectTwoView.inView && !hasPlayed.projecttwo) {
            setHasPlayed(prev => ({ ...prev, projecttwo: true }));
        } else if (projectOneView.inView && !hasPlayed.projectone) {
            setHasPlayed(prev => ({ ...prev, projectone: true }));
        } else if (projectThreeView.inView && !hasPlayed.projectthree) {
            setHasPlayed(prev => ({ ...prev, projectthree: true }));
        } else if (projectFourView.inView && !hasPlayed.projectfour) {
            setHasPlayed(prev => ({ ...prev, projectfour: true }));
        }
    }, [
        projectOneView.inView,
        projectTwoView.inView,
        projectThreeView.inView,
        projectFourView.inView,
        hasPlayed
    ]);

    useInterval(() => {
        if (hasPlayed.projectone && !projectOneView.inView) {
            setProjectContent((prev) => ({
                ...prev,
                projectOne1: projects.projectOneText1,
                projectOne2: projects.projectOneText2
            }));
        } else {
            setProjectContent((prev) => ({
                ...prev,
                projectOne1: projects.projectOneText1.slice(0, prev.projectOne1.length + 1),
                projectOne2: prev.projectOne1.length >= 5 ? projects.projectOneText2.slice(0, prev.projectOne2.length + 1) : prev.projectOne2
            }));
        }
    }, hasPlayed.projectone ? 10 : null);

    useInterval(() => {
        if (hasPlayed.projecttwo && !projectTwoView.inView) {
            setProjectContent((prev) => ({
                ...prev,
                projectTwo1: projects.projectTwoText1,
                projectTwo2: projects.projectTwoText2
            }));
        } else {
            setProjectContent((prev) => ({
                ...prev,
                projectTwo1: projects.projectTwoText1.slice(0, prev.projectTwo1.length + 1),
                projectTwo2: prev.projectTwo1.length >= 5 ? projects.projectTwoText2.slice(0, prev.projectTwo2.length + 1) : prev.projectTwo2
            }));
        }
    }, hasPlayed.projecttwo ? 10 : null);

    useInterval(() => {
        if (hasPlayed.projectthree && !projectThreeView.inView) {
            setProjectContent((prev) => ({
                ...prev,
                projectThree1: projects.projectThreeText1,
                projectThree2: projects.projectThreeText2
            }));
        } else {
            setProjectContent((prev) => ({
                ...prev,
                projectThree1: projects.projectThreeText1.slice(0, prev.projectThree1.length + 1),
                projectThree2: prev.projectThree1.length >= 5 ? projects.projectThreeText2.slice(0, prev.projectThree2.length + 1) : prev.projectThree2
            }));
        }
    }, hasPlayed.projectthree ? 10 : null);

    useInterval(() => {
        if (hasPlayed.projectfour && !projectFourView.inView) {
            setProjectContent((prev) => ({
                ...prev,
                projectFour1: projects.projectFourText1,
                projectFour2: projects.projectFourText2
            }));
        } else {
            setProjectContent((prev) => ({
                ...prev,
                projectFour1: projects.projectFourText1.slice(0, prev.projectFour1.length + 1),
                projectFour2: prev.projectFour1.length >= 5 ? projects.projectFourText2.slice(0, prev.projectFour2.length + 1) : prev.projectFour2
            }));
        }
    }, hasPlayed.projectfour ? 10 : null);

    const {
        parallaxPrjtOne,
        parallaxPrjtTwo,
        parallaxPrjtThree,
        parallaxPrjtFour
    } = parallaxElements();

    const [position2, setPosition2] = useState({ x: -9999, y: -9999 });

    useEffect(() => {
        const container = document.getElementById('myself');

        const updatePosition = (event) => {
            const rect = container.getBoundingClientRect();
            const adjustedX = event.clientX - rect.left - (rect.width / 2);
            setPosition2({
                x: adjustedX - 40,
                y: event.clientY - rect.top
            });
        };

        const hideCursorBox = () => {
            setPosition2({ x: -9999, y: -9999 });
        };

        container.addEventListener('mousemove', updatePosition);
        container.addEventListener('mouseleave', hideCursorBox);

        return () => {
            container.removeEventListener('mousemove', updatePosition);
            container.removeEventListener('mouseleave', hideCursorBox);
        };
    }, []);

    const validateField = async (e) => {
        const { name, value } = e.target;
        try {
            setMailContent(prev => ({ ...prev, [name]: value }))
            const validateField = Yup.object().shape({
                [name]: emailFormValidation.fields[name]
            })
            await validateField.validate({ [name]: value })
            setErrors(prev => ({ ...prev, [name]: '' }))
        } catch (error) {
            setErrors(prev => ({ ...prev, [name]: error.message }))
            console.error(error);
        }
    }

    const handleSendEmail = async () => {
        try {
            setIsLoading(true)
            await emailFormValidation.validate({
                name: mailContent.name,
                email: mailContent.email,
                message: mailContent.message
            }, { abortEarly: false })

            await sendEmail(mailContent);

            setMailContent({
                name: '',
                email: '',
                message: ''
            })

            setErrors({})
            setIsLoading(false)
            return true
        } catch (errors) {
            setIsLoading(false)
            if (errors instanceof Yup.ValidationError) {
                const formatErrors = errors.inner.reduce((acc, error) => {
                    return { ...acc, [error.path]: error.message }
                }, {})
                setErrors(formatErrors)
            } else {
                console.error(errors);
            }
            return false
        }
    }

    return (
        <main className={`${openMenu || openLinksMenu ? 'header-opened-main' : ''}`}>
            <div id="myself" className="name-position-cont container">
                <div className="name-position">
                    <div
                        className={`intro-name ${scrollY >= 400 ? 'animate-intro-name' : ''}`}
                    >
                        <h1 style={{ fontFamily: 'RobotoSlab-Light' }}>Hi, I'm</h1>
                        <h1>Mohammed Izzath</h1>
                    </div>
                    <div className={`position-contact ${scrollY >= 600
                        ? 'animate-position-contact'
                        : ''}`}
                    >
                        <p>MERN Stack Developer</p>
                        <button
                            onClick={() => scrollToContainer('Contact')}
                        >
                            Contact
                        </button>
                    </div>
                    <div className="borderline-name-bg">
                        <p>Mohammed Izzath</p>
                    </div>
                </div>
                <div
                    style={{
                        zIndex: (scrollY >= 600 || scrollY >= 500 || scrollY >= 400)
                            ? 1
                            : -1,
                        filter: scrollY >= 600 || scrollY >= 500 || scrollY >= 400
                            ? 'grayscale(100%) brightness(0.1)'
                            : 'grayscale(100%) brightness(0.6)',
                        background: `url(src/assets/images/izzath-bg.JPG) no-repeat center right`,
                        backgroundSize: 'cover',
                    }}
                    className="image-container"
                >
                </div>
                <div className="my-img-camera">
                    <div
                        style={{
                            zIndex: (scrollY >= 600 || scrollY >= 500 || scrollY >= 400)
                                ? 1
                                : -1,
                            filter: scrollY >= 600 || scrollY >= 500 || scrollY >= 400
                                ? 'brightness(0.1)'
                                : 'brightness(1)',
                            background: `url(${izzathBg[0]["izzath-bg"]}) no-repeat center right`,
                            backgroundSize: 'cover',
                            clipPath: `inset(${position2.y - 48}px calc(100% - ${position2.x + 48}px) calc(100% - ${position2.y + 50}px) ${position2.x - 48}px)`
                        }}
                        className="image-container-two"
                    >
                    </div>
                    <div className="cursor-box-overlay">
                        <div
                            className="cursor-box"
                            style={{
                                left: `calc(50% + ${position2.x + 32}px)`,
                                top: `${position2.y}px`,
                            }}
                        >
                            <div className="camera-overlay-two">
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
            <div id="my-work" className="my-work-cont container">
                <div className="my-work-heading">
                    <h1>
                        My Work
                    </h1>
                </div>
                <div className="work-img-contents">
                    <div className="project-one-cont">
                        <div className="work-img-one">
                            <img
                                ref={parallaxPrjtOne.ref}
                                src={`${izzathBg[0]['project-one']}`}
                                alt=""
                            />
                        </div>
                        <div className="work-contents-one">
                            <button className="btn-one">something - project 1</button>
                            <h1>About the project</h1>
                            <span className="project-one-one">
                                {projects.projectOneText1}
                                <p ref={projectOneView.ref}>
                                    {projectContent.projectOne1}
                                </p>
                            </span>
                            <br />
                            <span className="project-one-two">
                                {projects.projectOneText2}
                                <p>{projectContent.projectOne2}</p>
                            </span>
                            <br />
                            <button className="btn-two">project 1</button>
                        </div>
                    </div>
                    <div className="project-two-cont">
                        <div className="work-img-two">
                            <img
                                ref={parallaxPrjtTwo.ref}
                                src={`${izzathBg[0]['project-four']}`}
                                alt=""
                            />
                        </div>
                        <div className="work-contents-two">
                            <button className="btn-one">something - project 1</button>
                            <h1>About the project</h1>
                            <span className="project-one-one">
                                {projects.projectTwoText1}
                                <p ref={projectTwoView.ref}>{projectContent.projectTwo1}</p>
                            </span>
                            <br />
                            <span className="project-one-two">
                                {projects.projectTwoText2}
                                <p>{projectContent.projectTwo2}</p>
                            </span>
                            <br />
                            <button className="btn-two">project 1</button>
                        </div>
                    </div>
                    <div className="project-three-cont">
                        <div className="work-img-three">
                            <img
                                ref={parallaxPrjtThree.ref}
                                src={`${izzathBg[0]['project-three']}`}
                                alt=""
                            />
                        </div>
                        <div className="work-contents-three">
                            <button className="btn-one">something - project 1</button>
                            <h1>About the project</h1>
                            <span className="project-one-one">
                                {projects.projectThreeText1}
                                <p ref={projectThreeView.ref}>{projectContent.projectThree1}</p>
                            </span>
                            <br />
                            <span className="project-one-two">
                                {projects.projectThreeText2}
                                <p>{projectContent.projectThree2}</p>
                            </span>
                            <br />
                            <button className="btn-two">project 1</button>
                        </div>
                    </div>
                    <div className="project-four-cont">
                        <div className="work-img-four">
                            <img
                                ref={parallaxPrjtFour.ref}
                                src={`${izzathBg[0]['project-four']}`}
                                alt="project one"
                            />
                        </div>
                        <div className="work-contents-four">
                            <button className="btn-one">something - project 1</button>
                            <h1>About the project</h1>
                            <span className="project-one-one">
                                {projects.projectFourText1}
                                <p ref={projectFourView.ref}>{projectContent.projectFour1}</p>
                            </span>
                            <br />
                            <span className="project-one-two">
                                {projects.projectFourText2}
                                <p>{projectContent.projectFour2}</p>
                            </span>
                            <br />
                            <button className="btn-two">project 1</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="my-exp" className="experience-cont container">
                <span className="experience-content-start"></span>
                <div className="my-experience-heading">
                    <h1>Experience</h1>
                </div>
                <div className="experience-details">
                    <div ref={expOne.ref} className={`${expOne.inView ? 'expone-inview' : ''} experience-one`}>
                        <p>Sep 2022 - Dec 2022</p>
                        <h1>Full Stack Bootcamp</h1>
                        <p>Have a solid experience of 2 years at It Flex Solutions, I have honed my skills over the years working on several projects as you can see above and stayed on the latest tech to avoid the dependencies of expired trend.</p>
                    </div>
                    <div ref={expTwo.ref} className={`${expTwo.inView ? 'exptwo-inview' : ''} experience-two`}>
                        <p>Dec 2022 - Present</p>
                        <h1>IT Flex Solutions</h1>
                        <p>Have a solid experience of 2 years at It Flex Solutions, I have honed my skills over the years working on several projects as you can see above and stayed on the latest tech to avoid the dependencies of expired trend.</p>
                    </div>
                    <div ref={expThree.ref} className={`${expThree.inView ? 'expthree-inview' : ''} experience-three`}>
                        <p>From - To?</p>
                        <h1>Your Organization</h1>
                        <p>Give a shot, I'll make certain you never regret it.</p>
                    </div>
                </div>
            </div>
            <div className="my-skills-cont container">
                <Suspense fallback={<div>Loading...</div>}>
                    <SkillsLazy
                        skillsViews={skillsViews}
                    />
                </Suspense>
            </div>
            <div id="abt-me" className="about-cont container">
                <Suspense fallback={<div>Loading...</div>}>
                    <AboutMeLazy izzathBg={izzathBg} />
                </Suspense>
            </div>
            <div id="contact-me" className="contact-cont container">
                <Suspense fallback={<div>Loading...</div>}>
                    <ContactLazy
                        errors={errors}
                        mailContent={mailContent}
                        validateField={validateField}
                        handleSendEmail={handleSendEmail}
                        isLoading={isLoading}
                    />
                </Suspense>
            </div>
            <div>
                <span className="experience-content-start"></span>
            </div>
        </main >
    )
}

export default Izzath;