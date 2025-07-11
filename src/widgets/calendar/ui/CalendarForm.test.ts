import { describe, expect, test } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalendarForm } from '../hooks/useCalendarForm';
import type { FormData } from '../model';

describe('useCalendarForm', () => {
  test('setValue로 폼 필드 값을 설정할 수 있다', () => {
    const { result } = renderHook(() => useCalendarForm('2025-07-08'));

    act(() => {
      result.current.setValue('memo', '회의');
      result.current.setValue('startTime', '09:00');
      result.current.setValue('endTime', '10:00');
    });

    expect(result.current.watch('memo')).toBe('회의');
    expect(result.current.watch('startTime')).toBe('09:00');
    expect(result.current.watch('endTime')).toBe('10:00');
  });

  test('handleMemberSelect로 멤버를 추가할 수 있다', () => {
    const { result } = renderHook(() => useCalendarForm('2025-07-08'));
    const mockMembers = result.current.mockMembers;

    act(() => {
      result.current.handleMemberSelect(mockMembers[0].id);
    });

    expect(result.current.selectedMembers.length).toBe(1);
    expect(result.current.selectedMembers[0].id).toBe(mockMembers[0].id);
  });

  test('handleMemberSelect로 멤버를 제거할 수 있다', () => {
    const { result } = renderHook(() => useCalendarForm('2025-07-08'));
    const mockMembers = result.current.mockMembers;

    act(() => {
      result.current.handleMemberSelect(mockMembers[0].id);
    });

    act(() => {
      result.current.handleMemberSelect(mockMembers[0].id);
    });

    expect(result.current.selectedMembers.length).toBe(0);
  });

  test('onSubmit 함수가 올바른 데이터를 반환한다', () => {
    const { result } = renderHook(() => useCalendarForm('2025-07-08'));
    const mockMembers = result.current.mockMembers;

    act(() => {
      result.current.setValue('member', [mockMembers[1]]);
      result.current.setValue('memo', '회의');
      result.current.setValue('startTime', '09:00');
      result.current.setValue('endTime', '10:00');
    });

    const testFormData: FormData = {
      member: result.current.selectedMembers,
      memo: result.current.watch('memo'),
      startTime: result.current.watch('startTime'),
      endTime: result.current.watch('endTime'),
      date: result.current.watch('date'),
    };

    const submitResult = result.current.onSubmit(testFormData);
    expect(submitResult).toEqual(testFormData);
    expect(submitResult.member[0].id).toBe(mockMembers[1].id);
  });
});
