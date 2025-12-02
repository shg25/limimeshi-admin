import { List, Datagrid, TextField, DateField, ReferenceField, DeleteButton } from 'react-admin';
import { StatusField } from './StatusField';

export const CampaignList = () => (
  <List sort={{ field: 'saleStartTime', order: 'DESC' }}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <ReferenceField source="chainId" reference="chains" label="チェーン店">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" label="キャンペーン名" />
      <DateField source="saleStartTime" label="販売開始日" showTime />
      <DateField source="saleEndTime" label="販売終了日" showTime emptyText="-" />
      <StatusField label="ステータス" />
      <DeleteButton mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
