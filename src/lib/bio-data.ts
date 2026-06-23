export interface HeroContent {
  [key: string]: {
    title: string
    description: string
  }
}

export interface AboutContent {
  [key: string]: string[];
}

export interface Education {
  degree: string
  school: string
  location: string
  period: string
  description: string
  focus?: string
  highlights?: string[]
}

export interface SkillCategory {
  label: string
  skills: string[]
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  description: string
  tags: string[]
}

export interface Certificate {
  title: string
  issuer: string
  date: string
  credentialUrl: string
  modes: string[]
}

export const HeroContent: HeroContent = {
  generalist: {
    title: "Engineer",
    description: "Developing intelligent systems, predictive models, and optimizing neural networks for real-world applications."
  },
  fullstack: {
    title: "Full Stack Developer",
    description: "Architecting robust full-stack applications and high-performance APIs from frontend to database."
  },
  "ai-ml": {
    title: "Machine Learning Engineer",
    description: "Developing intelligent systems, predictive models, and optimizing neural networks for real-world applications."
  },
  data: {
    title: "Data Engineer",
    description: "Engineering distributed data pipelines, enterprise web scrapers, and processing millions of records with 99.9% uptime."
  }
}

export const aboutContent: AboutContent = {
  generalist: [
    "I am an AI/ML Engineer dedicated to building intelligent systems that bridge the gap between cutting-edge research and production-ready deployment. I focus on NLP, LLM fine-tuning, and RAG pipelines — engineering solutions that are optimized, scalable, and solve real-world problems.",
    "With hands-on experience across the full ML lifecycle, I design end-to-end systems — from fine-tuning Mistral 7B with LoRA and QLoRA to deploying low-latency FastAPI inference APIs backed by FAISS vector databases. I've reduced NLP inference latency by 40% and improved model accuracy by 25% in production environments.",
    "I thrive at the intersection of research and engineering — whether it's implementing parameter-efficient fine-tuning with PEFT, building semantic search pipelines, or optimizing batch inference at scale. I'm not waiting to graduate to build real AI — I'm already doing it."
  ],
  fullstack: [
    "As a Full Stack Developer, I specialize in building robust enterprise applications using the .NET ecosystem, React, and Next.js. I focus on creating modular architectures that allow for rapid scaling and easy maintenance in high-stakes, data-intensive business environments.",
    "Experienced in leading the development of complex systems, integrating JWT-based authentication, real-time synchronization via Azure ServiceBus, and high-integrity data pipelines. My engineering philosophy emphasizes clean code, unit testing, and system reliability.",
    "I prioritize seamless user experiences and have a proven track record of improving application performance by up to 20% through proactive debugging and optimization. I leverage modern CI/CD pipelines and Azure DevOps to ensure deployment is stable and production-ready."
  ],
  "ai-ml": [
    "Focusing on the intersection of deep learning and software engineering, I leverage my Master's research in Neural Networks to move advanced AI models into production. I link abstract mathematical ideas with practical, scalable code for real-world applications.",
    "I specialize in developing custom CNN architectures—achieving 96% accuracy for specialized tasks like disease detection—and fine-tuning Large Language Models (LLMs) for domain-specific needs. I focus on making AI accessible and useful for specialized industry requirements.",
    "Proficient in PyTorch, TensorFlow, and LangChain to build intelligent features while ensuring optimization for resource-constrained environments. My academic background allows me to reduce the computational cost of intelligence while maintaining output quality."
  ],
  data: [
    "I am a Data Engineer focused on the design and implementation of distributed web scrapers and high-throughput ETL pipelines capable of processing millions of enterprise records. I specialize in transforming raw, unstructured information into clean and actionable data assets.",
    "I specialize in reverse-engineering complex APIs and bypassing sophisticated anti-scraping measures to ensure 99.9% data integrity and uptime. My systems are designed to be resilient, utilizing parallel processing with MPI to handle massive data extraction tasks efficiently.",
    "Using serverless architectures like AWS Lambda, I build infrastructures that maximize throughput while minimizing cloud costs. I have successfully delivered high-precision datasets to international clients, ensuring deduplication and formatting are handled with precision."
  ]
};

