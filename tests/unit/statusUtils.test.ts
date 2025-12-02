import { describe, it, expect } from 'vitest';
import { calculateStatus, getStatusColor } from '../../src/lib/statusUtils';

describe('calculateStatus', () => {
  const baseDate = new Date('2025-01-15T12:00:00Z');

  it('販売開始前は「予定」を返す', () => {
    const result = calculateStatus({
      saleStartTime: new Date('2025-02-01'),
      now: baseDate,
    });

    expect(result.type).toBe('scheduled');
    expect(result.label).toBe('予定');
  });

  it('販売終了後は「終了」を返す', () => {
    const result = calculateStatus({
      saleStartTime: new Date('2024-12-01'),
      saleEndTime: new Date('2025-01-10'),
      now: baseDate,
    });

    expect(result.type).toBe('ended');
    expect(result.label).toBe('終了');
  });

  it('販売中（終了日あり）は「販売中」を返す', () => {
    const result = calculateStatus({
      saleStartTime: new Date('2025-01-01'),
      saleEndTime: new Date('2025-02-01'),
      now: baseDate,
    });

    expect(result.type).toBe('active');
    expect(result.label).toBe('販売中');
  });

  it('終了日未設定で1ヶ月未満は「開始から◯日経過」を返す', () => {
    const result = calculateStatus({
      saleStartTime: new Date('2025-01-10'),
      saleEndTime: null,
      now: baseDate,
    });

    expect(result.type).toBe('elapsed_days');
    expect(result.label).toBe('開始から5日経過');
  });

  it('終了日未設定で1ヶ月以上は「開始から◯ヶ月経過」を返す', () => {
    const result = calculateStatus({
      saleStartTime: new Date('2024-11-01'),
      saleEndTime: null,
      now: baseDate,
    });

    expect(result.type).toBe('elapsed_months');
    expect(result.label).toContain('ヶ月経過');
  });

  it('文字列の日付も処理できる', () => {
    const result = calculateStatus({
      saleStartTime: '2025-02-01T00:00:00Z',
      now: baseDate,
    });

    expect(result.type).toBe('scheduled');
  });
});

describe('getStatusColor', () => {
  it('予定はprimaryを返す', () => {
    expect(getStatusColor({ type: 'scheduled', label: '予定' })).toBe('primary');
  });

  it('販売中はsuccessを返す', () => {
    expect(getStatusColor({ type: 'active', label: '販売中' })).toBe('success');
  });

  it('経過日数はwarningを返す', () => {
    expect(getStatusColor({ type: 'elapsed_days', label: '開始から5日経過', days: 5 })).toBe(
      'warning'
    );
  });

  it('経過月数はerrorを返す', () => {
    expect(getStatusColor({ type: 'elapsed_months', label: '開始から2ヶ月経過', months: 2 })).toBe(
      'error'
    );
  });

  it('終了はdefaultを返す', () => {
    expect(getStatusColor({ type: 'ended', label: '終了' })).toBe('default');
  });
});
