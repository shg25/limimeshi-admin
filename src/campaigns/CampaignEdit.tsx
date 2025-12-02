import { Edit, SimpleForm, Toolbar, SaveButton, DeleteButton } from 'react-admin';
import { CampaignFormFields } from './CampaignForm';
import { validateDateRange } from '../lib/validators';

// カスタムツールバー（確認ダイアログ付き削除ボタン）
const CampaignEditToolbar = () => (
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <SaveButton />
    <DeleteButton mutationMode="pessimistic" />
  </Toolbar>
);

export const CampaignEdit = () => (
  <Edit>
    <SimpleForm validate={validateDateRange} toolbar={<CampaignEditToolbar />}>
      <CampaignFormFields />
    </SimpleForm>
  </Edit>
);
