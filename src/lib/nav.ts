export type NavChild = { label: string; href: string };

export type NavItem = {
  label: string;
  href: string;
  match?: string;
  children?: NavChild[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", match: "/" },
  { label: "About Sirhan", href: "/about", match: "/about" },
  {
    label: "Explore Wellness",
    href: "/explore-wellness",
    match: "/explore-wellness",
    children: [
      { label: "Personal Wellbeing", href: "/explore-wellness/personal-wellbeing" },
      { label: "Emotional Health", href: "/explore-wellness/emotional-health" },
      { label: "Student Life", href: "/explore-wellness/student-life" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    match: "/services",
    children: [
      { label: "Psychological Support", href: "/services/psychological-support" },
      { label: "Career Counseling", href: "/services/career-counseling" },
      { label: "Educational Courses", href: "/services/educational-courses" },
      { label: "Travel Retreats", href: "/services/travel-retreats" },
    ],
  },
  { label: "Resources", href: "/resources", match: "/resources" },
  { label: "Workshops", href: "/workshops", match: "/workshops" },
  { label: "For Organisations", href: "/organisations", match: "/organisations" },
];

export function isNavActive(pathname: string, item: NavItem) {
  if (item.match === "/") return pathname === "/";
  if (!item.match) return false;
  return pathname === item.match || pathname.startsWith(`${item.match}/`);
}
