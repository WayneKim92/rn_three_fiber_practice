import { LogBox } from 'react-native';
import CannonExample from './src/examples/CannonExample';

// Ignore log notification by message:
LogBox.ignoreLogs([
  'Scripts "build/three.js" and "build/three.min.js" are deprecated',
]);

function App(): JSX.Element {
  return <CannonExample />;
}

export default App;
