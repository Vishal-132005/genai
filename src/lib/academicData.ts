
export interface Topic {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  topics: Topic[];
}

export interface DepartmentSemester {
  semester: number;
  subjects: Subject[];
}

export interface Department {
  id: string;
  name: string;
  semesters: DepartmentSemester[];
}

const departmentsList = [
  { id: 'agri-eng', name: 'Agricultural Engineering', shortName: 'Agri Eng' },
  { id: 'ai-ds', name: 'Artificial Intelligence and Data Science', shortName: 'AI & DS' },
  { id: 'bio-med', name: 'Biomedical Engineering', shortName: 'BioMed Eng' },
  { id: 'civil', name: 'Civil Engineering', shortName: 'Civil Eng' },
  { id: 'cse', name: 'Computer Science and Engineering', shortName: 'CSE' },
  { id: 'ece', name: 'Electronics and Communication Engineering', shortName: 'ECE' },
  { id: 'eee', name: 'Electrical & Electronics Engineering', shortName: 'EEE' },
  { id: 'it', name: 'Information Technology', shortName: 'IT' },
  { id: 'mech-eng', name: 'Mechanical Engineering', shortName: 'Mech Eng' },
  { id: 'sci-hum', name: 'Science and Humanities', shortName: 'Sci & Hum' },
];

