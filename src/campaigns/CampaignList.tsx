import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  TextInput,
  ReferenceInput,
  DeleteButton,
} from 'react-admin';
import { StatusField } from './StatusField';

const campaignFilters = [
  <TextInput key="name" source="name" label="キャンペーン名" alwaysOn />,
  <ReferenceInput key="chainId" source="chainId" reference="chains" label="チェーン店" alwaysOn />,
];

export const CampaignList = () => (
  <List filters={campaignFilters} sort={{ field: 'saleStartTime', order: 'DESC' }}>
    <Datagrid rowClick="edit">
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
