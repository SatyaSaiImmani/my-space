// Static achievements database for the portfolio.
// Add new entries by appending to the `achievements` array.
// badge must be one of the icon names imported in AchievementsSection.tsx.

export interface Achievement {
  id: string;
  title: string;
  description: string;
  /** Lucide icon name — must be present in the BADGE_ICONS map in AchievementsSection.tsx */
  badge: "Trophy" | "Award" | "Star" | "Medal";
  /** Tailwind bg class for the badge circle, e.g. "bg-amber-100" */
  badgeColor: string;
  /** Tailwind text class for the icon, e.g. "text-amber-600" */
  badgeIconColor: string;
}

export const achievements: Achievement[] = [
  {
    id: "kent-hack-enough-2026",
    title: "Best Solo Hacker — Kent Hack Enough 2026",
    description:
      "Awarded Best Solo Hacker at Kent Hack Enough 2026 organized by Major League Hacking Society for the RabbitHole AI research gap analyzer project.",
    badge: "Trophy",
    badgeColor: "bg-amber-100",
    badgeIconColor: "text-amber-600",
  },
  {
    id: "deloitte-best-employee",
    title: "Best Employee Nomination — Deloitte",
    description:
      "Nominated as Best Employee at Deloitte for independently owning and delivering the HR workflow integration and analytics work end to end, from requirements through production release.",
    badge: "Award",
    badgeColor: "bg-green-100",
    badgeIconColor: "text-green-600",
  },
  // {
  // {
  //   id: "placeholder-1",
  //   title: "Achievement Title",
  //   description: "A short description of this achievement. Replace with your own.",
  //   badge: "Award",
  //   badgeColor: "bg-green-100",
  //   badgeIconColor: "text-green-600",
  // },
  // {
  //   id: "placeholder-2",
  //   title: "Achievement Title",
  //   description: "A short description of this achievement. Replace with your own.",
  //   badge: "Star",
  //   badgeColor: "bg-blue-100",
  //   badgeIconColor: "text-blue-600",
  // },
  // {
  //   id: "placeholder-3",
  //   title: "Achievement Title",
  //   description: "A short description of this achievement. Replace with your own.",
  //   badge: "Medal",
  //   badgeColor: "bg-purple-100",
  //   badgeIconColor: "text-purple-600",
  // },
];
