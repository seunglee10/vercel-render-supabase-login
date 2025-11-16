import React, { useState, useEffect } from 'react';

// BE 응답 타입 정의 (TypeScript의 장점을 활용)
interface HealthStatus {
    status: string;
}

// Render에 배포된 백엔드 API 주소
const API_URL = 'https://my-fastapi-backend-3zxz.onrender.com/api/v1/health';

const DataFetcher: React.FC = () => {
    const [status, setStatus] = useState<string>('연결 시도 중...');

    useEffect(() => {
        // 1. FE -> BE 연결 테스트
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data: HealthStatus) => {
                setStatus(`성공: ${data.status}`);
            })
            .catch(error => {
                console.error("API 연결 오류:", error);
                setStatus(`실패: ${error.message}. CORS 또는 네트워크 확인 필요.`);
            });
    }, []);

    return (
        <div>
            <h2>Front-End to Back-End Connection Status</h2>
            <p>Backend URL: {API_URL}</p>
            <p>결과: <strong>{status}</strong></p>
        </div>
    );
};

export default DataFetcher;