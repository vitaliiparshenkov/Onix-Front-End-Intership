export interface TodoInterface {
  name: string;
  desc: string;
  completionDate: string;
  completed: boolean;
  show: boolean;
  status: StatusEnum;
}

export enum StatusEnum {
  // Todo = 1,
  // Inprogress,
  // Done,
  Todo = 'todo',
  Inprogress = 'inprogress',
  Done = 'done',
}
