type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
};

const notes: Note[] = [
  {
    id: 1,
    title: "Grocery List",
    content: "Buy milk, eggs, and bread",
    date: "2026-03-25",
  },
  {
    id: 2,
    title: "Workout Plan",
    content: "Chest and triceps workout",
    date: "2026-03-24",
  },
  {
    id: 3,
    title: "Meeting Notes",
    content: "Discuss project timeline and deliverables",
    date: "2026-03-23",
  },
  {
    id: 4,
    title: "Ideas",
    content: "Build a notes app with Expo Router",
    date: "2026-03-22",
  },
  {
    id: 5,
    title: "Books to Read",
    content: "Atomic Habits, Deep Work",
    date: "2026-03-21",
  },
];

export default notes;
