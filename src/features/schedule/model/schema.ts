import z from 'zod/v4';

export const calendarFormSchema = z
  .object({
    member: z
      .array(
        z.object({
          name: z.string(),
          id: z.string(),
        }),
      )
      .min(1, { error: '멤버를 1명 이상 선택해주세요.' }), // [{name,id},{name,id}]
    memo: z
      .string({
        error: (iss) =>
          iss.input === undefined ? '메모는 필수로 입력해야합니다.' : '메모는 문자열이어야 합니다.',
      })
      .trim()
      .nonempty({ message: '메모는 공백일 수 없습니다.' }),
    startTime: z
      .string({
        error: (issue) => {
          if (issue.input === undefined) return '시작시간은 필수로 입력해야합니다.';
        },
      })
      .refine((val) => /^(0[1-9]|1[0-9]|2[0-4]):(00|10|20|30|40|50)$/.test(val), {
        error: 'startTime은 HH:mm format을 따라야 합니다. (ex: 12:30)',
      }),
    endTime: z
      .string({
        error: (issue) => {
          if (issue.input === undefined) return '종료시간은 필수로 입력해야합니다.';
        },
      })
      .refine((val) => /^(0[1-9]|1[0-9]|2[0-4]):(00|10|20|30|40|50)$/.test(val), {
        error: 'endTime은 HH:mm format을 따라야 합니다. (ex: 12:30)',
      }),
    date: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      error: 'date는 YYYY-MM-DD format을 따라야 합니다. (ex: 2025-07-02)',
    }), // ex:2025-07-02
  })
  .refine(
    (data) => {
      // data는 { startTime, endTime, ... } 전체 객체!
      const [startH, startM] = data.startTime.split(':').map(Number);
      const [endH, endM] = data.endTime.split(':').map(Number);
      return endH > startH || (endH === startH && endM > startM);
    },
    {
      message: '종료시간은 시작시간보다 늦어야 합니다.',
      path: ['endTime'],
    },
  );

export type FormData = z.infer<typeof calendarFormSchema>;
