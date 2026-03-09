export interface Project {
	title: string;
	brief: string;
	description: string[];
	tags: string[];
	github?: string;
	live?: string;
	images?: string[];
	video?: string;
	mode: string[];
}

export const projects: Project[] = [
	{
		title: "Aerospace Part Tracking System",
		brief: "Developed a high-stakes aerospace tracking system using .NET Core and React. I integrated JWT-based authentication for secure access and implemented automated CI/CD pipelines via Azure DevOps. The platform leverages Azure ServiceBus for real-time messaging, ensuring immutable audit trails and supply chain transparency across large-scale international enterprise operations.",
		description: [
			"During my tenure as a Full-Stack Developer at DEXOC, I contributed to this high-scale enterprise project designed for the rigorous demands of the aerospace industry. I worked within a large, diverse team of more than 30 international developers, collaborating closely with global clients to deliver a robust tracking solution. Our workflow was defined by strict Agile methodologies, including regular Scrum meetings and sprint planning, which provided deep experience in managing complex, multi-national project requirements and large-scale codebases",
			"The technical foundation of the system is built on a .NET Core backend and a responsive React frontend, utilizing PostgreSQL for reliable data persistence. To manage secure access across various user roles, I implemented JWT-based authentication, ensuring sensitive aerospace data remained protected while facilitating seamless integration with enterprise security protocols. The system was engineered to monitor the complete lifecycle of critical components, where the objective was to replace fragmented tracking methods with a unified platform capable of handling zero-tolerance industry standards.",
			"As a key contributor to the core development team, I focused on building scalable and secure features that enabled seamless aviation part transactions. My responsibilities extended to participating in backend architectural discussions and developing the critical middleware used for real-time data synchronization between stakeholders. By leveraging Azure ServiceBus, I engineered the messaging logic that connected various parts of the enterprise ecosystem, ensuring high performance even under heavy loads. I also took a collaborative leadership role, working alongside junior developers to maintain coding standards and resolve complex technical hurdles.",
			"The final platform represents a significant leap forward in post-pandemic industry collaboration, providing a secure, blockchain-verified environment for high-value asset management. My involvement in configuring automated CI/CD pipelines via Azure DevOps ensured that these complex features could be deployed reliably and efficiently.",
		],
		tags: [
			"C#",
			".NET Core",
			"React",
			"PostgreSQL",
			"JWT",
			"Azure DevOps",
			"Azure ServiceBus",
			"CI/CD",
			"Blockchain",
		],
		live: "https://www.skythread.aero/solution/overview",
		mode: ["fullstack"],
	},
	{
		title: "Web Scraping Automation for Business Registries",
		brief: "Developed 15+ advanced Python scraping scripts to extract millions of business registry records across international markets. I personally managed client communication and engineered solutions to bypass complex anti-scraping defenses for dynamic websites. The system processed up to five million data points in multiple languages, ensuring high integrity through custom post-processing automation.",
		description: [
			"During my tenure at DEXOC, I personally spearheaded this large-scale data extraction project, managing direct, one-on-one communication with international clients to define requirements and delivery milestones. The primary objective was to harvest comprehensive business registry data from various high-security, dynamic websites across different geographical regions. Handling the project from conception to final delivery, I acted as both the lead engineer and the primary technical consultant for the client, ensuring the data met strict enterprise standards.",
			"The project involved the development of over 15 specialized Python scripts, each tailored to the unique architectural defenses and navigational structures of different target registries. We extracted massive datasets ranging from 50,000 to over five million records per site. A significant technical challenge was the multi-lingual nature of the source material, which included English, Arabic, and other regional languages. I developed custom automation scripts to handle specialized character encoding, right-to-left (RTL) text parsing, and data cleaning, ensuring that the final output was standardized and searchable regardless of the original language.",
			"To maintain high uptime against sophisticated anti-scraping mechanisms, I implemented advanced detection-evasion techniques. Since the target sites featured dynamic JavaScript-heavy content and strict request throttling, some scripts were engineered to run autonomously for weeks at a time with built-in resilience. I utilized a combination of rotating residential proxies, user-agent randomization, and headless browser orchestration to mimic human behavior. Post-extraction, the raw data underwent a rigorous automated processing layer to validate integrity and deduplicate entries before being delivered as structured business intelligence.",
		],
		tags: [
			"Python",
			"BeautifulSoup",
			"Selenium",
			"Scrapy",
			"Multi-lingual Data",
			"Automation",
			"Anti-Scraping",
		],
		images: ["/projects/webscraping_1.png"],
		github: "https://github.com/Viraj-Mavani/web-scraping-automation",
		live: "https://www.upwork.com/freelancers/~0100fa5d569b04d18d?p=1927504018187304960",
		mode: ["data", "webscraping"],
	},
	{
		title: "Distributed Web Scraper using MPI",
		brief: "Engineered a distributed web scraper using Python and MPI to harvest GitHub Trending data across multiple nodes. The system utilizes CloudScraper to bypass advanced anti-scraping measures while maintaining 99.9% data integrity through automated deduplication. Developed as part of my Western University coursework, it significantly optimizes large-scale data extraction throughput.",
		description: [
			'This project was developed as a core component of my "Parallel and Distributed Computing" course during my Master’s at Western University. The primary objective was to overcome the inherent performance bottlenecks of sequential web scraping when dealing with massive datasets. By transitioning from a serial execution model to a distributed architecture, the system is capable of processing thousands of URLs simultaneously across multiple computational nodes, demonstrating a significant reduction in total execution time.',
			"The technical architecture is built on a Master-Worker model using Python and the mpi4py library. The Master process acts as a centralized scheduler, dynamically dispatching target URLs from a generated pool to available Worker nodes. Each Worker is responsible for fetching the raw HTML, parsing relevant data points using BeautifulSoup4, and reporting metrics back to the Master. To ensure reliability against modern web security, I integrated CloudScraper to successfully bypass Cloudflare’s UAM (Under Attack Mode) and other sophisticated anti-bot challenges that typically block standard request libraries.",
			"One of the most robust aspects of the project is its resilience and modularity. I implemented a comprehensive checkpointing system that saves progress to a JSON file, allowing the scraper to resume from the last successful state in the event of a network or system failure. The project also features a post-scrape processing layer that automatically handles data deduplication and sorting, ensuring the final CSV output is clean and structured. Performance is tracked through a custom metrics engine that generates detailed reports on successes, failures, and processing speeds, providing clear insights into the efficiency gains achieved through parallelization.",
		],
		tags: [
			"Python",
			"MPI",
			"mpi4py",
			"BeautifulSoup4",
			"CloudScraper",
			"Distributed Computing",
			"Parallel Programming",
			"Data Engineering",
		],
		github: "https://github.com/Viraj-Mavani/DistributedWebScraper",
		mode: ["ai-ml", "data", "webscraping"],
	},
	{
		title: "Tomato Leaf Disease Detection",
		brief: "Developed an AI-powered agricultural diagnostic tool using Convolutional Neural Networks to detect 10 distinct tomato leaf diseases. The system achieves 96.3% accuracy using a custom architecture optimized for resource-constrained devices. It also benchmarks performance against a fine-tuned ResNet50 model, offering a scalable solution for real-time crop health monitoring and sustainable farming.",
		description: [
			"This project addresses a critical challenge in modern agriculture: the early and accurate detection of plant diseases to prevent crop loss. As part of my Master’s Machine Learning coursework , I designed and implemented a deep learning solution capable of classifying tomato leaf health into 10 distinct categories (including Bacterial Spot, Early Blight, and Mosaic Virus) with high precision. The goal was to create a model that balances high accuracy with computational efficiency, making it suitable for deployment on edge devices used in field settings.",
			"The technical core of the system involves two distinct architectures. First, I engineered a custom Convolutional Neural Network (CNN) from scratch, meticulously tuning layers to extract spatial features while minimizing parameter count. To validate its performance, I implemented Transfer Learning using the ResNet50 architecture, fine-tuning its pre-trained weights for this specific domain. The models were trained on a dataset of over 10,000 images, utilizing advanced data augmentation techniques—such as rotation, zooming, and horizontal flipping—to prevent overfitting and ensure the model generalizes well to real-world conditions.",
			"The system achieved a test accuracy of 96.3%, with rigorous evaluation using precision, recall, F1-score, and ROC-AUC curves to ensure reliability across all disease classes. Beyond just training, I utilized libraries like Matplotlib and Seaborn to visualize training history and confusion matrices, providing deep insights into the model's decision-making process. This project demonstrates the practical application of computer vision in solving real-world biological problems, offering a scalable, automated alternative to manual crop inspection.",
		],
		tags: [
			"Python",
			"TensorFlow",
			"Keras",
			"ResNet50",
			"CNN",
			"Computer Vision",
			"Data Augmentation",
			"Scikit-learn",
			"Matplotlib",
		],
		github: "https://github.com/Viraj-Mavani/smart_agriculture_system",
		mode: ["ai-ml"],
	},
	{
		title: "ML-Powered Taxi Fare Prediction",
		brief: "Engineered an advanced taxi fare prediction system using the New York City dataset as part of my Master’s AI coursework. I benchmarked various models, selecting LightGBM for its superior performance, achieving an 83.9% R² score. The project utilized Docker to automate travel distance and time extraction from complex map data.",
		description: [
			"Developed during my Advanced Artificial Intelligence course at Western University, this project focuses on solving the complex problem of price estimation in the ride-sharing industry. Using the New York City Taxi Fare Dataset, I built a predictive model that estimates fares based on trip attributes like distance, location, and temporal factors. The project involved a full data science lifecycle, from raw data ingestion to deploying automated pipelines for feature extraction.",
			"The project began with extensive data cleaning and exploratory data analysis (EDA). I utilized heatmaps to visualize spatial correlations and identified key features that significantly impact pricing. A major technical highlight was the integration of Docker to containerize the extraction of travel distance and time from OpenStreetMap data (.osm.pbf files). This allowed the system to programmatically process map images and calculate real-world routing metrics, which were then used as high-fidelity inputs for the machine learning models.",
			"I performed a rigorous benchmarking process across multiple algorithms, including Linear Regression, 2nd and 3rd-order Polynomial Regression, and gradient-boosted trees like XGBoost and LightGBM. Through hyperparameter tuning, LightGBM was identified as the best-performing model, achieving a Root Mean Squared Error (RMSE) of 0.02279 and an R² of 83.9%. This project demonstrates my ability to merge traditional software engineering tools like Docker with advanced statistical modeling to create accurate, production-ready AI solutions.",
		],
		tags: [
			"Python",
			"LightGBM",
			"XGBoost",
			"Docker",
			"Scikit-learn",
			"Exploratory Data Analysis",
			"Pandas",
			"Matplotlib",
		],
		github: "https://github.com/Viraj-Mavani/ML-Powered-Taxi-Fare-Prediction-using-Docker",
		mode: ["ai-ml"],
	},
	{
		title: "Ethical Dilemmas in AI",
		brief: "This Master's directed study research evaluates the ethical alignment of prominent LLMs, including ChatGPT, Gemini, and Claude, across fifteen curated dilemmas. I transformed qualitative AI responses into a quantitative binary matrix for statistical analysis. Utilizing Cochran’s Q and Fleiss’ Kappa tests, I established a rigorous framework to measure inter-model agreement and behavioral consistency.",
		description: [
			"This research was conducted as my Directed Studies project during my Master’s in Computer Science at Western University. The study addresses the critical need for objective evaluation of the moral decision-making processes in Large Language Models (LLMs) as they are increasingly integrated into societally relevant roles. My goal was to move beyond subjective, qualitative observations and establish a rigorous, data-driven framework to quantify ethical alignment and consistency across competing AI architectures including GPT-4, Gemini, DeepSeek, Claude, Grok, and Copilot.",
			'The technical core of the project involves a curated dataset of 15 ethical dilemmas, ranging from classic philosophical thought experiments like the "Trolley Problem" to modern AI-specific challenges such as "Data Privacy vs. Public Security". I systematically prompted the models to provide forced binary decisions on these complex scenarios. Using Python, Pandas, and NumPy, I encoded these qualitative responses into a binary matrix, effectively creating a standardized dataset that allowed for objective statistical evaluation of abstract moral stances.',
			"To analyze the data, I implemented a suite of non-parametric statistical tests using the statsmodels and scipy libraries. I utilized Cochran's Q Test to evaluate intra-model consistency—measuring how often a single model might fluctuate in its stance—and Fleiss' Kappa to determine the degree of inter-model agreement. Furthermore, I performed pairwise comparisons using McNemar’s Test to identify significant behavioral disagreements between specific model pairs and utilized Jaccard Similarity analysis to cluster models based on overall behavioral patterns and similarity.",
			'The findings provided deep insights into AI alignment, revealing that while some models exhibit high internal stability, significant inter-model disagreement persists on trade-offs between individual rights and the collective good. I used Shannon Entropy to calculate a "Dilemma Polarization Index", identifying which ethical topics drive the most significant divides in AI behavior. This work provides a scalable quantitative methodology for researchers to monitor ethical behavior across model updates, ensuring that AI systems remain aligned with human values through rigorous mathematical validation.',
		],
		tags: [
			"Python",
			"LLMs",
			"Pandas",
			"NumPy",
			"Statsmodels",
			"Scikit-learn",
			"Matplotlib",
			"Statistical Analysis",
			"AI Ethics",
		],
		github: "https://github.com/Viraj-Mavani/EthicalDilemmaAI",
		mode: ["ai-ml"],
	},
	{
		title: "Context-Aware Portfolio Platform",
		brief: 'Architected a high-performance, polymorphic portfolio platform from scratch using Next.js 14 and TypeScript. The system features a custom state-driven "Mode Switcher" that recontextualizes the entire UI—from hero text to project filtering—based on a viewer\'s interest. I utilized Gemini Stitch for UI design inspiration, ensuring a modern, developer-centric aesthetic with 99.9% performance scores.',
		description: [
			'This project represents a shift away from static personal websites toward an interactive, context-aware experience. I built this platform from scratch using Next.js 14 and Tailwind CSS to solve a specific problem: effectively showcasing a multi-disciplinary background in Full-Stack development, AI research, and Data Engineering without overwhelming the viewer. The core innovation is the custom-engineered "Mode Switcher", a centralized state management system that dynamically swaps the content and filtering of the entire platform—including the Hero section, About bio, Experience, and Projects—to match the recruiter\'s specific domain of interest.',
			'For the user interface, I drew design inspiration from Gemini Stitch, focusing on a clean, "Obsidian-style" terminal aesthetic that emphasizes technical precision. The frontend utilizes shadcn/ui components, customized with complex Framer Motion animations for smooth, hardware-accelerated transitions between modes.',
			'On the technical side, I prioritized a modular "Data-First" architecture. By separating the narrative content into specialized data structures like bio-data.ts and project-data.ts, I ensured the platform is easily extensible. The site is fully responsive, featuring a tailored layout logic for mobile and tablet views that preserves the sophisticated grid-based design. This project stands as a live demonstration of my ability to merge advanced frontend engineering with strategic product thinking, resulting in a production-grade platform that maintains perfect Lighthouse scores and a seamless, high-end developer experience.',
		],
		tags: [
			"Next.js 14",
			"TypeScript",
			"Tailwind CSS",
			"Framer Motion",
			"Context API",
			"Lucide React",
			"shadcn/ui",
		],
		mode: ["fullstack"],
		live: "https://virajmavani.dev",
		github: "https://github.com/Viraj-Mavani/portfolio",
	},
	{
		title: "E-commerce Platform",
		brief: "Developed a high-performance e-commerce platform using .NET 7 and React during my time at FSP Media. I integrated Stripe for secure payments and utilized Redis for efficient caching to handle high traffic. The entire application was containerized with Docker, ensuring scalable and consistent deployments across production and development environments.",
		description: [
			"During my tenure at FSP Media, I was part of the engineering team responsible for building and maintaining a modern, enterprise-level e-commerce platform. The project focused on creating a seamless, end-to-end shopping experience for a diverse customer base, requiring an architecture capable of managing high transaction volumes, real-time inventory updates, and secure user data management.",
			"The technical stack featured a .NET 7 backend for high-performance API processing and a React frontend for a responsive, interactive user interface. I worked extensively on implementing core business logic, including product catalog management and complex cart functionality. To ensure the platform remained performant under load, we integrated Redis for distributed caching, which significantly reduced database latency and improved overall system responsiveness.",
			"I was responsible for integrating the Stripe API to facilitate secure, PCI-compliant payment processing, including support for various payment methods and currency handling. The entire application infrastructure was containerized using Docker, allowing for consistent development environments and simplified deployments. This project provided valuable experience in building and scaling production-ready full-stack applications with a focus on reliability, security, and the user journey.",
		],
		tags: [
			"C#",
			".NET 7",
			"React",
			"PostgreSQL",
			"Redis",
			"Stripe",
			"Docker",
			"REST API",
			"TypeScript",
		],
		mode: ["fullstack"],
	},
	{
		title: "Full-Stack Amazon Clone",
		brief: "Developed a comprehensive cross-platform e-commerce application using Flutter, Node.js & MongoDB. The system replicates core Amazon functionalities, including secure user authentication and integrated mobile payments via Google Pay. It also features a dedicated seller dashboard for tracking inventory and real-time sales statistics, demonstrating a complete full-stack mobile commerce solution.",
		description: [
			"Created as a final year capstone project for my Bachelor’s degree at Atmiya University, this Full-Stack Amazon Clone was designed to demonstrate proficiency in cross-platform mobile development and scalable backend architecture. The primary objective was to build a functional, end-to-end e-commerce ecosystem that supports two distinct user personas: consumers and sellers. This project allowed me to explore the complexities of state management, API integration, and database schema design in a real-world context.",
			"The technical architecture utilizes the Flutter framework for the frontend, providing a high-performance UI that works seamlessly across Android and iOS from a single codebase. The backend is powered by a RESTful API built with Node.js and Express, which handles business logic and communicates with a MongoDB database. I implemented JWT-based authentication to secure user accounts and developed a modular data structure to manage product listings, user profiles, and order histories efficiently.",
			"On the consumer side, the app includes features such as product discovery, a persistent shopping cart, and integrated mobile payment gateways through Google Pay and Apple Pay. For the seller side, I engineered a dedicated admin panel where users can manage their digital storefronts, upload or remove products, and monitor business performance. This project served as my first major deep dive into building production-ready, full-stack mobile applications.",
		],
		tags: [
			"Flutter",
			"Node.js",
			"MongoDB",
			"Express",
			"Dart",
			"JWT",
			"REST API",
			"Cross-platform",
		],
		github: "https://github.com/Viraj-Mavani/amazon_clone",
		mode: ["fullstack"],
	},
];
