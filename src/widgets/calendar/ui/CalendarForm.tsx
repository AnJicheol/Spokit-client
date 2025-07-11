import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/ui/shadcn/components/select';

import { Input } from '@/shared/ui/shadcn/components/input';

import { Label } from '@/shared/ui/shadcn/components/label';

import { Button } from '@/shared/ui/shadcn/components/button';
import { Modal } from '@/shared/ui';
import TimeSelect from '@/shared/ui/TimeSelect';
import { useCalendarForm } from '../hooks/useCalendarForm';

export function CalendarForm({ date }: { date: string }) {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    watch,
    handleMemberSelect,
    onSubmit,
    mockMembers,
    selectedMembers,
  } = useCalendarForm(date);
  console.log(selectedMembers);
  console.log('selectedMembers[0].id', selectedMembers[0]?.id);
  return (
    <Modal trigger={<div className='h-full w-full'>{date ?? ''}</div>} title='일정 추가'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 my-4'>
        {/* 멤버 선택 */}

        <div>
          <Label>멤버 선택</Label>

          <Select onValueChange={handleMemberSelect}>
            <SelectTrigger>
              <SelectValue placeholder='멤버 선택' />
            </SelectTrigger>

            <SelectContent>
              {mockMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.member && <span className='text-red-500'>{errors.member.message as string}</span>}
        </div>

        <TimeSelect
          label='시작 시간'
          value={watch('startTime')}
          onChange={(val) => setValue('startTime', val)}
          error={errors.startTime?.message as string}
        />

        <TimeSelect
          label='종료 시간'
          value={watch('endTime')}
          onChange={(val) => setValue('endTime', val)}
          error={errors.endTime?.message as string}
        />

        <div>
          <Label htmlFor='memo'>일정 입력</Label>

          <Input id='memo' type='text' placeholder='메모 입력' {...register('memo')} />

          {errors.memo && <span className='text-red-500'>{errors.memo.message as string}</span>}
        </div>

        <input type='hidden' value={date} {...register('date')} />

        <Button type={'submit'} variant='outline' className='w-full'>
          저장
        </Button>
      </form>
    </Modal>
  );
}
