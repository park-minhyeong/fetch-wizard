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
    </Section>
  );
}
