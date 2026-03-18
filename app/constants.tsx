import {
  BxlGmail,
  IcBaselineFacebook,
  MdiGithub,
  MdiInstagram,
  MdiLinkedin,
} from "./icons";

export const typewriterTexts = [
  // Core Identity & AI Focus
  "A Full-Stack Engineer architecting the future of AI automation.",
  "Integrating RAG and LLMs into modern web and mobile apps.",
  "Automating complex workflows with n8n and Python.",

  // Tech Stack Specific
  "Building high-performance web apps with Next.js and Supabase.",
  "Crafting seamless mobile experiences with React Native and Expo.",
  "Developing robust backends using Node.js, Express, and MongoDB.",

  // Result-Oriented & Creative
  "Turning manual business processes into autonomous systems.",
  "Transforming complex ideas into production-ready software.",
  "Bridging the gap between intelligent AI and user-centered design.",
  "Building from scratch, from database to deployment.",
  "Your partner in end-to-end full-stack development.",
];

export const aboutText = `I'm a Full-Stack Software Engineer and AI Automation Engineer specializing in developing end-to-end solutions with JavaScript/TypeScript and Python. My work spans across building modern web applications, developing mobile apps with React Native, and architecting intelligent automation workflows using n8n and Zapier.

As a freelance developer, I specialize in bringing complex ideas to life by building custom, full-stack software solutions from the ground up. I am actively open to new project offers and love partnering with businesses to build scalable, user-centered applications. When I am not working with clients, I am actively building personal projects to experiment with new technologies and refine my development skills.

Lately, I've been diving deeper into the world of Artificial Intelligence and Machine Learning. My focus is on integrating AI tools, Retrieval-Augmented Generation (RAG), and advanced automations into modern applications to optimize workflows and deliver cutting-edge, intelligent systems.`;

export const internshipText =
  "During my internship, I contributed to the front-end development of a new tablet-based Point of Sale (POS) application built from scratch. Using React Native, Expo, and Redux, I helped implement the user interface from existing designs and managed state and API integrations. I collaborated closely with the design and backend teams to build a solid foundation for the app's future release.";

export const agentGeniusDescText =
  "As an AI Automation Engineer, I bridge the gap between complex AI technology and practical business needs. I design, develop, and maintain full-stack applications using React and Supabase, while powering the backend logic with intelligent n8n automation workflows. Beyond writing code, I work directly with our clients—acting as their technical partner to gather requirements, communicate progress, and deliver custom AI solutions that streamline their operations.";

