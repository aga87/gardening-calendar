import type { RootState } from '@/redux/store';

export const selectRedirectLink = (state: RootState): string =>
  state.redirectReducer.link;
