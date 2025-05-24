import { Class } from 'app/core/models/class.model';

export interface ClassState {
  classes: Class[];
  error: any;
  loading: boolean;
}

export const initialState: ClassState = {
  classes: [],
  error: null,
  loading: false
};