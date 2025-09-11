import Section from '../../atom/Section';
import SubSection from '../../atom/SubSection';
import CodeBlock from '../../atom/CodeBlock';

export default function ErrorHandlingTemplate() {
  return (
    <Section title="에러 처리" icon="⚠️">
      <SubSection title="기본 에러 처리">
        <CodeBlock>{`try {
  const response = await api.get('/protected-resource');
  console.log('성공:', response.data);
} catch (error) {
  if (error.response) {
    // 서버가 응답했지만 에러 상태
    console.error('상태:', error.response.status);
    console.error('데이터:', error.response.data);
    console.error('헤더:', error.response.headers);
  } else if (error.request) {
    // 요청은 했지만 응답을 받지 못함
    console.error('응답을 받지 못했습니다');
  } else {
    // 요청 설정 중 에러
    console.error('에러:', error.message);
  }
}`}</CodeBlock>
      </SubSection>

      <SubSection title="에러 상태별 처리">
        <CodeBlock>{`try {
  const response = await api.get('/users');
} catch (error) {
  switch (error.response?.status) {
    case 400:
      console.log('잘못된 요청');
      break;
    case 401:
      console.log('인증이 필요합니다');
      break;
    case 403:
      console.log('권한이 없습니다');
      break;
    case 404:
      console.log('리소스를 찾을 수 없습니다');
      break;
    case 500:
      console.log('서버 에러');
      break;
    default:
      console.log('알 수 없는 에러');
  }
}`}</CodeBlock>
      </SubSection>

      <SubSection title="400번대 에러는 정상 응답">
        <CodeBlock>{`// 400번대 에러는 예외를 발생시키지 않음
const response = await api.get('/users/999');
console.log(response.status); // 404
console.log(response.ok);     // false
console.log(response.data);   // 에러 메시지

// 500번대 에러만 예외 발생
try {
  const response = await api.get('/server-error');
} catch (error) {
  // 500번대 에러만 여기서 처리
}`}</CodeBlock>
      </SubSection>
    </Section>
  );
}
