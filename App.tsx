import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux'
import { store } from './src/app/store';
import { RealmProvider } from '@realm/react'
import 'expo-dev-client';
import { Task } from './src/relam/Task';


export default function App() {

  return (
    <NavigationContainer>
      <RealmProvider schema={[Task]}>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </RealmProvider>
    </NavigationContainer>
  );
}
