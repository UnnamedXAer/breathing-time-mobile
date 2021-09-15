import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

export default function useCounterStarted(timeout: number) {
  const disableStartTips = useSelector(
    (state: RootState) => state.exercise.disableStartTips,
  );
  const [started, setStarted] = useState(disableStartTips);

  useEffect(() => {
    if (started) {
      return;
    }

    const startTimeout = setTimeout(() => {
      console.log('setting start to __true');
      setStarted(true);
    }, timeout);
    return () => {
      clearTimeout(startTimeout);
    };
  }, [timeout, started]);

  return [started, setStarted];
}
