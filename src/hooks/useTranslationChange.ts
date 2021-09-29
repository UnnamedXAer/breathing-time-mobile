import { useSelector } from 'react-redux';
import { RootState } from '../store/types';

/**
 * hook to trigger text update in mounted component when locale change
 */
export function useTranslationChange() {
  useSelector((state: RootState) => state.settings.locale);
}
