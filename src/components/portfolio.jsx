import React from "react";
import Header from "./Header";
import Izzath from "./Izzath";
import SmoothScroll from './smoothScroll';
import useWindowSize from "./WindowSize";
import { usePortfolio } from "../hooks/globeVars";
const Portfolio = () => {
    const { scrollerFlag } = usePortfolio()
    const size = useWindowSize();
    const isMobileOrTablet = size.width <= 1024;
    return (
        <div className="portfolio-container">
            <Header />
            {isMobileOrTablet || scrollerFlag ? (
                <Izzath />
            ) : (
                // <SmoothScroll>
                <Izzath />
                // </SmoothScroll>
            )}
            <footer>
            </footer>
        </div>
    )
}

export default Portfolio;