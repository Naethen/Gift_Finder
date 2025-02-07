import { QuizFormData } from './index';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};

export type QuizFormState = {
  [K in keyof QuizFormData]: FormField<QuizFormData[K]>;
} & {
  status: FormStatus;
  error?: string;
};

export type FormAction<T> = 
  | { type: 'SET_FIELD'; field: keyof T; value: any }
  | { type: 'SET_ERROR'; field: keyof T; error: string }
  | { type: 'TOUCH_FIELD'; field: keyof T }
  | { type: 'SET_STATUS'; status: FormStatus }
  | { type: 'RESET_FORM' };