export const freelanceDescText =
  "I offer comprehensive full-stack services for web and mobile as an independent developer, specializing in a modern stack that includes Next.js, Vite, and React Native. As the technical lead for my clients, I manage every phase of the project—from UI implementation to complex API development using Node.js and Express. By utilizing Supabase and MongoDB for robust data handling, I consistently deliver high-quality, full-stack applications that are optimized for performance and ready for real-world deployment.";

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
    category: ["Web Development", "AI Integration"],
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
    id: 10,
    slug: "agrimarket",
    title: "AgriMarket Mobile App",
    subtitle: "Public",
    category: "Mobile Development",
    projectLink: {
      link: "https://github.com/NIORSAYSON/agrimarket",
      linkName: "AgriMarket Platform",
    },
    tools: [
      "React Native",
      "Expo",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Socket.io",
    ],
    projectImages: Array.from(
      { length: 33 },
      (_, index) => `/Projects/Sample Images/AgriMarket ${index + 1}.jpg`,
    ),
    description: `AgriMarket is a comprehensive mobile e-commerce platform designed to connect local farmers directly with consumers. Built from the ground up with React Native and Expo, the application provides a seamless marketplace experience with dedicated interfaces for three distinct user roles: Buyers, Sellers (Farmers), and Administrators.

    Key Features and Technologies:

    • Multi-Role Architecture: Distinct dashboards and functionalities for consumers browsing products, farmers managing their agricultural business, and admins overseeing the platform.
    
    • Real-Time Communication: Integrated Socket.io for live chat between buyers and sellers, enabling seamless negotiation and customer support, alongside instant push notifications for order updates.
    
    • Advanced State Management: Utilized Redux Toolkit and RTK Query for highly efficient API data fetching, caching, and global state management, combined with Redux Persist for offline session handling.
    
    • Complete E-commerce Flow: Features a full shopping cart implementation, secure checkout, order tracking (Processing, In-Transit, Delivered, Cancelled), multi-address management, and product reviews.
    
    • Seller & Admin Analytics: Provides farmers with visual dashboards to track total revenue, active orders, and product stock. Admins have access to high-level platform metrics, user management, and product approval workflows.

    This project demonstrates my proficiency in building complex, scalable mobile applications with real-time capabilities, intricate role-based access controls, and highly structured API integrations.`,
  },
  {
    id: 11,
    slug: "busis-campus-app",
    title: "Campus Information System (BUSIS)",
    subtitle: "Public",
    category: ["Full Stack Development", "Mobile Development"],
    projectLink: {
      link: "https://github.com/NIORSAYSON/busis",
      linkName: "BUSIS Source Code",
    },
    tools: [
      "React Native",
      "Expo",
      "TypeScript",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MongoDB",
      "3D Mapping",
    ],
    projectImages: Array.from(
      { length: 13 }, // Adjust this number based on how many screenshots you actually have
      (_, index) => `/Projects/Sample Images/BUSIS ${index + 1}.jpg`,
    ),
    description: `The Campus Information System (BUSIS) is a comprehensive full-stack mobile application designed to centralize university announcements, events, department directories, and campus navigation into a single, accessible platform.

    The project is divided into a robust backend architecture and an interactive mobile frontend:

    • Frontend (Mobile App): Built from the ground up using React Native and Expo with TypeScript. The app features a modern, tab-based navigation system and utilizes Redux Toolkit with RTK Query for highly efficient state management and API data caching. A standout feature of the frontend is the interactive 3D Campus Map, which renders actual 3D models (.glb files) of university buildings (e.g., Nursing, Engineering, Canteen, Admin) directly on the user's device for immersive navigation.

    • Backend (REST API): Powered by Node.js and Express.js, the backend provides secure, scalable endpoints for the mobile application. It uses MongoDB (via Mongoose) to manage complex data schemas for users, announcements, categories, departments, and events. The API includes custom middleware for JWT authentication, file uploading, and data validation.

    • Admin & Content Management: The application includes dedicated administrative interfaces and secure login flows, allowing authorized personnel to seamlessly create, update, and delete campus events, announcements, and departmental information in real-time.

    This project showcases my ability to architect and deliver complete full-stack mobile solutions, from designing RESTful APIs and database schemas to implementing advanced frontend features like 3D model rendering and global state management.`,
  },
  {
    id: 12,
    slug: "fadeflow-saas",
    title: "FadeFlow - Barbershop SaaS",
    subtitle: "Public",
    category: ["Full Stack Development", "Web Development"],
    projectLink: {
      link: "https://github.com/NIORSAYSON/fadeflow-saas",
      linkName: "FadeFlow Source Code",
    },
    tools: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Radix UI",
      "Zod",
    ],
    // Automatically generates FadeFlow 1.jpg through FadeFlow 5.jpg
    projectImages: Array.from(
      { length: 11 },
      (_, index) => `/Projects/Sample Images/FadeFlow ${index + 1}.png`,
    ),
    description: `FadeFlow is a comprehensive Software-as-a-Service (SaaS) platform tailored for barbershops and salons, designed to streamline appointment bookings and business management.

    Built with a modern tech stack, the application provides two primary experiences: a seamless, public-facing booking flow for clients and a powerful administrative dashboard for business owners.

    Key Features and Technologies:

    • Frontend Architecture: Developed using Next.js (App Router) and TypeScript, featuring a highly responsive and accessible UI built with Tailwind CSS and Radix UI components. Form handling and validation are strictly typed using React Hook Form and Zod.

    • Backend & Authentication: Powered by Supabase for secure, scalable PostgreSQL database management and user authentication, supporting both traditional login and magic link passwordless authentication.

    • Client Booking Flow: Offers an intuitive, step-by-step booking experience where clients can select specific services, view barber availability via dynamic date/time pickers, and confirm appointments.

    • Provider Dashboard: A dedicated management portal for business owners to track upcoming appointments, manage their service catalog, configure working hours/schedules, and block out unavailable time slots.

    This project demonstrates my capability to architect and build end-to-end SaaS applications, integrating complex state management, database schema design, and polished user interfaces to solve real-world business needs.`,
  },
  {
    id: 13,
    slug: "vibenode",
    title: "VibeNode",
    subtitle: "Public",
    category: ["Full Stack Development", "Web Development", "AI Integration"],
    projectLink: {
      link: "https://vibenode.site",
      linkName: "VibeNode Live Site",
    },
    tools: ["React", "Vite", "Node.js", "Socket.io", "Redis", "AI Integration"],
    // Automatically generates VibeNode 1.jpg through VibeNode 5.jpg
    projectImages: Array.from(
      { length: 7 },
      (_, index) => `/Projects/Sample Images/VibeNode ${index + 1}.png`,
    ),
    description: `VibeNode is an innovative real-time chat and matchmaking platform designed to connect users based on shared interests and "wavelengths." 

    Built as a scalable full-stack application, the platform handles concurrent connections, real-time messaging, and intelligent user pairing.

    Key Features and Technologies:

    • Real-Time Infrastructure: Powered by Node.js and Socket.io on the backend, enabling low-latency, bidirectional communication for instant messaging and live user status updates.

    • State Management & Scalability: Integrates Redis to efficiently manage active user sessions, chat queues, and matchmaking states across the server, ensuring high performance even under heavy loads.

    • Smart AI Matchmaking: Utilizes an AI matching algorithm to pair users based on contextual similarities rather than just random assignment, creating more meaningful chat experiences.

    • Content Moderation: Features a built-in profanity filter to actively moderate chat rooms and maintain a safe, welcoming community environment.

    • Modern Frontend: The client interface is built with React and Vite, featuring smooth transitions between Lobby, Queue, and Chat pages, alongside a responsive and interactive chat UI.

    This project demonstrates my strong grasp of WebSocket protocols, in-memory data structure stores (Redis), and the ability to architect complex, real-time networking applications.`,
  },
  {
    id: 9,
    slug: "task-manager-app",
    title: "Task Manager App",
    subtitle: "Public",
    category: ["Web Development", "Full Stack Development"],
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

  // {
  //   id: 14,
  //   slug: "our-story",
  //   title: "Our Story (Intimate Digital Scrapbook)",
  //   subtitle: "Personal",
  //   category: "Frontend Development & UI/UX",
  //   projectLink: {
  //     link: "https://our-little.space",
  //     linkName: "Visit Live Site",
  //   },
  //   tools: [
  //     "React",
  //     "Vite",
  //     "Tailwind CSS",
  //     "Framer Motion",
  //     "TypeScript",
  //     "Lucide Icons",
  //   ],
  //   // Automatically generates Our Story 1.jpg through Our Story 5.jpg
  //   projectImages: Array.from(
  //     { length: 5 },
  //     (_, index) => `/Projects/Sample Images/Our Story ${index + 1}.png`,
  //   ),
  //   description: `"Our Story" is a bespoke, deeply personal React web application designed to act as a digital timeline and interactive scrapbook. It was built with a strict focus on high-end, premium UI/UX design.

  //   The application follows an "Intimate Sophistication" design system, utilizing deep charcoal backgrounds, heavy glassmorphism, and muted gold accents to create a cinematic, deeply emotional user experience.

  //   Key Features and Technologies:

  //   • Advanced UI/UX & Animations: Extensive use of Framer Motion for fluid page transitions, interactive scroll events, and staggered entrance animations.

  //   • Persistent Global Audio: Engineered a custom React Context audio provider to maintain a continuous, looping background soundtrack that persists flawlessly across route changes without restarting.

  //   • Custom Authentication: Features a highly stylized, animated password gate that prevents unauthorized access while setting the premium tone of the app.

  //   • Performance Optimized Galleries: Implemented lazy loading and hardware-accelerated animations for the high-resolution masonry photo albums to ensure buttery-smooth scrolling on mobile devices.

  //   • Fully Responsive Design: Engineered a "floating canvas" approach that perfectly adapts from an alternating mobile timeline to a beautiful, centered desktop experience.

  //   This project highlights my passion for pixel-perfect frontend development, advanced CSS techniques, and creating deeply engaging user interfaces.`,
  // },
];

export const projectCategories = [
  "All Projects",
  "Web Development",
  "Mobile Development",
  "AI & Machine Learning",
  "Security & Cryptography",
  "Full Stack Development",
  "AI Integration",
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
