import { LogBox } from 'react-native';
import ThreeHelper from './src/examples/ThreeHelper';

// Ignore log notification by message:
LogBox.ignoreLogs([
  'Scripts "build/three.js" and "build/three.min.js" are deprecated',
]);

function App(): JSX.Element {
  return <ThreeHelper />;
}

export default App;
