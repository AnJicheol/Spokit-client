import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/ui/shadcn/components/select';

import {
  hourOptions as defaultHourOptions,
  minuteOptions as defaultMinuteOptions,
} from '@/shared/model';

interface TimeSelectProps {
  value: string; // 'HH:mm' 형식
  onChange: (value: string) => void;
  hourOptions?: string[];
  minuteOptions?: string[];
  label?: string;
  error?: string;
}

export default function TimeSelect({
  value,
  onChange,
  hourOptions = defaultHourOptions.calendar,
  minuteOptions = defaultMinuteOptions.calendar,
  label,
  error,
}: TimeSelectProps) {
  const [hour, minute] = value.split(':');

  return (
    <div className='flex gap-2 items-center'>
      {label && <span>{label}</span>}

      <Select onValueChange={(val) => onChange(`${val}:${minute}`)} value={hour}>
        <SelectTrigger>
          <SelectValue placeholder={hour} />
        </SelectTrigger>
        <SelectContent>
          {hourOptions.map((h) => (
            <SelectItem key={h} value={h}>
              {h}시
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(val) => onChange(`${hour}:${val}`)} value={minute}>
        <SelectTrigger>
          <SelectValue placeholder={minute} />
        </SelectTrigger>
        <SelectContent>
          {minuteOptions.map((m) => (
            <SelectItem key={m} value={m}>
              {m}분
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <span className='text-red-500'>{error}</span>}
    </div>
  );
}
