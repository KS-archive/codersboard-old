export interface UserSkill {
  id?: string;
  name: string;
  level: number;
}

export interface UserArea {
  id: string;
  name: string;
  level: number;
  role: string;
}

export interface UserProject {
  id: string;
  name: string;
  level: number;
  role: string;
  responsibilities: string;
}

export interface User {
  id: string;
  fullName: string;
  photoURL: string;
  email: string;
  googleId: string;
  areas: UserArea[];
  skills: UserSkill[];
  projects: UserProject[];
  permissions: 'OWNER' | 'MEMBER' | 'TRAINEE' | 'HR' | 'FINANCE' | 'DATA';
  university: 'ASPWR' | 'DSWWR' | 'PWR' | 'UWR' | 'UEWR' | 'SWPSWR' | 'WSHWR' | 'WSBWR' | 'PRE' | 'POST' | 'NONE';
  year?: 1 | 2 | 3 | 4 | 5 | 6;
  createdAt: Date;
  updatedAt: Date;
}
