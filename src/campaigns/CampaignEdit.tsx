import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateTimeInput,
  Toolbar,
  SaveButton,
  DeleteButton,
  required,
} from 'react-admin';

// 終了日が開始日より後であることを検証
const validateDates = (values: Record<string, unknown>) => {
  const errors: Record<string, string> = {};

  if (values.saleStartTime && values.saleEndTime) {
    const start = new Date(values.saleStartTime as string);
    const end = new Date(values.saleEndTime as string);

    if (end <= start) {
      errors.saleEndTime = '販売終了日時は販売開始日時より後に設定してください';
    }
  }

  return errors;
};

// カスタムツールバー（確認ダイアログ付き削除ボタン）
const CampaignEditToolbar = () => (
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <SaveButton />
    <DeleteButton mutationMode="pessimistic" />
  </Toolbar>
);

export const CampaignEdit = () => (
  <Edit>
    <SimpleForm validate={validateDates} toolbar={<CampaignEditToolbar />}>
      <ReferenceInput source="chainId" reference="chains" label="チェーン店">
        <SelectInput optionText="name" validate={required()} fullWidth />
      </ReferenceInput>
      <TextInput source="name" label="キャンペーン名" validate={required()} fullWidth />
      <TextInput source="description" label="説明" multiline rows={3} fullWidth />
      <DateTimeInput source="saleStartTime" label="販売開始日時" validate={required()} fullWidth />
      <DateTimeInput source="saleEndTime" label="販売終了日時" fullWidth />
      <TextInput source="xPostUrl" label="X Post URL" type="url" fullWidth />
    </SimpleForm>
  </Edit>
);
