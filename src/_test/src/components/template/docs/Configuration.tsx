import Section from '../../atom/Section';
import SubSection from '../../atom/SubSection';
import CodeBlock from '../../atom/CodeBlock';

export default function ConfigurationTemplate() {
  return (
    <Section title="설정" icon="⚙️">
      <SubSection title="전역 설정">
        <CodeBlock>{`const api = handler({
  users: 'https://api.users.com',
  products: 'https://api.products.com'
}, {
  // 전역 설정
  withCredentials: true,
  contentType: 'application/json'
});`}</CodeBlock>
      </SubSection>

      <SubSection title="API별 설정">
        <CodeBlock>{`// 사용자 API 설정
const userApi = api.users({
  version: 'v1',
  contentType: 'application/json',
  charset: 'UTF-8',
  accept: 'application/json',
  withCredentials: true
});

// 결제 API 설정 (다른 Content-Type)
const paymentApi = api.payments({
  version: 'v2',
  contentType: 'application/xml'
});`}</CodeBlock>
      </SubSection>

      <SubSection title="직접 인스턴스 생성">
        <CodeBlock>{`import instance from 'api-wizard';

const api = instance('https://api.example.com', {
  version: 'v1',
  contentType: 'application/json'
});

const response = await api.get<User[]>('/users');`}</CodeBlock>
      </SubSection>

      <SubSection title="쿠키 관리">
        <CodeBlock>{`import { getCookies, CookieConfig } from 'api-wizard';

// 브라우저 환경
const cookies = getCookies();
console.log(cookies); // "sessionId=abc123; userId=456"

// 서버 환경 (Node.js/Express)
new CookieConfig('sessionId=abc123; userId=456; theme=dark');
const serverCookies = getCookies();`}</CodeBlock>
      </SubSection>

      <SubSection title="Express 서버 통합">
        <CodeBlock>{`// Express 라우트에서 쿠키 전달
app.get('/api/sso/sign', async (req, res) => {
  try {
    // 클라이언트 쿠키를 전역으로 설정
    new CookieConfig(req.headers.cookie || '');
    
    // API 호출 (쿠키 자동 포함)
    const response = await ssoApi.sign.get();
    
    if (response.status > 299) {
      return res.status(401).json("Unauthorized");
    }
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});`}</CodeBlock>
      </SubSection>

      <SubSection title="쿠키 인터셉터">
        <CodeBlock>{`// 인터셉터를 통한 쿠키 자동 포함
const api = api.sso({ 
  version: "v3", 
  interceptor: {
    onRequest: (config) => {
      const cookies = getCookies();
      if (cookies) {
        config.headers = {
          ...config.headers,
          'Cookie': cookies
        };
      }
      return config;
    }
  }
});

const response = await api.get<SignApi>("/sign");`}</CodeBlock>
      </SubSection>
    </Section>
  );
}
