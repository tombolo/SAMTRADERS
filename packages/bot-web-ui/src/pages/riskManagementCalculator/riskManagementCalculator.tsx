import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './riskManagementCalculator.module.scss';

const RiskManagementCalculator = () => {
    const [capital, setCapital] = useState('');
    const [isCalculated, setIsCalculated] = useState(false);

    const calculateResults = () => {
        if (!capital || isNaN(Number(capital)) || Number(capital) <= 0) return;
        setIsCalculated(true);
    };

    const resetCalculator = () => {
        setCapital('');
        setIsCalculated(false);
    };

    const appendNumber = (num: number | string) => {
        setCapital((prev) => (prev === '0' ? num.toString() : (prev || '') + num.toString()));
    };

    const deleteLast = () => {
        setCapital((prev) => (prev.length > 1 ? prev.slice(0, -1) : ''));
    };

    return (
        <div className={styles.container}>
            {/* Animated background elements */}
            <div className={styles.animatedBackground}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={styles.floatingParticle}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0, 1, 0],
                            x: [
                                `${Math.random() * 100}%`,
                                `${Math.random() * 100}%`,
                                `${Math.random() * 100}%`
                            ],
                            y: [
                                `${Math.random() * 100}%`,
                                `${Math.random() * 100}%`,
                                `${Math.random() * 100}%`
                            ],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Glowing orbs */}
            <motion.div
                className={styles.orb1}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={styles.orb2}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            <div className={styles.mainContent}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Risk Management Calculator
                    <motion.div
                        className={styles.titleUnderline}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    />
                </motion.h1>

                <div className={styles.contentWrapper}>
                    {/* Input Column */}
                    <motion.div
                        className={styles.inputColumn}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <label className={styles.label}>
                            Enter Your Capital ($)
                        </label>
                        <div className={styles.display}>
                            {capital ? `$${capital}` : '$0'}
                        </div>

                        {/* Keypad */}
                        <div className={styles.keypad}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '⌫'].map((item) => (
                                <motion.button
                                    key={item}
                                    onClick={() => (item === '⌫' ? deleteLast() : appendNumber(item))}
                                    className={`${styles.keypadButton} ${typeof item === 'number' || item === '.'
                                        ? styles.numberButton
                                        : styles.deleteButton
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item}
                                </motion.button>
                            ))}
                        </div>

                        <div className={styles.buttonGroup}>
                            <motion.button
                                onClick={calculateResults}
                                className={styles.calculateButton}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Calculate Risk
                            </motion.button>
                            <motion.button
                                onClick={resetCalculator}
                                className={styles.resetButton}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Clear
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Results Column */}
                    <motion.div
                        className={styles.resultsColumn}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h2 className={styles.resultsTitle}>
                            Risk Management Plan
                        </h2>

                        <div className={styles.resultsGrid}>
                            <ResultCard
                                title="Stake Amount"
                                value={isCalculated ? `$${(Number(capital) * 0.1).toFixed(2)}` : '$0.00'}
                                color="#6e44ff"
                                icon="💰"
                                isCalculated={isCalculated}
                            />
                            <ResultCard
                                title="Take Profit"
                                value={isCalculated ? `$${(Number(capital) * 3 * 0.1).toFixed(2)}` : '$0.00'}
                                color="#44ffb5"
                                icon="🎯"
                                isCalculated={isCalculated}
                            />
                            <ResultCard
                                title="Stop Loss"
                                value={isCalculated ? `$${(Number(capital) * 3 * 0.1).toFixed(2)}` : '$0.00'}
                                color="#ff444f"
                                icon="🛑"
                                isCalculated={isCalculated}
                            />
                            <ResultCard
                                title="Loss Protection"
                                value="3 Trades"
                                color="#a18cd1"
                                icon="🛡️"
                                isCalculated={isCalculated}
                            />
                        </div>

                        <motion.div
                            className={styles.warningBox}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className={styles.warningTitle}>
                                <span>⚠️</span> Martingale Sequence (x2)
                            </div>
                            <div className={styles.warningContent}>
                                {isCalculated
                                    ? `${(Number(capital) * 0.02).toFixed(2)} → ${(Number(capital) * 0.04).toFixed(2)} → ${(Number(capital) * 0.08).toFixed(2)}`
                                    : 'Enter amount to calculate'}
                            </div>
                        </motion.div>

                        <motion.div
                            className={styles.infoBox}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className={styles.infoTitle}>
                                <span>💼</span> Required Capital Buffer
                            </div>
                            <div className={styles.infoValue}>
                                {isCalculated ? `$${(Number(capital) * 0.02 * 7).toFixed(2)}` : '$0.00'}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

type ResultCardProps = {
    title: string;
    value: string;
    color: string;
    icon: string;
    isCalculated: boolean;
};

const ResultCard = ({ title, value, color, icon, isCalculated }: ResultCardProps) => {
    const rgb = hexToRgb(color);

    return (
        <motion.div
            className={styles.resultCard}
            style={{
                backgroundColor: `rgba(${rgb},0.1)`,
                borderLeft: `4px solid ${color}`,
            }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className={styles.resultCardHeader}>
                <span className={styles.resultCardIcon}>{icon}</span>
                <span className={styles.resultCardTitle}>{title}</span>
            </div>
            <motion.div
                className={styles.resultCardValue}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                key={value}
            >
                {value}
            </motion.div>
        </motion.div>
    );
};

function hexToRgb(hex: string) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

export default RiskManagementCalculator;