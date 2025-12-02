import { TextInput, ReferenceInput, SelectInput, DateTimeInput, required } from 'react-admin';

/**
 * キャンペーンフォームの共通フィールド
 * Edit と Create で再利用
 */
export const CampaignFormFields = () => (
  <>
    <ReferenceInput source="chainId" reference="chains" label="チェーン店">
      <SelectInput optionText="name" validate={required()} fullWidth />
    </ReferenceInput>
    <TextInput source="name" label="キャンペーン名" validate={required()} fullWidth />
    <TextInput source="description" label="説明" multiline rows={3} fullWidth />
    <DateTimeInput source="saleStartTime" label="販売開始日時" validate={required()} fullWidth />
    <DateTimeInput source="saleEndTime" label="販売終了日時" fullWidth />
    <TextInput source="xPostUrl" label="X Post URL" type="url" fullWidth />
  </>
);
