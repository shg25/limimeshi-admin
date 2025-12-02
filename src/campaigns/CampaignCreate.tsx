import { Create, SimpleForm } from 'react-admin';
import { CampaignFormFields } from './CampaignForm';
import { validateDateRange } from '../lib/validators';

export const CampaignCreate = () => (
  <Create redirect="list">
    <SimpleForm validate={validateDateRange}>
      <CampaignFormFields />
    </SimpleForm>
  </Create>
);
