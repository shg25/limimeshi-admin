import { Edit, SimpleForm, Toolbar, SaveButton, useNotify } from 'react-admin';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChainFormFields } from './ChainForm';

// カスタムツールバー（削除ボタンを無効化）
const ChainEditToolbar = () => {
  const notify = useNotify();

  const handleDeleteClick = () => {
    notify('チェーン店の削除は管理者に連絡してください（Firebase Consoleから削除）', {
      type: 'warning',
    });
  };

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <SaveButton />
      <Button startIcon={<DeleteIcon />} color="error" onClick={handleDeleteClick}>
        削除
      </Button>
    </Toolbar>
  );
};

export const ChainEdit = () => (
  <Edit>
    <SimpleForm toolbar={<ChainEditToolbar />}>
      <ChainFormFields />
    </SimpleForm>
  </Edit>
);
