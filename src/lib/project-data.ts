// NOTE FOR PROJECT-DATA.TS: ALL BRIEF CONTENT SHOULD BE SIMILAR IN LENGTH TO MAINTAIN CONSISTENCY IN THE UI.

export interface Project {
	title: string;
	brief: string;
	description: string[];
	tags: string[];
	github?: string;
	live?: string;
	images?: string[];
	banner?: string;
	video?: string;
	mode: string[];
}

export const projects: Project[] = [
	{
		title: "RAG Document Search System",
		brief: "Built a production-grade Retrieval-Augmented Generation system for semantic document search and question answering. Implemented FastAPI-based services for document ingestion and embedding generation using FAISS vector databases. Improved retrieval accuracy through smart chunking strategies and cosine similarity-based ranking with BAAI/bge embeddings.",
		description: [
			"This project implements a full production-grade RAG pipeline designed for semantic document search and intelligent question answering. The system ingests raw documents, splits them into optimally-sized chunks, generates dense vector embeddings using BAAI/bge models via HuggingFace, and stores them in a FAISS vector database for fast approximate nearest-neighbor retrieval.",
			"The backend is built on FastAPI with asynchronous endpoints for document ingestion and query processing. Retrieval accuracy was improved through smart chunking strategies — balancing chunk size and overlap to preserve context — combined with cosine similarity-based ranking to surface the most semantically relevant passages.",
			"The system demonstrates end-to-end RAG architecture: from document preprocessing and embedding generation to retrieval, context injection, and LLM-powered answer synthesis. This project reflects real-world production considerations including latency optimization, modular pipeline design, and scalable vector storage.",
		],
		tags: ["Python", "LangChain", "FastAPI", "FAISS", "HuggingFace", "Vector DB", "RAG", "NLP", "Embeddings"],
		github: "https://github.com/Krishnanivja12/rag-document-search",
		live: "",
		mode: ["ai-ml"],
	},
	{
		title: "Fitness Mistral 7B — LLM Fine-Tuning",
		brief: "Fine-tuned the Mistral 7B Instruct model for the fitness domain using LoRA-based PEFT techniques and 4-bit quantization (QLoRA). Optimized training efficiency through parameter-efficient fine-tuning, reducing GPU memory usage while maintaining model quality. Deployed a domain-specific LLM capable of generating accurate, context-aware fitness guidance with BERTScore of 0.89.",
		description: [
			"This project fine-tunes the Mistral 7B Instruct model specifically for the fitness domain using parameter-efficient fine-tuning (PEFT) with LoRA adapters and 4-bit QLoRA quantization. The goal was to adapt a general-purpose LLM into a domain expert capable of generating accurate, context-aware fitness and nutrition guidance.",
			"Training was optimized using the HuggingFace PEFT library with LoRA rank configuration to minimize trainable parameters while preserving model expressiveness. 4-bit quantization via bitsandbytes significantly reduced GPU memory requirements, making fine-tuning feasible on consumer-grade hardware without sacrificing output quality.",
			"The fine-tuned model was evaluated using BERTScore, achieving a score of 0.89, demonstrating strong semantic alignment with reference fitness guidance. This project showcases the full LLM fine-tuning lifecycle — dataset preparation, PEFT configuration, training, evaluation, and deployment-ready model export.",
		],
		tags: ["Python", "Mistral 7B", "LoRA", "QLoRA", "PEFT", "Quantization", "HuggingFace", "PyTorch", "LLM"],
		github: "https://github.com/Krishnanivja12/fitness-mistral-7b",
		live: "",
		mode: ["ai-ml"],
	},
	{
		title: "Resume Analyzer",
		brief: "Developed an NLP-based resume screening system that intelligently matches candidates to job descriptions using skill extraction and feature engineering pipelines. Generates match scores and actionable recommendations to reduce manual screening effort. Built with a Streamlit frontend and Flask backend backed by SQLite for persistent candidate tracking.",
		description: [
			"The Resume Analyzer is an NLP-powered screening tool that automates the process of matching candidate resumes to job descriptions. The system extracts skills, experience, and qualifications from raw resume text using NLP pipelines built with Scikit-learn and custom feature engineering, then computes a semantic match score against the target job description.",
			"The backend is built with Flask and uses SQLite for persistent candidate tracking across sessions. The Streamlit frontend provides an intuitive interface for uploading resumes, viewing match scores, and receiving actionable recommendations on skill gaps — reducing manual HR screening effort significantly.",
			"This project demonstrates applied NLP in a real-world HR automation context, combining text preprocessing, TF-IDF vectorization, cosine similarity scoring, and structured data persistence into a cohesive end-to-end application.",
		],
		tags: ["Python", "NLP", "Scikit-learn", "Streamlit", "Flask", "SQLite", "Feature Engineering", "Pandas"],
		github: "https://github.com/Krishnanivja12/resume-analyzer",
		live: "",
		mode: ["ai-ml"],
	},
	{
		title: "LinkedIn Post Generator",
		brief: "Built an AI-powered LinkedIn post generation tool that creates professional, engagement-optimized posts using LLM prompting and LangChain pipelines. Supports multiple post tones — professional, storytelling, and technical — with customizable hooks, hashtags, and call-to-actions. Deployed as a Streamlit web app with real-time generation and one-click copy functionality.",
		description: [
			"This tool leverages LangChain prompt pipelines and LLM APIs to generate professional, engagement-optimized LinkedIn posts on demand. Users can select from multiple tones — professional, storytelling, or technical — and customize hooks, hashtags, and call-to-actions to match their personal brand.",
			"The generation pipeline uses structured prompt chaining to ensure consistent output quality: a topic extraction step feeds into a tone-aware content generation step, followed by a formatting pass that applies LinkedIn-specific best practices for readability and engagement.",
			"Deployed as a Streamlit web app with real-time streaming generation and one-click copy functionality, the tool makes AI-assisted content creation accessible without any technical setup. This project demonstrates practical LLM application development with LangChain, prompt engineering, and rapid Streamlit deployment.",
		],
		tags: ["Python", "LangChain", "LLM", "Prompt Engineering", "Streamlit", "CrewAI", "GenAI", "FastAPI"],
		github: "https://github.com/Krishnanivja12/Linkdin-Post-Genrator",
		live: "",
		mode: ["ai-ml"],
	},
	{
		title: "ResearchFlow AI — Multi-Agent Research Assistant",
		brief: "Built ResearchMind, a multi-agent AI research assistant that transforms any topic into a polished, fact-checked report in minutes. Orchestrates six specialized AI agents — Search, Reader, Writer, Critic, Fact Checker, and Summarizer — powered by free Groq Cloud LLMs. Features a dark-themed Streamlit interface with real-time step execution and downloadable Markdown reports.",
		description: [
			"ResearchMind is an open-source multi-agent research assistant that automates the entire research workflow. The system orchestrates six specialized AI agents — a Search Agent that queries the web and returns structured JSON sources, a Reader Agent that scrapes full content from the top-ranked pages, and a Writer Agent that generates a structured Markdown report with Introduction, Key Findings, Analysis, and Conclusions.",
			"The pipeline includes a Critic Agent that evaluates the draft for accuracy, completeness, and clarity (scoring 1-10), a Fact Checker Agent that cross-references every claim against original sources (marking each as Verified, False, or Unverifiable), and a Summarizer Agent that condenses the report into a crisp executive summary. All agents run on free Groq Cloud models (Llama 3.2, Llama 3.1, Mixtral), making the system entirely cost-free and lightning-fast.",
			"The modern dark-themed Streamlit interface lets users watch each step execute in real-time (step-by-step mode) or run the entire pipeline at once (fast mode). The complete data flow between agents is visualized, and users can download the final report as a Markdown file. This project demonstrates production-grade multi-agent orchestration, structured prompt chaining, and real-world LLM application deployment.",
		],
		tags: ["Python", "LangChain", "Groq", "Streamlit", "Multi-Agent", "LLM", "Web Scraping", "GenAI", "Fact-Checking", "Markdown"],
		github: "https://github.com/Krishnanivja12/ResearchFlow-Ai",
		live: "",
		mode: ["ai-ml"],
	},
	{
		title: "Personalized Voice Assistant",
		brief: "Developed an AI-powered voice assistant that responds to natural language voice commands, performs tasks, and provides relevant information. Integrates speech recognition and NLP to understand user intent, execute actions like web searches and information retrieval, and deliver hands-free assistance through natural conversation.",
		description: [
			"This project implements a personalized voice-controlled AI assistant designed to respond to natural language voice commands and perform a variety of tasks. The system captures audio input through speech recognition, processes it through NLP pipelines to understand user intent, and executes appropriate actions — from web searches and information retrieval to task automation and query answering.",
			"The architecture combines speech-to-text conversion, intent classification, and response generation into a seamless pipeline. The assistant can handle multi-turn conversations, maintain context across interactions, and adapt its responses based on user preferences. Custom wake-word detection and noise filtering ensure reliable performance in real-world environments.",
			"This project demonstrates end-to-end voice AI system design — from audio capture and speech recognition to intent parsing, action execution, and natural language response generation. It showcases practical applications of conversational AI, voice user interfaces, and hands-free human-computer interaction.",
		],
		tags: ["Python", "Speech Recognition", "NLP", "Voice Commands", "AI Assistant", "Intent Classification", "Audio Processing", "Conversational AI"],
		github: "https://github.com/Krishnanivja12/Personalized-Voice-Assistant",
		live: "",
		mode: ["ai-ml"],
	},
	{
		title: "LeetCode & Chill — DSA Practice Repository",
		brief: "A comprehensive data structures and algorithms practice repository documenting daily LeetCode problem-solving across Easy, Medium, and Hard difficulties. Contains clean, well-commented Python solutions with detailed approach explanations, time/space complexity analysis, and a consistent 6-step problem-solving framework.",
		description: [
			"LeetCode & Chill is a personal DSA (Data Structures & Algorithms) grind journal that documents daily problem-solving practice across all difficulty levels. The repository contains clean, well-commented Python solutions organized into Easy, Medium, and Hard directories, with each file named after the problem slug for easy lookup. Every solution includes a comment block explaining the approach, time complexity, and space complexity.",
			"The problem-solving methodology follows a consistent 6-step framework: Understand the problem and constraints, trace through examples by hand, develop a brute-force solution, identify bottlenecks and optimize, write clean code with edge case handling, and document time/space complexity. This structured approach builds pattern recognition skills essential for technical interviews at AI-first companies.",
			"Topics covered include Arrays, Two Pointers, Sorting, Dynamic Programming, Graph Traversal, and more — with a consistent weekly schedule: Medium problems on weekdays, Easy warm-ups paired with Hard revisits on Tuesdays and Thursdays, and weekend topic deep-dives or contest participation. This repository reflects the philosophy that strong engineers master both the ML layer and the fundamentals underneath it.",
		],
		tags: ["Python", "Data Structures", "Algorithms", "LeetCode", "DSA", "Problem Solving", "Competitive Programming", "Interview Prep"],
		github: "https://github.com/Krishnanivja12/LeetCode-and-Chill",
		live: "",
		mode: ["generalist"],
	},
];
