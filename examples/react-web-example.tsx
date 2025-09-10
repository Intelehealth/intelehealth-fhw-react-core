import React, { useEffect, useState } from 'react';
import {
  ApiService,
  AuthService,
  capitalize,
  deepClone,
  formatDate,
  useDebounce,
  useLocalStorage,
} from '../src';

// Example component using the universal library
export const UniversalLibraryExample: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useLocalStorage('userData', {
    name: '',
    email: '',
  });
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Example EventEmitter usage
  useEffect(() => {
    const eventEmitter = new EventEmitter();

    const handleUserUpdate = (data: any) => {
      console.log('User updated:', data);
    };

    eventEmitter.on('user:update', handleUserUpdate);

    // Simulate event emission
    setTimeout(() => {
      eventEmitter.emit('user:update', {
        userId: '123',
        action: 'profile_updated',
      });
    }, 2000);

    return () => {
      eventEmitter.off('user:update', handleUserUpdate);
    };
  }, []);

  // Example ApiService usage
  const [apiService] = useState(() => {
    return new ApiService({
      baseURL: 'https://api.example.com',
      timeout: 5000,
      onRequest: config => console.log('API Request:', config),
      onResponse: response => console.log('API Response:', response),
    });
  });

  // Example AuthService usage
  const [authService] = useState(() => {
    return new AuthService({
      onAuthChange: state => console.log('Auth state changed:', state),
      onLogin: (user, _token) => console.log('User logged in:', user),
      onLogout: () => console.log('User logged out'),
    });
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleApiTest = async () => {
    try {
      const response = await apiService.get('/users', { page: 1, limit: 10 });
      console.log('API response:', response);
    } catch (error) {
      console.error('API error:', error);
    }
  };

  const handleAuthTest = async () => {
    try {
      await authService.login({
        email: 'test@example.com',
        password: 'password',
      });
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Universal Library Example</h1>

      <section style={{ marginBottom: '30px' }}>
        <h2>Search with Debounce</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Type to search..."
          style={{ padding: '8px', width: '300px' }}
        />
        <p>Debounced search term: {debouncedSearchTerm}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Local Storage Hook</h2>
        <input
          type="text"
          value={userData.name}
          onChange={e => setUserData({ ...userData, name: e.target.value })}
          placeholder="Enter name"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input
          type="email"
          value={userData.email}
          onChange={e => setUserData({ ...userData, email: e.target.value })}
          placeholder="Enter email"
          style={{ padding: '8px' }}
        />
        <p>Stored data: {JSON.stringify(userData)}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>API Service</h2>
        <button onClick={handleApiTest}>Test API Call</button>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Auth Service</h2>
        <button onClick={handleAuthTest}>Test Login</button>
        <p>Auth state: {JSON.stringify(authService.getAuthState())}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Utility Functions</h2>
        <p>Formatted date: {formatDate(new Date(), 'YYYY-MM-DD')}</p>
        <p>Capitalized: {capitalize('hello world')}</p>
        <p>
          Deep cloned object:{' '}
          {JSON.stringify(deepClone({ nested: { value: 'test' } }))}
        </p>
      </section>
    </div>
  );
};

export default UniversalLibraryExample;
