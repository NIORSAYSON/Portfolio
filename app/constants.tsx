import {
  BxlGmail,
  IcBaselineFacebook,
  MdiGithub,
  MdiInstagram,
  MdiLinkedin,
} from "./icons";

export const typewriterTexts = [
  "A Front-End Developer crafting delightful digital experiences.",
  "Passionate about building accessible and responsive web apps.",
  "Turning ideas into interactive user interfaces.",
];

export const aboutText =
  "Front-End Developer with experience in building web and mobile applications, combining strong programming skills with a focus on intelligent, user-centered design. Research-oriented with a background in machine learning and Retrieval-Augmented Generation (RAG), and driven to create scalable, AI-powered solutions through collaboration and innovation.";

export const internshipText =
  "Developed a tablet-based Point of Sale (POS) mobile application from scratch to support efficient retail operations. Designed and implemented a responsive, user-friendly interface and handled API integration to connect with backend services. Collaborated closely with the backend developer and UI/UX designer to align design, functionality, and data flow. Actively participated in version control and team collaboration to ensure smooth development and deployment.";

export const collegeText =
  "Gaining a strong foundation in programming, software development, and emerging technologies such as artificial intelligence and machine learning. Developed practical skills through hands-on projects, research, and real-world applications in web and mobile development.";

export const seniorHighText =
  "Completed Senior High School under the General Academic Strand (GAS), which provided a well-rounded curriculum covering core subjects in mathematics, science, humanities, social sciences, and communication. Developed strong analytical, critical thinking, and research skills through various academic projects and group work. This track offered flexibility and exposure to multiple disciplines, helping shape my decision to pursue a degree in Computer Science and preparing me for the academic and technical challenges of higher education.";

export const juniorHighText =
  "Completed Junior High School with specialization in Computer System Services under the Technical-Vocational Education program. Introduced to the basics of computer hardware, software installation, and troubleshooting. This early exposure to technology sparked my interest in computing and laid the foundation for pursuing further studies in computer science.";

