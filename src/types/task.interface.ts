export interface TodoInterface {
  id?: number;
  name: string;
  desc: string;
  completionDate: string;
  completed: boolean;
  show: boolean;
  status: StatusEnum;
}

export enum StatusEnum {
  Todo = 'todo',
  Inprogress = 'inprogress',
  Done = 'done',
}

export enum StatusOperation {
  Add = 0,
  Edit = 1,
  Cancel = 2,
  Save = 3,
}
