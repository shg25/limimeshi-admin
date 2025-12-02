import { useRecordContext } from 'react-admin';
import { Chip } from '@mui/material';
import { calculateStatus, getStatusColor } from '../lib/statusUtils';

/**
 * キャンペーンステータスを表示するフィールドコンポーネント
 */
export const StatusField = () => {
  const record = useRecordContext();

  if (!record || !record.saleStartTime) {
    return null;
  }

  const status = calculateStatus({
    saleStartTime: record.saleStartTime,
    saleEndTime: record.saleEndTime,
  });

  return <Chip label={status.label} color={getStatusColor(status)} size="small" />;
};

StatusField.defaultProps = {
  label: 'ステータス',
};
