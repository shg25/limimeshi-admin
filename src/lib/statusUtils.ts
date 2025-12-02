/**
 * キャンペーンステータス計算ユーティリティ
 *
 * ステータスの種類:
 * - 予定: 販売開始前
 * - 販売中: 販売開始後〜終了前（終了日が設定されている場合）
 * - 開始から◯日経過: 終了日未入力で1ヶ月未満
 * - 開始から◯ヶ月経過: 終了日未入力で1ヶ月以上
 * - 終了: 販売終了後
 */

export type CampaignStatus =
  | { type: 'scheduled'; label: string }
  | { type: 'active'; label: string }
  | { type: 'elapsed_days'; label: string; days: number }
  | { type: 'elapsed_months'; label: string; months: number }
  | { type: 'ended'; label: string };

export interface CalculateStatusParams {
  saleStartTime: Date | string;
  saleEndTime?: Date | string | null;
  now?: Date;
}

/**
 * 販売開始日時と販売終了日時からステータスを計算
 */
export const calculateStatus = ({
  saleStartTime,
  saleEndTime,
  now = new Date(),
}: CalculateStatusParams): CampaignStatus => {
  const startDate = typeof saleStartTime === 'string' ? new Date(saleStartTime) : saleStartTime;
  const endDate =
    saleEndTime == null
      ? null
      : typeof saleEndTime === 'string'
        ? new Date(saleEndTime)
        : saleEndTime;

  // 販売開始前
  if (now < startDate) {
    return { type: 'scheduled', label: '予定' };
  }

  // 販売終了後
  if (endDate && now > endDate) {
    return { type: 'ended', label: '終了' };
  }

  // 販売終了日が設定されている場合は「販売中」
  if (endDate) {
    return { type: 'active', label: '販売中' };
  }

  // 販売終了日が未設定の場合は経過期間を表示
  const elapsedMs = now.getTime() - startDate.getTime();
  const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

  // 1ヶ月（30日）以上経過
  if (elapsedDays >= 30) {
    const months = Math.floor(elapsedDays / 30);
    return {
      type: 'elapsed_months',
      label: `開始から${months}ヶ月経過`,
      months,
    };
  }

  // 1ヶ月未満
  return {
    type: 'elapsed_days',
    label: `開始から${elapsedDays}日経過`,
    days: elapsedDays,
  };
};

/**
 * ステータスに応じた色を取得
 */
export const getStatusColor = (
  status: CampaignStatus
): 'default' | 'primary' | 'success' | 'warning' | 'error' => {
  switch (status.type) {
    case 'scheduled':
      return 'primary';
    case 'active':
      return 'success';
    case 'elapsed_days':
      return 'warning';
    case 'elapsed_months':
      return 'error';
    case 'ended':
      return 'default';
  }
};
