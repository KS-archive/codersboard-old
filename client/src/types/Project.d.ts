export interface ProjectUser {
  id: string;
  fullName: string;
  photoURL: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  gallery: string[];
  startDate?: string;
  finishDate?: string;
  type: 'SOFTWARE' | 'WEBSITE' | 'EVENT' | 'OTHER';
  status: 'DRAFT' | 'STARTING' | 'IN_PROGRESS' | 'CANCELLED' | 'DONE' | 'SUSPENDED';
  slack: {
    mainChannel: string;
    otherChannels: string[];
  }
  owners: ProjectUser[];
  admins: ProjectUser[];
  members: ProjectUser[];
  guests: ProjectUser[];
}