// --- Computer Science and Engineering (CSE) Detailed Data ---
const cseSemesters: DepartmentSemester[] = [
  {
    semester: 1,
    subjects: [
      {
        id: 'cse-s1-phy1', name: 'Physics for CSE',
        topics: [
          { id: 'cse-s1-phy1-t1', name: 'Quantum Mechanics Basics' },
          { id: 'cse-s1-phy1-t2', name: 'Semiconductor Physics' },
          { id: 'cse-s1-phy1-t3', name: 'Optics and Lasers' },
        ],
      },
      {
        id: 'cse-s1-mat1', name: 'Mathematics I (Calculus & Linear Algebra)',
        topics: [
          { id: 'cse-s1-mat1-t1', name: 'Limits and Continuity' },
          { id: 'cse-s1-mat1-t2', name: 'Derivatives and Applications' },
          { id: 'cse-s1-mat1-t3', name: 'Matrices and Determinants' },
          { id: 'cse-s1-mat1-t4', name: 'Vector Spaces' },
        ],
      },
      {
        id: 'cse-s1-pps', name: 'Programming for Problem Solving (C)',
        topics: [
          { id: 'cse-s1-pps-t1', name: 'Introduction to C Programming' },
          { id: 'cse-s1-pps-t2', name: 'Control Structures (if, loops)' },
          { id: 'cse-s1-pps-t3', name: 'Functions and Pointers' },
          { id: 'cse-s1-pps-t4', name: 'Arrays and Strings' },
        ],
      },
      {
        id: 'cse-s1-bee', name: 'Basic Electrical Engineering',
        topics: [
          { id: 'cse-s1-bee-t1', name: 'DC Circuits' },
          { id: 'cse-s1-bee-t2', name: 'AC Circuits' },
          { id: 'cse-s1-bee-t3', name: 'Transformers' },
        ],
      },
      {
        id: 'cse-s1-eng', name: 'English Communication Skills',
        topics: [
          { id: 'cse-s1-eng-t1', name: 'Vocabulary Building' },
          { id: 'cse-s1-eng-t2', name: 'Grammar and Usage' },
          { id: 'cse-s1-eng-t3', name: 'Technical Writing Basics' },
        ],
      },
    ],
  },
  {
    semester: 2,
    subjects: [
      {
        id: 'cse-s2-che', name: 'Chemistry for CSE',
        topics: [
          { id: 'cse-s2-che-t1', name: 'Atomic Structure' },
          { id: 'cse-s2-che-t2', name: 'Polymers and Composites' },
          { id: 'cse-s2-che-t3', name: 'Electrochemistry' },
        ],
      },
      {
        id: 'cse-s2-mat2', name: 'Mathematics II (Differential Equations & Vector Calculus)',
        topics: [
          { id: 'cse-s2-mat2-t1', name: 'Ordinary Differential Equations' },
          { id: 'cse-s2-mat2-t2', name: 'Partial Differential Equations' },
          { id: 'cse-s2-mat2-t3', name: 'Vector Integration' },
        ],
      },
      {
        id: 'cse-s2-ds', name: 'Data Structures (using C)',
        topics: [
          { id: 'cse-s2-ds-t1', name: 'Arrays, Stacks, Queues' },
          { id: 'cse-s2-ds-t2', name: 'Linked Lists' },
          { id: 'cse-s2-ds-t3', name: 'Trees and Graphs' },
          { id: 'cse-s2-ds-t4', name: 'Sorting and Searching Algorithms' },
        ],
      },
      {
        id: 'cse-s2-edrg', name: 'Engineering Drawing',
        topics: [
          { id: 'cse-s2-edrg-t1', name: 'Projections of Points and Lines' },
          { id: 'cse-s2-edrg-t2', name: 'Projections of Solids' },
          { id: 'cse-s2-edrg-t3', name: 'Isometric Projections' },
        ],
      },
      {
        id: 'cse-s2-evs', name: 'Environmental Science',
        topics: [
          { id: 'cse-s2-evs-t1', name: 'Ecosystems' },
          { id: 'cse-s2-evs-t2', name: 'Pollution Control' },
          { id: 'cse-s2-evs-t3', name: 'Sustainable Development' },
        ],
      },
    ],
  },
  {
    semester: 3,
    subjects: [
      {
        id: 'cse-s3-mat3', name: 'Mathematics III (Probability & Statistics)',
        topics: [
          { id: 'cse-s3-mat3-t1', name: 'Basic Probability Concepts' },
          { id: 'cse-s3-mat3-t2', name: 'Discrete and Continuous Distributions' },
          { id: 'cse-s3-mat3-t3', name: 'Statistical Inference' },
        ],
      },
      {
        id: 'cse-s3-dld', name: 'Digital Logic Design',
        topics: [
          { id: 'cse-s3-dld-t1', name: 'Number Systems & Boolean Algebra' },
          { id: 'cse-s3-dld-t2', name: 'Combinational Circuits' },
          { id: 'cse-s3-dld-t3', name: 'Sequential Circuits' },
        ],
      },
      {
        id: 'cse-s3-oop', name: 'Object-Oriented Programming (Java)',
        topics: [
          { id: 'cse-s3-oop-t1', name: 'Classes and Objects' },
          { id: 'cse-s3-oop-t2', name: 'Inheritance and Polymorphism' },
          { id: 'cse-s3-oop-t3', name: 'Exception Handling & Collections' },
        ],
      },
      {
        id: 'cse-s3-ade', name: 'Analog and Digital Electronics',
        topics: [
          { id: 'cse-s3-ade-t1', name: 'Diodes and Transistors' },
          { id: 'cse-s3-ade-t2', name: 'Operational Amplifiers' },
          { id: 'cse-s3-ade-t3', name: 'Logic Families' },
        ],
      },
      {
        id: 'cse-s3-dsa', name: 'Design and Analysis of Algorithms',
        topics: [
          { id: 'cse-s3-dsa-t1', name: 'Asymptotic Notations' },
          { id: 'cse-s3-dsa-t2', name: 'Divide and Conquer, Greedy Algorithms' },
          { id: 'cse-s3-dsa-t3', name: 'Dynamic Programming, NP-Completeness' },
        ],
      },
    ],
  },
  {
    semester: 4,
    subjects: [
      {
        id: 'cse-s4-os', name: 'Operating Systems',
        topics: [
          { id: 'cse-s4-os-t1', name: 'Process Management & Scheduling' },
          { id: 'cse-s4-os-t2', name: 'Memory Management' },
          { id: 'cse-s4-os-t3', name: 'File Systems & I/O Management' },
          { id: 'cse-s4-os-t4', name: 'Deadlocks & Concurrency' },
        ],
      },
      {
        id: 'cse-s4-dbms', name: 'Database Management Systems',
        topics: [
          { id: 'cse-s4-dbms-t1', name: 'Relational Model & SQL' },
          { id: 'cse-s4-dbms-t2', name: 'Normalization & ER Diagrams' },
          { id: 'cse-s4-dbms-t3', name: 'Transaction Management & Concurrency Control' },
        ],
      },
      {
        id: 'cse-s4-coa', name: 'Computer Organization and Architecture',
        topics: [
          { id: 'cse-s4-coa-t1', name: 'CPU Architecture & Pipelining' },
          { id: 'cse-s4-coa-t2', name: 'Memory Hierarchy' },
          { id: 'cse-s4-coa-t3', name: 'I/O Organization' },
        ],
      },
      {
        id: 'cse-s4-se', name: 'Software Engineering',
        topics: [
          { id: 'cse-s4-se-t1', name: 'Software Development Life Cycles' },
          { id: 'cse-s4-se-t2', name: 'Requirements Engineering & Design Patterns' },
          { id: 'cse-s4-se-t3', name: 'Testing and Maintenance' },
        ],
      },
      {
        id: 'cse-s4-flat', name: 'Formal Languages and Automata Theory',
        topics: [
          { id: 'cse-s4-flat-t1', name: 'Finite Automata & Regular Expressions' },
          { id: 'cse-s4-flat-t2', name: 'Context-Free Grammars & Pushdown Automata' },
          { id: 'cse-s4-flat-t3', name: 'Turing Machines & Undecidability' },
        ],
      },
    ],
  },
  {
    semester: 5,
    subjects: [
      {
        id: 'cse-s5-cn', name: 'Computer Networks',
        topics: [
          { id: 'cse-s5-cn-t1', name: 'OSI & TCP/IP Models' },
          { id: 'cse-s5-cn-t2', name: 'Data Link, Network, Transport Layers' },
          { id: 'cse-s5-cn-t3', name: 'Application Layer Protocols' },
        ],
      },
      {
        id: 'cse-s5-mpmc', name: 'Microprocessors and Microcontrollers',
        topics: [
          { id: 'cse-s5-mpmc-t1', name: '8086 Architecture & Programming' },
          { id: 'cse-s5-mpmc-t2', name: 'Interfacing Devices' },
          { id: 'cse-s5-mpmc-t3', name: 'Introduction to Microcontrollers (e.g., 8051/ARM)' },
        ],
      },
      {
        id: 'cse-s5-web', name: 'Web Technologies',
        topics: [
          { id: 'cse-s5-web-t1', name: 'HTML, CSS, JavaScript' },
          { id: 'cse-s5-web-t2', name: 'Server-side Scripting (e.g., Node.js, PHP)' },
          { id: 'cse-s5-web-t3', name: 'Web Frameworks & APIs' },
        ],
      },
      {
        id: 'cse-s5-ai', name: 'Artificial Intelligence',
        topics: [
          { id: 'cse-s5-ai-t1', name: 'Search Algorithms & Problem Solving' },
          { id: 'cse-s5-ai-t2', name: 'Knowledge Representation & Reasoning' },
          { id: 'cse-s5-ai-t3', name: 'Introduction to Machine Learning' },
        ],
      },
      {
        id: 'cse-s5-pe1', name: 'Professional Elective I',
        topics: [
          { id: 'cse-s5-pe1-t1', name: 'Data Mining' },
          { id: 'cse-s5-pe1-t2', name: 'Advanced Java Programming' },
          { id: 'cse-s5-pe1-t3', name: 'Soft Computing' },
        ],
      },
    ],
  },
  {
    semester: 6,
    subjects: [
      {
        id: 'cse-s6-cd', name: 'Compiler Design',
        topics: [
          { id: 'cse-s6-cd-t1', name: 'Lexical Analysis & Parsing' },
          { id: 'cse-s6-cd-t2', name: 'Syntax Directed Translation & Intermediate Code Generation' },
          { id: 'cse-s6-cd-t3', name: 'Code Optimization & Code Generation' },
        ],
      },
      {
        id: 'cse-s6-ml', name: 'Machine Learning',
        topics: [
          { id: 'cse-s6-ml-t1', name: 'Supervised Learning (Regression, Classification)' },
          { id: 'cse-s6-ml-t2', name: 'Unsupervised Learning (Clustering, Dimensionality Reduction)' },
          { id: 'cse-s6-ml-t3', name: 'Introduction to Deep Learning & Neural Networks' },
        ],
      },
      {
        id: 'cse-s6-cns', name: 'Cryptography and Network Security',
        topics: [
          { id: 'cse-s6-cns-t1', name: 'Symmetric & Asymmetric Cryptography' },
          { id: 'cse-s6-cns-t2', name: 'Network Security Protocols (SSL, IPsec)' },
          { id: 'cse-s6-cns-t3', name: 'System Security & Firewalls' },
        ],
      },
      {
        id: 'cse-s6-pe2', name: 'Professional Elective II',
        topics: [
          { id: 'cse-s6-pe2-t1', name: 'Cloud Computing' },
          { id: 'cse-s6-pe2-t2', name: 'Big Data Analytics' },
          { id: 'cse-s6-pe2-t3', name: 'Internet of Things (IoT)' },
        ],
      },
      {
        id: 'cse-s6-oe1', name: 'Open Elective I',
        topics: [
          { id: 'cse-s6-oe1-t1', name: 'Principles of Management' },
          { id: 'cse-s6-oe1-t2', name: 'Entrepreneurship Development' },
        ],
      },
    ],
  },
  {
    semester: 7,
    subjects: [
      {
        id: 'cse-s7-dist', name: 'Distributed Systems',
        topics: [
          { id: 'cse-s7-dist-t1', name: 'Architectures & Communication' },
          { id: 'cse-s7-dist-t2', name: 'Consistency & Replication' },
          { id: 'cse-s7-dist-t3', name: 'Fault Tolerance & Security' },
        ],
      },
      {
        id: 'cse-s7-pe3', name: 'Professional Elective III',
        topics: [
          { id: 'cse-s7-pe3-t1', name: 'Natural Language Processing' },
          { id: 'cse-s7-pe3-t2', name: 'Computer Vision' },
          { id: 'cse-s7-pe3-t3', name: 'Blockchain Technologies' },
        ],
      },
      {
        id: 'cse-s7-pe4', name: 'Professional Elective IV',
        topics: [
          { id: 'cse-s7-pe4-t1', name: 'Cyber Security' },
          { id: 'cse-s7-pe4-t2', name: 'Mobile Application Development' },
        ],
      },
      {
        id: 'cse-s7-oe2', name: 'Open Elective II',
        topics: [
          { id: 'cse-s7-oe2-t1', name: 'Remote Sensing and GIS' },
          { id: 'cse-s7-oe2-t2', name: 'Disaster Management' },
        ],
      },
      {
        id: 'cse-s7-proj1', name: 'Project Work Phase I',
        topics: [
          { id: 'cse-s7-proj1-t1', name: 'Literature Survey' },
          { id: 'cse-s7-proj1-t2', name: 'Problem Formulation' },
          { id: 'cse-s7-proj1-t3', name: 'Initial Design & Methodology' },
        ],
      },
    ],
  },
  {
    semester: 8,
    subjects: [
      {
        id: 'cse-s8-pe5', name: 'Professional Elective V',
        topics: [
          { id: 'cse-s8-pe5-t1', name: 'Deep Learning' },
          { id: 'cse-s8-pe5-t2', name: 'Software Project Management' },
        ],
      },
      {
        id: 'cse-s8-pe6', name: 'Professional Elective VI',
        topics: [
          { id: 'cse-s8-pe6-t1', name: 'Quantum Computing' },
          { id: 'cse-s8-pe6-t2', name: 'Robotics Process Automation' },
        ],
      },
      {
        id: 'cse-s8-proj2', name: 'Project Work Phase II & Internship',
        topics: [
          { id: 'cse-s8-proj2-t1', name: 'Implementation & Development' },
          { id: 'cse-s8-proj2-t2', name: 'Testing and Validation' },
          { id: 'cse-s8-proj2-t3', name: 'Report Writing and Final Presentation' },
        ],
      },
    ],
  },
];
// --- End of CSE Detailed Data ---


