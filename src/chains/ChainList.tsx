import { List, Datagrid, TextField, UrlField, DateField, TextInput } from 'react-admin';

const chainFilters = [<TextInput key="name" source="name" label="チェーン名" alwaysOn />];

export const ChainList = () => (
  <List filters={chainFilters} sort={{ field: 'furigana', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="name" label="チェーン名" />
      <TextField source="furigana" label="ふりがな" />
      <UrlField source="officialUrl" label="公式サイト" target="_blank" />
      <DateField source="createdAt" label="登録日" showTime />
    </Datagrid>
  </List>
);
