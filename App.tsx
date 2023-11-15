import { LogBox } from 'react-native';
import MyFirstThree from './src/examples/MyFirstThree';

// Ignore log notification by message:
LogBox.ignoreLogs([
  'Scripts "build/three.js" and "build/three.min.js" are deprecated',
]);

function App(): JSX.Element {
  return <MyFirstThree />;
}

export default App;
