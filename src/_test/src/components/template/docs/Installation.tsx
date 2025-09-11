import Section from '../../atom/Section';
import SubSection from '../../atom/SubSection';
import CodeBlock from '../../atom/CodeBlock';

export default function InstallationTemplate() {
  return (
    <Section title="설치" icon="📦">
      <SubSection title="NPM">
        <CodeBlock>npm install api-wizard</CodeBlock>
      </SubSection>
      <SubSection title="Yarn">
        <CodeBlock>yarn add api-wizard</CodeBlock>
      </SubSection>
      <SubSection title="PNPM">
        <CodeBlock>pnpm add api-wizard</CodeBlock>
      </SubSection>
    </Section>
  );
}
