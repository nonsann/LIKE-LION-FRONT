import React, { useState, useEffect, useRef } from 'react';

const FLOOR_Y_POS = 500;
const GameCanvas = () => {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const obstacleIntervalRef = useRef();
    const [playerY, setPlayerY] = useState(FLOOR_Y_POS);
    const [obstacles, setObstacles] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const playerWidth = 50;
    const playerHeight = 50;
    const playerX = 100; // 플레이어의 X 위치는 고정
    const gravity = 1.5;
    let velocity = 0;
    const jumpHeight = 15;

    // 플레이어 점프 처리
    const handleJump = () => {
        if (!gameOver && playerY === FLOOR_Y_POS) { // 플레이어가 땅에 있을 때만 점프 가능
            velocity = -jumpHeight;
        }
    };

    // 장애물 생성
    const addObstacle = (timestamp) => {
        if (obstacles.length === 0 || (obstacles.length > 0 && canvasRef.current.width - obstacles[obstacles.length - 1].x > 200)) {
            setObstacles([...obstacles, { x: canvasRef.current.width, width: 20, height: 50 }]);
        }

        obstacleIntervalRef.current = setInterval(addObstacle, 2000); // 2초마다 장애물 생성

        return () => {
            window.removeEventListener('keydown', handleJump);
            clearInterval(obstacleIntervalRef.current);
            cancelAnimationFrame(requestRef.current);
        };
    };

    // 충돌 감지
    const checkCollision = (obstacle) => {
        const withinXRange = playerX + playerWidth > obstacle.x && playerX < obstacle.x + obstacle.width;
        const withinYRange = playerY < obstacle.height;

        if (withinXRange && withinYRange) {
            setGameOver(true);
            cancelAnimationFrame(requestRef.current);
        }
    };

    // 게임 업데이트
    const updateGame = (timestamp) => {
        addObstacle(timestamp);

        setPlayerY(playerY => {
            let newY = playerY + velocity;
            velocity += gravity;

            if (newY > FLOOR_Y_POS) {
                newY = FLOOR_Y_POS; // 땅에 닿으면 멈춤
                velocity = 0;
            }

            return newY;
        });

        const newObstacles = obstacles.map(obstacle => {
            return { ...obstacle, x: obstacle.x - 5 };
        }).filter(obstacle => obstacle.x + obstacle.width > 0);

        setObstacles(newObstacles);
        newObstacles.forEach(checkCollision);

        if (!gameOver) {
            setScore(prevScore => prevScore + 1);
            requestRef.current = requestAnimationFrame(updateGame);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.keyCode === 32) {
                handleJump();
            }
        });

        requestRef.current = requestAnimationFrame(updateGame);

        return () => {
            window.removeEventListener('keydown', handleJump);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // 플레이어 그리기
        ctx.fillStyle = 'blue';
        ctx.fillRect(playerX, playerY - playerHeight, playerWidth, playerHeight);

        // 장애물 그리기
        obstacles.forEach(obstacle => {
            ctx.fillStyle = 'red';
            ctx.fillRect(obstacle.x, canvasRef.current.height - obstacle.height, obstacle.width, obstacle.height);
        });

    }, [playerY, obstacles]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={800}
                height={FLOOR_Y_POS}
                style={{ border: '1px solid black' }}
            />
            <div>Score: {score}</div>
            {gameOver && <div>Game Over. Final Score: {score}</div>}
        </div>
    );
};

export default GameCanvas;
