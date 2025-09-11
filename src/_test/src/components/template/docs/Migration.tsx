import Section from '../../atom/Section';
import SubSection from '../../atom/Section.Sub';
import CodeBlock from '../../atom/CodeBlock';
import InfoBox from '../../molecule/InfoBox';

export default function MigrationTemplate() {
  return (
    <Section title="Axios 마이그레이션" icon="🔄">
      <SubSection title="기본 설정 마이그레이션">
        <CodeBlock>{`// Before (Axios)
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

// After (API Wizard)
import { handler } from 'api-wizard';

const api = handler({
  main: 'https://api.example.com'
}, {
  interceptor: {
    tokenConfig: {
      getToken: () => 'token',
      formatAuthHeader: (token) => ({ 'Authorization': \`Bearer \${token}\` })
    }
  },
  requestConfig: {
    timeout: 5000
  }
});`}</CodeBlock>
      </SubSection>

      <SubSection title="요청 메서드 마이그레이션">
        <CodeBlock>{`// Before (Axios)
const response = await api.get('/users');
const newUser = await api.post('/users', userData);
const updatedUser = await api.put(\`/users/\${id}\`, userData);
await api.delete(\`/users/\${id}\`);

// After (API Wizard) - 거의 동일!
const mainApi = api.main();
const response = await mainApi.get('/users');
const newUser = await mainApi.post('/users', userData);
const updatedUser = await mainApi.put(\`/users/\${id}\`, userData);
await mainApi.delete(\`/users/\${id}\`);`}</CodeBlock>
      </SubSection>

      <SubSection title="에러 처리 마이그레이션">
        <CodeBlock>{`// Before (Axios)
try {
  const response = await api.get('/users');
} catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  }
}

// After (API Wizard) - 동일한 구조!
try {
  const response = await api.get('/users');
} catch (error) {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  }
}`}</CodeBlock>
      </SubSection>

      <InfoBox variant="info">
        <h4 className="font-semibold mb-2">✅ 마이그레이션 장점</h4>
        <ul className="text-sm space-y-1">
          <li>• API 구조가 거의 동일하여 코드 변경 최소화</li>
          <li>• 73% 더 작은 번들 크기 (45KB → 12KB)</li>
          <li>• 외부 의존성 제거</li>
          <li>• 네이티브 Fetch API 사용으로 성능 향상</li>
          <li>• TypeScript 지원 강화</li>
        </ul>
      </InfoBox>
    </Section>
  );
}
