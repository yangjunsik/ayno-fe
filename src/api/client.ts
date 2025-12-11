import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080', // 로컬 폴백 추가
  withCredentials: true, // [필수] 쿠키 주고받기
  headers: {
    'Content-Type': 'application/json',
  },
});

// [응답 인터셉터] 글로벌 에러 핸들링 (방패막이)
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 1. 401 Unauthorized: 토큰 만료 혹은 로그인 풀림
    // 1. 401 Unauthorized: 토큰 만료 혹은 로그인 풀림
    // if (error.response?.status === 401 && window.location.pathname !== '/login') {
    //   // 강제로 로그인 페이지로 이동시킴 (새로고침 효과)
    //   window.location.href = '/login';
    // }

    // 2. 403 Forbidden: 권한 없음
    if (error.response?.status === 403) {
      const message = error.response.data?.errorMessage || '접근 권한이 없습니다.';
      alert(message); // 사용자에게 알림 띄우기
    }

    return Promise.reject(error);
  }
);