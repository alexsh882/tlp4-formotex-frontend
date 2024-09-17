export type TMake = {
  make_id: string;
  name: string;
};


export type TMakeCreate = Omit<TMake, "make_id">;

export type TMakeUpdate = Partial<TMake>;
