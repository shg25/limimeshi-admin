import { Admin, Resource } from 'react-admin';
import { dataProvider } from './providers/dataProvider';
import { authProvider } from './providers/authProvider';
import { ChainList, ChainEdit, ChainCreate } from './chains';
import { CampaignList, CampaignEdit, CampaignCreate } from './campaigns';

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name="chains"
        list={ChainList}
        edit={ChainEdit}
        create={ChainCreate}
        options={{ label: 'チェーン店' }}
      />
      <Resource
        name="campaigns"
        list={CampaignList}
        edit={CampaignEdit}
        create={CampaignCreate}
        options={{ label: 'キャンペーン' }}
      />
    </Admin>
  );
}

export default App;
