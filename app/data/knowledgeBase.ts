// Knowledge Base Template for Chatbot
// This data will be used to create embeddings and store in Supabase vector database

export const knowledgeBase = {
  personal: {
    name: "Nestor B. Sayson Jr.",
    nickname: "Nior",
    title: "Full-Stack Software Engineer & AI Automation Engineer",
    location: "Philippines",
    email: "nessayson@gmail.com",
    about: `I'm a Full-Stack Software Engineer and AI Automation Engineer specializing in developing end-to-end solutions with JavaScript/TypeScript and Python. My work spans across building modern web applications, developing mobile apps with React Native, and architecting intelligent automation workflows using n8n and Zapier.

    As a freelance developer, I specialize in bringing complex ideas to life by building custom, full-stack software solutions from the ground up. I am actively open to new project offers and love partnering with businesses to build scalable, user-centered applications. When I am not working with clients, I am actively building personal projects to experiment with new technologies and refine my development skills.

    Lately, I've been diving deeper into the world of Artificial Intelligence and Machine Learning. My focus is on integrating AI tools, Retrieval-Augmented Generation (RAG), and advanced automations into modern applications to optimize workflows and deliver cutting-edge, intelligent systems.`,
    socials: {
      facebook: "https://www.facebook.com/nioooooor?mibextid=ZbWKwL",
      instagram: "https://www.instagram.com/neon.nior/",
      gmail: "mailto:nessayson@gmail.com",
      linkedin: "https://www.linkedin.com/in/nestor-sayson-b8671b292/",
      github: "https://github.com/NIORSAYSON",
    },
  },

  services: [
    {
      title: "Full-Stack Web Development",
      description:
        "Custom end-to-end web applications built with Next.js, React, and Node.js. Focus on scalable architectures and responsive, accessible user interfaces.",
    },
    {
      title: "Mobile App Development",
      description:
        "Cross-platform mobile applications for iOS and Android using React Native and Expo, complete with complex backend integrations and real-time features.",
    },
    {
      title: "AI & Workflow Automation",
      description:
        "Designing intelligent business workflows using n8n and Zapier. Integrating custom LLMs, RAG pipelines, and AI agents into existing business processes to save time and reduce manual tasks.",
    },
  ],

  education: [
    {
      level: "Bachelor's Degree",
      institution: "Camarines Sur Polytechnic Colleges (CSPC)",
      degree: "Bachelor of Science in Computer Science",
      status: "Completed",
      description: `Gained a strong foundation in programming, software development, and emerging 
      technologies such as artificial intelligence and machine learning. Developed practical skills 
      through hands-on projects, research, and real-world applications in web and mobile development.`,
    },
    {
      level: "Senior High School",
      institution: "General Academic Strand (GAS)",
      description: `Completed Senior High School under the General Academic Strand (GAS), which provided 
      a well-rounded curriculum covering core subjects in mathematics, science, humanities, social sciences, 
      and communication.`,
    },
    {
      level: "Junior High School",
      institution: "Technical-Vocational Education",
      specialization: "Computer System Services",
      description: `Completed Junior High School with specialization in Computer System Services. 
      Introduced to the basics of computer hardware, software installation, and troubleshooting.`,
    },
  ],

  experience: [
    {
      company: "AgentGenius.ai",
      position: "AI Automation Engineer",
      duration: "August 2025 - Present",
      type: "Work Experience",
      description: `As an AI Automation Engineer, I bridge the gap between complex AI technology and practical business needs. I design, develop, and maintain full-stack applications using React and Supabase, while powering the backend logic with intelligent n8n automation workflows. Beyond writing code, I work directly with our clients—acting as their technical partner to gather requirements, communicate progress, and deliver custom AI solutions that streamline their operations.`,
      technologies: ["React", "Supabase", "n8n", "Zapier", "AI Models"],
    },
    {
      company: "Independent Software Engineer",
      position: "Freelance Developer",
      duration: "June 2025 - Present",
      type: "Freelancing Experience",
      description: `I offer comprehensive full-stack services for web and mobile as an independent developer, specializing in a modern stack that includes Next.js, Vite, and React Native. As the technical lead for my clients, I manage every phase of the project—from UI implementation to complex API development using Node.js and Express. By utilizing Supabase and MongoDB for robust data handling, I consistently deliver high-quality, full-stack applications that are optimized for performance and ready for real-world deployment.`,
      technologies: [
        "Next.js",
        "Vite",
        "React Native",
        "Node.js",
        "Express",
        "Supabase",
        "MongoDB",
      ],
    },
    {
      company: "IntelliSeven Technology Solutions Inc.",
      position: "Frontend Developer",
      duration: "March - June 2025",
      type: "Internship",
      description: `During my internship, I contributed to the front-end development of a new tablet-based Point of Sale (POS) application built from scratch. Using React Native, Expo, and Redux, I helped implement the user interface from existing designs and managed state and API integrations. I collaborated closely with the design and backend teams to build a solid foundation for the app's future release.`,
      technologies: [
        "React Native",
        "Redux",
        "TypeScript",
        "Expo",
        "API Integration",
      ],
    },
  ],

  skills: {
    webDevelopment: {
      title: "Web Development",
      description: `Specialize in front-end web development, building responsive and user-friendly 
      websites using modern technologies. Focus on creating clean, interactive interfaces that provide 
      a smooth and engaging experience for users across all devices, and integrate APIs to connect the 
      front end with dynamic data and external services.`,
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    mobileDevelopment: {
      title: "Mobile Development",
      description: "Experience in building cross-platform mobile applications",
      technologies: ["React Native", "Expo", "Redux"],
    },
    aiAutomation: {
      title: "AI Automation",
      description: `I design and build automated workflows using tools like n8n and Zapier, connecting apps and AI models to streamline repetitive tasks and power intelligent pipelines.`,
      technologies: ["n8n", "Zapier", "Automated Workflows", "API Integration"],
    },
    machineLearning: {
      title: "Machine Learning",
      description: `Explore machine learning by building models that can analyze data, recognize 
      patterns, and make predictions. Work on training, testing, and improving these models to solve 
      real-world problems using tools like Python and popular ML libraries.`,
      technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "NumPy"],
    },
    llm: {
      title: "Large Language Model",
      description: `Work with large language models and use Retrieval-Augmented Generation (RAG) to 
      build more accurate and context-aware applications. By combining LLMs with external knowledge 
      sources, enable the model to retrieve relevant information and generate reliable, real-time 
      responses for tasks like question answering and conversational agents.`,
      technologies: ["LangChain", "RAG", "LLaMA 3", "ChatGroq", "Hugging Face"],
    },
    uiux: {
      title: "UI/UX Design",
      description: `Design easy-to-use and visually clean interfaces. Focus on making sure users 
      have a smooth and enjoyable experience when using a website or app.`,
      technologies: ["Figma"],
    },
  },

  projects: [
    {
      name: "AgriMarket Mobile App",
      category: "Mobile Development",
      status: "Public",
      link: "https://github.com/NIORSAYSON/agrimarket",
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "Redux Toolkit",
        "RTK Query",
        "Socket.io",
      ],
      description: `AgriMarket is a comprehensive mobile e-commerce platform designed to connect local farmers directly with consumers. Built from the ground up with React Native and Expo, the application provides a seamless marketplace experience with dedicated interfaces for three distinct user roles: Buyers, Sellers (Farmers), and Administrators. Features Real-Time Communication via Socket.io, Advanced State Management, Complete E-commerce Flows, and dedicated Seller/Admin Analytics.`,
    },
    {
      name: "Campus Information System (BUSIS)",
      category: "Full Stack Development & Mobile Development",
      status: "Public",
      link: "https://github.com/NIORSAYSON/busis",
      technologies: [
        "React Native",
        "Expo",
        "TypeScript",
        "Redux Toolkit",
        "Node.js",
        "Express.js",
        "MongoDB",
        "3D Mapping",
      ],
      description: `The Campus Information System (BUSIS) is a comprehensive full-stack mobile application designed to centralize university announcements, events, department directories, and campus navigation into a single, accessible platform. Features a React Native mobile frontend with an interactive 3D Campus Map, powered by a robust REST API using Node.js, Express.js, and MongoDB.`,
    },
    {
      name: "FadeFlow - Barbershop SaaS",
      category: "Full Stack Development & Web Development",
      status: "Public",
      link: "https://github.com/NIORSAYSON/fadeflow-saas",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "Radix UI",
        "Zod",
      ],
      description: `FadeFlow is a comprehensive Software-as-a-Service (SaaS) platform tailored for barbershops and salons, designed to streamline appointment bookings and business management. Features a seamless client booking flow and a powerful administrative dashboard for business owners, built on Next.js and securely powered by Supabase.`,
    },
    {
      name: "VibeNode",
      category: "Full Stack Development, Web Development & AI Integration",
      status: "Public",
      link: "https://vibenode.site",
      technologies: [
        "React",
        "Vite",
        "Node.js",
        "Socket.io",
        "Redis",
        "AI Integration",
      ],
      description: `VibeNode is an innovative real-time chat and matchmaking platform designed to connect users based on shared interests and "wavelengths." Handles concurrent connections, real-time messaging, and intelligent user pairing using Redis, Socket.io, and smart AI Matchmaking algorithms.`,
    },
    {
      name: "My Portfolio",
      category: "Web Development",
      status: "Public",
      link: "https://niorsayson.vercel.app/",
      technologies: [
        "React",
        "Next.js",
        "Tailwind",
        "TypeScript",
        "Framer Motion",
        "Vercel",
      ],
      description: `Fully responsive and modern portfolio web application developed from scratch 
      using React, Next.js, and TypeScript. Supports dark and light mode toggling. Deployed via Vercel.`,
    },
    {
      name: "CSPC Conversational Agent",
      category: "AI & Machine Learning",
      status: "Public",
      link: "https://huggingface.co/spaces/Nioooor/CSPC_Conversational_Agent",
      technologies: [
        "Python",
        "RAG",
        "LLaMA 3",
        "ChatGroq",
        "Langchain",
        "Hugging Face",
      ],
      description: `Thesis project - intelligent, domain-specific conversational agent designed to 
      assist users in navigating the Citizen's Charter of CSPC. Leverages Retrieval-Augmented 
      Generation (RAG) and a fine-tuned LLaMA 3 model.`,
    },
    {
      name: "Point of Sale System App",
      category: "Mobile Development",
      status: "Private",
      technologies: [
        "React Native",
        "Redux",
        "TypeScript",
        "Expo",
        "API Integration",
      ],
      description: `Mobile Point-of-Sale application developed during internship. Built with 
      React Native and TypeScript, with Redux for state management.`,
    },
    {
      name: "Notes App",
      category: "Mobile Development",
      status: "Public",
      link: "https://github.com/NIORSAYSON/notes-app",
      technologies: [
        "React Native",
        "Expo",
        "Redux Toolkit",
        "redux-persist",
        "TypeScript",
      ],
      description: `Simple and intuitive mobile notes application with secure mock login, 
      persistent sessions, and full CRUD functionality.`,
    },
    {
      name: "Task Manager App",
      category: "Web Development",
      status: "Public",
      link: "https://github.com/NIORSAYSON/task-manager-app",
      technologies: [
        "Next.js",
        "Express.js",
        "MongoDB",
        "TypeScript",
        "Tailwind CSS",
        "Radix UI",
        "Zustand",
      ],
      description: `Full-stack task management application with user authentication, task 
      organization, and both list and Kanban board views.`,
    },
    {
      name: "SIAS Online Portal Redesign",
      category: "Web Development",
      status: "Public",
      link: "https://niorsayson.github.io/SIAS-Online-Portal-Redesign/",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      description: `HCI course project - redesigned SIAS portal focusing on improved usability 
      and user experience with modern UI principles.`,
    },
    {
      name: "Synthetic Data Generator",
      category: "AI & Machine Learning",
      status: "Public",
      link: "https://synthetic-data-generator-sayson.streamlit.app/",
      technologies: [
        "Python",
        "Streamlit",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
      ],
      description: `Tool for generating synthetic datasets with customizable parameters, 
      includes model training module and simulation features.`,
    },
    {
      name: "Cryptographic Application",
      category: "Security & Cryptography",
      status: "Public",
      link: "https://saysonnior-cs3b.streamlit.app/",
      technologies: ["Python", "Streamlit", "pycrypto", "hashlib"],
      description: `Educational platform demonstrating cryptographic techniques including 
      symmetric/asymmetric encryption and hashing functions.`,
    },
  ],

  faqs: [
    {
      question: "What is Nestor's educational background?",
      answer:
        "Nestor graduated with a Bachelor of Science in Computer Science from Camarines Sur Polytechnic Colleges (CSPC).",
    },
    {
      question: "What technologies does Nestor know?",
      answer: `Nestor is proficient in web development (React, Next.js, TypeScript, Tailwind CSS), 
      mobile development (React Native, Expo), machine learning (Python, Scikit-learn, TensorFlow), 
      and AI Automation using n8n and Zapier. He also has strong experience with LLMs and RAG using LangChain and Groq.`,
    },
    {
      question: "What kind of projects has Nestor worked on?",
      answer: `Nestor has worked on a diverse array of projects including comprehensive SaaS platforms (FadeFlow), full-stack campus management systems with 3D mapping (BUSIS), mobile e-commerce platforms (AgriMarket), real-time AI matchmaking chat apps (VibeNode), conversational AI agents using RAG, and various other full-stack systems.`,
    },
    {
      question: "Does Nestor have work experience?",
      answer: `Yes, Nestor currently works as an AI Automation Engineer at AgentGenius.ai and operates as a Freelance Full-Stack Developer. Previously, he completed a frontend developer internship at IntelliSeven Technology Solutions Inc., where he developed a tablet-based Point of Sale mobile application.`,
    },
    {
      question: "Is Nior currently available for freelance work?",
      answer:
        "Yes, Nior is actively open to new freelance projects and opportunities. You can reach out to him via email at nessayson@gmail.com to discuss your project.",
    },
    {
      question: "What is Nior's preferred tech stack?",
      answer:
        "For web, Nior prefers Next.js, React, Tailwind CSS, and Node.js/Express. For mobile, he uses React Native with Expo. For databases, he relies on Supabase, PostgreSQL, and MongoDB. He also uses Python for AI and machine learning tasks.",
    },
    {
      question: "What timezone does Nior work in?",
      answer:
        "Nior is based in the Philippines (PST/GMT+8), but he is highly adaptable and experienced in working asynchronously with clients across different timezones.",
    },
    {
      question: "How does Nior approach a new project?",
      answer:
        "Nior acts as a technical partner. He starts by understanding the core business requirements, designs a scalable architecture (database schema, UI/UX flow), and develops the solution iteratively while maintaining clear communication with the client.",
    },
  ],
};

