export interface CurrentUserInterface {
  name: string;
  position: string;
  avatar: string;
  name2: string;
}

export interface UserInterface {
  name: string;
  age: number;
  status: 'active' | 'inactive' | 'onhold';
  img: string;
  isActive: boolean;
  role: 'admin' | 'manager';
}

export interface AdminInterface extends UserInterface {
  rules: ['deleteUSer', 'createUSer'];
}

export interface ManagerInterface extends UserInterface {
  isSubscribed: boolean;
}
