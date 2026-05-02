export interface Testimonial {
  id: string;
  name: string;
  title: string;
  organization: string;
  quote: string;
  /** Path to photo in public/. Empty string = show initials placeholder. */
  photo: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "tron-compton-engle",
    name: "Tron Compton-Engle",
    title: "Assistant Vice President, Client Experience",
    organization: "University Technology [U]Tech · Case Western Reserve University",
    quote:
      "Sri learned quickly and immediately brought value to every project. He was friendly, professional, and collaborative. I highly recommend Sri and would rehire him without hesitation.",
    photo: "/tron.jpeg",
  },
  {
    id: "indra-wangsawiredja",
    name: "Indra Wangsawiredja",
    title: "Teaching and Learning Designer/Technologist",
    organization:
      "Teaching & Learning Technologies [U]Tech · Case Western Reserve University",
    quote:
      "Sri met every new challenge with enthusiasm and optimism, consistently finding solutions by applying his skills to further the university's goals. He brings amazing energy and a \"can-do\" spirit to any team.",
    photo: "/Profile Indra Wangsawireda.png",
  },
];
