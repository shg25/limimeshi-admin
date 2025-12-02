import { describe, it, expect } from 'vitest';
import { validateFurigana, validateDateRange } from '../../src/lib/validators';

describe('validateFurigana', () => {
  it('空文字はundefinedを返す', () => {
    expect(validateFurigana('')).toBeUndefined();
  });

  it('ひらがなのみはundefinedを返す', () => {
    expect(validateFurigana('まくどなるど')).toBeUndefined();
  });

  it('長音記号を含むひらがなはundefinedを返す', () => {
    expect(validateFurigana('もすばーがー')).toBeUndefined();
  });

  it('カタカナはエラーを返す', () => {
    expect(validateFurigana('マクドナルド')).toBe('ひらがなのみで入力してください');
  });

  it('漢字はエラーを返す', () => {
    expect(validateFurigana('松屋')).toBe('ひらがなのみで入力してください');
  });

  it('混合文字はエラーを返す', () => {
    expect(validateFurigana('まくどナルド')).toBe('ひらがなのみで入力してください');
  });
});

describe('validateDateRange', () => {
  it('両方未設定は空オブジェクトを返す', () => {
    expect(validateDateRange({})).toEqual({});
  });

  it('開始日のみ設定は空オブジェクトを返す', () => {
    expect(validateDateRange({ saleStartTime: '2025-01-01' })).toEqual({});
  });

  it('終了日が開始日より後は空オブジェクトを返す', () => {
    expect(
      validateDateRange({
        saleStartTime: '2025-01-01T00:00:00',
        saleEndTime: '2025-01-31T00:00:00',
      })
    ).toEqual({});
  });

  it('終了日が開始日より前はエラーを返す', () => {
    const result = validateDateRange({
      saleStartTime: '2025-01-31T00:00:00',
      saleEndTime: '2025-01-01T00:00:00',
    });
    expect(result.saleEndTime).toBe('販売終了日時は販売開始日時より後に設定してください');
  });

  it('終了日と開始日が同じはエラーを返す', () => {
    const result = validateDateRange({
      saleStartTime: '2025-01-15T12:00:00',
      saleEndTime: '2025-01-15T12:00:00',
    });
    expect(result.saleEndTime).toBe('販売終了日時は販売開始日時より後に設定してください');
  });
});
