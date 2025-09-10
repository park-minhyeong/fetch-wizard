# API Wizard 🧙‍♂️

A powerful TypeScript wrapper for native Fetch API that provides enhanced features including token management, interceptors, and type-safe HTTP requests. Perfect for both client-side and server-side applications.

## Features

- 🔒 **Built-in token management** - Automatic access & refresh token handling
- 🎯 **Type-safe HTTP requests** - Full TypeScript support with generics
- 🔄 **Automatic token refresh** - Seamless token renewal with request queuing
- 🎨 **Customizable interceptors** - Request/response/error interceptors
- 🛠 **Flexible configuration** - Per-API and global configuration options
- 📝 **Content-type management** - Support for JSON, form-data, and more
- 🌐 **Native Fetch API** - Smaller bundle size, no external dependencies
- ⚡ **Zero dependencies** - Lightweight and fast
- 🚀 **Axios-compatible** - Easy migration from Axios
- 🍪 **Cookie support** - Built-in cookie management utilities
- 🔧 **Server-side ready** - Works in Node.js environments

## Installation

```bash
npm install api-wizard
# or
yarn add api-wizard
```

## Quick Start

### Basic Usage

```typescript
import { handler } from 'api-wizard';

// Define API endpoints configuration
const apiConfig = {
  users: 'https://api.users.com',
  products: 'https://api.products.com'
};

// Create API handlers
const api = handler(apiConfig);

// Make type-safe requests
interface User {
  id: number;
  name: string;
  email: string;
}

// GET request with version
const userApi = api.users({ version: 'v1' }); // https://api.users.com/v1

const getUser = async (id: number) => {
  const response = await userApi.get<User>(`/users/${id}`);
  return response.data;
};

// POST request with type-safe request body
interface CreateUserRequest {
  name: string;
  email: string;
}

const createUser = async (userData: CreateUserRequest) => {
  const response = await userApi.post<CreateUserRequest, User>('/users', userData);
  return response.data;
};
```

### Direct Instance Usage

```typescript
import instance from 'api-wizard';

// Create a direct instance
const api = instance('https://api.example.com', {
  version: 'v1',
  contentType: 'application/json'
});

// Use directly
const response = await api.get<User[]>('/users');
const newUser = await api.post<CreateUserRequest, User>('/users', userData);
```

## Advanced Configuration

### Token Management

```typescript
const userApi = api.users({
  version: 'v1',
  interceptor: {
    tokenConfig: {
      // Token storage configuration
      getToken: () => localStorage.getItem('access_token'),
      setToken: (token) => localStorage.setItem('access_token', token),
      removeToken: () => localStorage.removeItem('access_token'),
      
      // Refresh token configuration
      getRefreshToken: () => localStorage.getItem('refresh_token'),
      setRefreshToken: (token) => localStorage.setItem('refresh_token', token),
      removeRefreshToken: () => localStorage.removeItem('refresh_token'),
      
      // Endpoints
      refreshEndpoint: '/auth/refresh',
      
      // Optional: Custom header format
      formatAuthHeader: (token) => ({
        'Authorization': `Custom ${token}`
      }),
      
      // Optional: Token expiry callback
      onTokenExpired: () => {
        // Handle token expiration (e.g., redirect to login)
      }
    }
  }
});
```

### Custom Interceptors

```typescript
const userApi = api.users({
  version: 'v1',
  interceptor: {
    onRequest: (config) => {
      // Modify request config
      config.headers['Custom-Header'] = 'value';
      return config;
    },
    onResponse: (response) => {
      // Transform response data
      response.data = response.data.result;
      return response;
    },
    onError: async (error) => {
      // Custom error handling
      if (error.response?.status === 404) {
        // Handle 404 error
      }
      return Promise.reject(error);
    }
  }
});
```

### API Versioning & Content Type

```typescript
const userApi = api.users({
  // API version will be added to base URL
  version: 'v1',
  
  // Content type configuration
  contentType: 'application/json',
  charset: 'UTF-8',
  accept: 'application/json',
  
  // Credentials
  withCredentials: true  // default: true
});

// Results in: https://api.example.com/v1
// Headers: 
// Content-Type: application/json; charset=UTF-8
// Accept: application/json
// Credentials: include
```

## Type Definitions

### Option Interface

```typescript
interface Option {
  version?: string;
  contentType?: DataType;
  accept?: DataType;
  charset?: string;
  interceptor?: Interceptor;
  withCredentials?: boolean;
  requestConfig?: FetchRequestConfig;
}
```

### TokenConfig Interface

```typescript
interface TokenConfig {
  accessTokenKey?: string;
  refreshTokenKey?: string;
  refreshEndpoint?: string;
  getToken?: () => string | undefined;
  setToken?: (token: string) => void;
  removeToken?: () => void;
  getRefreshToken?: () => string | undefined;
  setRefreshToken?: (token: string) => void;
  removeRefreshToken?: () => void;
  onTokenExpired?: () => void;
  formatAuthHeader?: (token: string, refreshToken?: string) => Record<string, string>;
}
```

### DataType Options