export const projects = [
  {
    id: 1,
    slug: "my-portfolio",
    title: "My Portfolio",
    subtitle: "Public",
    category: "Web Development",
    projectLink: {
      link: "https://niorsayson.vercel.app/",
      linkName: "Nestor B. Sayson Jr - Portfolio",
    },
    tools: [
      "React",
      "Next.js",
      "Tailwind",
      "Typescript",
      "Framer Motion",
      "Vercel",
    ],
    projectImages: [
      "/Projects/Sample Images/My Portfolio 1.png",
      "/Projects/Sample Images/My Portfolio 2.png",
      "/Projects/Sample Images/My Portfolio 3.png",
      "/Projects/Sample Images/My Portfolio 4.png",
      "/Projects/Sample Images/My Portfolio 5.png",
      "/Projects/Sample Images/My Portfolio 6.png",
    ],
    description: `This portfolio project is a fully responsive and modern web application developed from scratch using React, Next.js, and TypeScript. The design and layout are built with Tailwind CSS and enhanced with styled-components for dynamic styling capabilities. Smooth, interactive animations are implemented using Framer Motion, providing an engaging user experience. 
              
    The project supports dark and light mode toggling, ensuring optimal accessibility and user preference adaptability across devices. All source code is version-controlled with Git and hosted on GitHub, while deployment is managed via Vercel for fast, seamless delivery.

    The design is inspired by the portfolio of Mr. Mark John Allen Nizal, whose clean and user-focused interface served as a visual and structural reference throughout the development process.
              
    This project highlights best practices in modern frontend development, including clean architecture, reusable components, and scalability in both design and code.`,
  },
  {
    id: 2,
    slug: "pos-system",
    title: "Point of Sale System App",
    subtitle: "Private",
    category: "Mobile Development",
    tools: ["React Native", "Redux", "Typescript", "Expo", "API Integration"],
    projectImages: [
      "/Projects/Sample Images/POS System App 1.png",
      "/Projects/Sample Images/POS System App 2.png",
      "/Projects/Sample Images/POS System App 3.png",
      "/Projects/Sample Images/POS System App 4.png",
      "/Projects/Sample Images/POS System App 5.png",
      "/Projects/Sample Images/POS System App 6.png",
      "/Projects/Sample Images/POS System App 7.png",
      "/Projects/Sample Images/POS System App 8.png",
      "/Projects/Sample Images/POS System App 9.png",
      "/Projects/Sample Images/POS System App 10.png",
      "/Projects/Sample Images/POS System App 11.png",
      "/Projects/Sample Images/POS System App 12.png",
      "/Projects/Sample Images/POS System App 13.png",
    ],
    duration: "3 months",
    description: `This mobile Point-of-Sale (POS) application was developed during my internship at IntelliSeven Technology Solutions Inc., where I contributed as one of the frontend developers in a collaborative team composed of 2 frontend developers, 2 backend developers, and 1 UI/UX designer.

    The app was built from scratch using React Native and TypeScript, with Redux for global state management and styled-components for modular, maintainable styling. Development and testing were facilitated using Expo, while API integration connected the frontend to the backend services. The codebase was version-controlled using Git, with collaboration and repository management handled via GitHub.

    Key Technologies and Features:

    • Cross-Platform Development: Built with React Native for compatibility across both Android and iOS platforms.

    • Type-Safe Architecture: Leveraged TypeScript for improved code reliability and maintainability.

    • Global State Management: Implemented Redux to manage and synchronize state across the application.

    • API Integration: Connected to a custom backend through RESTful APIs to manage sales, inventory, and transactions.

    • Styled-Components: Utilized for dynamic and reusable UI styling.

    • Expo: Used for streamlined development, testing, and deployment processes.

    Although the project was not fully completed by the end of the internship, it demonstrated my ability to work within a cross-functional development team, apply scalable frontend architecture practices, and build production-level features for a real-world retail solution.`,
  },
  {
    id: 3,
    slug: "cspc-chatbot",
    title: "CSPC Conversational Agent",
    subtitle: "Public",
    category: "AI & Machine Learning",
    projectLink: {
      link: "https://huggingface.co/spaces/Nioooor/CSPC_Conversational_Agent",
      linkName: "CSPC Conversational Agent",
    },
    tools: [
      "Python",
      "RAG",
      "LLaMA 3",
      "ChatGroq",
      "Langchain",
      "Hugging Face",
    ],
    projectImages: [
      "/Projects/Sample Images/CSPC Chatbot 1.png",
      "/Projects/Sample Images/CSPC Chatbot 2.png",
      "/Projects/Sample Images/CSPC Chatbot 3.png",
      "/Projects/Sample Images/CSPC Chatbot 4.png",
      "/Projects/Sample Images/CSPC Chatbot 5.png",
    ],
    description: `The CSPC Conversational Agent is a thesis project developed during my undergraduate studies at Camarines Sur Polytechnic Colleges (CSPC), where I served as the lead programmer of our research group. This project explores the development of an intelligent, domain-specific conversational agent designed to assist users in navigating the Citizen's Charter of CSPC.

    The system leverages Retrieval-Augmented Generation (RAG) and a fine-tuned LLaMA 3 model to deliver accurate and contextually relevant responses to queries related to institutional processes such as admissions, enrollment, and student services.

    Key Features and Technologies:

    • Transformer-based Architecture: Utilizes the ChatGroq LLaMA3-8B model, configured with a low-temperature setting for concise and precise outputs.

    • Semantic Search with Embeddings: Employs the nomic-ai/nomic-embed-text-v1.5 model to convert textual data into vector embeddings, enabling deep semantic understanding of user queries.

    • Vector Database Integration: Integrates Chroma as the vector store to manage and retrieve the most relevant documents from the CSPC Citizen's Charter and official materials.

    • Contextual Awareness: Supports continuous multi-turn conversations by maintaining chat history, allowing the model to respond more accurately based on previous user interactions.

    • User-Friendly Interface: Includes a Clear Chat History feature to reset conversations, providing a clean slate for unrelated queries and enhancing the user experience.

    Data Sources:

    The dataset used in this project was derived from the official CSPC Citizen's Charter Handbook and content from the CSPC website, ensuring the responses are aligned with institutional policies and services.

    This project demonstrates the practical application of natural language processing, machine learning, and AI-driven information retrieval in the context of public service and education. It reflects my ability to integrate state-of-the-art technologies into real-world, purpose-driven applications.`,
  },
  {
    id: 7,
    slug: "notes-app",
    title: "Notes App",
    subtitle: "Public",
    category: "Mobile Development",
    projectLink: {
      link: "https://github.com/NIORSAYSON/notes-app",
      linkName: "Notes App — React Native (Expo)",
    },
    tools: [
      "React Native",
      "Expo",
      "Redux Toolkit",
      "redux-persist",
      "TypeScript",
    ],
    projectImages: [
      "/Projects/Sample Images/Notes App 1.jpg",
      "/Projects/Sample Images/Notes App 2.jpg",
      "/Projects/Sample Images/Notes App 3.jpg",
      "/Projects/Sample Images/Notes App 4.jpg",
      "/Projects/Sample Images/Notes App 5.jpg",
      "/Projects/Sample Images/Notes App 6.jpg",
      "/Projects/Sample Images/Notes App 7.jpg",
    ],
    // duration: "1 month",
    description: `A simple and intuitive mobile notes application built with React Native and Expo. Features a secure mock login (username: test / password: password123), persistent sessions using redux-persist, full CRUD for notes, search by title/description, and a clean, modern UI inspired by a Figma design.`,
  },
  {
    id: 9,
    slug: "task-manager-app",
    title: "Task Manager App",
    subtitle: "Public",
    category: "Web Development",
    projectLink: {
      link: "https://github.com/NIORSAYSON/task-manager-app",
      linkName: "Task Manager App — Full Stack",
    },
    tools: [
      "Next.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Zustand",
    ],
    projectImages: [
      "/Projects/Sample Images/Task Manager 1.png",
      "/Projects/Sample Images/Task Manager 2.png",
      "/Projects/Sample Images/Task Manager 3.png",
      "/Projects/Sample Images/Task Manager 4.png",
      "/Projects/Sample Images/Task Manager 5.png",
      "/Projects/Sample Images/Task Manager 6.png",
    ],
    // duration: "2 months",
    description: `A modern, full-stack task management application with user authentication, task organization, and both list and Kanban board views. Built with Next.js (App Router) for the frontend and Express.js + MongoDB for the backend. Features include JWT-based authentication, password hashing with bcryptjs, task priorities and due dates, drag-and-drop Kanban board, real-time updates, and a responsive UI built with Tailwind and Radix UI.`,
  },
  {
    id: 4,
    slug: "sias-redesign",
    title: "SIAS Online Portal Redesign",
    subtitle: "Public",
    category: "Web Development",
    projectLink: {
      link: "https://niorsayson.github.io/SIAS-Online-Portal-Redesign/",
      linkName: "CSPC SIAS Online Portal Redesign",
    },
    tools: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    projectImages: [
      "/Projects/Sample Images/SIAS Redesign 1.png",
      "/Projects/Sample Images/SIAS Redesign 2.png",
      "/Projects/Sample Images/SIAS Redesign 3.png",
      "/Projects/Sample Images/SIAS Redesign 4.png",
      "/Projects/Sample Images/SIAS Redesign 5.png",
      "/Projects/Sample Images/SIAS Redesign 6.png",
      "/Projects/Sample Images/SIAS Redesign 7.png",
      "/Projects/Sample Images/SIAS Redesign 8.png",
    ],
    description: `The SIAS Online Portal Redesign was developed as the final project for my Human-Computer Interaction (HCI) course during my third year at Camarines Sur Polytechnic Colleges (CSPC). Tasked with redesigning an existing system to improve usability and user experience, I chose to revamp the SIAS (Student Information and Accounting System) Online Portal, which students use to manage their academic records. The redesign focused on five key sections of the portal: the landing page, login page, home page, enrolled subjects page, and curriculum evaluation page. The project was built using HTML, CSS, JavaScript, and Bootstrap, with a fully mobile-responsive layout to ensure accessibility across devices. The redesign emphasized modern UI principles, clean layout structures, and improved navigation flow to enhance overall user experience. This project demonstrates my ability to apply HCI concepts to real-world systems and showcases my frontend development skills in crafting functional and user-centered web interfaces.`,
  },
  {
    id: 5,
    slug: "synthetic-data-generator",
    title: "Synthetic Data Generator",
    subtitle: "Public",
    category: "AI & Machine Learning",
    projectLink: {
      link: "https://synthetic-data-generator-sayson.streamlit.app/",
      linkName: "CSPC Synthetic Data Generator",
    },
    tools: [
      "Python",
      "Streamlit",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
    ],
    projectImages: [
      "/Projects/Sample Images/Modeling and Simulation 1.png",
      "/Projects/Sample Images/Modeling and Simulation 2.png",
      "/Projects/Sample Images/Modeling and Simulation 3.png",
      "/Projects/Sample Images/Modeling and Simulation 4.png",
      "/Projects/Sample Images/Modeling and Simulation 5.png",
      "/Projects/Sample Images/Modeling and Simulation 6.png",
      "/Projects/Sample Images/Modeling and Simulation 7.png",
      "/Projects/Sample Images/Modeling and Simulation 8.png",
      "/Projects/Sample Images/Modeling and Simulation 9.png",
      "/Projects/Sample Images/Modeling and Simulation 10.png",
      "/Projects/Sample Images/Modeling and Simulation 11.png",
      "/Projects/Sample Images/Modeling and Simulation 12.png",
    ],
    description: `The Synthetic Data Generator is a project I developed during my fourth year in the Modeling and Simulation course at Camarines Sur Polytechnic Colleges. The goal of this project was to create a simple yet functional tool that allows users to generate synthetic datasets for practice and experimentation. Users can customize the data by specifying class labels, feature names, class-specific parameters, and the number of samples. The system then produces both original and scaled data, which can be downloaded. To help users better understand the data, the app also includes basic exploratory data analysis (EDA) using tools like Pandas, Matplotlib, and Seaborn.

    In addition to data generation, I added a model training module where users can upload the generated dataset, set train-test splits, and choose from commonly used algorithms such as Random Forest, Logistic Regression, and Support Vector Machines, powered by Scikit-learn. After training, the app displays evaluation results including model comparisons, learning curves, and confusion matrices. Trained models can also be downloaded.

    Lastly, the model simulation feature allows users to upload a trained model and target encoder, input sample features, and receive predictions. The app was built using Streamlit, and it reflects my interest in learning how machine learning workflows—from data creation to model simulation—can be made more interactive and accessible. This project gave me hands-on experience with practical tools such as NumPy, Scikit-learn, and Streamlit, and helped me better understand how to apply classroom concepts in real-world scenarios.`,
  },
  {
    id: 6,
    slug: "cryptographic-application",
    title: "Cryptographic Application",
    subtitle: "Public",
    category: "Security & Cryptography",
    projectLink: {
      link: "https://saysonnior-cs3b.streamlit.app/",
      linkName: "Cryptographic Application",
    },
    tools: ["Python", "Streamlit", "pycrypto", "hashlib"],
    projectImages: [
      "/Projects/Sample Images/Cryptographic Application 1.png",
      "/Projects/Sample Images/Cryptographic Application 2.png",
      "/Projects/Sample Images/Cryptographic Application 3.png",
      "/Projects/Sample Images/Cryptographic Application 4.png",
      "/Projects/Sample Images/Cryptographic Application 5.png",
      "/Projects/Sample Images/Cryptographic Application 6.png",
      "/Projects/Sample Images/Cryptographic Application 7.png",
      "/Projects/Sample Images/Cryptographic Application 8.png",
    ],
    description: `The Cryptographic Application is a final project I developed during my third year in the Applied Cryptography course at Camarines Sur Polytechnic Colleges. The project was created as a simple educational platform to demonstrate core cryptographic techniques in a hands-on and accessible way. It covers three major categories: Symmetric Key Cryptography, Asymmetric Key Cryptography, and Hashing Functions.

    For symmetric encryption, the app includes implementations of the XOR Cipher, Caesar Cipher, and a basic Block Cipher. On the asymmetric side, it features the RSA Cipher and the Diffie-Hellman Key Exchange. In the hashing section, users can explore commonly used algorithms such as MD5, SHA-1, SHA-256, and SHA-512. The tool was designed with usability in mind, offering a straightforward interface where users can encrypt, decrypt, and hash messages interactively.

    The project was built using Streamlit for the interface, along with PyCrypto and hashlib for the cryptographic operations. This experience helped deepen my understanding of cryptographic principles and gave me the opportunity to apply theory in a more practical, user-friendly format.`,
  },
];

