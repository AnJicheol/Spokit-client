import { CALENDAR_MODE, type viewMode } from '../model';
import { motion } from 'motion/react';

interface CalendarModeSelectorProps {
  mode: viewMode;
  setMode: (mode: viewMode) => void;
}

export default function CalendarModeSelector({ mode, setMode }: CalendarModeSelectorProps) {
  // 버튼 넓이와 위치를 위한 상수 값들
  const BUTTON_WIDTH = 84;
  const viewIndexMap = {
    Month: 0,
    Week: 1,
    // Day: 2,
  };
  const position = {
    x: viewIndexMap[mode] * BUTTON_WIDTH,
    width: BUTTON_WIDTH,
  };
  // 버튼 클릭 핸들러
  const handleViewChange = (view: viewMode) => {
    setMode(view);
  };

  return (
    <div className='bg-transparent max-w-[176px] flex justify-between items-end p-1 mt-3 debossed rounded-[30px] relative'>
      {/* 애니메이션되는 배경 */}
      <motion.div
        data-testId='selector-animate-bg'
        className='absolute top-1 bottom-1 bg-cal-btn-bg rounded-full z-0 embossed'
        initial={false}
        animate={{
          x: position.x,
          width: BUTTON_WIDTH,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* 버튼들 */}
      {CALENDAR_MODE.map((view) => (
        <div
          key={view}
          className={`rounded-full h-full max-w-[176px] px-5 py-2 text-body2 flex items-end justify-center cursor-pointer z-10 relative`}
          style={{ width: BUTTON_WIDTH }}
          onClick={() => handleViewChange(view as viewMode)}
        >
          <span
            className={`
              ${mode === view ? 'text-white' : 'text-black'}
              transition-colors duration-300 ease-in-out`}
          >
            {view}
          </span>
        </div>
      ))}
    </div>
  );
}
