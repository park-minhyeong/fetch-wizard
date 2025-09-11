import Section from '../../atom/Section';
import SubSection from '../../atom/Section.Sub';
import CodeBlock from '../../atom/CodeBlock';

export default function BasicUsageTemplate() {
  return (
    <Section title="기본 사용법" icon="🚀">
      <SubSection title="1. API 설정">
        <CodeBlock>{`import { handler } from 'api-wizard';

// API 엔드포인트 설정
const apiConfig = {
  users: 'https://api.users.com',
  products: 'https://api.products.com'
};

// API 핸들러 생성
const api = handler(apiConfig);`}</CodeBlock>
      </SubSection>
      
      <SubSection title="2. 타입 정의">
        <CodeBlock>{`interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}`}</CodeBlock>
      </SubSection>

      <SubSection title="3. API 사용">
        <CodeBlock>{`// GET 요청
const userApi = api.users({ version: 'v1' });
const users = await userApi.get<User[]>('/users');

// POST 요청
const newUser = await userApi.post<CreateUserRequest, User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});`}</CodeBlock>
      </SubSection>
    </Section>
  );
}
