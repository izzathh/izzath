import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
    const [scrollY, setScrollY] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);
    const [openLinksMenu, setOpenLinksMenu] = useState(false);
    const [showPdf, setShowPdf] = useState(false);
    const [resuemBase64, setResuemBase64] = useState('');
    const [scrollerFlag, setScrollerFlag] = useState(false);

    const developerRef = useRef(null);
    const workRef = useRef(null);
    const expRef = useRef(null);
    const contactRef = useRef(null);
    const abtMeRef = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', () => setScrollY(window.scrollY));
        return () => {
            window.removeEventListener('scroll', () => setScrollY(window.scrollY))
        };
    }, [])

    const getZoomLevel = () => {
        const x = window.outerWidth / window.innerWidth;
        return Number.parseFloat(x).toFixed(1);
    };

    const getSocialLink = (platform) => {
        const options = {
            "Instagram": "https://www.instagram.com/izzatthh/",
            "LinkedIn": "https://www.linkedin.com/in/mohammedizzathh/"
        }
        return options[platform]
    }

    function scrollToContainer(container) {
        const options = {
            "Developer": () => document.getElementById('myself')?.scrollIntoView({ behavior: 'smooth' }),
            "Work": () => document.getElementById('my-work')?.scrollIntoView({ behavior: 'smooth' }),
            "Experience": () => document.getElementById('my-exp')?.scrollIntoView({ behavior: 'smooth' }),
            "Contact": () => document.getElementById('contact-me')?.scrollIntoView({ behavior: 'smooth' }),
            "About Me": () => document.getElementById('abt-me')?.scrollIntoView({ behavior: 'smooth' })
        }
        if (options[container]) {
            setScrollerFlag(true);
            setTimeout(() => {
                options[container]();
                setScrollerFlag(false);
            }, 10);
        }
    }

    const sendEmail = async (mail) => {
        try {
            const { data } = await axios
                .post('https://swxea36q3b.execute-api.eu-north-1.amazonaws.com/dev/mail', {
                    toEmail: mail.email,
                    userName: mail.name,
                    message: mail.message
                })
            if (data.status === 1) {
                alert(data.message)
                return
            }
            alert('Something went unexpected while sending your mail.')
            return
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <PortfolioContext.Provider
            value={{
                scrollY,
                getZoomLevel,
                getSocialLink,
                openMenu,
                setOpenMenu,
                openLinksMenu,
                setOpenLinksMenu,
                showPdf,
                setShowPdf,
                resuemBase64,
                setResuemBase64,
                developerRef,
                workRef,
                expRef,
                contactRef,
                abtMeRef,
                scrollerFlag,
                setScrollerFlag,
                scrollToContainer,
                sendEmail
            }}
        >
            {children}
        </PortfolioContext.Provider>
    )
}

export const usePortfolio = () => {
    const context = useContext(PortfolioContext)
    if (!context) {
        throw new Error("usePortfolio must be used within a PortfolioProvider");
    }
    return context;
}