```typescript
type DataType =
  | "application/json"
  | "application/x-www-form-urlencoded"
  | "application/xml"
  | "application/octet-stream"
  | "multipart/form-data"
  | "text/plain"
  | "text/html";
```

## Error Handling

API Wizard provides structured error handling with detailed error information:

```typescript
try {
  const response = await api.get('/protected-resource');
  // Handle success
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error('No response received');
  } else {
    // Error in setting up the request
    console.error('Error:', error.message);
  }
}
```

## Key Features

### Automatic Token Refresh

API Wizard automatically handles token refresh when tokens expire:

- Detects 401 responses
- Automatically calls refresh endpoint
- Retries original request with new token
- Handles concurrent requests during refresh

### Type Safety

Full TypeScript support with generic types:

```typescript
// Request and response types are fully typed
const response = await api.post<CreateUserRequest, User>('/users', userData);
// response.data is typed as User
```

### Flexible Configuration

Configure different options for different APIs:

```typescript
const api = handler({
  users: 'https://api.users.com',
  payments: 'https://api.payments.com'
}, {
  // Global configuration for all APIs
  withCredentials: true,
  contentType: 'application/json'
});

// API-specific configuration
const usersApi = api.users({ 
  version: 'v1',
  interceptor: { /* user-specific interceptors */ } 
});
const paymentsApi = api.payments({ 
  version: 'v2',
  contentType: 'application/xml' 
});
```

## API Methods

All standard HTTP methods are supported with full TypeScript support:

```typescript
const api = instance('https://api.example.com', { version: 'v1' });

// GET - Retrieve data
const users = await api.get<User[]>('/users');
const user = await api.get<User>(`/users/${id}`);

// POST - Create new resource
const newUser = await api.post<CreateUserRequest, User>('/users', userData);

// PUT - Update entire resource
const updatedUser = await api.put<UpdateUserRequest, User>(`/users/${id}`, userData);

// PATCH - Partial update
const patchedUser = await api.patch<Partial<User>, User>(`/users/${id}`, partialData);

// DELETE - Remove resource
await api.delete(`/users/${id}`);

// Request with custom config
const response = await api.get<User[]>('/users', {
  params: { page: '1', limit: '10' },
  timeout: 5000,
  headers: { 'Custom-Header': 'value' }
});
```

### Request Configuration

```typescript
interface FetchRequestConfig extends RequestInit {
  params?: Record<string, string>;  // Query parameters
  timeout?: number;                 // Request timeout in ms
  baseURL?: string;                 // Override base URL
}
```

## Cookie Management

API Wizard includes built-in cookie utilities for server-side applications:

```typescript
import { getCookies, CookieConfig } from 'api-wizard';

// Set cookies for server-side usage
new CookieConfig('sessionId=abc123; userId=456');

// Get cookies (works in both browser and server)
const cookies = getCookies();
```

## Error Handling

API Wizard provides comprehensive error handling with Axios-compatible error structure:

```typescript
try {
  const response = await api.get('/protected-resource');
  // Handle success
} catch (error) {
  if (error.response) {
    // Server responded with error status
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    // Request was made but no response received
    console.error('No response received');
  } else {
    // Error in setting up the request
    console.error('Error:', error.message);
  }
}
```

## Performance Benefits

- **Zero Dependencies**: No external libraries required
- **Small Bundle Size**: Lightweight implementation (~15KB minified)
- **Native Fetch**: Uses browser's native HTTP client
- **Tree Shaking**: Only import what you need
- **Modern JavaScript**: Built for modern browsers and Node.js
- **TypeScript First**: Built with TypeScript from the ground up

## Migration from Axios

API Wizard is designed to be a drop-in replacement for Axios with minimal changes:

```typescript
// Before (Axios)
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: { 'Authorization': 'Bearer token' }
});

const response = await api.get('/users');

// After (API Wizard)
import instance from 'api-wizard';

const api = instance('https://api.example.com', {
  interceptor: {
    tokenConfig: {
      getToken: () => 'token',
      formatAuthHeader: (token) => ({ 'Authorization': `Bearer ${token}` })
    }
  }
});

const response = await api.get('/users');
```

## Real-world Example

Here's a complete example showing how to use API Wizard in a React application:

```typescript
// api.ts
import { handler } from 'api-wizard';

const apiConfig = {
  users: 'https://api.users.com',
  products: 'https://api.products.com'
};

export const api = handler(apiConfig);

// services/userService.ts
import { api } from '../api';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export const userService = {
  getUsers: () => api.users({ version: 'v1' }).get<User[]>('/users'),
  getUser: (id: number) => api.users({ version: 'v1' }).get<User>(`/users/${id}`),
  createUser: (user: CreateUserRequest) => 
    api.users({ version: 'v1' }).post<CreateUserRequest, User>('/users', user),
  updateUser: (id: number, user: User) => 
    api.users({ version: 'v1' }).put<User, User>(`/users/${id}`, user),
  deleteUser: (id: number) => 
    api.users({ version: 'v1' }).delete(`/users/${id}`)
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Min-Hyeong Park](https://github.com/park-minhyeong)