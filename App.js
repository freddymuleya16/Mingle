import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppRoot from './src/AppRoot';

export default function App() {
  return (   
    <GestureHandlerRootView style={{ flex: 1 }}>
        <AppRoot/>
    </GestureHandlerRootView>
  
  );
} 