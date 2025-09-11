import Section from '../../atom/Section';
import SubSection from '../../atom/Section.Sub';
import CodeBlock from '../../atom/CodeBlock';

export default function InterceptorsTemplate() {
  return (
    <Section title="인터셉터" icon="🎯">
      <SubSection title="토큰 관리">
        <CodeBlock>{`const userApi = api.users({
  version: 'v1',
  interceptor: {
    tokenConfig: {
      // 토큰 저장소 설정
      getToken: () => localStorage.getItem('access_token'),
      setToken: (token) => localStorage.setItem('access_token', token),
      removeToken: () => localStorage.removeItem('access_token'),
      
      // 리프레시 토큰 설정
      getRefreshToken: () => localStorage.getItem('refresh_token'),
      setRefreshToken: (token) => localStorage.setItem('refresh_token', token),
      removeRefreshToken: () => localStorage.removeItem('refresh_token'),
      
      // 리프레시 엔드포인트
      refreshEndpoint: '/auth/refresh',
      
      // 커스텀 헤더 포맷
      formatAuthHeader: (token) => ({
        'Authorization': \`Bearer \${token}\`
      }),
      
      // 토큰 만료 콜백
      onTokenExpired: () => {
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
      }
    }
  }
});`}</CodeBlock>
      </SubSection>

      <SubSection title="요청 인터셉터">
        <CodeBlock>{`const userApi = api.users({
  interceptor: {
    onRequest: (config) => {
      // 요청 전 헤더 추가
      config.headers['X-Custom-Header'] = 'value';
      config.headers['X-Request-Time'] = new Date().toISOString();
      return config;
    }
  }
});`}</CodeBlock>
      </SubSection>

      <SubSection title="응답 인터셉터">
        <CodeBlock>{`const userApi = api.users({
  interceptor: {
    onResponse: (response) => {
      // 응답 데이터 변환
      if (response.data && response.data.result) {
        response.data = response.data.result;
      }
      return response;
    }
  }
});`}</CodeBlock>
      </SubSection>

      <SubSection title="에러 인터셉터">
        <CodeBlock>{`const userApi = api.users({
  interceptor: {
    onError: async (error) => {
      // 커스텀 에러 처리
      if (error.response?.status === 404) {
        console.log('리소스를 찾을 수 없습니다.');
      } else if (error.response?.status === 500) {
        console.log('서버 에러가 발생했습니다.');
      }
      return Promise.reject(error);
    }
  }
});`}</CodeBlock>
      </SubSection>
    </Section>
  );
}
