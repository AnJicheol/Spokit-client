// useCalendarForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { calendarFormSchema, type FormData } from '../model';

const mockMembers = [
  { id: '1', name: '홍길동' },
  { id: '2', name: '김철수' },
];

export const useCalendarForm = (date: string) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(calendarFormSchema),
    defaultValues: {
      member: [],
      memo: '',
      startTime: '01:00',
      endTime: '24:00',
      date,
    },
  });

  const selectedMembers = watch('member');

  const handleMemberSelect = (memberId: string) => {
    const exists = selectedMembers.some((m) => m.id === memberId);

    if (exists) {
      setValue(
        'member',
        selectedMembers.filter((m) => m.id !== memberId),
      );
    } else {
      const member = mockMembers.find((m) => m.id === memberId);
      if (!member) return;
      setValue('member', [...selectedMembers, member]);
    }
  };
  const onSubmit = (data: FormData) => {
    return data;
  };

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    watch,
    selectedMembers,
    handleMemberSelect,
    onSubmit,
    mockMembers,
  };
};
