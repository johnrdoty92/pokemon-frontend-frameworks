export type Pokemon = {
  id: number;
  name: string;
  moves: unknown[];
  sprites: {
    back_default: string;
    front_default: string;
  };
  stats: Stat[];
  types: { slot: number; type: { name: string; url: string } };
};

export type Stat = {
  base_stat: number;
  effor: number;
  stat: {
    name:
      | "hp"
      | "attack"
      | "defense"
      | "special-attack"
      | "special-defend"
      | "speed";
    url: string;
  };
};

export type Move = {
  id: number;
  name: string;
  power: number;
  damage_class: {
    name: string;
    url: string;
  };
};
