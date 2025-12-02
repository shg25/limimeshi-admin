import { Create, SimpleForm, TextInput, required } from 'react-admin';

// ひらがなのみのバリデーション
const validateFurigana = (value: string) => {
  if (!value) return undefined;
  const hiraganaRegex = /^[\u3040-\u309Fー]+$/;
  if (!hiraganaRegex.test(value)) {
    return 'ひらがなのみで入力してください';
  }
  return undefined;
};

export const ChainCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="name" label="チェーン名" validate={required()} fullWidth />
      <TextInput
        source="furigana"
        label="ふりがな"
        validate={[required(), validateFurigana]}
        fullWidth
      />
      <TextInput source="officialUrl" label="公式サイトURL" type="url" fullWidth />
      <TextInput source="logoUrl" label="ロゴURL" type="url" fullWidth />
    </SimpleForm>
  </Create>
);
