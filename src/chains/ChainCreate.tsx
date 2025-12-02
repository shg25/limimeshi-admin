import { Create, SimpleForm, TextInput, required } from 'react-admin';
import { ChainFormFields } from './ChainForm';

// IDバリデーション（英数字小文字とハイフンのみ）
const validateChainId = (value: string) => {
  if (!value) return undefined;
  if (!/^[a-z0-9-]+$/.test(value)) {
    return '英数字小文字とハイフンのみ使用できます';
  }
  return undefined;
};

export const ChainCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput
        source="id"
        label="ID（URL用、変更不可）"
        validate={[required(), validateChainId]}
        helperText="英数字小文字とハイフンのみ（例: mcdonalds, mos-burger）"
        fullWidth
      />
      <ChainFormFields />
    </SimpleForm>
  </Create>
);