// --- Placeholder data for other departments ---
// This function generates placeholder topics for a given subject ID prefix.
const generatePlaceholderTopics = (subjectIdPrefix: string, count: number = 3): Topic[] => {
  const topics: Topic[] = [];
  for (let i = 1; i <= count; i++) {
    topics.push({ id: `${subjectIdPrefix}-topic${i}`, name: `Topic ${String.fromCharCode(64 + i)}` });
  }
  return topics;
};

// This function generates placeholder subjects for a department and semester.
const generatePlaceholderSubjects = (departmentShortName: string, semesterNumber: number, count: number = 5): Subject[] => {
  const subjects: Subject[] = [];
  for (let i = 1; i <= count; i++) {
    const subjectId = `${departmentShortName.toLowerCase().replace(/[& ]+/g, '-')}-s${semesterNumber}-subj${i}`;
    subjects.push({
      id: subjectId,
      name: `${departmentShortName} Sem ${semesterNumber} Subject ${i}`,
      topics: generatePlaceholderTopics(subjectId),
    });
  }
  return subjects;
};

// This function generates placeholder semesters for a department.
const generatePlaceholderSemesters = (departmentShortName: string, numSemesters: number = 8): DepartmentSemester[] => {
  const semesters: DepartmentSemester[] = [];
  for (let i = 1; i <= numSemesters; i++) {
    semesters.push({
      semester: i,
      subjects: generatePlaceholderSubjects(departmentShortName, i),
    });
  }
  return semesters;
};
// --- End of Placeholder data generation ---


