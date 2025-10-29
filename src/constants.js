export const sampleResponseGenerateFormDetails = {
  questions: [
    {
      id: 1,
      question:
        "Can you explain the difference between props and state in React?",
      rubric: [
        { score: 1, desc: "Fails to explain the concepts or confuses them." },
        { score: 2, desc: "Provides a basic definition but lacks depth." },
        {
          score: 3,
          desc: "Explains both concepts but misses key differences.",
        },
        { score: 4, desc: "Clearly explains both concepts with examples." },
        {
          score: 5,
          desc: "Provides a thorough explanation with examples and nuances.",
        },
      ],
    },
    {
      id: 2,
      question:
        "How do you manage component lifecycle in React? Can you give an example?",
      rubric: [
        { score: 1, desc: "Shows no understanding of component lifecycle." },
        { score: 2, desc: "Mentions lifecycle methods but lacks clarity." },
        {
          score: 3,
          desc: "Describes lifecycle methods but with limited examples.",
        },
        {
          score: 4,
          desc: "Explains lifecycle methods well with a relevant example.",
        },
        {
          score: 5,
          desc: "Provides a comprehensive explanation with multiple examples.",
        },
      ],
    },
    {
      id: 3,
      question: "What are the advantages of using TypeScript with React?",
      rubric: [
        { score: 1, desc: "Fails to identify any advantages." },
        {
          score: 2,
          desc: "Mentions one or two advantages without explanation.",
        },
        { score: 3, desc: "Lists several advantages but lacks detail." },
        { score: 4, desc: "Explains advantages clearly with examples." },
        {
          score: 5,
          desc: "Provides a thorough analysis of advantages with real-world applications.",
        },
      ],
    },
    {
      id: 4,
      question:
        "Can you describe how you would handle state management in a large React application?",
      rubric: [
        { score: 1, desc: "Shows no understanding of state management." },
        {
          score: 2,
          desc: "Mentions state management libraries but lacks detail.",
        },
        { score: 3, desc: "Describes a basic approach but lacks depth." },
        {
          score: 4,
          desc: "Provides a clear strategy with examples of libraries.",
        },
        {
          score: 5,
          desc: "Offers a comprehensive strategy with multiple approaches and trade-offs.",
        },
      ],
    },
    {
      id: 5,
      question:
        "What are hooks in React, and how do they differ from class components?",
      rubric: [
        {
          score: 1,
          desc: "Fails to explain hooks or confuses them with class components.",
        },
        {
          score: 2,
          desc: "Mentions hooks but lacks clarity on their purpose.",
        },
        {
          score: 3,
          desc: "Describes hooks but with limited comparison to class components.",
        },
        {
          score: 4,
          desc: "Clearly explains hooks with a good comparison to class components.",
        },
        {
          score: 5,
          desc: "Provides a thorough explanation with examples and detailed comparisons.",
        },
      ],
    },
    {
      id: 6,
      question: "How do you optimize performance in a React application?",
      rubric: [
        {
          score: 1,
          desc: "Shows no understanding of performance optimization.",
        },
        { score: 2, desc: "Mentions one or two techniques without detail." },
        {
          score: 3,
          desc: "Describes basic optimization techniques but lacks depth.",
        },
        {
          score: 4,
          desc: "Provides a clear strategy with several optimization techniques.",
        },
        {
          score: 5,
          desc: "Offers a comprehensive approach with examples and performance metrics.",
        },
      ],
    },
    {
      id: 7,
      question:
        "What is the purpose of keys in React lists, and how should they be used?",
      rubric: [
        { score: 1, desc: "Fails to explain the purpose of keys." },
        {
          score: 2,
          desc: "Mentions keys but lacks clarity on their importance.",
        },
        { score: 3, desc: "Describes keys but with limited examples." },
        {
          score: 4,
          desc: "Clearly explains the purpose of keys with relevant examples.",
        },
        {
          score: 5,
          desc: "Provides a thorough explanation with examples and discusses potential pitfalls.",
        },
      ],
    },
    {
      id: 8,
      question:
        "Can you explain the concept of higher-order components (HOCs) in React?",
      rubric: [
        { score: 1, desc: "Shows no understanding of HOCs." },
        { score: 2, desc: "Mentions HOCs but lacks clarity." },
        { score: 3, desc: "Describes HOCs but with limited examples." },
        { score: 4, desc: "Clearly explains HOCs with a relevant example." },
        {
          score: 5,
          desc: "Provides a comprehensive explanation with multiple examples and use cases.",
        },
      ],
    },
  ],
  meta: {
    source: "details",
    candidate_name: "John Ashraf",
    provider: "openai",
    model: "gpt-4o-mini",
  },
};

export const EXPERIENCE_LEVELS = [
  { value: "", label: "Select level" },
  { value: "Junior", label: "Junior (0-2 years)" },
  { value: "Mid-Level", label: "Mid-Level (2-5 years)" },
  { value: "Senior", label: "Senior (5+ years)" },
  { value: "Lead", label: "Lead/Principal" },
];

// Validation rules
export const validators = {
  role: (value) => {
    if (!value?.trim()) return "Job role is required.";
    return null;
  },

  level: (value) => {
    if (!value?.trim()) return "Experience level is required.";
    return null;
  },

  yearsExp: (value) => {
    if (!value) return null;
    if (!/^\d+(\+|-\d+)?$/.test(value.trim())) {
      return "Please enter a valid number or range (e.g., 3, 3-5, 5+).";
    }
    return null;
  },

  skills: (value) => {
    if (!value) return null;
    const hasEmptySkill = value.split(",").some((s) => s.trim().length === 0);
    if (hasEmptySkill) {
      return "Please separate skills by commas (no trailing commas).";
    }
    return null;
  },

  candidateName: (value) => {
    if (!value) return null;
    if (/[0-9]/.test(value.trim())) {
      return "Candidate name cannot contain numbers.";
    }
    return null;
  },
};

// Form field configuration
export const FORM_FIELDS = [
  {
    name: "role",
    label: "Job Role",
    type: "text",
    placeholder: "e.g., Frontend Developer, Data Scientist",
    required: true,
  },
  {
    name: "level",
    label: "Experience Level",
    type: "select",
    options: EXPERIENCE_LEVELS,
    required: true,
  },
  {
    name: "yearsExp",
    label: "Years of Experience",
    type: "text",
    placeholder: "e.g., 3-5 years",
  },
  {
    name: "skills",
    label: "Key Skills (comma separated)",
    type: "textarea",
    placeholder: "e.g., React, TypeScript, Node.js, AWS",
    rows: 3,
  },
  {
    name: "candidateName",
    label: "Candidate Name",
    type: "text",
    placeholder: "e.g., John Doe",
  },
];
