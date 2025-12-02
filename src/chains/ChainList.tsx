import { List, Datagrid, TextField, UrlField, DateField } from 'react-admin';

export const ChainList = () => (
  <List sort={{ field: 'furigana', order: 'ASC' }}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="name" label="チェーン名" />
      <TextField source="furigana" label="ふりがな" />
      <UrlField source="officialUrl" label="公式サイト" target="_blank" />
      <DateField source="createdAt" label="登録日" showTime />
    </Datagrid>
  </List>
);
