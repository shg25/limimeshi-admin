/**
 * 共通バリデーション関数
 */

/**
 * ひらがなのみのバリデーション
 */
export const validateFurigana = (value: string) => {
  if (!value) return undefined;
  const hiraganaRegex = /^[\u3040-\u309Fー]+$/;
  if (!hiraganaRegex.test(value)) {
    return 'ひらがなのみで入力してください';
  }
  return undefined;
};

/**
 * 終了日が開始日より後であることを検証（フォームレベル）
 */
export const validateDateRange = (values: Record<string, unknown>) => {
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
