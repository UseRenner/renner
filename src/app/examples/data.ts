// Static fixtures for the /examples preview routes. None of these
// touch the database — they're only used to demonstrate the populated
// states of every screen. Names follow the "FirstName L." format.

export type ExampleRenner = {
  id: string;
  first_name: string;
  last_name: string;
  show_full_last_name?: boolean;
  city: string;
  state: string;
  rating: number;
  completed_tasks: number;
  background_verified: boolean;
  licensed: boolean;
  categories: string[];
  bio?: string;
  saved?: boolean;
};

export type ExampleClient = {
  id: string;
  first_name: string;
  last_name: string;
  show_full_last_name?: boolean;
  company?: string;
  city: string;
  state: string;
  tasks_posted: number;
};

export type ExampleTask = {
  id: string;
  title: string;
  description: string;
  category: string;
  pay: number;
  street_address: string;
  city: string;
  state: string;
  zip: string;
  date_label: string;
  status: "Open" | "Booked" | "Started" | "Pending approval" | "Complete";
  requires_license?: boolean;
  posted_by: ExampleClient;
  booked_runner?: ExampleRenner;
};

export const RENNERS: ExampleRenner[] = [
  {
    id: "r1",
    first_name: "Marcus",
    last_name: "King",
    city: "Denver",
    state: "CO",
    rating: 4.9,
    completed_tasks: 87,
    background_verified: true,
    licensed: true,
    categories: ["Showing", "Open house", "Signs"],
    bio: "Licensed agent in CO. Reliable for showings, sign installs, and prep work in central Denver.",
    saved: true,
  },
  {
    id: "r2",
    first_name: "Priya",
    last_name: "Shah",
    city: "Denver",
    state: "CO",
    rating: 4.8,
    completed_tasks: 142,
    background_verified: true,
    licensed: false,
    categories: ["Signs", "Lockbox", "Courier"],
    bio: "Fast on signs and lockboxes. Five years in the trade.",
    saved: true,
  },
  {
    id: "r3",
    first_name: "Daniel",
    last_name: "Okafor",
    city: "Aurora",
    state: "CO",
    rating: 5.0,
    completed_tasks: 31,
    background_verified: true,
    licensed: false,
    categories: ["Photos", "Property access", "Host assistance"],
    bio: "Photo-ready prep specialist. Detail-driven.",
    saved: true,
  },
  {
    id: "r4",
    first_name: "Elena",
    last_name: "Vasquez",
    city: "Denver",
    state: "CO",
    rating: 4.7,
    completed_tasks: 56,
    background_verified: true,
    licensed: true,
    categories: ["Showing", "Guest access"],
    bio: "Bilingual licensed Renner. Available evenings and weekends.",
    saved: true,
  },
  {
    id: "r5",
    first_name: "Tomas",
    last_name: "Alvarez",
    city: "Lakewood",
    state: "CO",
    rating: 4.6,
    completed_tasks: 19,
    background_verified: true,
    licensed: false,
    categories: ["Courier", "Property access", "Signs"],
    bio: "Same-day courier across the Denver metro.",
    saved: true,
  },
];

export const CLIENTS: ExampleClient[] = [
  {
    id: "c1",
    first_name: "Whitney",
    last_name: "Park",
    show_full_last_name: false,
    company: "Compass",
    city: "Denver",
    state: "CO",
    tasks_posted: 24,
  },
  {
    id: "c2",
    first_name: "Jordan",
    last_name: "Bennett",
    show_full_last_name: true,
    company: "SERHANT.",
    city: "Cherry Creek",
    state: "CO",
    tasks_posted: 11,
  },
  {
    id: "c3",
    first_name: "Avery",
    last_name: "Thomas",
    company: "Coldwell Banker",
    city: "Boulder",
    state: "CO",
    tasks_posted: 47,
  },
];

export const TASKS: ExampleTask[] = [
  {
    id: "t1",
    title: "Install sign rider",
    description:
      "Drop the new \"Under Contract\" rider on the existing yard sign. Sign is already in place — rider only.",
    category: "Signs",
    pay: 45,
    street_address: "4821 Olive St",
    city: "Denver",
    state: "CO",
    zip: "80216",
    date_label: "Today, 2:00 – 5:00 PM",
    status: "Open",
    posted_by: CLIENTS[0],
  },
  {
    id: "t2",
    title: "Showing at 1290 Pearl St",
    description:
      "30-minute showing for a pre-qualified buyer. Lockbox combo provided after booking. Please arrive 5 minutes early.",
    category: "Showing",
    pay: 120,
    street_address: "1290 Pearl St",
    city: "Denver",
    state: "CO",
    zip: "80203",
    date_label: "Apr 27, 11:30 AM",
    status: "Booked",
    requires_license: true,
    posted_by: CLIENTS[1],
    booked_runner: RENNERS[0],
  },
  {
    id: "t3",
    title: "Photo-ready prep before 10am shoot",
    description:
      "Light staging — fluff cushions, wipe counters, open blinds, turn on lamps. Photographer arrives at 10:00 AM.",
    category: "Other",
    pay: 85,
    street_address: "2244 S Lafayette",
    city: "Denver",
    state: "CO",
    zip: "80210",
    date_label: "Apr 29, 8:00 – 9:30 AM",
    status: "Started",
    posted_by: CLIENTS[0],
    booked_runner: RENNERS[2],
  },
  {
    id: "t4",
    title: "Lockbox swap at listing",
    description:
      "Replace the existing combo box with the agent's electronic SUPRA box. Old box returned to listing agent.",
    category: "Lockbox",
    pay: 60,
    street_address: "812 Holly St",
    city: "Denver",
    state: "CO",
    zip: "80220",
    date_label: "Apr 22, Completed 1:14 PM",
    status: "Complete",
    posted_by: CLIENTS[2],
    booked_runner: RENNERS[1],
  },
];
