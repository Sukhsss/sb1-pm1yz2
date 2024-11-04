import { create } from 'zustand';

interface UserState {
  users: User[];
  addUser: (user: User) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export interface User {
  name: string;
  email: string;
  dateOfJoining: string;
  designation: 'HR' | 'Marketing';
  password: string;
  profilePicture: string;
  aadharCard: string;
  collegeId: string;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  currentUser: null,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  setCurrentUser: (user) => set({ currentUser: user }),
}));