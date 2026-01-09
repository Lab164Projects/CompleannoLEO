
import React, { useEffect, useRef } from 'react';

export const FireworksCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            x: number;
            y: number;
            color: string;
            velocity: { x: number; y: number };
            alpha: number;

            constructor(x: number, y: number, color: string) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.velocity = {
                    x: (Math.random() - 0.5) * (Math.random() * 8),
                    y: (Math.random() - 0.5) * (Math.random() * 8),
                };
                this.alpha = 1;
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.draw();
                this.velocity.y += 0.05; // Gravity
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= 0.01;
            }
        }

        let particles: Particle[] = [];
        const colors = ['#ff0044', '#00ffcc', '#ffff00', '#ff00ff', '#00ff00', '#ffffff', '#ffaa00'];

        const createFirework = (x: number, y: number) => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            for (let i = 0; i < 40; i++) {
                particles.push(new Particle(x, y, color));
            }
        };

        // Initial bursts
        setTimeout(() => createFirework(canvas.width * 0.2, canvas.height * 0.3), 100);
        setTimeout(() => createFirework(canvas.width * 0.8, canvas.height * 0.35), 500);
        setTimeout(() => createFirework(canvas.width * 0.5, canvas.height * 0.2), 1000);
        setTimeout(() => createFirework(canvas.width * 0.3, canvas.height * 0.5), 1500);
        setTimeout(() => createFirework(canvas.width * 0.7, canvas.height * 0.45), 2000);

        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                if (particle.alpha > 0) {
                    particle.update();
                } else {
                    particles.splice(index, 1);
                }
            });
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[60]"
            style={{ background: 'transparent' }}
        />
    );
};
