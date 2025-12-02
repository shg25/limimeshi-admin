import { TextInput, required } from 'react-admin';
import { validateFurigana } from '../lib/validators';

/**
 * チェーン店フォームの共通フィールド
 * Edit と Create で再利用
 */
export const ChainFormFields = () => (
  <>
    <TextInput source="name" label="チェーン名" validate={required()} fullWidth />
    <TextInput
      source="furigana"
      label="ふりがな"
      validate={[required(), validateFurigana]}
      fullWidth
    />
    <TextInput source="officialUrl" label="公式サイトURL" type="url" fullWidth />
    <TextInput source="logoUrl" label="ロゴURL" type="url" fullWidth />
  </>
);