export const education: Education[] = [
  {
    degree: "Bachelor of Technology in Artificial Intelligence & Machine Learning",
    school: "SHRI RAM GROUP OF COLLEGE",
    location: "Banmore, MP, India",
    period: "Pursuing",
    focus: "Specialization in AI, ML, NLP & Deep Learning",
    description: "Actively building production-grade ML systems alongside academics — including fine-tuned LLMs, RAG pipelines, and FastAPI deployments.",
    highlights: [],
  },
  {
    degree: "ChatGPT Prompt Engineering for Developers",
    school: "DEEPLEARNING.AI",
    location: "Online",
    period: "2024",
    focus: "Certification — LLM Applications & Prompt Design",
    description: "Learned to build LLM-powered apps using best practices in prompt chaining, output parsing, and iterative refinement.",
    highlights: [],
  },
]

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages & Databases",
    skills: ["Python", "SQL", "PostgreSQL", "Vector Databases", "FAISS"],
  },
  {
    label: "Machine Learning",
    skills: ["Scikit-learn", "XGBoost", "Random Forest", "Feature Engineering", "Hyperparameter Tuning", "Cross Validation", "EDA"],
  },
  {
    label: "Deep Learning & NLP",
    skills: ["PyTorch", "TensorFlow", "Keras", "CNN", "RNN", "LSTM", "Transformers", "Attention Mechanism", "Transfer Learning"],
  },
  {
    label: "LLM & GenAI",
    skills: ["Hugging Face", "RAG Pipelines", "Semantic Search", "Embeddings", "Prompt Engineering", "LoRA", "QLoRA", "PEFT", "Quantization", "RLHF", "LangChain", "CrewAI"],
  },
  {
    label: "MLOps & Backend",
    skills: ["FastAPI", "RESTful APIs", "Model Inference APIs", "Streamlit", "Docker", "Batch Inference", "Latency Optimization", "Model Versioning"],
  },
  {
    label: "Data & Cloud",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "AWS EC2", "AWS S3", "Git", "Linux"],
  },
]

export const experiences: Experience[] = [
  {
    role: "AI/ML Engineer",
    company: "STEVE'S AI LAB",
    location: "Indore, MP, India",
    period: "Apr 2026 - Present",
    description:
      "Built a GeoSpatial AI Platform integrating Google Maps API, OpenStreetMap, and 5+ REST APIs using a LangChain RAG pipeline with ChromaDB vector store for real-time location-aware query resolution. Engineered a multi-step retrieval orchestration agent using LangGraph, reducing LLM hallucination on geo-specific queries by 40%. Containerized the inference stack with Docker, deployed on AWS EC2 with 99.2% production uptime, and monitored performance with Weights & Biases. Performed LLM fine-tuning using LoRA/QLoRA with Hugging Face PEFT and GGUF/GPTQ quantization.",
    tags: ["LangChain", "LangGraph", "RAG", "ChromaDB", "Docker", "AWS EC2", "LoRA", "QLoRA", "PEFT", "Google Maps API", "W&B"],
  },
  {
    role: "Data Science Intern",
    company: "TECHIESHUBHDEEP IT SOLUTIONS PVT. LTD.",
    location: "Gwalior, MP, India",
    period: "Apr 2025 - Jan 2026",
    description:
      "Architected and deployed scalable AI APIs using FastAPI, implementing asynchronous processing to reduce model inference latency by 40%. Built end-to-end ML pipelines using Python, Scikit-learn, and XGBoost for classification tasks, improving model performance by 25% through feature engineering and hyperparameter tuning. Designed CNN and RNN architectures for sentiment analysis and NLP text classification in production environments.",
    tags: ["Python", "FastAPI", "Scikit-learn", "XGBoost", "CNN", "RNN", "MLOps", "NLP", "Docker", "NumPy"],
  },
  {
    role: "Data Science Trainee",
    company: "ALMABETTER",
    location: "Remote",
    period: "Oct 2024 - Mar 2025",
    description:
      "Simulated high-level consulting workflows, delivering data-driven insights and forensic technology solutions for complex real-world business scenarios. Worked extensively on exploratory data analysis, statistical modeling, and deriving actionable insights from large datasets. Developed strong foundations in data analysis pipelines, visualization, and applied machine learning through intensive project-based apprenticeship training.",
    tags: ["Python", "Data Analysis", "Forensic Technology", "EDA", "Pandas", "Matplotlib", "Scikit-learn"],
  },
]

export const certificates: Certificate[] = [
  {
    title: "ChatGPT Prompt Engineering for Developers",
    issuer: "DeepLearning.AI",
    date: "Jul 2025",
    credentialUrl: "",
    modes: ["ai-ml"],
  },
  {
    title: "Tata Group - Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Forage",
    date: "Mar 2025",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_hkh2cdkQbqzCps4TL_1743081046036_completion_certificate.pdf",
    modes: ["data", "ai-ml"],
  },
  {
    title: "Deloitte Australia - Data Analytics Job Simulation",
    issuer: "Forage",
    date: "Mar 2025",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_hkh2cdkQbqzCps4TL_1743080213504_completion_certificate.pdf",
    modes: ["data", "ai-ml"],
  },
  {
    title: "Cisco Verified Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    date: "Mar 2025",
    credentialUrl: "",
    modes: ["data", "ai-ml"],
  },
]