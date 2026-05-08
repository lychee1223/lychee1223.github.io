export interface AboutMe {
  name: string;
  title: string;
  institution: string;
  description: string;
  interests?: string[];
  biographyHighlights?: string[];
  email: string;
  imageURL?: string;
  blogURL?: string;
  cvURL?: string;
  googleScholarURL?: string;
  twitterUsername?: string;
  githubUsername?: string;
  linkedinUsername?: string;
  funDescription?: string; // Gets placed in the left sidebar
  secretDescription?: string; // Gets placed in the bottom
  altName?: string;
  institutionURL?: string;
  institutionAddress?: string;
  laboratoryName?: string;
  laboratoryURL?: string;
}

export const aboutMe: AboutMe = {
  imageURL: "/portrait.png",
  name: "Takuro Kawada",
  title: "M.S. student",
  institution: "Hosei University",
  institutionURL: "https://www.hosei.ac.jp/",
  institutionAddress:
    "S603, 3-7-2, Kajino-cho, Koganei-shi, Tokyo 184-8584, Japan",
  laboratoryName: "Intelligent information processing laboratory",
  laboratoryURL: "https://iyatomi-lab.info/english-top/",

  email: "takuro.kawada@gmail.com",
  googleScholarURL: "https://scholar.google.com/citations?user=Lb8EyWYAAAAJ",
  githubUsername: "lychee1223",
  linkedinUsername: "takuro-kawada-0355b43ab",
  twitterUsername: "lychee1223_Lab",

  description:
    "Takuro Kawada (川田拓朗 in Japanese) is an M.S. student in the Intelligent Information Processing Laboratory at Hosei University, advised by Prof. Hitoshi Iyatomi. His current work centers on vision & language with a particular interest in building systems that make scientific communication and knowledge work more accessible, editable, and practical.",
  interests: [
    "Natural Language Processing",
    "Computer Vision",
    "AI for Science",
    "Graphic Design Generation",
    "Ancient Greece",
  ],
  biographyHighlights: [
    "❤️ Loves research and development. He genuinely enjoys research life and likes spending time thinking through problems, refining ideas, and figuring out what makes a research direction interesting in the first place.",
    "📝 Loves reading papers, implementing ideas, and turning rough concepts into actual systems. He is especially interested in generation, understanding, and human-in-the-loop editing for visually-rich documents and graphic design.",
    "🏛️ A serious ancient Greece enthusiast outside the lab. He can happily spend hours thinking about Greek architecture, history, mythology, philosophy, and even the everyday lives of ordinary people in the ancient world.",
  ],
};
