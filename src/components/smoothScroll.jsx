import React, { useEffect } from 'react';
import Luxy from 'luxy.js';

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        Luxy.init({
            wrapperSpeed: 0.04,
        });

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            const luxyContainer = document.querySelector('#luxy');
            if (luxyContainer) {
                luxyContainer.removeAttribute('style');
            }
            window.removeEventListener('scroll', Luxy.scrollHandler);
        };
    }, []);

    return <div id="luxy">{children}</div>;
};

export default SmoothScroll;
