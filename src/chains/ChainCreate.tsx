import { Create, SimpleForm } from 'react-admin';
import { ChainFormFields } from './ChainForm';

export const ChainCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <ChainFormFields />
    </SimpleForm>
  </Create>
);
