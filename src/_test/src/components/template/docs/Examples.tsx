import Section from '../../atom/Section';
import SubSection from '../../atom/Section.Sub';
import CodeBlock from '../../atom/CodeBlock';

export default function ExamplesTemplate() {
  return (
    <Section title="실제 예시" icon="💡">
      <SubSection title="React Hook 예시">
        <CodeBlock>{`import { useState, useEffect } from 'react';
import { handler } from 'api-wizard';

const api = handler({
  users: 'https://jsonplaceholder.typicode.com'
});

interface User {
  id: number;
  name: string;
  email: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const userApi = api.users();
      const response = await userApi.get<User[]>('/users');
      setUsers(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
}`}</CodeBlock>
      </SubSection>

      <SubSection title="서비스 클래스 예시">
        <CodeBlock>{`// services/userService.ts
import { handler } from 'api-wizard';

const api = handler({
  users: 'https://api.users.com'
});

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export const userService = {
  getUsers: () => api.users({ version: 'v1' }).get<User[]>('/users'),
  getUser: (id: number) => api.users({ version: 'v1' }).get<User>(\`/users/\${id}\`),
  createUser: (user: CreateUserRequest) => 
    api.users({ version: 'v1' }).post<CreateUserRequest, User>('/users', user),
  updateUser: (id: number, user: User) => 
    api.users({ version: 'v1' }).put<User, User>(\`/users/\${id}\`, user),
  deleteUser: (id: number) => 
    api.users({ version: 'v1' }).delete(\`/users/\${id}\`)
};`}</CodeBlock>
      </SubSection>

      <SubSection title="Next.js API Route 예시">
        <CodeBlock>{`// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { handler } from 'api-wizard';

const api = handler({
  external: 'https://external-api.com'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const externalApi = api.external();
    const response = await externalApi.get('/users');
    
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}`}</CodeBlock>
      </SubSection>
    </Section>
  );
}