export const projectCategories = [
  "All Projects",
  "Web Development",
  "Mobile Development",
  "AI & Machine Learning",
  "Security & Cryptography",
];

export const skillIcons1 = [
  { src: "/Skills/NextJS-Dark.svg", title: "Next.js" },
  { src: "/Skills/NodeJS-Dark.svg", title: "Node.js" },
  { src: "/Skills/Postman.svg", title: "Postman" },
  { src: "/Skills/Python-Dark.svg", title: "Python" },
  { src: "/Skills/React-Dark.svg", title: "React" },
  { src: "/Skills/Redux.svg", title: "Redux" },
  { src: "/Skills/Regex-Dark.svg", title: "Regex" },
  { src: "/Skills/ScikitLearn-Dark.svg", title: "Scikit-learn" },
  { src: "/Skills/TailwindCSS-Dark.svg", title: "Tailwind CSS" },
  { src: "/Skills/Tensorflow-Dark.svg", title: "TensorFlow" },
  { src: "/Skills/TypeScript.svg", title: "TypeScript" },
];
export const skillIcons2 = [
  { src: "/Skills/Arduino.svg", title: "Arduino" },
  { src: "/Skills/Bootstrap.svg", title: "Bootstrap" },
  { src: "/Skills/JavaScript.svg", title: "JavaScript" },
  { src: "/Skills/CPP.svg", title: "C++" },
  { src: "/Skills/CSS.svg", title: "CSS" },
  { src: "/Skills/Figma-Dark.svg", title: "Figma" },
  { src: "/Skills/Git.svg", title: "Git" },
  { src: "/Skills/Java-Dark.svg", title: "Java" },
  { src: "/Skills/Laravel-Dark.svg", title: "Laravel" },
  { src: "/Skills/LaTeX-Dark.svg", title: "LaTeX" },
  { src: "/Skills/MySQL-Dark.svg", title: "MySQL" },
];

export const colorTheme = {
  light: [
    "#ebedf0", // level0
    "#9be9a8", // level1
    "#40c463", // level2
    "#30a14e", // level3
    "#216e39", // level4
  ],
  dark: [
    "#161b22", // level0
    "#0e4429", // level1
    "#006d32", // level2
    "#26a641", // level3
    "#39d353", // level4
  ],
};

export const socialMediaPlatforms = [
  IcBaselineFacebook,
  MdiInstagram,
  BxlGmail,
  MdiLinkedin,
  MdiGithub,
];
