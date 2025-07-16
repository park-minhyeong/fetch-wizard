# API Wizard 🧙‍♂️

A powerful TypeScript wrapper for native Fetch API that provides enhanced features including token management, interceptors, and type-safe HTTP requests.

## Features

- 🔒 Built-in token management (access & refresh tokens)
- 🎯 Type-safe HTTP requests
- 🔄 Automatic token refresh
- 🎨 Customizable interceptors
- 🛠 Flexible configuration options
- 📝 Content-type and charset management
- 🌐 Native Fetch API (smaller bundle size)
- ⚡ Zero dependencies

## Installation

```bash
npm install api-wizard
# or
yarn add api-wizard
```

## Basic Usage

```typescript
import { handler } from 'api-wizard';

// Define API endpoints configuration
const apiConfig: Record<string, string> = {
  users: 'https://api.users.com',
  products: 'https://api.products.com'
};

// Create API handlers
const api = handler(apiConfig);

// Make type-safe requests
interface User {
  id: number;
  name: string;
}

// GET request with version and without version
const userApi = api.users({version: 'v1'}); // https://api.users.com/v1
const legacyUserApi = api.users(); // https://api.users.com

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

All standard HTTP methods are supported:

```typescript
const api = handler({ base: 'https://api.example.com' }).base({version: 'v1'});

// GET
const users = await api.get<User[]>('/users');

// POST
const newUser = await api.post<CreateUserRequest, User>('/users', userData);

// PUT
const updatedUser = await api.put<UpdateUserRequest, User>(`/users/${id}`, userData);

// PATCH
const patchedUser = await api.patch<Partial<User>, User>(`/users/${id}`, partialData);

// DELETE
await api.delete(`/users/${id}`);
```

## Performance Benefits

- **Zero Dependencies**: No external libraries required
- **Small Bundle Size**: Lightweight implementation
- **Native Fetch**: Uses browser's native HTTP client
- **Tree Shaking**: Only import what you need
- **Modern JavaScript**: Built for modern browsers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT