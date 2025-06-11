export interface Note {
  id: string
  videoId: string
  timestamp: string
  timestampSeconds: number
  image: string
  description: string
  createdAt: string
}

export interface Video {
  id: string
  title: string
  channel: string
  duration: string
  url: string
  thumbnail: string
  notesCount: number
}

export const mockVideos: Video[] = [
  {
    id: "1",
    title: "React Hooks Complete Tutorial - 2024",
    channel: "React Academy",
    duration: "18:45",
    url: "https://youtube.com/watch?v=abc123",
    thumbnail: "/placeholder.svg?height=90&width=160",
    notesCount: 5,
  },
  {
    id: "2",
    title: "Advanced JavaScript Concepts",
    channel: "JS Mastery",
    duration: "25:30",
    url: "https://youtube.com/watch?v=def456",
    thumbnail: "/placeholder.svg?height=90&width=160",
    notesCount: 4,
  },
  {
    id: "3",
    title: "CSS Grid Layout Masterclass",
    channel: "Design Pro",
    duration: "15:20",
    url: "https://youtube.com/watch?v=ghi789",
    thumbnail: "/placeholder.svg?height=90&width=160",
    notesCount: 3,
  },
  {
    id: "4",
    title: "Node.js Backend Development",
    channel: "Backend Guru",
    duration: "32:15",
    url: "https://youtube.com/watch?v=jkl012",
    thumbnail: "/placeholder.svg?height=90&width=160",
    notesCount: 6,
  },
  {
    id: "5",
    title: "TypeScript for Beginners",
    channel: "Code Academy",
    duration: "22:40",
    url: "https://youtube.com/watch?v=mno345",
    thumbnail: "/placeholder.svg?height=90&width=160",
    notesCount: 4,
  },
]

export const mockNotes: Note[] = [
  // React Hooks Tutorial Notes
  {
    id: "1",
    videoId: "1",
    timestamp: "2:34",
    timestampSeconds: 154,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    description:
      "React Hooks allow you to use state and other React features in functional components without writing a class.",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    videoId: "1",
    timestamp: "5:12",
    timestampSeconds: 312,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
    description:
      "useState hook returns an array with two elements: the current state value and a function to update it.",
    createdAt: "2024-01-15T10:33:00Z",
  },
  {
    id: "3",
    videoId: "1",
    timestamp: "8:45",
    timestampSeconds: 525,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    description:
      "useEffect hook lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined.",
    createdAt: "2024-01-15T10:36:00Z",
  },
  {
    id: "4",
    videoId: "1",
    timestamp: "12:20",
    timestampSeconds: 740,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    description:
      "Custom hooks are JavaScript functions whose names start with 'use' and that may call other hooks. They let you extract component logic into reusable functions.",
    createdAt: "2024-01-15T10:40:00Z",
  },
  {
    id: "5",
    videoId: "1",
    timestamp: "15:33",
    timestampSeconds: 933,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
    description:
      "Rules of Hooks: Only call hooks at the top level of your React function, never inside loops, conditions, or nested functions.",
    createdAt: "2024-01-15T10:43:00Z",
  },

  // Advanced JavaScript Notes
  {
    id: "6",
    videoId: "2",
    timestamp: "3:15",
    timestampSeconds: 195,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop",
    description:
      "Closures in JavaScript allow inner functions to access variables from outer functions even after the outer function has returned.",
    createdAt: "2024-01-16T14:20:00Z",
  },
  {
    id: "7",
    videoId: "2",
    timestamp: "7:45",
    timestampSeconds: 465,
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=200&fit=crop",
    description:
      "Promises provide a way to handle asynchronous operations in JavaScript, representing a value that may be available now, later, or never.",
    createdAt: "2024-01-16T14:25:00Z",
  },
  {
    id: "8",
    videoId: "2",
    timestamp: "12:30",
    timestampSeconds: 750,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=200&fit=crop",
    description:
      "Async/await syntax makes it easier to work with promises, allowing you to write asynchronous code that looks synchronous.",
    createdAt: "2024-01-16T14:30:00Z",
  },
  {
    id: "9",
    videoId: "2",
    timestamp: "18:20",
    timestampSeconds: 1100,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    description:
      "Event loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded.",
    createdAt: "2024-01-16T14:35:00Z",
  },

  // CSS Grid Notes
  {
    id: "10",
    videoId: "3",
    timestamp: "2:10",
    timestampSeconds: 130,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
    description:
      "CSS Grid is a two-dimensional layout system that allows you to create complex layouts with rows and columns.",
    createdAt: "2024-01-17T09:15:00Z",
  },
  {
    id: "11",
    videoId: "3",
    timestamp: "6:45",
    timestampSeconds: 405,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    description:
      "Grid container is created by setting display: grid on an element, making all direct children grid items.",
    createdAt: "2024-01-17T09:20:00Z",
  },
  {
    id: "12",
    videoId: "3",
    timestamp: "11:30",
    timestampSeconds: 690,
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop",
    description:
      "Grid template areas allow you to name grid areas and place items using those names for more readable layouts.",
    createdAt: "2024-01-17T09:25:00Z",
  },

  // Node.js Notes
  {
    id: "13",
    videoId: "4",
    timestamp: "4:20",
    timestampSeconds: 260,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
    description:
      "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server side.",
    createdAt: "2024-01-18T16:10:00Z",
  },
  {
    id: "14",
    videoId: "4",
    timestamp: "8:15",
    timestampSeconds: 495,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=200&fit=crop",
    description:
      "Express.js is a minimal web framework for Node.js that provides robust features for building web applications and APIs.",
    createdAt: "2024-01-18T16:15:00Z",
  },
  {
    id: "15",
    videoId: "4",
    timestamp: "13:45",
    timestampSeconds: 825,
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&h=200&fit=crop",
    description:
      "Middleware functions in Express have access to request and response objects and can execute code, modify objects, or end the request-response cycle.",
    createdAt: "2024-01-18T16:20:00Z",
  },
  {
    id: "16",
    videoId: "4",
    timestamp: "19:30",
    timestampSeconds: 1170,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    description:
      "RESTful APIs follow REST architectural principles, using HTTP methods (GET, POST, PUT, DELETE) for different operations.",
    createdAt: "2024-01-18T16:25:00Z",
  },
  {
    id: "17",
    videoId: "4",
    timestamp: "25:10",
    timestampSeconds: 1510,
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=200&fit=crop",
    description:
      "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents, making it easy to work with in Node.js applications.",
    createdAt: "2024-01-18T16:30:00Z",
  },
  {
    id: "18",
    videoId: "4",
    timestamp: "28:45",
    timestampSeconds: 1725,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop",
    description:
      "Authentication and authorization are crucial for securing APIs, often implemented using JWT tokens and middleware.",
    createdAt: "2024-01-18T16:35:00Z",
  },

  // TypeScript Notes
  {
    id: "19",
    videoId: "5",
    timestamp: "3:30",
    timestampSeconds: 210,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    description:
      "TypeScript is a superset of JavaScript that adds static type definitions, helping catch errors during development.",
    createdAt: "2024-01-19T11:45:00Z",
  },
  {
    id: "20",
    videoId: "5",
    timestamp: "8:20",
    timestampSeconds: 500,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    description:
      "Type annotations in TypeScript allow you to explicitly specify the type of variables, function parameters, and return values.",
    createdAt: "2024-01-19T11:50:00Z",
  },
  {
    id: "21",
    videoId: "5",
    timestamp: "14:15",
    timestampSeconds: 855,
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=200&fit=crop",
    description:
      "Interfaces in TypeScript define the structure of objects, providing a way to type-check object shapes and ensure consistency.",
    createdAt: "2024-01-19T11:55:00Z",
  },
  {
    id: "22",
    videoId: "5",
    timestamp: "19:50",
    timestampSeconds: 1190,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop",
    description:
      "Generics allow you to create reusable components that work with multiple types while maintaining type safety.",
    createdAt: "2024-01-19T12:00:00Z",
  },
]
