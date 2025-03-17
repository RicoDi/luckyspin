'use client';

import { useState, useEffect, useRef } from 'react';

export default function Page() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [showBonus, setShowBonus] = useState(false);
    const [showMiniGame, setShowMiniGame] = useState(false);
    const [winAmount, setWinAmount] = useState(0);
    const [luckyWinners, setLuckyWinners] = useState([]);
    const wheelRef = useRef(null);

    // List of games
    const games = [
        { id: 1, name: 'Fruit Fiesta', image: '🍉', color: 'bg-green-400' },
        { id: 2, name: 'Diamond Rush', image: '💎', color: 'bg-blue-400' },
        { id: 3, name: 'Gold Miner', image: '👑', color: 'bg-yellow-400' },
        { id: 4, name: 'Lucky 7', image: '7️⃣', color: 'bg-purple-400' },
        { id: 5, name: "Pirate's Treasure", image: '🏴‍☠️', color: 'bg-red-400' },
        { id: 6, name: 'Space Adventure', image: '🚀', color: 'bg-indigo-400' },
    ];

    // List of potential winners
    const potentialWinners = [
        'Алексей П.',
        'Мария С.',
        'Иван К.',
        'Елена Д.',
        'Дмитрий В.',
        'Ольга М.',
        'Сергей Т.',
        'Анна Р.',
        'Николай Ж.',
        'Татьяна Л.',
    ];

    useEffect(() => {
        // Generate random winners every 5 seconds
        const interval = setInterval(() => {
            const randomWinner =
                potentialWinners[Math.floor(Math.random() * potentialWinners.length)];
            const randomCoins = Math.floor(Math.random() * 500) + 100;

            setLuckyWinners((prev) => {
                const newWinners = [
                    ...prev,
                    { name: randomWinner, coins: randomCoins, id: Date.now() },
                ];

                return newWinners.slice(-5); // Keep only the last 5 winners
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);

        // Random number of rotations between 3 and 5
        const rotations = 3 + Math.random() * 2;
        // Random additional angle (0-360 degrees)
        const extraAngle = Math.floor(Math.random() * 360);
        // Total rotation in degrees
        const totalRotation = rotations * 360 + extraAngle;

        if (wheelRef.current) {
            wheelRef.current.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
            wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;

            // Determine prize based on final position
            setTimeout(() => {
                const prize = Math.floor(Math.random() * 1000) + 100;
                setWinAmount(prize);
                setShowBonus(true);
                setIsSpinning(false);

                // Reset wheel after 3 seconds
                setTimeout(() => {
                    if (wheelRef.current) {
                        wheelRef.current.style.transition = 'none';
                        wheelRef.current.style.transform = 'rotate(0deg)';
                    }
                }, 3000);
            }, 4000);
        }
    };

    const playMiniGame = () => {
        setShowMiniGame(true);

        // Simulate a random win after 2 seconds
        setTimeout(() => {
            const coins = Math.floor(Math.random() * 200) + 50;
            setWinAmount(coins);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-900 text-white overflow-x-hidden font-sans">
            {/* Fixed Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 bg-blue-800 bg-opacity-90 backdrop-blur-sm shadow-lg z-50 px-4 py-3">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="text-3xl font-bold text-yellow-300 animate-pulse">
                            🎰 <span className="text-white">Lucky</span>
                            <span className="text-green-400">Spin</span>
                        </div>
                    </div>

                    <div className="hidden md:flex space-x-6 items-center">
                        <button className="nav-btn hover:text-yellow-300 transition-all transform hover:scale-110">
                            Игры
                        </button>
                        <button className="nav-btn hover:text-yellow-300 transition-all transform hover:scale-110">
                            Джекпоты
                        </button>
                        <button className="nav-btn hover:text-yellow-300 transition-all transform hover:scale-110">
                            Сезонные акции
                        </button>
                        <button className="nav-btn hover:text-yellow-300 transition-all transform hover:scale-110">
                            FAQ
                        </button>
                        <button
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all animate-bounce"
                            onClick={() => setShowBonus(true)}
                        >
                            Бонус! 🎁
                        </button>
                    </div>

                    <button className="md:hidden text-2xl">☰</button>
                </div>
            </nav>

            {/* Hero Section with Wheel of Fortune */}
            <section className="pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                            <span className="text-yellow-300">Крути</span> и{' '}
                            <span className="text-green-400">Выигрывай</span>!
                        </h1>
                        <p className="text-xl mb-8 text-blue-100">
                            Добро пожаловать в мир азарта и веселья! Испытай свою удачу в нашем
                            социальном казино.
                        </p>
                        <button
                            onClick={spinWheel}
                            disabled={isSpinning}
                            className={`bg-gradient-to-r from-green-500 to-green-700 px-8 py-4 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all ${isSpinning ? 'opacity-50 cursor-not-allowed' : 'animate-pulse'}`}
                        >
                            {isSpinning ? 'Крутим...' : 'Крутить колесо!'}
                        </button>
                    </div>

                    <div className="md:w-1/2 flex justify-center relative">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            {/* Wheel of Fortune */}
                            <div
                                ref={wheelRef}
                                className="w-full h-full rounded-full border-8 border-yellow-400 relative overflow-hidden"
                                style={{
                                    background:
                                        'conic-gradient(#4CAF50, #2196F3, #FFC107, #F44336, #9C27B0, #3F51B5, #4CAF50)',
                                }}
                            >
                                {/* Wheel segments */}
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute top-1/2 left-1/2 h-1/2 w-1 bg-white opacity-70 origin-bottom"
                                        style={{ transform: `rotate(${i * 30}deg)` }}
                                    ></div>
                                ))}

                                {/* Center of wheel */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-yellow-500 border-4 border-white z-10 flex items-center justify-center text-2xl">
                                    🎯
                                </div>
                            </div>

                            {/* Wheel pointer */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-12 z-20">
                                <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-red-600"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Games Section */}
            <section className="py-16 px-4 bg-blue-800 bg-opacity-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        <span className="text-yellow-300">Наши</span>{' '}
                        <span className="text-white">Игры</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {games.map((game) => (
                            <div
                                key={game.id}
                                className={`${game.color} rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer`}
                            >
                                <div className="p-6 text-center">
                                    <div className="text-6xl mb-4">{game.image}</div>
                                    <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
                                    <p className="text-blue-100 mb-4">
                                        Испытай удачу и выиграй джекпот!
                                    </p>
                                    <button className="bg-white text-blue-800 px-4 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors">
                                        Играть сейчас
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lucky Winners Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        <span className="text-white">Счастливчики</span>{' '}
                        <span className="text-yellow-300">Дня</span>
                    </h2>

                    <div className="bg-blue-800 bg-opacity-50 rounded-2xl p-6 shadow-2xl">
                        <div className="overflow-hidden">
                            <ul className="space-y-4">
                                {luckyWinners.map((winner) => (
                                    <li
                                        key={winner.id}
                                        className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 rounded-lg shadow-md flex justify-between items-center animate-fadeIn"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">🏆</span>
                                            <span className="font-medium">{winner.name}</span>
                                        </div>
                                        <div className="text-yellow-300 font-bold">
                                            +{winner.coins} монет
                                        </div>
                                    </li>
                                ))}
                                {luckyWinners.length === 0 && (
                                    <li className="text-center py-8 text-blue-200">
                                        Скоро здесь появятся счастливчики...
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Try Your Luck Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8">
                        <span className="text-green-400">Испытай</span>{' '}
                        <span className="text-white">Свою</span>{' '}
                        <span className="text-yellow-300">Удачу</span>
                    </h2>

                    <div className="max-w-md mx-auto bg-blue-800 bg-opacity-50 rounded-2xl p-8 shadow-2xl">
                        <p className="text-xl mb-6">
                            Нажми на кнопку и получи шанс выиграть до 250 бесплатных монет!
                        </p>

                        <button
                            onClick={playMiniGame}
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-8 py-4 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                        >
                            Испытать удачу! 🎲
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-8 md:mb-0">
                            <div className="text-3xl font-bold text-yellow-300 mb-4">
                                🎰 <span className="text-white">Lucky</span>
                                <span className="text-green-400">Spin</span>
                            </div>
                            <p className="text-blue-200 max-w-md">
                                Социальное казино с самыми яркими эмоциями и крупными выигрышами!
                            </p>
                        </div>

                        <div className="flex space-x-6">
                            <a
                                href="#"
                                className="text-4xl hover:text-yellow-300 transition-colors"
                            >
                                📱
                            </a>
                            <a
                                href="#"
                                className="text-4xl hover:text-yellow-300 transition-colors"
                            >
                                📘
                            </a>
                            <a
                                href="#"
                                className="text-4xl hover:text-yellow-300 transition-colors"
                            >
                                📸
                            </a>
                            <a
                                href="#"
                                className="text-4xl hover:text-yellow-300 transition-colors"
                            >
                                📺
                            </a>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-blue-800 text-center text-blue-300">
                        <p>
                            © 2023 Lucky Spin. Все права защищены. Игра предназначена для лиц
                            старше 18 лет.
                        </p>
                    </div>

                    {/* Animated characters */}
                    <div className="relative h-20 mt-8">
                        <div className="absolute left-1/4 transform -translate-x-1/2 text-4xl animate-bounce">
                            🤑
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 text-4xl animate-pulse">
                            🎲
                        </div>
                        <div className="absolute left-3/4 transform -translate-x-1/2 text-4xl animate-bounce">
                            💰
                        </div>
                    </div>
                </div>
            </footer>

            {/* Bonus Popup */}
            {showBonus && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-b from-blue-700 to-blue-900 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-zoomIn">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🎉</div>
                            <h3 className="text-2xl font-bold mb-4">Поздравляем!</h3>
                            <p className="text-xl mb-6">
                                {winAmount > 0
                                    ? `Вы выиграли ${winAmount} бонусных монет!`
                                    : 'Крутите колесо удачи, чтобы выиграть бонусные монеты!'}
                            </p>
                            <button
                                onClick={() => setShowBonus(false)}
                                className="bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                                Забрать бонус
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mini Game Popup */}
            {showMiniGame && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-b from-blue-700 to-blue-900 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-zoomIn">
                        <div className="text-center">
                            <div className="text-6xl mb-4 animate-spin">🎲</div>
                            <h3 className="text-2xl font-bold mb-4">Мини-игра</h3>

                            {winAmount > 0 ? (
                                <>
                                    <p className="text-xl mb-6">
                                        Поздравляем! Вы выиграли {winAmount} монет!
                                    </p>
                                    <button
                                        onClick={() => {
                                            setShowMiniGame(false);
                                            setWinAmount(0);
                                        }}
                                        className="bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                                    >
                                        Забрать выигрыш
                                    </button>
                                </>
                            ) : (
                                <p className="text-xl mb-6">Идет розыгрыш бесплатных монет...</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes zoomIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }

                .animate-zoomIn {
                    animation: zoomIn 0.3s ease-out forwards;
                }

                .border-b-16 {
                    border-bottom-width: 16px;
                }
            `}</style>
        </div>
    );
}
