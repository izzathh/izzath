import { useParallax } from 'react-scroll-parallax';

export const parallaxElements = () => {

    const parallaxPrjtOne = useParallax({
        translateY: [20, -20],
        easing: 'easeInOut',
    });

    const parallaxPrjtTwo = useParallax({
        translateX: [20, -20],
        easing: 'easeInOut',
    });

    const parallaxPrjtThree = useParallax({
        scale: [1.3, 1],
        easing: 'easeInOut',
    });

    const parallaxPrjtFour = useParallax({
        translateX: [-20, 20],
        easing: 'easeInOut',
    });

    return {
        parallaxPrjtOne,
        parallaxPrjtTwo,
        parallaxPrjtThree,
        parallaxPrjtFour
    }

}