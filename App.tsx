import { LogBox } from 'react-native';
import Geometries from './src/examples/Geometries';

// Ignore log notification by message:
LogBox.ignoreLogs([
  'Scripts "build/three.js" and "build/three.min.js" are deprecated',
]);

function App(): JSX.Element {
  return <Geometries />;
}

export default App;
