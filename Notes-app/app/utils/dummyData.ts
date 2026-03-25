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

export const QUOTES = [
  {
    text: "The palest ink is better than the best memory.",
    author: "Chinese Proverb",
  },
  {
    text: "Fill your paper with the breathings of your heart.",
    author: "William Wordsworth",
  },
  {
    text: "A short pencil is better than a long memory.",
    author: "Mark Twain",
  },
  { text: "Writing is thinking on paper.", author: "William Zinsser" },
  { text: "Notebook: a place where chaos becomes story.", author: "Anonymous" },
  {
    text: "One must always have a notebook. Life goes by fast.",
    author: "Nora Ephron",
  },
];

export const TIPS = [
  "📌 Pin your most important note to keep it at the top.",
  "🔍 Use keywords in titles for faster search.",
  "🏷️ Tag notes by project or mood to find them instantly.",
  "✂️ Keep notes short — one idea per note works best.",
  "🌙 Review your notes each evening to retain more.",
];

export const GREETINGS = ["Good morning", "Good afternoon", "Good evening"];