// Helper function to convert knowledge base to document chunks for embedding
export function prepareDocumentsForEmbedding() {
  const documents = [];

  // Personal info
  documents.push({
    content: `Name: ${knowledgeBase.personal.name} (Nickname: ${knowledgeBase.personal.nickname})
Title: ${knowledgeBase.personal.title}
Email: ${knowledgeBase.personal.email}
About: ${knowledgeBase.personal.about}`,
    metadata: { type: "personal" },
  });

  // Social Links
  if (knowledgeBase.personal.socials) {
    documents.push({
      content: `Nior's Social Media and Contact Links:
Facebook: ${knowledgeBase.personal.socials.facebook}
Instagram: ${knowledgeBase.personal.socials.instagram}
Gmail: ${knowledgeBase.personal.socials.gmail}
LinkedIn: ${knowledgeBase.personal.socials.linkedin}
GitHub: ${knowledgeBase.personal.socials.github}`,
      metadata: { type: "personal_links" },
    });
  }

  // Services
  if (knowledgeBase.services) {
    knowledgeBase.services.forEach((service) => {
      documents.push({
        content: `Service Offered - ${service.title}\nDescription: ${service.description}`,
        metadata: { type: "service" },
      });
    });
  }

  // Education
  knowledgeBase.education.forEach((edu) => {
    documents.push({
      content: `Education - ${edu.level}
Institution: ${edu.institution}
${edu.degree ? `Degree: ${edu.degree}` : ""}
Description: ${edu.description}`,
      metadata: { type: "education", level: edu.level },
    });
  });

  // Experience
  knowledgeBase.experience.forEach((exp) => {
    documents.push({
      content: `Work Experience - ${exp.position}
Company: ${exp.company}
Duration: ${exp.duration}
Description: ${exp.description}
Technologies: ${exp.technologies.join(", ")}`,
      metadata: { type: "experience", company: exp.company },
    });
  });

  // Skills
  Object.entries(knowledgeBase.skills).forEach(([key, skill]) => {
    documents.push({
      content: `Skill - ${skill.title}
Description: ${skill.description}
Technologies: ${skill.technologies.join(", ")}`,
      metadata: { type: "skill", category: key },
    });
  });

  // Projects
  knowledgeBase.projects.forEach((project) => {
    documents.push({
      content: `Project - ${project.name}
Category: ${project.category}
Technologies: ${project.technologies.join(", ")}
Description: ${project.description}
${project.link ? `Link: ${project.link}` : ""}`,
      metadata: { type: "project", category: project.category },
    });
  });

  // FAQs
  knowledgeBase.faqs.forEach((faq) => {
    documents.push({
      content: `Q: ${faq.question}
A: ${faq.answer}`,
      metadata: { type: "faq" },
    });
  });

  return documents;
}
