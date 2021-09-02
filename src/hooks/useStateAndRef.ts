import { useRef, useState } from 'react';

export default function useStateAndRef<T>(
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>] {
  const [state, setState] = useState(initialValue);
  const ref = useRef(initialValue);
  ref.current = state;
  return [state, setState, ref];
}
