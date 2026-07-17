export type TeamMember = {
  name: string;
  role: string;
  image?: string;
  revealDelay: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Alexander Moreira Piero",
    role: "Founder & Chief Executive Officer",
    revealDelay: ".12s",
  },
  {
    name: "Derrick Lawson Angelosa",
    role: "Chief Operating Officer",
    revealDelay: ".2s",
  },
  {
    name: "Sofia Marin Castel",
    role: "Chief Financial Officer",
    revealDelay: ".12s",
  },
  {
    name: "Marcus Devlin Reyes",
    role: "Head of Operations",
    revealDelay: ".2s",
  },
  {
    name: "Helena Brandt Oslo",
    role: "Logistics Director",
    revealDelay: ".28s",
  },
];
