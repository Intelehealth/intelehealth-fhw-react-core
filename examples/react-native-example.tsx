import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ApiService,
  AuthService,
  capitalize,
  deepClone,
  EventEmitter,
  formatDate,
  useDebounce,
  useLocalStorage,
} from '../src';

// Example component using the universal library in React Native
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
      Alert.alert('Event', `User updated: ${JSON.stringify(data)}`);
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
      onLogin: (user, _token) => {
        console.log('User logged in:', user);
        Alert.alert('Success', 'User logged in successfully!');
      },
      onLogout: () => {
        console.log('User logged out');
        Alert.alert('Info', 'User logged out');
      },
    });
  });

  const handleSearch = (text: string) => {
    setSearchTerm(text);
  };

  const handleApiTest = async () => {
    try {
      const response = await apiService.get('/users', { page: 1, limit: 10 });
      console.log('API response:', response);
      Alert.alert('API Success', 'API call successful!');
    } catch (error) {
      console.error('API error:', error);
      Alert.alert('API Error', 'API call failed');
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
      Alert.alert('Auth Error', 'Login failed');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Universal Library Example</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search with Debounce</Text>
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={handleSearch}
          placeholder="Type to search..."
        />
        <Text style={styles.text}>
          Debounced search term: {debouncedSearchTerm}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Local Storage Hook</Text>
        <TextInput
          style={styles.input}
          value={userData.name}
          onChangeText={text => setUserData({ ...userData, name: text })}
          placeholder="Enter name"
        />
        <TextInput
          style={styles.input}
          value={userData.email}
          onChangeText={text => setUserData({ ...userData, email: text })}
          placeholder="Enter email"
        />
        <Text style={styles.text}>Stored data: {JSON.stringify(userData)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Service</Text>
        <TouchableOpacity style={styles.button} onPress={handleApiTest}>
          <Text style={styles.buttonText}>Test API Call</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auth Service</Text>
        <TouchableOpacity style={styles.button} onPress={handleAuthTest}>
          <Text style={styles.buttonText}>Test Login</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Auth state: {JSON.stringify(authService.getAuthState())}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Utility Functions</Text>
        <Text style={styles.text}>
          Formatted date: {formatDate(new Date(), 'YYYY-MM-DD')}
        </Text>
        <Text style={styles.text}>
          Capitalized: {capitalize('hello world')}
        </Text>
        <Text style={styles.text}>
          Deep cloned object:{' '}
          {JSON.stringify(deepClone({ nested: { value: 'test' } }))}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    marginBottom: 5,
  },
});

export default UniversalLibraryExample;
