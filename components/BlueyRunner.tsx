
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, Trophy, Star, Play, RotateCcw } from 'lucide-react';

interface Obstacle {
    id: number;
    x: number;
    type: 'ball' | 'cone';
}

export const BlueyRunner: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'victory'>('start');
    const [score, setScore] = useState(0);
    const [playerY, setPlayerY] = useState(0);
    const [frame, setFrame] = useState(0);
    const [obstacles, setObstacles] = useState<Obstacle[]>([]);
    const [bgOffset, setBgOffset] = useState(0);

    const requestRef = useRef<number>();
    const lastUpdateRef = useRef<number>(0);
    const velocityRef = useRef(0);
    const isJumpingRef = useRef(false);
    const scoreRef = useRef(0);
    const obstaclesRef = useRef<Obstacle[]>([]);
    const bgOffsetRef = useRef(0);

    // Constants
    const GRAVITY = 0.6;
    const JUMP_FORCE = 12;
    const GROUND_Y = 0;
    const GAME_SPEED = 5;
    const PLAYER_X_PX = 60;
    const PLAYER_WIDTH = 50;
    const PLAYER_HEIGHT = 60;

    const startGame = useCallback(() => {
        setGameState('playing');
        setScore(0);
        scoreRef.current = 0;
        setPlayerY(0);
        velocityRef.current = 0;
        isJumpingRef.current = false;
        setObstacles([]);
        obstaclesRef.current = [];
        setBgOffset(0);
        bgOffsetRef.current = 0;
        lastUpdateRef.current = performance.now();
        requestRef.current = requestAnimationFrame(gameLoop);
    }, []);

    const jump = useCallback(() => {
        if (!isJumpingRef.current && gameState === 'playing') {
            velocityRef.current = JUMP_FORCE;
            isJumpingRef.current = true;
        }
    }, [gameState]);

    const gameLoop = useCallback((time: number) => {
        if (gameState !== 'playing') return;

        const deltaTime = Math.min(time - lastUpdateRef.current, 32); // Cap delta time
        lastUpdateRef.current = time;

        // Player Physics
        let nextY = playerY + velocityRef.current;
        if (isJumpingRef.current || nextY > GROUND_Y) {
            velocityRef.current -= GRAVITY;
            if (nextY <= GROUND_Y) {
                nextY = GROUND_Y;
                velocityRef.current = 0;
                isJumpingRef.current = false;
            }
            setPlayerY(nextY);
        }

        // Animation frames (cycle 0, 1, 2)
        setFrame(f => (f + (deltaTime / 100)) % 3);

        // Background scrolling
        bgOffsetRef.current = (bgOffsetRef.current + GAME_SPEED) % 1000;
        setBgOffset(bgOffsetRef.current);

        // Obstacles movement & spawning
        const currentSpeed = GAME_SPEED + (scoreRef.current * 0.05);

        // Move existing obstacles
        const movedObstacles = obstaclesRef.current
            .map(o => ({ ...o, x: o.x - currentSpeed }))
            .filter(o => o.x > -100);

        // Spawn new obstacles
        if (movedObstacles.length === 0 || (movedObstacles[movedObstacles.length - 1].x < 500)) {
            if (Math.random() < 0.02) {
                movedObstacles.push({
                    id: Date.now(),
                    x: 800, // Spawn offscreen right
                    type: Math.random() > 0.5 ? 'ball' : 'cone'
                });
            }
        }

        // Collision Detection
        const playerBox = {
            x: PLAYER_X_PX + 10,
            y: nextY,
            w: PLAYER_WIDTH - 20,
            h: PLAYER_HEIGHT - 5
        };

        for (const o of movedObstacles) {
            const obstacleBox = {
                x: o.x + 5,
                y: 0,
                w: 30,
                h: 30
            };

            if (
                playerBox.x < obstacleBox.x + obstacleBox.w &&
                playerBox.x + playerBox.w > obstacleBox.x &&
                playerBox.y < obstacleBox.y + obstacleBox.h &&
                playerBox.y + playerBox.h > obstacleBox.y
            ) {
                setGameState('gameover');
                cancelAnimationFrame(requestRef.current!);
                return;
            }
        }

        obstaclesRef.current = movedObstacles;
        setObstacles(movedObstacles);

        // Score
        scoreRef.current += deltaTime / 1000 * 5;
        setScore(scoreRef.current);

        if (scoreRef.current >= 100) {
            setGameState('victory');
            cancelAnimationFrame(requestRef.current!);
            return;
        }

        requestRef.current = requestAnimationFrame(gameLoop);
    }, [gameState, playerY]);

    useEffect(() => {
        if (gameState === 'playing') {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [gameState, gameLoop]);

    // Handle keyboard jump
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [jump]);

    const playerImage = Math.floor(frame) === 0 ? "/Bluey.png" :
        Math.floor(frame) === 1 ? "/bluey2.png" : "/bluey3.png";

    return (
        <div
            className="relative h-[450px] w-full bg-[#87CEEB] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl cursor-pointer select-none"
            onClick={jump}
        >
            {/* SKY & CLOUDS (Static or slow parallax) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00ADEF] to-[#E6F7FF]">
                <div className="absolute top-10 left-[10%] w-24 h-10 bg-white/60 rounded-full blur-xl animate-pulse" />
                <div className="absolute top-24 left-[50%] w-32 h-12 bg-white/60 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-16 left-[80%] w-20 h-8 bg-white/60 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
            </div>

            {/* PARALLAX MOUNTAINS/BUSHES (Optional but let's stick to grass/environment for now) */}

            {/* SCROLLING GRASS FLOOR */}
            <div
                className="absolute bottom-0 w-[2000px] h-32 z-0"
                style={{
                    transform: `translateX(-${bgOffset % 400}px)`,
                    background: `
                linear-gradient(to bottom, #4CAF50 0%, #388E3C 100%),
                radial-gradient(circle at 20px 20px, #81C784 2px, transparent 0)
            `,
                    backgroundSize: '100% 100%, 40px 40px'
                }}
            >
                {/* Grass details */}
                <div className="flex w-full h-8 mt-[-10px]">
                    {Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} className="w-4 h-8 bg-[#4CAF50] rounded-full mx-[-1px]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                    ))}
                </div>
            </div>

            {/* HUD */}
            <div className="absolute top-4 left-4 z-40 flex items-center gap-2">
                <button
                    onClick={(e) => { e.stopPropagation(); onBack(); }}
                    className="p-3 bg-white/95 rounded-2xl hover:bg-white transition-all shadow-xl text-[#00ADEF]"
                >
                    <ChevronLeft />
                </button>
                <div className="bg-white/95 px-5 py-2 rounded-2xl font-black text-[#00ADEF] shadow-xl flex flex-col items-center">
                    <span className="text-[10px] uppercase opacity-40">PROGRESSO</span>
                    <div className="w-24 h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-[#00ADEF] transition-all" style={{ width: `${Math.min(100, score)}%` }} />
                    </div>
                </div>
            </div>

            {/* PLAYER */}
            <div
                className="absolute bottom-28 left-[60px] z-20"
                style={{
                    width: PLAYER_WIDTH,
                    height: PLAYER_HEIGHT,
                    transform: `translateY(-${playerY}px)`
                }}
            >
                <img
                    src={gameState === 'playing' ? playerImage : '/Bluey.png'}
                    alt="Bluey"
                    className={`w-full h-full object-contain ${isJumpingRef.current ? 'rotate-[-5deg]' : ''}`}
                />
                {/* Character Shadow */}
                <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-[2px]"
                    style={{
                        transform: `translateX(-50%) scale(${1 - (playerY / 200)})`,
                        opacity: 1 - (playerY / 150)
                    }}
                />
            </div>

            {/* OBSTACLES */}
            {obstacles.map(o => (
                <div
                    key={o.id}
                    className="absolute bottom-32 z-10"
                    style={{ left: o.x, width: 30, height: 30 }}
                >
                    {o.type === 'ball' ? (
                        <div className="w-full h-full bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDuration: '0.6s' }}>
                            <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full" />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-orange-500 border-2 border-white shadow-lg" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                    )}
                </div>
            ))}

            {/* START SCREEN */}
            {gameState === 'start' && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white p-6">
                    <div className="relative mb-8">
                        <div className="absolute -inset-4 bg-[#00ADEF] blur-2xl opacity-40 animate-pulse"></div>
                        <img src="/Bluey.png" alt="Bluey" className="relative w-40 h-40 object-contain animate-bounce" />
                    </div>
                    <h2 className="text-5xl font-refined mb-2 drop-shadow-lg text-white">Bluey Runner!</h2>
                    <p className="text-center mb-8 font-bold text-lg max-w-[250px]">Corri nel parco e arriva alla festa di Leonardo!</p>
                    <button
                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                        className="bg-white text-[#00ADEF] px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center gap-3"
                    >
                        <Play fill="currentColor" size={24} /> INIZIA!
                    </button>
                </div>
            )}

            {/* GAMEOVER SCREEN */}
            {gameState === 'gameover' && (
                <div className="absolute inset-0 bg-red-600/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center text-white p-6 animate-in fade-in duration-300">
                    <h2 className="text-7xl font-refined mb-2 text-white">OPS!</h2>
                    <p className="text-2xl font-black mb-10 text-white/90">Hai preso un ostacolo!</p>
                    <button
                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                        className="bg-white text-red-600 px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center gap-3"
                    >
                        <RotateCcw size={24} /> RIPROVA!
                    </button>
                </div>
            )}

            {/* VICTORY SCREEN */}
            {gameState === 'victory' && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ADEF] to-[#004A99] z-50 flex flex-col items-center justify-center text-white p-6 animate-in zoom-in duration-500">
                    <div className="relative mb-6">
                        <div className="absolute -inset-10 bg-yellow-400 blur-3xl opacity-30 animate-spin-slow"></div>
                        <img src="/Bluey4.png" alt="Champion" className="relative w-56 h-56 object-contain" />
                        <div className="absolute -top-4 -right-4 bg-yellow-400 text-[#004A99] p-3 rounded-full rotate-12 shadow-xl animate-bounce">
                            <Trophy size={32} />
                        </div>
                    </div>
                    <h2 className="text-6xl font-refined mb-2 text-white">CAMPIONE!</h2>
                    <p className="text-2xl font-black mb-10 text-yellow-300">Sei arrivato alla festa!</p>
                    <button
                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                        className="bg-white text-[#00ADEF] px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center gap-3"
                    >
                        <RotateCcw size={24} /> GIOCA ANCORA!
                    </button>
                </div>
            )}

            <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
        </div>
    );
};