export const DEPARTMENTS: Department[] = departmentsList.map(dept => {
  if (dept.id === 'cse') {
    return {
      id: dept.id,
      name: dept.name,
      semesters: cseSemesters,
    };
  }
  // For other departments, use placeholder data
  // This section can be expanded with detailed curricula for each department later.
  return {
    id: dept.id,
    name: dept.name,
    semesters: generatePlaceholderSemesters(dept.shortName),
  };
});

export const getDepartments = () => DEPARTMENTS.map(d => ({ value: d.id, label: d.name }));

export const getSemestersForDepartment = (deptId: string) => {
  const dept = DEPARTMENTS.find(d => d.id === deptId);
  return dept ? dept.semesters.map(s => ({ value: s.semester.toString(), label: `Semester ${s.semester}` })) : [];
};

export const getSubjectsForSemester = (deptId: string, semester: number | string) => {
  const numSemester = typeof semester === 'string' ? parseInt(semester, 10) : semester;
  const dept = DEPARTMENTS.find(d => d.id === deptId);
  if (!dept) return [];
  const semData = dept.semesters.find(s => s.semester === numSemester);
  return semData ? semData.subjects.map(sub => ({ value: sub.id, label: sub.name, topics: sub.topics })) : [];
};

export const getTopicsForSubject = (deptId: string, semester: number | string, subjectId: string) => {
  const subjects = getSubjectsForSemester(deptId, semester);
  const subject = subjects.find(s => s.value === subjectId);
  return subject ? subject.topics.map(t => ({ value: t.id, label: t.name })) : [];
};

    