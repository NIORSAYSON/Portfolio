// Knowledge Base Template for Chatbot
// This data will be used to create embeddings and store in Supabase vector database

export const knowledgeBase = {
  personal: {
    name: "Nestor B. Sayson Jr.",
    title: "Software Developer",
    location: "Philippines",
    email: "Contact via portfolio",
    about: `Software Developer with experience in building web and mobile applications, 
    combining strong programming skills with a focus on intelligent, user-centered design. 
    Research-oriented with a background in machine learning and Retrieval-Augmented Generation (RAG), 
    and driven to create scalable, AI-powered solutions through collaboration and innovation.`,
  },

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
      company: "IntelliSeven Technology Solutions Inc.",
      position: "Frontend Developer Intern",
      duration: "3 months",
      type: "Internship",
      description: `Developed a tablet-based Point of Sale (POS) mobile application from scratch to 
      support efficient retail operations. Designed and implemented a responsive, user-friendly interface 
      and handled API integration to connect with backend services. Collaborated closely with the backend 
      developer and UI/UX designer to align design, functionality, and data flow.`,
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

  // Additional context for common questions
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
      and has experience with LLMs and RAG using LangChain and Groq.`,
    },
    {
      question: "What kind of projects has Nestor worked on?",
      answer: `Nestor has worked on various projects including a personal portfolio website, 
      a conversational AI agent using RAG, mobile POS system, task management apps, and data 
      generation tools.`,
    },
    {
      question: "Does Nestor have work experience?",
      answer: `Yes, Nestor completed a 3-month internship at IntelliSeven Technology Solutions Inc. 
      as a Frontend Developer, where he developed a Point of Sale mobile application.`,
    },
  ],
};

// Helper function to convert knowledge base to document chunks for embedding
export function prepareDocumentsForEmbedding() {
  const documents = [];

  // Personal info
  documents.push({
    content: `Name: ${knowledgeBase.personal.name}
Title: ${knowledgeBase.personal.title}
About: ${knowledgeBase.personal.about}`,
    metadata: { type: "personal" },
  });

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
