import React, { useEffect, useState } from "react";
import { usePortfolio } from "../hooks/globeVars"
import { LinkedIn, Instagram, WhatsApp, Email } from '@mui/icons-material';
import { FaCode } from "react-icons/fa";
import { IoMdLink, IoMdClose } from "react-icons/io";
import MenuBtn from "./MenuBtn";

const Header = ({ }) => {
    const {
        scrollY,
        getSocialLink,
        setOpenMenu,
        openMenu,
        openLinksMenu,
        setOpenLinksMenu,
        scrollToContainer,
        scrollerFlag
    } = usePortfolio();
    const [linkLinePosition, setLinkLinePosition] = useState({ deg: 0, em1: 0, em2: 0 });
    const [mostVisibleElement, setMostVisibleElement] = useState(null);

    const [underlineStyle, setUnderlineStyle] = useState({
        transform: 'translateX(6)',
        width: '62.47999954223633px'
    });

    const [mouseOverStyle, setMouseOverStyle] = useState(null);

    useEffect(() => {
        const containers = document.querySelectorAll('.container');

        const observer = new IntersectionObserver(entries => {
            let maxRatio = 0;
            let visibleElement = null;

            entries.forEach(entry => {
                if (entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    visibleElement = entry.target;
                }
            });

            if (visibleElement) {
                setMostVisibleElement(visibleElement);
            }
        }, {
            threshold: Array.from(Array(101).keys(), i => i / 100)
        });

        containers.forEach(container => observer.observe(container));

    }, [scrollY]);

    useEffect(() => {
        if (mostVisibleElement) {
            const contClass = mostVisibleElement.innerText.includes("Hi, I'm")
                ? 'Developer' : mostVisibleElement.innerText.includes("My Work")
                    ? 'Work' : null
            const visibleEl = mostVisibleElement.querySelector('h1')
            let otherH1;
            if (visibleEl) {
                otherH1 = visibleEl.innerText
            }
            const getPosition = contClass || otherH1
            const positions = {
                'Developer': { offset: 6, buttonRect: 62.47999954223633 },
                'Work': { offset: 98.46246337890625, buttonRect: 44.900001525878906 },
                'Experience': { offset: 167.36248779296875, buttonRect: 82.5875015258789 },
                'Contact': { offset: 273.95001220703125, buttonRect: 60.875 },
                'About Me': { offset: 358.82501220703125, buttonRect: 71.8499984741211 }
            }
            setUnderlineStyle({
                transform: `translateX(${positions[getPosition]?.offset}px)`,
                width: `${positions[getPosition]?.buttonRect}px`,
            });
        }
    }, [mostVisibleElement, scrollY]);

    const handleButtonClick = async (event) => {
        const button = event.target;
        scrollToContainer(button.innerText);
        setOpenMenu(!openMenu);
        !openLinksMenu ? null : setOpenLinksMenu(!openLinksMenu);
        const buttonRect = button.getBoundingClientRect();
        const containerRect = button.parentElement.getBoundingClientRect();
        const offset = buttonRect.left - containerRect.left;
        setUnderlineStyle({
            transform: `translateX(${offset}px)`,
            width: `${buttonRect.width}px`,
        });
    };

    const handleMouseOver = (event) => {
        const button = event.target;
        const buttonRect = button.getBoundingClientRect();
        const containerRect = button.parentElement.getBoundingClientRect();
        const offset = buttonRect.left - containerRect.left;
        console.log('offset:', offset, 'buttonRect:', buttonRect.width);
        setMouseOverStyle({
            transform: `translateX(${offset}px)`,
            width: `${buttonRect.width}px`,
        });
    };

    const handleMouseLeave = () => {
        setMouseOverStyle(null);
    }

    useEffect(() => {
        const buttons = document.querySelectorAll('.header-options button');
        buttons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
            button.addEventListener('mouseover', handleMouseOver);
            button.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            buttons.forEach(button => {
                button.removeEventListener('click', handleButtonClick);
                button.removeEventListener('mouseover', handleMouseOver);
                button.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    useEffect(() => {
        console.log('openLinksMenu:', openMenu, '||', openLinksMenu);
    }, [openMenu, openLinksMenu])
    const handleSocialLinkClick = (platform) => {
        !openMenu ? null : setOpenMenu(!openMenu);
        setOpenLinksMenu(!openLinksMenu)
        window.open(getSocialLink(platform), '_blank')
    }
    const actualUnderlineStyle = mouseOverStyle || underlineStyle

    return (
        <header
            style={{
                backgroundColor: scrollY > 100 || openMenu || openLinksMenu ? 'rgba(36, 36, 36, 0.6)' : 'transparent',
                backdropFilter: scrollY > 100 && !openMenu && !openLinksMenu ? 'blur(5px)' : 'none',
                border: scrollY > 100 || openMenu || openLinksMenu ? '1px solid rgb(24, 24, 24)' : 'none',
                WebkitBackdropFilter: scrollY > 100 && !openMenu && !openLinksMenu ? 'blur(5px)' : 'none'
            }}
            className={`header`}
        >
            <div className={`${openLinksMenu && !openMenu ? 'header-links-open' : ''} sidebar-icon-links`}>
                <div className="links-icon">
                    <button onClick={() => setOpenLinksMenu(!openLinksMenu)}>
                        <div className={`icon-wrapper ${openLinksMenu ? 'open' : 'close'}`}>
                            {openLinksMenu ? (
                                <IoMdClose />
                            ) : (
                                <IoMdLink />
                            )}
                        </div>
                    </button>
                </div>
                <div className={`social-link-options ${openLinksMenu ? 'open-social-links' : ''}`}>
                    <button onClick={() => handleSocialLinkClick('LinkedIn')}>Linked In</button>
                    <button onClick={() => handleSocialLinkClick('Instagram')}>Instagram</button>
                    <button onClick={() => handleSocialLinkClick('WhatsApp')}>WhatsApp</button>
                    <button onClick={() => handleSocialLinkClick('Email')}>Mail</button>
                </div>
            </div>
            <div className="header-name">
                <h1>IZZATH</h1>
                <div className="cli-icon">
                    <span className="red"></span>
                    <span className="yellow"></span>
                    <span className="green"></span>
                </div>
            </div>
            <MenuBtn />
            <div className={`header-options-img ${openMenu ? 'header-options-open' : ''}`}>
                <div className="header-options">
                    <button
                        className="home-btn"
                        onClick={handleButtonClick}
                    >
                        <FaCode />
                        <span>Developer</span>
                    </button>
                    <button
                        className="work-btn"
                        onClick={handleButtonClick}
                    >
                        Work
                    </button>
                    <button
                        className="aboutme-btn"
                        onClick={handleButtonClick}
                    >
                        Experience
                    </button>
                    <button
                        className="contact-btn"
                        onClick={handleButtonClick}
                    >
                        Contact
                    </button>
                    <button
                        className="aboutme-btn"
                        onClick={handleButtonClick}
                    >
                        About Me
                    </button>
                </div>
                <div style={{ top: scrollY > 100 ? '1.1em' : '0' }} className="header-btn-span">
                    <span className="header-btn-underline" style={actualUnderlineStyle}></span>
                </div>
                <div className="social-links-cont social-links-768px">
                    <span
                        style={{
                            transform: `rotate(${linkLinePosition.deg}deg) translate(${linkLinePosition.em1}em, ${linkLinePosition.em2}em)`
                        }}
                        className="links-line"
                    >

                    </span>
                    <button
                        onClick={() => handleSocialLinkClick('LinkedIn')}
                        onMouseEnter={() => setLinkLinePosition({ deg: 90, em1: 6.8, em2: -6 })}
                        onMouseLeave={() => setLinkLinePosition({ deg: 0, em1: 0, em2: 0 })}
                    >
                        <LinkedIn style={{ color: 'rgb(245, 245, 245)' }} />
                    </button>
                    <button
                        onClick={() => handleSocialLinkClick('Instagram')}
                        onMouseEnter={() => setLinkLinePosition({ deg: 90, em1: 10.5, em2: -6 })}
                        onMouseLeave={() => setLinkLinePosition({ deg: 0, em1: 0, em2: 0 })}
                    >
                        <Instagram style={{ color: 'rgb(245, 245, 245)' }} />
                    </button>
                    <button
                        onClick={() => handleSocialLinkClick('WhatsApp')}
                        onMouseEnter={() => setLinkLinePosition({ deg: 90, em1: 14.3, em2: -6 })}
                        onMouseLeave={() => setLinkLinePosition({ deg: 0, em1: 0, em2: 0 })}
                    >
                        <WhatsApp style={{ color: 'rgb(245, 245, 245)' }} />
                    </button>
                    <button
                        onClick={() => handleSocialLinkClick('Email')}
                        onMouseEnter={() => setLinkLinePosition({ deg: 90, em1: 18.3, em2: -6 })}
                        onMouseLeave={() => setLinkLinePosition({ deg: 0, em1: 0, em2: 0 })}
                    >
                        <Email style={{ color: 'rgb(245, 245, 245)' }} />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;