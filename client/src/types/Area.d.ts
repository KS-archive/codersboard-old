export interface AreaUser {
  id: string;
  fullName: string;
  photoURL: string;
  role: string;
}

export interface Area {
  id: string;
  name: string;
  description: string;
  slack: {
    mainChannel: string;
    otherChannels: string[];
  }
  owners: AreaUser[];
  admins: AreaUser[];
  members: AreaUser[];
  guests: AreaUser[];
}
