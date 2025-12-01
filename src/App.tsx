import { Admin, Resource, ListGuesser } from 'react-admin';
import { dataProvider } from './providers/dataProvider';
import { authProvider } from './providers/authProvider';

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="chains" list={ListGuesser} />
      <Resource name="campaigns" list={ListGuesser} />
    </Admin>
  );
}

export default App;
