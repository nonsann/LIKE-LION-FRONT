import React, { useState, useEffect, useRef } from 'react';
import './GameCanvas.css';

const FLOOR_Y_POS = 500;
const GameCanvas = () => {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const obstacleIntervalRef = useRef();
    const [playerY, setPlayerY] = useState(FLOOR_Y_POS);
    const [obstacles, setObstacles] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const playerImage = new Image();
    playerImage.src = '/little-lion.png';

    const playerWidth = 55;
    const playerHeight = 50;
    const playerX = 100; // 플레이어의 X 위치는 고정
    const gravity = 1;
    let velocity = 0;
    const jumpHeight = 30;
    let curY = 0;
    let isObsInt = false;
    let isOver = false;

    // 플레이어 점프 처리
    const handleJump = () => {
        if (!gameOver && playerY === FLOOR_Y_POS) { // 플레이어가 땅에 있을 때만 점프 가능
            velocity = -jumpHeight;
        }

        if (isOver)
            initGame();
    };

    const initGame = () => {
        isOver = false;
        setGameOver(false);

        const newObstacles = obstacles.map(obstacle => {
            return { ...obstacle, x: obstacle.x -= 10000 };
        }).filter(obstacle => obstacle.x + obstacle.width > 0);

        setObstacles([]);
        setScore(0);

        requestAnimationFrame(updateGame)
        obstacleIntervalRef.current = setInterval(() => {
            addObstacle();
        }, 1000);
    }

    const addObstacle = () => {
        const minHeight = 30;
        const maxHeight = 300;
        const randomHeight = Math.random() * (maxHeight - minHeight) + minHeight;
        const randomWidth = Math.random() * (200 - 30) + 30;

        const newObstacle = { x: canvasRef.current.width, y: FLOOR_Y_POS - randomHeight, width: randomWidth, height: randomHeight };

        obstacles.push(newObstacle);
    };


    // 충돌 감지
    const checkCollision = (obstacle) => {
        const withinXRange = playerX + playerWidth > obstacle.x && playerX < obstacle.x + obstacle.width;
        const withinYRange = curY > obstacle.y;
        console.log(withinYRange + " " + obstacle.y + ":::" + curY)

        if (withinXRange && withinYRange) {
            isOver = true;
            setGameOver(true);
            cancelAnimationFrame(requestRef.current);
            clearInterval(obstacleIntervalRef.current);
        }
    };

    // 게임 업데이트
    const updateGame = (timestamp) => {
        if (!isOver) {
            setPlayerY(playerY => {
                let newY = playerY + velocity;
                velocity += gravity;

                if (newY > FLOOR_Y_POS) {
                    newY = FLOOR_Y_POS; // 땅에 닿으면 멈춤
                    velocity = 0;
                }

                if (newY <= 0) {
                    newY = FLOOR_Y_POS;
                    velocity = 0;
                }

                curY = newY;
                return newY;
            });

            const newObstacles = obstacles.map(obstacle => {
                return { ...obstacle, x: obstacle.x -= 5 };
            }).filter(obstacle => obstacle.x + obstacle.width > 0);

            setObstacles(newObstacles);
            obstacles.forEach(checkCollision);

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

        if (isObsInt != true) {
            isObsInt = true;
            obstacleIntervalRef.current = setInterval(() => {
                addObstacle();
            }, 1000);
        }

        return () => {
            window.removeEventListener('keydown', handleJump);
            clearInterval(obstacleIntervalRef.current); // 클린업에서 인터벌 해제
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // 플레이어 그리기
        ctx.drawImage(playerImage, playerX, playerY - playerHeight, playerWidth, playerHeight);

        // 장애물 그리기
        obstacles.forEach(obstacle => {
            ctx.fillStyle = '#FF2511';
            ctx.fillRect(obstacle.x, FLOOR_Y_POS - obstacle.height, obstacle.width, obstacle.height); // 장애물 그리기 Y 좌표 수정
        });

    }, [playerY, obstacles]);

    return (
        <div style={{ background: 'black', width: '100%' }}>
            <br />
            {!gameOver && <div style={{ marginBottom: '20px', textAlign: 'center', color: 'white', fontSize: '23px' }}>Score: {score}</div>}
            {gameOver && <div style={{ marginBottom: '20px', textAlign: 'center', color: 'white', fontSize: '23px' }}>Final Score: {score}</div>}
            <canvas
                ref={canvasRef}
                width={600}
                height={FLOOR_Y_POS}
                style={{ border: '5px solid white', display: 'block', margin: '0 auto' }}
            />
        </div>
    );
};

export default GameCanvas;
