import { LogBox } from 'react-native';
import MyFirstLibDrei from './src/examples/MyFirstLibDrei';

// Ignore log notification by message:
LogBox.ignoreLogs([
  'Scripts "build/three.js" and "build/three.min.js" are deprecated',
]);

function App(): JSX.Element {
  return <MyFirstLibDrei />;
}

export default App;
