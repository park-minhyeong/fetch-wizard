import Section from '../../atom/Section';
import SubSection from '../../atom/SubSection';
import CodeBlock from '../../atom/CodeBlock';

export default function ApiMethodsTemplate() {
  return (
    <Section title="API 메서드" icon="🔧">
      <SubSection title="GET - 데이터 조회">
        <CodeBlock>{`// 기본 GET
const users = await api.get<User[]>('/users');

// 쿼리 파라미터 포함
const users = await api.get<User[]>('/users', {
  params: { page: '1', limit: '10' }
});

// 특정 사용자 조회
const user = await api.get<User>(\`/users/\${id}\`);`}</CodeBlock>
      </SubSection>

      <SubSection title="POST - 데이터 생성">
        <CodeBlock>{`// JSON 데이터 전송
const newUser = await api.post<CreateUserRequest, User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Form-urlencoded 데이터 전송
const formApi = api.users({
  contentType: 'application/x-www-form-urlencoded'
});
const formData = new URLSearchParams({
  name: 'John Doe',
  email: 'john@example.com'
});
const response = await formApi.post('/users', formData.toString());`}</CodeBlock>
      </SubSection>

      <SubSection title="PUT - 전체 업데이트">
        <CodeBlock>{`const updatedUser = await api.put<User, User>(\`/users/\${id}\`, {
  id: 1,
  name: 'Updated Name',
  email: 'updated@example.com'
});`}</CodeBlock>
      </SubSection>

      <SubSection title="PATCH - 부분 업데이트">
        <CodeBlock>{`const patchedUser = await api.patch<Partial<User>, User>(\`/users/\${id}\`, {
  name: 'New Name'
});`}</CodeBlock>
      </SubSection>

      <SubSection title="DELETE - 데이터 삭제">
        <CodeBlock>{`await api.delete(\`/users/\${id}\`);`}</CodeBlock>
      </SubSection>
    </Section>
  );
}
