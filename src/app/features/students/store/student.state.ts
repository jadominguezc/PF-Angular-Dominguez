import { Student } from 'app/core/models/student.model';

export interface StudentState {
    students: Student[];
    error: any;
    loading: boolean;
  }
  
  export const initialState: StudentState = {
    students: [],
    error: null,
    loading: false
  };