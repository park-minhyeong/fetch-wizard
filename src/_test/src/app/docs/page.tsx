'use client';

import { useState } from 'react';
import Navigation from '../../components/molecule/Navigation';
import Sidebar from '../../components/molecule/Sidebar';
import ContentArea from '../../components/molecule/ContentArea';
import DocumentTemplate from '../../components/template/docs';

const documentKeys=["installation","basic-usage","api-methods","configuration","interceptors","error-handling","examples","migration"];
type DocumentKey = typeof documentKeys[number];
export default function ApiWizardDocs() {
  const [activeSection, setActiveSection] = useState<DocumentKey>('installation');
  const sections = [
    { id: 'installation', title: '설치', icon: '📦' },
    { id: 'basic-usage', title: '기본 사용법', icon: '🚀' },
    { id: 'api-methods', title: 'API 메서드', icon: '🔧' },
    { id: 'configuration', title: '설정', icon: '⚙️' },
    { id: 'interceptors', title: '인터셉터', icon: '🎯' },
    { id: 'error-handling', title: '에러 처리', icon: '⚠️' },
    { id: 'examples', title: '실제 예시', icon: '💡' },
    { id: 'migration', title: 'Axios 마이그레이션', icon: '🔄' }
  ];
  const renderContent = (): React.ReactNode => {
		if (activeSection === 'installation')	return <DocumentTemplate.Installation />;
		if (activeSection === 'basic-usage')	return <DocumentTemplate.BasicUsage />;
		if (activeSection === 'api-methods')	return <DocumentTemplate.ApiMethods />;
		if (activeSection === 'configuration')	return <DocumentTemplate.Configuration />;
		if (activeSection === 'interceptors')	return <DocumentTemplate.Interceptors />;
		if (activeSection === 'examples')	return <DocumentTemplate.Examples />;
		if(activeSection === 'error-handling')	return <DocumentTemplate.ErrorHandling />;
		if (activeSection === 'migration')	return <DocumentTemplate.Migration />;
		return <div>섹션을 선택해주세요.</div>;
	};	
  return (
    <div className="flex min-h-[calc(100vh-40px)]">
      <Sidebar title="API Wizard 🧙‍♂️">
        <Navigation 
          items={sections}
          activeItem={activeSection}
          onItemClick={setActiveSection}
        />
      </Sidebar>
      <ContentArea>
        {renderContent()}
      </ContentArea>
    </div>
  );
}
