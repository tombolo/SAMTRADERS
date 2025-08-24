import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import './GlobalLoading.scss';
import LOGO from './Logo/SAM.png';

const GlobalLoading = () => {
    const [progress, setProgress] = useState(0);
    const controls = useAnimation();
    const [showElements, setShowElements] = useState(false);
    const [marketData, setMarketData] = useState({
        eurusd: `1.08${Math.floor(Math.random() * 9)}`,
        btcusd: `6${Math.floor(Math.random() * 9000) + 1000}`,
        volatility: `75.${Math.floor(Math.random() * 9)}%`,
    });

    useEffect(() => {
        // Update market data every 1.5 seconds
        const marketInterval = setInterval(() => {
            setMarketData({
                eurusd: `1.08${Math.floor(Math.random() * 9)}`,
                btcusd: `6${Math.floor(Math.random() * 9000) + 1000}`,
                volatility: `75.${Math.floor(Math.random() * 9)}%`,
            });
        }, 1500);

        // 15 second progress timer (changed from 10 to 15 seconds)
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + 100 / 150; // Adjusted for 15 seconds
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    clearInterval(marketInterval);
                }
                return newProgress;
            });
        }, 100);

        // Animated entrance
        setTimeout(() => {
            controls.start('visible');
            setShowElements(true);
        }, 500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(marketInterval);
        };
    }, []);

    return (
        <div className='global-loading'>
            {/* Particle background */}
            <div className='particle-background'>
                {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className='particle'
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0, 1, 0],
                            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Glowing orbs */}
            <motion.div
                className='orb orb-1'
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className='orb orb-2'
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />

            {/* Main content */}
            <motion.div
                className='logo-container'
                initial={{ opacity: 0, y: -20 }}
                animate={controls}
                variants={{
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.6,
                            ease: [0.17, 0.67, 0.24, 0.99],
                        },
                    },
                }}
            >
                <motion.div
                    className='logo-wrapper'
                    animate={{
                        rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <img src={LOGO} alt='Logo' className='logo' />
                </motion.div>
                <motion.div
                    className='logo-glow'
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </motion.div>

            {showElements && (
                <div className='content-wrapper'>
                    {/* Circular progress */}
                    <div className='circular-progress-wrapper'>
                        <svg className='circular-progress' viewBox='0 0 100 100'>
                            <defs>
                                <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                                    <stop offset='0%' stopColor='#4A6CF7' />
                                    <stop offset='100%' stopColor='#8A63F2' />
                                </linearGradient>
                            </defs>
                            <circle className='progress-bg' cx='50' cy='50' r='45' />
                            <motion.circle
                                className='progress-bar'
                                cx='50'
                                cy='50'
                                r='45'
                                initial={{ strokeDashoffset: 283 }}
                                animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                                transition={{ duration: 0.5 }}
                            />
                            <text x='50' y='53' textAnchor='middle' className='progress-text'>
                                {Math.round(progress)}%
                            </text>
                        </svg>
                    </div>

                    {/* Market data ticker */}
                    <div className='market-ticker'>
                        <div className='ticker-item'>
                            <span className='ticker-label'>EUR/USD</span>
                            <motion.span
                                className='ticker-value'
                                key={`eurusd-${marketData.eurusd}`}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {marketData.eurusd}
                            </motion.span>
                        </div>
                        <div className='ticker-item'>
                            <span className='ticker-label'>BTC/USD</span>
                            <motion.span
                                className='ticker-value'
                                key={`btcusd-${marketData.btcusd}`}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {marketData.btcusd}
                            </motion.span>
                        </div>
                        <div className='ticker-item'>
                            <span className='ticker-label'>Volatility</span>
                            <motion.span
                                className='ticker-value'
                                key={`vol-${marketData.volatility}`}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {marketData.volatility}
                            </motion.span>
                        </div>
                    </div>

                    {/* Loading message */}
                    <div className='loading-message'>
                        <motion.div
                            className='message-text'
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%'],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: 'reverse',
                            }}
                        >
                            Preparing your experience...
                        </motion.div>
                        <div className='loading-dots'>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className='dot'
                                    animate={{
                                        y: [0, -10, 0],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Animated rings */}
                    <div className='rings-container'>
                        {[1, 2, 3].map(ring => (
                            <motion.div
                                key={ring}
                                className='ring'
                                animate={{
                                    scale: [0, 1],
                                    opacity: [0, 0.3, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    delay: ring * 0.5,
                                    ease: 'easeOut',
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalLoading;
