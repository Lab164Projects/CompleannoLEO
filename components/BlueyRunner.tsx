
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Trophy, Zap, Star, Medal, Play } from 'lucide-react';

export const BlueyRunner: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'victory'>('start');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [playerY, setPlayerY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [obstacles, setObstacles] = useState<{ id: number; x: number; type: 'cactus' | 'toy' }[]>([]);

    const gameRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();
    const lastTimeRef = useRef<number>();

    const JUMP_FORCE = 15;
    const GRAVITY = 0.8;
    const PLAYER_X = 50; // Fixed X position
    const GROUND_Y = 0;

    const jump = () => {
        if (!isJumping && gameState === 'playing') {
            setIsJumping(true);
            setPlayerY(1);
            velocityRef.current = JUMP_FORCE;
        }
    };

    const velocityRef = useRef(0);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setObstacles([]);
        setPlayerY(0);
        velocityRef.current = 0;
        setIsJumping(false);
    };

    useEffect(() => {
        if (gameState !== 'playing') return;

        const spawnObstacle = () => {
            setObstacles(prev => [
                ...prev,
                {
                    id: Date.now(),
                    x: 100,
                    type: Math.random() > 0.5 ? 'cactus' : 'toy'
                }
            ]);
        };

        const spawnInterval = setInterval(spawnObstacle, 2000 - Math.min(1000, score * 10));

        const update = (time: number) => {
            if (lastTimeRef.current !== undefined) {
                // Physics
                if (isJumping || playerY > 0) {
                    setPlayerY(y => {
                        const nextY = y + velocityRef.current;
                        velocityRef.current -= GRAVITY;
                        if (nextY <= GROUND_Y) {
                            setIsJumping(false);
                            velocityRef.current = 0;
                            return GROUND_Y;
                        }
                        return nextY;
                    });
                }

                // Obstacles movement
                setObstacles(prev => {
                    const next = prev.map(o => ({ ...o, x: o.x - (1.5 + score * 0.05) }));

                    // Collision detection
                    const playerRect = { left: PLAYER_X, right: PLAYER_X + 40, top: playerY + 50, bottom: playerY };
                    for (const o of next) {
                        if (o.x > 10 && o.x < 20) { // Approximate collision zone
                            if (playerY < 30) { // Player is low enough to hit obstacle
                                setGameState('gameover');
                                return prev;
                            }
                        }
                    }

                    return next.filter(o => o.x > -10);
                });

                setScore(s => {
                    const newScore = s + 0.1;
                    if (newScore >= 100) {
                        setGameState('victory');
                    }
                    return newScore;
                });
            }
            lastTimeRef.current = time;
            requestRef.current = requestAnimationFrame(update);
        };

        requestRef.current = requestAnimationFrame(update);

        return () => {
            clearInterval(spawnInterval);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [gameState, isJumping, playerY, score]);

    useEffect(() => {
        if (score > highScore) setHighScore(Math.floor(score));
    }, [score]);

    return (
        <div
            ref={gameRef}
            onClick={jump}
            className="relative h-[400px] w-full bg-[#00ADEF] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl cursor-pointer select-none"
        >
            {/* City/Park Background */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-[#F7941D] opacity-30" />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20" />

            {/* Clouds */}
            <div className="absolute top-10 left-[10%] w-20 h-8 bg-white/40 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-20 left-[60%] w-32 h-10 bg-white/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <button
                    onClick={(e) => { e.stopPropagation(); onBack(); }}
                    className="p-3 bg-white/95 rounded-2xl hover:bg-white transition-all shadow-xl text-[#00ADEF]"
                >
                    <ChevronLeft />
                </button>
                <div className="bg-white/95 px-5 py-2 rounded-2xl font-black text-[#00ADEF] shadow-xl flex flex-col items-center">
                    <span className="text-[10px] uppercase opacity-40">Metri</span>
                    <span className="text-xl leading-none">{Math.floor(score)}</span>
                </div>
            </div>

            {/* Player (Bluey) */}
            <div
                className="absolute bottom-10 left-[50px] w-14 h-14 z-10 transition-transform"
                style={{ transform: `translateY(${-playerY}px)` }}
            >
                <img src="/Bluey.png" alt="Bluey" className="w-full h-full object-contain" />
            </div>

            {/* Obstacles */}
            {obstacles.map(o => (
                <div
                    key={o.id}
                    className="absolute bottom-10 w-10 h-10 flex items-center justify-center"
                    style={{ left: `${o.x}%` }}
                >
                    {o.type === 'cactus' ? (
                        <div className="w-8 h-8 bg-green-500 rounded-lg border-2 border-white shadow-lg" />
                    ) : (
                        <div className="w-10 h-10 bg-orange-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white">
                            <Star size={16} fill="white" />
                        </div>
                    )}
                </div>
            ))}

            {/* Screens */}
            {gameState === 'start' && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-white p-6">
                    <img src="/Bluey.png" alt="Bluey" className="w-32 h-32 mb-4 animate-bounce" />
                    <h2 className="text-4xl font-refined mb-2">Bluey Runner!</h2>
                    <p className="text-center mb-6 font-bold">Salta gli ostacoli per arrivare alla festa!</p>
                    <button
                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                        className="bg-white text-[#00ADEF] px-10 py-4 rounded-full font-black shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center gap-2"
                    >
                        <Play fill="currentColor" /> INIZIA!
                    </button>
                </div>
            )}

            {gameState === 'gameover' && (
                <div className="absolute inset-0 bg-red-600/90 backdrop-blur-md z-30 flex flex-col items-center justify-center text-white">
                    <h2 className="text-6xl font-refined mb-4">OPS!</h2>
                    <p className="text-xl font-bold mb-8">Hai preso un ostacolo!</p>
                    <button
                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                        className="bg-white text-red-600 px-10 py-4 rounded-full font-black shadow-2xl hover:scale-110 transition-transform active:scale-95"
                    >
                        RIPROVA!
                    </button>
                </div>
            )}

            {gameState === 'victory' && (
                <div className="absolute inset-0 bg-yellow-400 z-30 flex flex-col items-center justify-center text-[#F7941D] animate-in zoom-in duration-700">
                    <Medal size={100} className="mb-4 animate-bounce" />
                    <h2 className="text-5xl font-refined mb-2">CAMPIONE!</h2>
                    <p className="text-2xl font-black mb-8">Sei arrivato da Leonardo!</p>
                    <img src="/Bluey5.png" alt="Victory" className="w-48 h-48 object-contain mb-8" />
                    <button
                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                        className="bg-[#F7941D] text-white px-10 py-4 rounded-full font-black shadow-2xl hover:scale-110 transition-transform active:scale-95"
                    >
                        GIOCA ANCORA!
                    </button>
                </div>
            )}
        </div>
    );
};
