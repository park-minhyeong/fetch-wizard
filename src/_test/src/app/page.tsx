import { useNavigate } from "react-router-dom";
import Button from "../components/atom/Button";

export default function App() {
  const router = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-8">
      <div className="text-center max-w-2xl">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-2xl">🧙‍♂️</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          API Wizard 테스트
        </h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          기존 구조를 활용한 API Wizard 라이브러리 테스트<br />
          아토믹 디자인 패턴으로 구성된 컴포넌트 시스템을 경험해보세요
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => router('/todos')}>
            샘플 보기
          </Button>
          <Button variant="secondary" size="lg" onClick={() => router('/docs')}>
            문서 보기
          </Button>
        </div>
      </div>
    </div>
  )
}

