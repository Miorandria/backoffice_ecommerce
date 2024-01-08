import { createContext } from "react";

export const Contexte = createContext<boolean>(false);

export type UserSearchContextType = {
   search: string;
   setSearch: (name: string) => void;
};
export const UserSearchContext = createContext<UserSearchContextType>({
   search: "",
   setSearch: () => {},
});
