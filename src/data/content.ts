export const site = {
  name: "Kevin Mevada",
  role: "AI / ML Engineer",
  tagline: "Production AI systems — researched carefully, shipped precisely.",
  email: "kmevada@hawk.illinoistech.edu",
  phone: "312-358-1978",
  linkedin: "https://www.linkedin.com/in/kevinmevada",
  github: "https://github.com/kevinmevada",
  location: "Chicago, IL",
  status: "Available for opportunities",
};

export const about = {
  paragraphs: [
    "I'm an AI deployment engineer and ML practitioner with production experience building end-to-end pipelines on AWS SageMaker — systems that have handled 5M+ real-world transactions.",
    "Currently pursuing an M.S. in Computer Science (AI) at Illinois Institute of Technology (GPA 3.7), I specialize in translating research into enterprise-grade systems.",
    "My edge is bridging research and reality — from GenAI prototypes to REST APIs in production.",
  ],
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "AI Deployment & Data Science Intern",
    company: "Zidio Development",
    location: "Bengaluru, India",
    dates: "Jan 2025 – Apr 2025",
    bullets: [
      "Deployed a production fraud detection system on AWS SageMaker processing 5M+ transactions, with velocity and geo-deviation features achieving 92% accuracy.",
      "Presented architecture and results to 4 senior managers — secured full project sign-off.",
    ],
  },
  {
    role: "Data Science Intern",
    company: "Prodigy Infotech",
    location: "Ahmedabad, India",
    dates: "Mar 2024 – Apr 2024",
    bullets: [
      "Designed ML pipelines across 1M+ records with feature engineering and outlier detection — accelerated deployment by 30%.",
      "Built a credit risk pipeline on AWS Elastic Beanstalk — 27% fewer misclassifications, 22% faster decisions.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  metrics: { value: string; label: string }[];
  pipeline: string[];
  methods: string;
  limitations: string;
  category: "research" | "work";
};

export const projects: Project[] = [
  {
    slug: "credit-risk",
    title: "Enterprise Credit Risk Deployment",
    summary:
      "Real-time scoring API for loan default prediction with engineered financial features — credit utilization, DTI, and income stability.",
    tags: ["AWS Elastic Beanstalk", "XGBoost", "REST API", "ML Pipeline"],
    metrics: [
      { value: "27%", label: "Fewer errors" },
      { value: "23%", label: "Accuracy gain" },
      { value: "500+", label: "Concurrent req/s" },
    ],
    pipeline: ["Raw applications", "Feature engineering", "XGBoost scoring", "REST inference", "Decision latency"],
    methods:
      "Gradient-boosted trees with carefully engineered financial ratios. Deployed as a concurrent REST service on Elastic Beanstalk with request batching and model versioning.",
    limitations:
      "Performance depends on feature freshness and class balance in new cohorts. Drift monitoring and periodic recalibration remain operational requirements.",
    category: "work",
  },
  {
    slug: "genai-support",
    title: "GenAI Customer Support Automation",
    summary:
      "End-to-end RAG system with PDF ingestion, chunking, embeddings, and vector search on AWS EC2 for enterprise knowledge retrieval.",
    tags: ["OpenAI API", "RAG", "AWS EC2", "LangChain"],
    metrics: [
      { value: "40%", label: "Faster response" },
      { value: "89%", label: "Query accuracy" },
      { value: "32%", label: "Relevance boost" },
    ],
    pipeline: ["PDF corpus", "Chunk + embed", "Vector retrieval", "LLM synthesis", "Grounded answer"],
    methods:
      "Retrieval-augmented generation with chunked document embeddings and grounded prompting. Retrieval quality measured against a held-out question set.",
    limitations:
      "Answer quality tracks corpus coverage. Hallucination risk remains without citation checks — production use requires retrieval confidence thresholds.",
    category: "work",
  },
  {
    slug: "churn-prevention",
    title: "Customer Churn Prevention Platform",
    summary:
      "Behavioral analytics with a live stakeholder dashboard — recency, frequency, and inactivity signals across Gradient Boosting and Random Forest models.",
    tags: ["Gradient Boosting", "Random Forest", "REST API", "Analytics"],
    metrics: [
      { value: "85%", label: "Precision" },
      { value: "18%", label: "Recall boost" },
      { value: "18%", label: "Lower CAC" },
    ],
    pipeline: ["Event stream", "RFM features", "Ensemble models", "Risk scores", "Intervention queue"],
    methods:
      "Ensemble classifiers on behavioral features with a dashboard for operators. Precision prioritized to protect outreach cost.",
    limitations:
      "Seasonality and campaign effects can shift baseline churn. Model usefulness depends on timely feedback from intervention outcomes.",
    category: "work",
  },
  {
    slug: "fraud-detection",
    title: "Fraud Detection at Scale",
    summary:
      "Production SageMaker pipeline for transaction fraud with velocity and geo-deviation features across millions of events.",
    tags: ["AWS SageMaker", "Feature Engineering", "Production ML"],
    metrics: [
      { value: "5M+", label: "Transactions" },
      { value: "92%", label: "Accuracy" },
      { value: "4", label: "Exec sign-offs" },
    ],
    pipeline: ["Transaction feed", "Velocity features", "SageMaker train", "Endpoint serve", "Ops review"],
    methods:
      "Supervised classification with engineered temporal and spatial deviation signals. Deployed and validated with stakeholder review.",
    limitations:
      "Adversarial fraud patterns evolve. Continuous feature monitoring and labeled feedback loops are required to hold accuracy.",
    category: "research",
  },
];

export const stack = [
  { group: "Machine Learning", items: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "XGBoost"] },
  { group: "Generative AI", items: ["OpenAI API", "LangChain", "RAG", "HuggingFace", "NLP"] },
  { group: "MLOps & Cloud", items: ["AWS SageMaker", "EC2", "S3", "Docker", "REST APIs"] },
  { group: "Data", items: ["SQL", "Feature Engineering", "Git"] },
];

export const education = [
  {
    badge: "Current · Expected Dec 2027",
    degree: "M.S. Computer Science",
    field: "Artificial Intelligence",
    school: "Illinois Institute of Technology · Chicago, IL",
    gpa: "3.7",
  },
  {
    badge: "Completed · May 2025",
    degree: "B.Tech Computer Science",
    field: "Core CS Foundations",
    school: "Indus University · Gujarat, India",
    gpa: "4.0",
  },
];

export const certifications = [
  { name: "Machine Learning Foundation", org: "Amazon Web Services" },
  { name: "ML for Natural Language Processing", org: "Amazon Web Services" },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
