
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

// --- Common First Year Subjects (Often part of Science & Humanities or core for all branches) ---
const commonFirstYearPhysics: Subject = {
  id: 'common-phy1', name: 'Engineering Physics',
  topics: [
    { id: 'common-phy1-t1', name: 'Mechanics and Properties of Matter' },
    { id: 'common-phy1-t2', name: 'Optics and Lasers' },
    { id: 'common-phy1-t3', name: 'Quantum Mechanics Fundamentals' },
    { id: 'common-phy1-t4', name: 'Semiconductor Physics' },
  ],
};
const commonFirstYearChemistry: Subject = {
  id: 'common-che1', name: 'Engineering Chemistry',
  topics: [
    { id: 'common-che1-t1', name: 'Atomic Structure and Bonding' },
    { id: 'common-che1-t2', name: 'Thermodynamics and Electrochemistry' },
    { id: 'common-che1-t3', name: 'Water Technology and Corrosion' },
    { id: 'common-che1-t4', name: 'Polymers and Nanomaterials' },
  ],
};
const commonFirstYearMaths1: Subject = {
  id: 'common-mat1', name: 'Mathematics I (Calculus & Linear Algebra)',
  topics: [
    { id: 'common-mat1-t1', name: 'Differential Calculus' },
    { id: 'common-mat1-t2', name: 'Integral Calculus' },
    { id: 'common-mat1-t3', name: 'Sequences and Series' },
    { id: 'common-mat1-t4', name: 'Matrices and Linear Algebra Basics' },
  ],
};
const commonFirstYearMaths2: Subject = {
  id: 'common-mat2', name: 'Mathematics II (Differential Equations & Vector Calculus)',
  topics: [
    { id: 'common-mat2-t1', name: 'Ordinary Differential Equations' },
    { id: 'common-mat2-t2', name: 'Partial Differential Equations' },
    { id: 'common-mat2-t3', name: 'Vector Differentiation' },
    { id: 'common-mat2-t4', name: 'Vector Integration' },
  ],
};
const commonProgrammingC: Subject = {
  id: 'common-prog-c', name: 'Programming for Problem Solving (Using C)',
  topics: [
    { id: 'common-prog-c-t1', name: 'Introduction to Algorithms & C Basics' },
    { id: 'common-prog-c-t2', name: 'Control Structures & Functions' },
    { id: 'common-prog-c-t3', name: 'Arrays, Strings, Pointers' },
    { id: 'common-prog-c-t4', name: 'Structures and File Handling' },
  ],
};
const commonBasicElectrical: Subject = {
  id: 'common-bee', name: 'Basic Electrical Engineering',
  topics: [
    { id: 'common-bee-t1', name: 'DC Circuits Analysis' },
    { id: 'common-bee-t2', name: 'AC Circuits Fundamentals' },
    { id: 'common-bee-t3', name: 'Transformers and DC Machines' },
    { id: 'common-bee-t4', name: 'Basic Electrical Safety' },
  ],
};
const commonEngGraphics: Subject = {
  id: 'common-egraphics', name: 'Engineering Graphics & Design',
  topics: [
    { id: 'common-egraphics-t1', name: 'Orthographic Projections' },
    { id: 'common-egraphics-t2', name: 'Projections of Solids & Sections' },
    { id: 'common-egraphics-t3', name: 'Development of Surfaces' },
    { id: 'common-egraphics-t4', name: 'Isometric Projections & CAD Basics' },
  ],
};
const commonEnglishComm: Subject = {
    id: 'common-engcomm', name: 'English Communication Skills',
    topics: [
        { id: 'common-engcomm-t1', name: 'Vocabulary and Grammar' },
        { id: 'common-engcomm-t2', name: 'Reading Comprehension and Writing Skills' },
        { id: 'common-engcomm-t3', name: 'Listening and Speaking Skills (Presentations, GD)' },
    ],
};
const commonWorkshop: Subject = {
    id: 'common-workshop', name: 'Engineering Workshop Practice',
    topics: [
        { id: 'common-workshop-t1', name: 'Carpentry and Fitting' },
        { id: 'common-workshop-t2', name: 'Welding and Sheet Metal Work' },
        { id: 'common-workshop-t3', name: 'Basic Machining' },
    ],
};


// --- Computer Science and Engineering (CSE) Detailed Data ---
const cseSemesters: DepartmentSemester[] = [
  {
    semester: 1,
    subjects: [
      commonFirstYearPhysics,
      commonFirstYearMaths1,
      commonProgrammingC,
      {
        id: 'cse-s1-bee', name: 'Basic Electrical & Electronics Engineering', // CSE specific version might differ slightly
        topics: [
          { id: 'cse-s1-bee-t1', name: 'DC Circuits: Ohm’s Law, Kirchhoff’s Laws' },
          { id: 'cse-s1-bee-t2', name: 'AC Circuits: RLC Circuits, Resonance' },
          { id: 'cse-s1-bee-t3', name: 'Introduction to Semiconductor Devices' },
          { id: 'cse-s1-bee-t4', name: 'Digital Logic Basics' },
        ],
      },
       commonEnglishComm,
      {
        id: 'cse-s1-phylab', name: 'Engineering Physics Lab',
        topics: [
          { id: 'cse-s1-phylab-t1', name: 'Experiments on Optics (e.g., Spectrometer)' },
          { id: 'cse-s1-phylab-t2', name: 'Experiments on Semiconductor Devices' },
        ],
      },
      {
        id: 'cse-s1-proglab', name: 'Programming Lab (C)',
        topics: [
          { id: 'cse-s1-proglab-t1', name: 'Basic C Programs' },
          { id: 'cse-s1-proglab-t2', name: 'Programs on Control Structures and Arrays' },
        ],
      },
    ],
  },
  {
    semester: 2,
    subjects: [
      commonFirstYearChemistry,
      commonFirstYearMaths2,
      {
        id: 'cse-s2-ds', name: 'Data Structures',
        topics: [
          { id: 'cse-s2-ds-t1', name: 'Introduction to Data Structures, ADTs' },
          { id: 'cse-s2-ds-t2', name: 'Arrays, Stacks, Queues, and Applications' },
          { id: 'cse-s2-ds-t3', name: 'Linked Lists: Singly, Doubly, Circular' },
          { id: 'cse-s2-ds-t4', name: 'Trees: Binary Trees, BST' },
          { id: 'cse-s2-ds-t5', name: 'Introduction to Graphs' },
          { id: 'cse-s2-ds-t6', name: 'Basic Sorting and Searching Algorithms' },
        ],
      },
      commonEngGraphics,
      {
        id: 'cse-s2-chemlab', name: 'Engineering Chemistry Lab',
        topics: [
          { id: 'cse-s2-chemlab-t1', name: 'Titrimetric Analysis' },
          { id: 'cse-s2-chemlab-t2', name: 'Instrumental Methods' },
        ],
      },
      {
        id: 'cse-s2-dslab', name: 'Data Structures Lab (Using C/C++)',
        topics: [
          { id: 'cse-s2-dslab-t1', name: 'Implementation of Stack and Queue operations' },
          { id: 'cse-s2-dslab-t2', name: 'Implementation of Linked List operations' },
          { id: 'cse-s2-dslab-t3', name: 'Tree and Graph Traversal Implementations' },
        ],
      },
       commonWorkshop,
    ],
  },
  {
    semester: 3,
    subjects: [
      {
        id: 'cse-s3-mat3', name: 'Mathematics III (Probability, Statistics & Discrete Mathematics)',
        topics: [
          { id: 'cse-s3-mat3-t1', name: 'Probability Theory and Distributions' },
          { id: 'cse-s3-mat3-t2', name: 'Basic Statistics and Hypothesis Testing' },
          { id: 'cse-s3-mat3-t3', name: 'Set Theory, Relations, Functions' },
          { id: 'cse-s3-mat3-t4', name: 'Logic and Proof Techniques, Graph Theory Basics' },
        ],
      },
      {
        id: 'cse-s3-dld', name: 'Digital Logic Design',
        topics: [
          { id: 'cse-s3-dld-t1', name: 'Number Systems, Boolean Algebra & Logic Gates' },
          { id: 'cse-s3-dld-t2', name: 'Combinational Logic Circuits: Adders, Decoders, MUX' },
          { id: 'cse-s3-dld-t3', name: 'Sequential Logic Circuits: Flip-Flops, Registers, Counters' },
          { id: 'cse-s3-dld-t4', name: 'Memory Devices and Programmable Logic' },
        ],
      },
      {
        id: 'cse-s3-oop', name: 'Object-Oriented Programming (Using Java)',
        topics: [
          { id: 'cse-s3-oop-t1', name: 'Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism' },
          { id: 'cse-s3-oop-t2', name: 'Java Basics: Classes, Objects, Methods, Constructors' },
          { id: 'cse-s3-oop-t3', name: 'Inheritance, Interfaces, Packages in Java' },
          { id: 'cse-s3-oop-t4', name: 'Exception Handling and Multithreading in Java' },
          { id: 'cse-s3-oop-t5', name: 'Java Collections Framework Basics' },
        ],
      },
      {
        id: 'cse-s3-dsa', name: 'Design and Analysis of Algorithms',
        topics: [
          { id: 'cse-s3-dsa-t1', name: 'Algorithm Analysis: Asymptotic Notations (Big-O, Omega, Theta)' },
          { id: 'cse-s3-dsa-t2', name: 'Divide and Conquer (Merge Sort, Quick Sort, Binary Search)' },
          { id: 'cse-s3-dsa-t3', name: 'Greedy Algorithms (Knapsack, Huffman Coding, MST)' },
          { id: 'cse-s3-dsa-t4', name: 'Dynamic Programming (LCS, Matrix Chain)' },
          { id: 'cse-s3-dsa-t5', name: 'Introduction to NP-Completeness' },
        ],
      },
      {
        id: 'cse-s3-evs', name: 'Environmental Science & Engineering',
        topics: [
          { id: 'cse-s3-evs-t1', name: 'Ecosystems and Biodiversity' },
          { id: 'cse-s3-evs-t2', name: 'Environmental Pollution and Control' },
          { id: 'cse-s3-evs-t3', name: 'Sustainable Development' },
        ],
      },
      {
        id: 'cse-s3-dldlab', name: 'Digital Logic Design Lab',
        topics: [
          { id: 'cse-s3-dldlab-t1', name: 'Verification of Logic Gates & Combinational Circuits' },
          { id: 'cse-s3-dldlab-t2', name: 'Implementation of Sequential Circuits' },
        ],
      },
      {
        id: 'cse-s3-ooplab', name: 'Object-Oriented Programming Lab (Java)',
        topics: [
          { id: 'cse-s3-ooplab-t1', name: 'Programs on OOP Concepts' },
          { id: 'cse-s3-ooplab-t2', name: 'Programs on Exception Handling & Collections' },
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
          { id: 'cse-s4-os-t1', name: 'Introduction to OS, System Structures, Process Concept' },
          { id: 'cse-s4-os-t2', name: 'CPU Scheduling, Process Synchronization, Deadlocks' },
          { id: 'cse-s4-os-t3', name: 'Memory Management: Paging, Segmentation, Virtual Memory' },
          { id: 'cse-s4-os-t4', name: 'Storage Management: File Systems, Disk Scheduling' },
        ],
      },
      {
        id: 'cse-s4-dbms', name: 'Database Management Systems',
        topics: [
          { id: 'cse-s4-dbms-t1', name: 'Introduction to DBMS, ER Model, Relational Model' },
          { id: 'cse-s4-dbms-t2', name: 'Relational Algebra and SQL' },
          { id: 'cse-s4-dbms-t3', name: 'Database Design: Normalization (1NF, 2NF, 3NF, BCNF)' },
          { id: 'cse-s4-dbms-t4', name: 'Transaction Management, Concurrency Control, Recovery' },
        ],
      },
      {
        id: 'cse-s4-coa', name: 'Computer Organization and Architecture',
        topics: [
          { id: 'cse-s4-coa-t1', name: 'Basic Structure of Computers, Instruction Sets & Addressing Modes' },
          { id: 'cse-s4-coa-t2', name: 'CPU Design: ALU, Control Unit Design (Hardwired, Microprogrammed)' },
          { id: 'cse-s4-coa-t3', name: 'Pipelining, Memory System (Cache, Virtual Memory)' },
          { id: 'cse-s4-coa-t4', name: 'I/O Organization: Interrupts, DMA' },
        ],
      },
      {
        id: 'cse-s4-se', name: 'Software Engineering',
        topics: [
          { id: 'cse-s4-se-t1', name: 'Introduction to Software Engineering, SDLC Models (Waterfall, Agile)' },
          { id: 'cse-s4-se-t2', name: 'Requirement Engineering, Software Design Principles, UML' },
          { id: 'cse-s4-se-t3', name: 'Software Testing Techniques (Unit, Integration, System)' },
          { id: 'cse-s4-se-t4', name: 'Project Management Concepts (Estimation, Scheduling)' },
        ],
      },
      {
        id: 'cse-s4-flat', name: 'Formal Languages and Automata Theory',
        topics: [
          { id: 'cse-s4-flat-t1', name: 'Finite Automata (DFA, NFA), Regular Expressions & Languages' },
          { id: 'cse-s4-flat-t2', name: 'Context-Free Grammars and Languages, Pushdown Automata' },
          { id: 'cse-s4-flat-t3', name: 'Turing Machines, Undecidability' },
        ],
      },
      {
        id: 'cse-s4-oslab', name: 'Operating Systems Lab',
        topics: [
          { id: 'cse-s4-oslab-t1', name: 'Shell Scripting & System Calls' },
          { id: 'cse-s4-oslab-t2', name: 'CPU Scheduling & Process Synchronization Programs' },
        ],
      },
      {
        id: 'cse-s4-dbmslab', name: 'DBMS Lab',
        topics: [
          { id: 'cse-s4-dbmslab-t1', name: 'SQL Queries (DDL, DML, Joins, Subqueries)' },
          { id: 'cse-s4-dbmslab-t2', name: 'PL/SQL (Cursors, Triggers, Procedures)' },
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
          { id: 'cse-s5-cn-t1', name: 'Introduction to Networks, OSI & TCP/IP Models, Physical Layer' },
          { id: 'cse-s5-cn-t2', name: 'Data Link Layer: Error Detection/Correction, MAC Protocols (Ethernet, Wi-Fi)' },
          { id: 'cse-s5-cn-t3', name: 'Network Layer: IP Addressing (IPv4, IPv6), Routing Algorithms (RIP, OSPF)' },
          { id: 'cse-s5-cn-t4', name: 'Transport Layer: TCP, UDP, Congestion Control' },
          { id: 'cse-s5-cn-t5', name: 'Application Layer: HTTP, FTP, SMTP, DNS' },
        ],
      },
      {
        id: 'cse-s5-mpmc', name: 'Microprocessors and Microcontrollers',
        topics: [
          { id: 'cse-s5-mpmc-t1', name: '8086 Microprocessor Architecture & Instruction Set' },
          { id: 'cse-s5-mpmc-t2', name: 'Assembly Language Programming for 8086' },
          { id: 'cse-s5-mpmc-t3', name: 'Interfacing Memory and I/O Devices with 8086' },
          { id: 'cse-s5-mpmc-t4', name: 'Introduction to Microcontrollers (e.g., 8051/ARM)' },
        ],
      },
      {
        id: 'cse-s5-web', name: 'Web Technologies',
        topics: [
          { id: 'cse-s5-web-t1', name: 'HTML5, CSS3, JavaScript (ES6+)' },
          { id: 'cse-s5-web-t2', name: 'DOM Manipulation, Event Handling, AJAX, JSON' },
          { id: 'cse-s5-web-t3', name: 'Client-Side Frameworks (e.g., React or Angular basics)' },
          { id: 'cse-s5-web-t4', name: 'Server-Side Scripting (e.g., Node.js with Express)' },
          { id: 'cse-s5-web-t5', name: 'Database Connectivity (e.g., MongoDB with Mongoose)' },
        ],
      },
      {
        id: 'cse-s5-ai', name: 'Artificial Intelligence',
        topics: [
          { id: 'cse-s5-ai-t1', name: 'Introduction to AI, Intelligent Agents, Problem Solving by Searching (BFS, DFS, A*)' },
          { id: 'cse-s5-ai-t2', name: 'Knowledge Representation (Logic, Semantic Nets, Frames), Reasoning' },
          { id: 'cse-s5-ai-t3', name: 'Uncertainty, Introduction to Machine Learning Concepts' },
          { id: 'cse-s5-ai-t4', name: 'Natural Language Processing Basics, Expert Systems' },
        ],
      },
      {
        id: 'cse-s5-pe1', name: 'Professional Elective I (e.g., Data Mining)',
        topics: [
          { id: 'cse-s5-pe1-dm-t1', name: 'Introduction to Data Mining, KDD Process' },
          { id: 'cse-s5-pe1-dm-t2', name: 'Data Preprocessing, Association Rule Mining' },
          { id: 'cse-s5-pe1-dm-t3', name: 'Classification and Clustering Techniques' },
        ],
      },
      {
        id: 'cse-s5-cnlab', name: 'Computer Networks Lab',
        topics: [
          { id: 'cse-s5-cnlab-t1', name: 'Network Configuration & Socket Programming' },
          { id: 'cse-s5-cnlab-t2', name: 'Protocol Simulation (e.g. using Packet Tracer/NS3)' },
        ],
      },
      {
        id: 'cse-s5-weblab', name: 'Web Technologies Lab',
        topics: [
          { id: 'cse-s5-weblab-t1', name: 'Developing Web Applications with HTML, CSS, JS' },
          { id: 'cse-s5-weblab-t2', name: 'Client-side and Server-side Scripting Projects' },
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
          { id: 'cse-s6-cd-t1', name: 'Phases of Compiler, Lexical Analysis (Lex tool)' },
          { id: 'cse-s6-cd-t2', name: 'Syntax Analysis (Parsing Techniques - LR, LALR, Yacc tool)' },
          { id: 'cse-s6-cd-t3', name: 'Syntax Directed Translation, Intermediate Code Generation' },
          { id: 'cse-s6-cd-t4', name: 'Code Optimization Techniques, Code Generation' },
        ],
      },
      {
        id: 'cse-s6-ml', name: 'Machine Learning',
        topics: [
          { id: 'cse-s6-ml-t1', name: 'Supervised Learning (Regression, Classification - KNN, SVM, Decision Trees, Naive Bayes)' },
          { id: 'cse-s6-ml-t2', name: 'Unsupervised Learning (Clustering - K-Means, Hierarchical; Dimensionality Reduction - PCA)' },
          { id: 'cse-s6-ml-t3', name: 'Model Evaluation (Cross-validation, Metrics), Feature Engineering' },
          { id: 'cse-s6-ml-t4', name: 'Introduction to Neural Networks and Deep Learning Basics' },
        ],
      },
      {
        id: 'cse-s6-cns', name: 'Cryptography and Network Security',
        topics: [
          { id: 'cse-s6-cns-t1', name: 'Security Concepts, Classical Encryption (Caesar, Vigenere)' },
          { id: 'cse-s6-cns-t2', name: 'Symmetric Key Cryptography (DES, AES), Asymmetric Key (RSA, Diffie-Hellman)' },
          { id: 'cse-s6-cns-t3', name: 'Message Authentication (MAC, HMAC), Hash Functions (MD5, SHA), Digital Signatures' },
          { id: 'cse-s6-cns-t4', name: 'Network Security (IPsec, SSL/TLS, Firewalls, IDS/IPS), Web Security' },
        ],
      },
      {
        id: 'cse-s6-pe2', name: 'Professional Elective II (e.g., Cloud Computing)',
        topics: [
          { id: 'cse-s6-pe2-cc-t1', name: 'Cloud Computing Models (IaaS, PaaS, SaaS), Virtualization' },
          { id: 'cse-s6-pe2-cc-t2', name: 'Cloud Services (AWS, Azure, GCP overview), Storage Solutions' },
          { id: 'cse-s6-pe2-cc-t3', name: 'Cloud Security and Management' },
        ],
      },
      {
        id: 'cse-s6-oe1', name: 'Open Elective I (e.g., Principles of Management)',
        topics: [
          { id: 'cse-s6-oe1-pom-t1', name: 'Management Functions, Planning, Organizing' },
          { id: 'cse-s6-oe1-pom-t2', name: 'Staffing, Directing, Controlling' },
          { id: 'cse-s6-oe1-pom-t3', name: 'Organizational Behavior Basics' },
        ],
      },
      {
        id: 'cse-s6-cdlab', name: 'Compiler Design Lab',
        topics: [
          { id: 'cse-s6-cdlab-t1', name: 'Lexical Analyzer using Lex/Flex' },
          { id: 'cse-s6-cdlab-t2', name: 'Parser using Yacc/Bison' },
        ],
      },
      {
        id: 'cse-s6-mllab', name: 'Machine Learning Lab (Using Python)',
        topics: [
          { id: 'cse-s6-mllab-t1', name: 'Implementation of Supervised & Unsupervised algorithms (scikit-learn)' },
          { id: 'cse-s6-mllab-t2', name: 'Data Preprocessing and Model Evaluation Projects' },
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
          { id: 'cse-s7-dist-t1', name: 'Characterization of Distributed Systems, System Models, Interprocess Communication' },
          { id: 'cse-s7-dist-t2', name: 'Remote Invocation (RPC, RMI), Distributed File Systems (NFS)' },
          { id: 'cse-s7-dist-t3', name: 'Time and Global States, Coordination and Agreement (Clock Sync, Mutual Exclusion)' },
          { id: 'cse-s7-dist-t4', name: 'Consistency and Replication, Fault Tolerance, Transactions' },
        ],
      },
      {
        id: 'cse-s7-pe3', name: 'Professional Elective III (e.g., Natural Language Processing)',
        topics: [
          { id: 'cse-s7-pe3-nlp-t1', name: 'Introduction to NLP, Text Processing, Morphology' },
          { id: 'cse-s7-pe3-nlp-t2', name: 'Language Modeling, Part-of-Speech Tagging, Parsing' },
          { id: 'cse-s7-pe3-nlp-t3', name: 'Sentiment Analysis, Machine Translation Basics' },
        ],
      },
      {
        id: 'cse-s7-pe4', name: 'Professional Elective IV (e.g., Mobile App Development)',
        topics: [
          { id: 'cse-s7-pe4-mad-t1', name: 'Mobile Platforms (Android/iOS), UI/UX Design' },
          { id: 'cse-s7-pe4-mad-t2', name: 'Activity/View Lifecycle, Data Storage, Networking' },
          { id: 'cse-s7-pe4-mad-t3', name: 'Working with APIs, Publishing Apps' },
        ],
      },
      {
        id: 'cse-s7-oe2', name: 'Open Elective II (e.g., Cyber Security)',
        topics: [
          { id: 'cse-s7-oe2-cs-t1', name: 'Cyber Threats, Vulnerabilities, Attack Vectors' },
          { id: 'cse-s7-oe2-cs-t2', name: 'Network Defense, Web Application Security' },
          { id: 'cse-s7-oe2-cs-t3', name: 'Ethical Hacking Concepts, Digital Forensics Basics' },
        ],
      },
      {
        id: 'cse-s7-proj1', name: 'Project Work Phase I / Mini Project',
        topics: [
          { id: 'cse-s7-proj1-t1', name: 'Problem Identification and Literature Survey' },
          { id: 'cse-s7-proj1-t2', name: 'Requirement Analysis and System Design' },
          { id: 'cse-s7-proj1-t3', name: 'Initial Implementation and Prototyping' },
        ],
      },
      {
        id: 'cse-s7-indtrain', name: 'Industrial Training / Internship',
        topics: [
          { id: 'cse-s7-indtrain-t1', name: 'Industry Project Work' },
          { id: 'cse-s7-indtrain-t2', name: 'Report Submission and Presentation' },
        ],
      },
    ],
  },
  {
    semester: 8,
    subjects: [
      {
        id: 'cse-s8-pe5', name: 'Professional Elective V (e.g., Deep Learning)',
        topics: [
          { id: 'cse-s8-pe5-dl-t1', name: 'Neural Networks, Backpropagation, Activation Functions' },
          { id: 'cse-s8-pe5-dl-t2', name: 'Convolutional Neural Networks (CNNs), Recurrent Neural Networks (RNNs)' },
          { id: 'cse-s8-pe5-dl-t3', name: 'Frameworks (TensorFlow/PyTorch), Applications (Image/Text)' },
        ],
      },
      {
        id: 'cse-s8-pe6', name: 'Professional Elective VI (e.g., Blockchain Technology)',
        topics: [
          { id: 'cse-s8-pe6-bt-t1', name: 'Introduction to Blockchain, Cryptographic Foundations' },
          { id: 'cse-s8-pe6-bt-t2', name: 'Consensus Mechanisms, Smart Contracts (Solidity basics)' },
          { id: 'cse-s8-pe6-bt-t3', name: 'Blockchain Platforms (Ethereum), Applications & Challenges' },
        ],
      },
       {
        id: 'cse-s8-ethics', name: 'Professional Ethics & Human Values',
        topics: [
          { id: 'cse-s8-ethics-t1', name: 'Engineering Ethics, Codes of Conduct' },
          { id: 'cse-s8-ethics-t2', name: 'Social Responsibility, Intellectual Property Rights' },
          { id: 'cse-s8-ethics-t3', name: 'Ethical Dilemmas in Technology' },
        ],
      },
      {
        id: 'cse-s8-proj2', name: 'Project Work Phase II & Dissertation',
        topics: [
          { id: 'cse-s8-proj2-t1', name: 'Full Implementation and Testing of Project' },
          { id: 'cse-s8-proj2-t2', name: 'Result Analysis, Documentation, and Report Writing' },
          { id: 'cse-s8-proj2-t3', name: 'Final Project Viva-Voce and Demonstration' },
        ],
      },
    ],
  },
];
// --- End of CSE Detailed Data ---

// --- Agricultural Engineering (agri-eng) Data ---
const agriEngSemesters: DepartmentSemester[] = [
  { // Semester 1
    semester: 1,
    subjects: [
      commonFirstYearMaths1, commonFirstYearPhysics, commonFirstYearChemistry, commonEnglishComm,
      { id: 'agri-s1-intro', name: 'Introduction to Agricultural Engineering', topics: [
        { id: 'agri-s1-intro-t1', name: 'Scope and Importance' }, { id: 'agri-s1-intro-t2', name: 'Farm Power & Machinery Overview' }, { id: 'agri-s1-intro-t3', name: 'Soil & Water Conservation Basics' }
      ]},
      commonEngGraphics, commonWorkshop,
    ],
  },
  { // Semester 2
    semester: 2,
    subjects: [
      commonFirstYearMaths2, commonProgrammingC, commonBasicElectrical,
      { id: 'agri-s2-engmech', name: 'Engineering Mechanics', topics: [
        { id: 'agri-s2-engmech-t1', name: 'Statics: Forces, Equilibrium' }, { id: 'agri-s2-engmech-t2', name: 'Dynamics: Kinematics, Kinetics' }, { id: 'agri-s2-engmech-t3', name: 'Friction and Applications' }
      ]},
      { id: 'agri-s2-survey', name: 'Surveying and Leveling', topics: [
        { id: 'agri-s2-survey-t1', name: 'Chain and Compass Surveying' }, { id: 'agri-s2-survey-t2', name: 'Plane Table and Theodolite Surveying' }, { id: 'agri-s2-survey-t3', name: 'Contouring and Leveling' }
      ]},
      { id: 'agri-s2-survey-lab', name: 'Surveying Lab', topics: [{ id: 'agri-s2-survey-lab-t1', name: 'Field Practice' }]},
      { id: 'agri-s2-prog-lab', name: 'Programming Lab (C)', topics: [{ id: 'agri-s2-prog-lab-t1', name: 'Agricultural Applications' }]},
    ],
  },
  { // Semester 3
    semester: 3,
    subjects: [
      { id: 'agri-s3-math3', name: 'Mathematics III (Statistics & Numerical Methods)', topics: [
        { id: 'agri-s3-math3-t1', name: 'Probability & Statistics' }, { id: 'agri-s3-math3-t2', name: 'Numerical Solutions of Equations' }, { id: 'agri-s3-math3-t3', name: 'Interpolation & Numerical Integration' }
      ]},
      { id: 'agri-s3-som', name: 'Strength of Materials', topics: [
        { id: 'agri-s3-som-t1', name: 'Stress, Strain, Elastic Constants' }, { id: 'agri-s3-som-t2', name: 'Beams, Bending, Torsion' }, { id: 'agri-s3-som-t3', name: 'Columns and Struts' }
      ]},
      { id: 'agri-s3-fm', name: 'Fluid Mechanics', topics: [
        { id: 'agri-s3-fm-t1', name: 'Fluid Properties, Statics' }, { id: 'agri-s3-fm-t2', name: 'Fluid Dynamics, Bernoulli’s Theorem' }, { id: 'agri-s3-fm-t3', name: 'Flow Through Pipes, Open Channels' }
      ]},
      { id: 'agri-s3-thermo', name: 'Engineering Thermodynamics', topics: [
        { id: 'agri-s3-thermo-t1', name: 'Basic Concepts, Laws of Thermodynamics' }, { id: 'agri-s3-thermo-t2', name: 'Properties of Pure Substances' }, { id: 'agri-s3-thermo-t3', name: 'Air Standard Cycles' }
      ]},
      { id: 'agri-s3-soilsci', name: 'Soil Science', topics: [
        { id: 'agri-s3-soilsci-t1', name: 'Soil Formation, Properties' }, { id: 'agri-s3-soilsci-t2', name: 'Soil Fertility and Plant Nutrition' }, { id: 'agri-s3-soilsci-t3', name: 'Soil Conservation' }
      ]},
      { id: 'agri-s3-fm-lab', name: 'Fluid Mechanics Lab', topics: [{ id: 'agri-s3-fm-lab-t1', name: 'Experiments on Flow Measurement' }]},
      { id: 'agri-s3-som-lab', name: 'Strength of Materials Lab', topics: [{ id: 'agri-s3-som-lab-t1', name: 'Material Testing Experiments' }]},
    ],
  },
  { // Semester 4
    semester: 4,
    subjects: [
      { id: 'agri-s4-fpm', name: 'Farm Power and Machinery I', topics: [
        { id: 'agri-s4-fpm-t1', name: 'IC Engines: Principles, Types' }, { id: 'agri-s4-fpm-t2', name: 'Tractors: Types, Systems' }, { id: 'agri-s4-fpm-t3', name: 'Tillage and Sowing Equipment' }
      ]},
      { id: 'agri-s4-swe', name: 'Soil and Water Engineering I (Irrigation)', topics: [
        { id: 'agri-s4-swe-t1', name: 'Soil-Water-Plant Relationships' }, { id: 'agri-s4-swe-t2', name: 'Methods of Irrigation' }, { id: 'agri-s4-swe-t3', name: 'Design of Irrigation Systems' }
      ]},
      { id: 'agri-s4-ht', name: 'Heat Transfer', topics: [
        { id: 'agri-s4-ht-t1', name: 'Conduction, Convection' }, { id: 'agri-s4-ht-t2', name: 'Radiation' }, { id: 'agri-s4-ht-t3', name: 'Heat Exchangers' }
      ]},
      { id: 'agri-s4-crop', name: 'Crop Production Technology', topics: [
        { id: 'agri-s4-crop-t1', name: 'Principles of Agronomy' }, { id: 'agri-s4-crop-t2', name: 'Cultivation of Major Crops' }, { id: 'agri-s4-crop-t3', name: 'Weed and Pest Management' }
      ]},
      { id: 'agri-s4-evs', name: 'Environmental Science & Management', topics: [
        { id: 'agri-s4-evs-t1', name: 'Agricultural Pollution' }, { id: 'agri-s4-evs-t2', name: 'Waste Management in Agriculture' }, { id: 'agri-s4-evs-t3', name: 'Climate Change Impacts' }
      ]},
      { id: 'agri-s4-fpm-lab', name: 'Farm Power and Machinery Lab I', topics: [{ id: 'agri-s4-fpm-lab-t1', name: 'Engine Disassembly, Equipment Operation' }]},
      { id: 'agri-s4-swe-lab', name: 'Soil and Water Engineering Lab I', topics: [{ id: 'agri-s4-swe-lab-t1', name: 'Irrigation System Design Exercises' }]},
    ],
  },
  { // Semester 5
    semester: 5,
    subjects: [
      { id: 'agri-s5-fpm2', name: 'Farm Power and Machinery II', topics: [
        { id: 'agri-s5-fpm2-t1', name: 'Harvesting and Threshing Equipment' }, { id: 'agri-s5-fpm2-t2', name: 'Plant Protection Equipment' }, { id: 'agri-s5-fpm2-t3', name: 'Precision Agriculture Tools' }
      ]},
      { id: 'agri-s5-swe2', name: 'Soil and Water Engineering II (Drainage & Conservation)', topics: [
        { id: 'agri-s5-swe2-t1', name: 'Agricultural Drainage Systems' }, { id: 'agri-s5-swe2-t2', name: 'Soil Erosion and Control Measures' }, { id: 'agri-s5-swe2-t3', name: 'Watershed Management' }
      ]},
      { id: 'agri-s5-ape', name: 'Agricultural Process Engineering I', topics: [
        { id: 'agri-s5-ape-t1', name: 'Properties of Agricultural Materials' }, { id: 'agri-s5-ape-t2', name: 'Cleaning, Grading, Drying' }, { id: 'agri-s5-ape-t3', name: 'Milling of Grains' }
      ]},
      { id: 'agri-s5-ds', name: 'Design of Structures', topics: [
        { id: 'agri-s5-ds-t1', name: 'RCC Design Basics' }, { id: 'agri-s5-ds-t2', name: 'Design of Farm Structures (Sheds, Silos)' }, { id: 'agri-s5-ds-t3', name: 'Steel Structures Basics' }
      ]},
      { id: 'agri-s5-pe1', name: 'Professional Elective I (e.g., Dairy Engineering)', topics: [
        { id: 'agri-s5-pe1-dairy-t1', name: 'Milk Processing' }, { id: 'agri-s5-pe1-dairy-t2', name: 'Dairy Plant Design' }
      ]},
      { id: 'agri-s5-fpm-lab2', name: 'Farm Power and Machinery Lab II', topics: [{ id: 'agri-s5-fpm-lab2-t1', name: 'Advanced Equipment Operation' }]},
      { id: 'agri-s5-ape-lab', name: 'Agricultural Process Engineering Lab I', topics: [{ id: 'agri-s5-ape-lab-t1', name: 'Processing Experiments' }]},
    ],
  },
  { // Semester 6
    semester: 6,
    subjects: [
      { id: 'agri-s6-ape2', name: 'Agricultural Process Engineering II', topics: [
        { id: 'agri-s6-ape2-t1', name: 'Storage Engineering' }, { id: 'agri-s6-ape2-t2', name: 'Food Packaging Technology' }, { id: 'agri-s6-ape2-t3', name: 'By-product Utilization' }
      ]},
      { id: 'agri-s6-re', name: 'Renewable Energy Sources', topics: [
        { id: 'agri-s6-re-t1', name: 'Solar Energy Applications in Agriculture' }, { id: 'agri-s6-re-t2', name: 'Biomass Energy Conversion' }, { id: 'agri-s6-re-t3', name: 'Wind Energy Basics' }
      ]},
      { id: 'agri-s6-fst', name: 'Food Science and Technology', topics: [
        { id: 'agri-s6-fst-t1', name: 'Principles of Food Preservation' }, { id: 'agri-s6-fst-t2', name: 'Food Microbiology' }, { id: 'agri-s6-fst-t3', name: 'Food Quality and Safety' }
      ]},
      { id: 'agri-s6-dm', name: 'Design of Machinery', topics: [
        { id: 'agri-s6-dm-t1', name: 'Design of Machine Elements (Shafts, Gears)' }, { id: 'agri-s6-dm-t2', name: 'Design of Agricultural Implements' }, { id: 'agri-s6-dm-t3', name: 'CAD for Machinery Design' }
      ]},
      { id: 'agri-s6-pe2', name: 'Professional Elective II (e.g., Greenhouse Technology)', topics: [
        { id: 'agri-s6-pe2-green-t1', name: 'Greenhouse Design and Construction' }, { id: 'agri-s6-pe2-green-t2', name: 'Controlled Environment Agriculture' }
      ]},
      { id: 'agri-s6-re-lab', name: 'Renewable Energy Lab', topics: [{ id: 'agri-s6-re-lab-t1', name: 'Solar and Biomass Experiments' }]},
      { id: 'agri-s6-dm-lab', name: 'Design of Machinery Lab', topics: [{ id: 'agri-s6-dm-lab-t1', name: 'Design Projects using CAD' }]},
    ],
  },
  { // Semester 7
    semester: 7,
    subjects: [
      { id: 'agri-s7-fsm', name: 'Farm Structures and Management', topics: [
        { id: 'agri-s7-fsm-t1', name: 'Planning and Layout of Farmstead' }, { id: 'agri-s7-fsm-t2', name: 'Livestock Housing Systems' }, { id: 'agri-s7-fsm-t3', name: 'Rural Roads and Electrification' }
      ]},
      { id: 'agri-s7-pa', name: 'Precision Agriculture & GIS', topics: [
        { id: 'agri-s7-pa-t1', name: 'GPS, GIS, Remote Sensing Applications' }, { id: 'agri-s7-pa-t2', name: 'Variable Rate Technology' }, { id: 'agri-s7-pa-t3', name: 'Site-Specific Nutrient Management' }
      ]},
      { id: 'agri-s7-pe3', name: 'Professional Elective III', topics: [{ id: 'agri-s7-pe3-t1', name: 'Advanced Topic 1' }]},
      { id: 'agri-s7-oe1', name: 'Open Elective I', topics: [{ id: 'agri-s7-oe1-t1', name: 'Interdisciplinary Topic 1' }]},
      { id: 'agri-s7-proj1', name: 'Project Work Phase I', topics: [
        { id: 'agri-s7-proj1-t1', name: 'Literature Review and Problem Definition' }, { id: 'agri-s7-proj1-t2', name: 'Methodology and Design' }
      ]},
      { id: 'agri-s7-pa-lab', name: 'Precision Agriculture Lab', topics: [{ id: 'agri-s7-pa-lab-t1', name: 'GIS Software Practice' }]},
      { id: 'agri-s7-seminar', name: 'Seminar', topics: [{ id: 'agri-s7-seminar-t1', name: 'Technical Presentation' }]},
    ],
  },
  { // Semester 8
    semester: 8,
    subjects: [
      { id: 'agri-s8-abm', name: 'Agri-Business Management & Entrepreneurship', topics: [
        { id: 'agri-s8-abm-t1', name: 'Principles of Agribusiness' }, { id: 'agri-s8-abm-t2', name: 'Marketing and Finance' }, { id: 'agri-s8-abm-t3', name: 'Entrepreneurship Development' }
      ]},
      { id: 'agri-s8-pe4', name: 'Professional Elective IV', topics: [{ id: 'agri-s8-pe4-t1', name: 'Advanced Topic 2' }]},
      { id: 'agri-s8-pe5', name: 'Professional Elective V', topics: [{ id: 'agri-s8-pe5-t1', name: 'Advanced Topic 3' }]},
      { id: 'agri-s8-proj2', name: 'Project Work Phase II & Dissertation', topics: [
        { id: 'agri-s8-proj2-t1', name: 'Implementation and Results' }, { id: 'agri-s8-proj2-t2', name: 'Report Writing and Viva-Voce' }
      ]},
      { id: 'agri-s8-ethics', name: 'Professional Ethics', topics: [{ id: 'agri-s8-ethics-t1', name: 'Engineering Ethics' }]},
    ],
  },
];

// --- Artificial Intelligence and Data Science (ai-ds) Data ---
const aiDsSemesters: DepartmentSemester[] = [
  { // Semester 1
    semester: 1,
    subjects: [
      commonFirstYearMaths1, commonFirstYearPhysics, commonProgrammingC, commonBasicElectrical, commonEnglishComm,
      { id: 'aids-s1-intro', name: 'Introduction to AI & DS', topics: [
        { id: 'aids-s1-intro-t1', name: 'Overview of AI and Data Science' }, { id: 'aids-s1-intro-t2', name: 'Applications and Ethical Considerations' }
      ]},
      { id: 'aids-s1-prog-lab', name: 'Programming Lab (C)', topics: [{ id: 'aids-s1-prog-lab-t1', name: 'Problem Solving using C' }]},
    ],
  },
  { // Semester 2
    semester: 2,
    subjects: [
      commonFirstYearMaths2, commonFirstYearChemistry,
      { id: 'aids-s2-ds', name: 'Data Structures for AI/DS', topics: [
        { id: 'aids-s2-ds-t1', name: 'Arrays, Stacks, Queues, Linked Lists' }, { id: 'aids-s2-ds-t2', name: 'Trees, Graphs, Hash Tables' }, { id: 'aids-s2-ds-t3', name: 'Complexity Analysis' }
      ]},
      { id: 'aids-s2-py', name: 'Python Programming for Data Science', topics: [
        { id: 'aids-s2-py-t1', name: 'Python Basics, Control Flow, Functions' }, { id: 'aids-s2-py-t2', name: 'Data Structures in Python (Lists, Tuples, Dictionaries)' }, { id: 'aids-s2-py-t3', name: 'NumPy and Pandas Libraries' }
      ]},
      commonEngGraphics,
      { id: 'aids-s2-ds-lab', name: 'Data Structures Lab', topics: [{ id: 'aids-s2-ds-lab-t1', name: 'Implementation of DS using Python/C++' }]},
      { id: 'aids-s2-py-lab', name: 'Python Programming Lab', topics: [{ id: 'aids-s2-py-lab-t1', name: 'Data Manipulation with NumPy/Pandas' }]},
    ],
  },
  { // Semester 3
    semester: 3,
    subjects: [
      { id: 'aids-s3-probstat', name: 'Probability and Statistics for Data Science', topics: [
        { id: 'aids-s3-probstat-t1', name: 'Probability, Random Variables, Distributions' }, { id: 'aids-s3-probstat-t2', name: 'Descriptive & Inferential Statistics' }, { id: 'aids-s3-probstat-t3', name: 'Hypothesis Testing, Regression Basics' }
      ]},
      { id: 'aids-s3-dbms', name: 'Database Management Systems', topics: [
        { id: 'aids-s3-dbms-t1', name: 'Relational Model, SQL' }, { id: 'aids-s3-dbms-t2', name: 'Normalization, NoSQL Databases Introduction' }
      ]},
      { id: 'aids-s3-dld', name: 'Digital Logic and Computer Architecture', topics: [
        { id: 'aids-s3-dld-t1', name: 'Logic Gates, Combinational & Sequential Circuits' }, { id: 'aids-s3-dld-t2', name: 'CPU Architecture, Memory Organization' }
      ]},
      { id: 'aids-s3-oop', name: 'Object-Oriented Programming (Python/Java)', topics: [
        { id: 'aids-s3-oop-t1', name: 'OOP Concepts' }, { id: 'aids-s3-oop-t2', name: 'Classes, Objects, Inheritance, Polymorphism' }
      ]},
      { id: 'aids-s3-dmath', name: 'Discrete Mathematics for AI', topics: [
        { id: 'aids-s3-dmath-t1', name: 'Set Theory, Logic, Proof Techniques' }, { id: 'aids-s3-dmath-t2', name: 'Graph Theory, Combinatorics' }
      ]},
      { id: 'aids-s3-dbms-lab', name: 'DBMS Lab', topics: [{ id: 'aids-s3-dbms-lab-t1', name: 'SQL and NoSQL Exercises' }]},
      { id: 'aids-s3-stat-lab', name: 'Statistics Lab (Using R/Python)', topics: [{ id: 'aids-s3-stat-lab-t1', name: 'Statistical Analysis and Visualization' }]},
    ],
  },
  { // Semester 4
    semester: 4,
    subjects: [
      { id: 'aids-s4-fai', name: 'Foundations of Artificial Intelligence', topics: [
        { id: 'aids-s4-fai-t1', name: 'Intelligent Agents, Search Algorithms (BFS, DFS, A*)' }, { id: 'aids-s4-fai-t2', name: 'Knowledge Representation & Reasoning' }, { id: 'aids-s4-fai-t3', name: 'Game Playing, Constraint Satisfaction' }
      ]},
      { id: 'aids-s4-daa', name: 'Design and Analysis of Algorithms', topics: [
        { id: 'aids-s4-daa-t1', name: 'Algorithm Design Techniques (Greedy, DP, D&C)' }, { id: 'aids-s4-daa-t2', name: 'Complexity Analysis, NP-Completeness' }
      ]},
      { id: 'aids-s4-os', name: 'Operating Systems', topics: [
        { id: 'aids-s4-os-t1', name: 'Process, Thread, CPU Scheduling' }, { id: 'aids-s4-os-t2', name: 'Memory Management, File Systems' }
      ]},
      { id: 'aids-s4-mlf', name: 'Machine Learning Foundations', topics: [
        { id: 'aids-s4-mlf-t1', name: 'Introduction to ML, Supervised Learning (Regression, KNN)' }, { id: 'aids-s4-mlf-t2', name: 'Unsupervised Learning (K-Means), Model Evaluation' }
      ]},
      { id: 'aids-s4-evs', name: 'Environmental Science', topics: [{id: 'aids-s4-evs-t1', name: 'Ecology and Environment'}]},
      { id: 'aids-s4-ai-lab', name: 'AI Lab (Search Algorithms)', topics: [{ id: 'aids-s4-ai-lab-t1', name: 'Implementation of Search Techniques' }]},
      { id: 'aids-s4-ml-lab', name: 'Machine Learning Lab I', topics: [{ id: 'aids-s4-ml-lab-t1', name: 'Basic ML Model Implementation' }]},
    ],
  },
  { // Semester 5
    semester: 5,
    subjects: [
      { id: 'aids-s5-aml', name: 'Applied Machine Learning', topics: [
        { id: 'aids-s5-aml-t1', name: 'Advanced Supervised Learning (SVM, Decision Trees, Ensembles)' }, { id: 'aids-s5-aml-t2', name: 'Dimensionality Reduction (PCA), Feature Engineering' }, { id: 'aids-s5-aml-t3', name: 'Reinforcement Learning Basics' }
      ]},
      { id: 'aids-s5-cn', name: 'Computer Networks', topics: [
        { id: 'aids-s5-cn-t1', name: 'OSI & TCP/IP Models' }, { id: 'aids-s5-cn-t2', name: 'Network Protocols, IP Addressing' }
      ]},
      { id: 'aids-s5-bda', name: 'Big Data Analytics', topics: [
        { id: 'aids-s5-bda-t1', name: 'Introduction to Big Data, Hadoop Ecosystem' }, { id: 'aids-s5-bda-t2', name: 'MapReduce, Spark Basics' }, { id: 'aids-s5-bda-t3', name: 'NoSQL Databases for Big Data' }
      ]},
      { id: 'aids-s5-dv', name: 'Data Visualization', topics: [
        { id: 'aids-s5-dv-t1', name: 'Principles of Visualization' }, { id: 'aids-s5-dv-t2', name: 'Tools (Matplotlib, Seaborn, Tableau/PowerBI basics)' }
      ]},
      { id: 'aids-s5-pe1', name: 'Professional Elective I (e.g., NLP Basics)', topics: [
        { id: 'aids-s5-pe1-nlp-t1', name: 'Text Preprocessing' }, { id: 'aids-s5-pe1-nlp-t2', name: 'Language Models' }
      ]},
      { id: 'aids-s5-aml-lab', name: 'Applied Machine Learning Lab', topics: [{ id: 'aids-s5-aml-lab-t1', name: 'Projects using ML Algorithms' }]},
      { id: 'aids-s5-bda-lab', name: 'Big Data Lab', topics: [{ id: 'aids-s5-bda-lab-t1', name: 'Hadoop/Spark Exercises' }]},
    ],
  },
  { // Semester 6
    semester: 6,
    subjects: [
      { id: 'aids-s6-dl', name: 'Deep Learning', topics: [
        { id: 'aids-s6-dl-t1', name: 'Neural Networks, Backpropagation' }, { id: 'aids-s6-dl-t2', name: 'CNNs, RNNs (LSTM, GRU)' }, { id: 'aids-s6-dl-t3', name: 'Frameworks (TensorFlow/PyTorch)' }
      ]},
      { id: 'aids-s6-dssec', name: 'Data Security and Privacy', topics: [
        { id: 'aids-s6-dssec-t1', name: 'Cryptography Basics for Data' }, { id: 'aids-s6-dssec-t2', name: 'Data Anonymization Techniques' }, { id: 'aids-s6-dssec-t3', name: 'Privacy-Preserving Data Mining' }
      ]},
      { id: 'aids-s6-cloud', name: 'Cloud Computing for AI/DS', topics: [
        { id: 'aids-s6-cloud-t1', name: 'Cloud Platforms (AWS, Azure, GCP)' }, { id: 'aids-s6-cloud-t2', name: 'MLOps on Cloud' }
      ]},
      { id: 'aids-s6-iot', name: 'Internet of Things (IoT) Analytics', topics: [
        { id: 'aids-s6-iot-t1', name: 'IoT Architectures' }, { id: 'aids-s6-iot-t2', name: 'Data Collection & Analysis from IoT Devices' }
      ]},
      { id: 'aids-s6-pe2', name: 'Professional Elective II (e.g., Computer Vision Basics)', topics: [
        { id: 'aids-s6-pe2-cv-t1', name: 'Image Processing Basics' }, { id: 'aids-s6-pe2-cv-t2', name: 'Feature Extraction' }
      ]},
      { id: 'aids-s6-dl-lab', name: 'Deep Learning Lab', topics: [{ id: 'aids-s6-dl-lab-t1', name: 'Implementation of NNs, CNNs, RNNs' }]},
      { id: 'aids-s6-minorproj', name: 'Minor Project (AI/DS)', topics: [{ id: 'aids-s6-minorproj-t1', name: 'Team-based Project' }]},
    ],
  },
  { // Semester 7
    semester: 7,
    subjects: [
      { id: 'aids-s7-air', name: 'AI and Robotics', topics: [
        { id: 'aids-s7-air-t1', name: 'Robot Kinematics and Dynamics' }, { id: 'aids-s7-air-t2', name: 'Path Planning, Computer Vision for Robotics' }
      ]},
      { id: 'aids-s7-ba', name: 'Business Analytics', topics: [
        { id: 'aids-s7-ba-t1', name: 'Data-Driven Decision Making' }, { id: 'aids-s7-ba-t2', name: 'Predictive Analytics for Business' }
      ]},
      { id: 'aids-s7-pe3', name: 'Professional Elective III', topics: [{ id: 'aids-s7-pe3-t1', name: 'Specialized AI Topic 1' }]},
      { id: 'aids-s7-oe1', name: 'Open Elective I', topics: [{ id: 'aids-s7-oe1-t1', name: 'Interdisciplinary Topic' }]},
      { id: 'aids-s7-proj1', name: 'Project Work Phase I', topics: [
        { id: 'aids-s7-proj1-t1', name: 'Literature Survey, Problem Formulation' }, { id: 'aids-s7-proj1-t2', name: 'System Design and Methodology' }
      ]},
      { id: 'aids-s7-ethics', name: 'Ethics in AI and Data Science', topics: [
        { id: 'aids-s7-ethics-t1', name: 'Bias, Fairness, Accountability' }, { id: 'aids-s7-ethics-t2', name: 'Societal Impact of AI' }
      ]},
      { id: 'aids-s7-intern', name: 'Internship/Industrial Training', topics: [{ id: 'aids-s7-intern-t1', name: 'Industry Experience' }]},
    ],
  },
  { // Semester 8
    semester: 8,
    subjects: [
      { id: 'aids-s8-deploy', name: 'Deployment of AI/ML Models', topics: [
        { id: 'aids-s8-deploy-t1', name: 'Model Serving, MLOps Pipelines' }, { id: 'aids-s8-deploy-t2', name: 'Scalability and Monitoring' }
      ]},
      { id: 'aids-s8-pe4', name: 'Professional Elective IV', topics: [{ id: 'aids-s8-pe4-t1', name: 'Specialized AI Topic 2' }]},
      { id: 'aids-s8-pe5', name: 'Professional Elective V', topics: [{ id: 'aids-s8-pe5-t1', name: 'Specialized Data Science Topic' }]},
      { id: 'aids-s8-proj2', name: 'Project Work Phase II & Dissertation', topics: [
        { id: 'aids-s8-proj2-t1', name: 'Implementation, Testing, and Evaluation' }, { id: 'aids-s8-proj2-t2', name: 'Thesis Writing and Viva-Voce' }
      ]},
    ],
  },
];

// --- Biomedical Engineering (bio-med) Data ---
const bioMedSemesters: DepartmentSemester[] = [
  { // Semester 1
    semester: 1,
    subjects: [
      commonFirstYearMaths1, commonFirstYearPhysics, commonFirstYearChemistry, commonEnglishComm,
      { id: 'bme-s1-intro', name: 'Introduction to Biomedical Engineering', topics: [
        { id: 'bme-s1-intro-t1', name: 'Scope & Applications' }, { id: 'bme-s1-intro-t2', name: 'Overview of Medical Instrumentation' }
      ]},
      commonEngGraphics, commonWorkshop,
    ],
  },
  { // Semester 2
    semester: 2,
    subjects: [
      commonFirstYearMaths2, commonProgrammingC, commonBasicElectrical,
      { id: 'bme-s2-ap', name: 'Anatomy and Physiology', topics: [
        { id: 'bme-s2-ap-t1', name: 'Cell Structure, Tissues' }, { id: 'bme-s2-ap-t2', name: 'Human Organ Systems (Cardiovascular, Respiratory etc.)' }
      ]},
      { id: 'bme-s2-biochem', name: 'Biochemistry', topics: [
        { id: 'bme-s2-biochem-t1', name: 'Carbohydrates, Lipids, Proteins' }, { id: 'bme-s2-biochem-t2', name: 'Enzymes, Metabolism Basics' }
      ]},
      { id: 'bme-s2-ap-lab', name: 'Anatomy & Physiology Lab', topics: [{ id: 'bme-s2-ap-lab-t1', name: 'Microscopy, System Models' }]},
      { id: 'bme-s2-prog-lab', name: 'Programming Lab (C)', topics: [{ id: 'bme-s2-prog-lab-t1', name: 'Biomedical Applications' }]},
    ],
  },
  { // Semester 3
    semester: 3,
    subjects: [
      { id: 'bme-s3-math3', name: 'Mathematics III (Transforms & Complex Variables)', topics: [
        { id: 'bme-s3-math3-t1', name: 'Laplace & Fourier Transforms' }, { id: 'bme-s3-math3-t2', name: 'Complex Analysis' }
      ]},
      { id: 'bme-s3-ec', name: 'Electronic Circuits', topics: [
        { id: 'bme-s3-ec-t1', name: 'Diodes, Transistors, Amplifiers' }, { id: 'bme-s3-ec-t2', name: 'Operational Amplifiers Basics' }
      ]},
      { id: 'bme-s3-dld', name: 'Digital Logic Design', topics: [
        { id: 'bme-s3-dld-t1', name: 'Boolean Algebra, Logic Gates' }, { id: 'bme-s3-dld-t2', name: 'Combinational & Sequential Circuits' }
      ]},
      { id: 'bme-s3-sensors', name: 'Sensors and Transducers', topics: [
        { id: 'bme-s3-sensors-t1', name: 'Principles of Sensing' }, { id: 'bme-s3-sensors-t2', name: 'Biomedical Transducers (Pressure, Temperature, Flow)' }
      ]},
      { id: 'bme-s3-biomat', name: 'Biomaterials Science', topics: [
        { id: 'bme-s3-biomat-t1', name: 'Metals, Ceramics, Polymers in Medicine' }, { id: 'bme-s3-biomat-t2', name: 'Biocompatibility' }
      ]},
      { id: 'bme-s3-ec-lab', name: 'Electronic Circuits Lab', topics: [{ id: 'bme-s3-ec-lab-t1', name: 'Circuit Design & Testing' }]},
      { id: 'bme-s3-dld-lab', name: 'Digital Logic Lab', topics: [{ id: 'bme-s3-dld-lab-t1', name: 'Logic Circuit Implementation' }]},
    ],
  },
  { // Semester 4
    semester: 4,
    subjects: [
      { id: 'bme-s4-signals', name: 'Signals and Systems', topics: [
        { id: 'bme-s4-signals-t1', name: 'Continuous & Discrete Time Signals/Systems' }, { id: 'bme-s4-signals-t2', name: 'Fourier, Laplace, Z-Transforms Applications' }
      ]},
      { id: 'bme-s4-mpmc', name: 'Microprocessors and Microcontrollers', topics: [
        { id: 'bme-s4-mpmc-t1', name: '8086/8051 Architecture' }, { id: 'bme-s4-mpmc-t2', name: 'Interfacing for Biomedical Applications' }
      ]},
      { id: 'bme-s4-bmi', name: 'Biomedical Instrumentation I', topics: [
        { id: 'bme-s4-bmi-t1', name: 'Bioelectric Signals (ECG, EEG, EMG)' }, { id: 'bme-s4-bmi-t2', name: 'Recording Electrodes and Amplifiers' }
      ]},
      { id: 'bme-s4-biomech', name: 'Biomechanics', topics: [
        { id: 'bme-s4-biomech-t1', name: 'Statics & Dynamics of Human Body' }, { id: 'bme-s4-biomech-t2', name: 'Biofluid Mechanics Basics' }
      ]},
      { id: 'bme-s4-stat', name: 'Biostatistics', topics: [
        { id: 'bme-s4-stat-t1', name: 'Statistical Methods in Biology & Medicine' }, { id: 'bme-s4-stat-t2', name: 'Hypothesis Testing, ANOVA' }
      ]},
      { id: 'bme-s4-mpmc-lab', name: 'Microprocessors Lab', topics: [{ id: 'bme-s4-mpmc-lab-t1', name: 'Interfacing Experiments' }]},
      { id: 'bme-s4-bmi-lab', name: 'Biomedical Instrumentation Lab I', topics: [{ id: 'bme-s4-bmi-lab-t1', name: 'Bio-signal Acquisition' }]},
    ],
  },
  { // Semester 5
    semester: 5,
    subjects: [
      { id: 'bme-s5-dsp', name: 'Digital Signal Processing for BME', topics: [
        { id: 'bme-s5-dsp-t1', name: 'DFT, FFT, Digital Filters (FIR, IIR)' }, { id: 'bme-s5-dsp-t2', name: 'Applications in Biomedical Signal Processing' }
      ]},
      { id: 'bme-s5-bmi2', name: 'Biomedical Instrumentation II', topics: [
        { id: 'bme-s5-bmi2-t1', name: 'Diagnostic Instruments (X-Ray, CT, MRI Basics)' }, { id: 'bme-s5-bmi2-t2', name: 'Therapeutic Instruments (Pacemakers, Defibrillators)' }
      ]},
      { id: 'bme-s5-control', name: 'Control Systems Engineering', topics: [
        { id: 'bme-s5-control-t1', name: 'Open & Closed Loop Systems' }, { id: 'bme-s5-control-t2', name: 'Stability Analysis (Routh-Hurwitz, Root Locus)' }
      ]},
      { id: 'bme-s5-patho', name: 'Pathology and Microbiology', topics: [
        { id: 'bme-s5-patho-t1', name: 'Cellular Pathology, Inflammation' }, { id: 'bme-s5-patho-t2', name: 'Common Microbial Diseases' }
      ]},
      { id: 'bme-s5-pe1', name: 'Professional Elective I (e.g., Medical Imaging Techniques)', topics: [
        { id: 'bme-s5-pe1-img-t1', name: 'Principles of X-Ray, CT' }, { id: 'bme-s5-pe1-img-t2', name: 'Ultrasound and MRI Imaging' }
      ]},
      { id: 'bme-s5-dsp-lab', name: 'DSP Lab', topics: [{ id: 'bme-s5-dsp-lab-t1', name: 'Filter Design, Signal Analysis using MATLAB/Python' }]},
      { id: 'bme-s5-bmi-lab2', name: 'Biomedical Instrumentation Lab II', topics: [{ id: 'bme-s5-bmi-lab2-t1', name: 'Working with Medical Equipment Simulators' }]},
    ],
  },
  { // Semester 6
    semester: 6,
    subjects: [
      { id: 'bme-s6-imgproc', name: 'Medical Image Processing', topics: [
        { id: 'bme-s6-imgproc-t1', name: 'Image Enhancement, Segmentation' }, { id: 'bme-s6-imgproc-t2', name: 'Feature Extraction, Image Registration' }
      ]},
      { id: 'bme-s6-tissue', name: 'Tissue Engineering', topics: [
        { id: 'bme-s6-tissue-t1', name: 'Cell Culture, Scaffolds' }, { id: 'bme-s6-tissue-t2', name: 'Artificial Organs Basics' }
      ]},
      { id: 'bme-s6-rehab', name: 'Rehabilitation Engineering', topics: [
        { id: 'bme-s6-rehab-t1', name: 'Prosthetics and Orthotics' }, { id: 'bme-s6-rehab-t2', name: 'Assistive Devices' }
      ]},
      { id: 'bme-s6-hosp', name: 'Hospital Management & Medical Ethics', topics: [
        { id: 'bme-s6-hosp-t1', name: 'Healthcare Delivery Systems' }, { id: 'bme-s6-hosp-t2', name: 'Ethical Issues in BME, Patient Safety' }
      ]},
      { id: 'bme-s6-pe2', name: 'Professional Elective II (e.g., Biotransport Phenomena)', topics: [
        { id: 'bme-s6-pe2-btp-t1', name: 'Mass Transfer in Biological Systems' }
      ]},
      { id: 'bme-s6-imgproc-lab', name: 'Medical Image Processing Lab', topics: [{ id: 'bme-s6-imgproc-lab-t1', name: 'Image Analysis using MATLAB/Python' }]},
      { id: 'bme-s6-minorproj', name: 'Minor Project', topics: [{ id: 'bme-s6-minorproj-t1', name: 'Biomedical Device/System Design' }]},
    ],
  },
  { // Semester 7
    semester: 7,
    subjects: [
      { id: 'bme-s7-bionano', name: 'Bionanotechnology', topics: [
        { id: 'bme-s7-bionano-t1', name: 'Nanomaterials in Medicine' }, { id: 'bme-s7-bionano-t2', name: 'Drug Delivery Systems' }
      ]},
      { id: 'bme-s7-medinfo', name: 'Medical Informatics', topics: [
        { id: 'bme-s7-medinfo-t1', name: 'Electronic Health Records (EHR)' }, { id: 'bme-s7-medinfo-t2', name: 'Telemedicine' }
      ]},
      { id: 'bme-s7-pe3', name: 'Professional Elective III', topics: [{ id: 'bme-s7-pe3-t1', name: 'Advanced BME Topic 1' }]},
      { id: 'bme-s7-oe1', name: 'Open Elective I', topics: [{ id: 'bme-s7-oe1-t1', name: 'Interdisciplinary Topic' }]},
      { id: 'bme-s7-proj1', name: 'Project Work Phase I', topics: [
        { id: 'bme-s7-proj1-t1', name: 'Literature Survey & Problem Definition' }, { id: 'bme-s7-proj1-t2', name: 'System Design' }
      ]},
      { id: 'bme-s7-seminar', name: 'Seminar', topics: [{ id: 'bme-s7-seminar-t1', name: 'Technical Presentation on BME Topic' }]},
    ],
  },
  { // Semester 8
    semester: 8,
    subjects: [
      { id: 'bme-s8-quality', name: 'Medical Device Regulations & Quality Assurance', topics: [
        { id: 'bme-s8-quality-t1', name: 'FDA/CE Marking Standards' }, { id: 'bme-s8-quality-t2', name: 'Good Manufacturing Practices (GMP)' }
      ]},
      { id: 'bme-s8-pe4', name: 'Professional Elective IV', topics: [{ id: 'bme-s8-pe4-t1', name: 'Advanced BME Topic 2' }]},
      { id: 'bme-s8-pe5', name: 'Professional Elective V', topics: [{ id: 'bme-s8-pe5-t1', name: 'Advanced BME Topic 3' }]},
      { id: 'bme-s8-proj2', name: 'Project Work Phase II & Dissertation', topics: [
        { id: 'bme-s8-proj2-t1', name: 'Implementation, Testing, Validation' }, { id: 'bme-s8-proj2-t2', name: 'Thesis Writing and Viva-Voce' }
      ]},
    ],
  },
];

// --- Civil Engineering (civil) Data ---
const civilEngSemesters: DepartmentSemester[] = [
  { // Semester 1
    semester: 1,
    subjects: [
      commonFirstYearMaths1, commonFirstYearPhysics, commonFirstYearChemistry, commonEnglishComm,
      { id: 'civil-s1-intro', name: 'Introduction to Civil Engineering', topics: [
        { id: 'civil-s1-intro-t1', name: 'Scope & Branches of Civil Engg.' }, { id: 'civil-s1-intro-t2', name: 'Building Materials Overview' }
      ]},
      commonEngGraphics, commonWorkshop,
    ],
  },
  { // Semester 2
    semester: 2,
    subjects: [
      commonFirstYearMaths2, commonProgrammingC, commonBasicElectrical,
      { id: 'civil-s2-engmech', name: 'Engineering Mechanics', topics: [
        { id: 'civil-s2-engmech-t1', name: 'Statics of Particles & Rigid Bodies' }, { id: 'civil-s2-engmech-t2', name: 'Dynamics, Friction' }
      ]},
      { id: 'civil-s2-survey1', name: 'Surveying I', topics: [
        { id: 'civil-s2-survey1-t1', name: 'Chain, Compass, Plane Table Surveying' }, { id: 'civil-s2-survey1-t2', name: 'Leveling and Contouring' }
      ]},
      { id: 'civil-s2-survey-lab1', name: 'Surveying Lab I', topics: [{ id: 'civil-s2-survey-lab1-t1', name: 'Field Practice' }]},
      { id: 'civil-s2-cad-lab', name: 'Civil Engineering CAD Lab', topics: [{ id: 'civil-s2-cad-lab-t1', name: 'Basic 2D Drafting' }]},
    ],
  },
  { // Semester 3
    semester: 3,
    subjects: [
      { id: 'civil-s3-math3', name: 'Mathematics III (Numerical Methods & Statistics)', topics: [
        { id: 'civil-s3-math3-t1', name: 'Numerical Solutions, Interpolation' }, { id: 'civil-s3-math3-t2', name: 'Probability and Statistics' }
      ]},
      { id: 'civil-s3-som1', name: 'Strength of Materials I', topics: [
        { id: 'civil-s3-som1-t1', name: 'Simple Stresses & Strains' }, { id: 'civil-s3-som1-t2', name: 'Bending Moment & Shear Force Diagrams' }
      ]},
      { id: 'civil-s3-fm1', name: 'Fluid Mechanics I', topics: [
        { id: 'civil-s3-fm1-t1', name: 'Fluid Properties, Statics, Kinematics' }, { id: 'civil-s3-fm1-t2', name: 'Fluid Dynamics, Bernoulli’s Equation' }
      ]},
      { id: 'civil-s3-bmct', name: 'Building Materials and Construction Technology', topics: [
        { id: 'civil-s3-bmct-t1', name: 'Stones, Bricks, Cement, Concrete' }, { id: 'civil-s3-bmct-t2', name: 'Masonry, Foundations, Roofing' }
      ]},
      { id: 'civil-s3-survey2', name: 'Surveying II', topics: [
        { id: 'civil-s3-survey2-t1', name: 'Theodolite Surveying, Tachometry' }, { id: 'civil-s3-survey2-t2', name: 'Curves, Triangulation' }
      ]},
      { id: 'civil-s3-som-lab', name: 'Strength of Materials Lab', topics: [{ id: 'civil-s3-som-lab-t1', name: 'Material Testing' }]},
      { id: 'civil-s3-fm-lab', name: 'Fluid Mechanics Lab', topics: [{ id: 'civil-s3-fm-lab-t1', name: 'Flow Measurement Experiments' }]},
    ],
  },
  { // Semester 4
    semester: 4,
    subjects: [
      { id: 'civil-s4-sa1', name: 'Structural Analysis I', topics: [
        { id: 'civil-s4-sa1-t1', name: 'Analysis of Determinate Structures (Beams, Trusses)' }, { id: 'civil-s4-sa1-t2', name: 'Deflection of Beams' }
      ]},
      { id: 'civil-s4-som2', name: 'Strength of Materials II', topics: [
        { id: 'civil-s4-som2-t1', name: 'Torsion, Springs, Columns' }, { id: 'civil-s4-som2-t2', name: 'Theories of Failure' }
      ]},
      { id: 'civil-s4-fm2', name: 'Fluid Mechanics II (Open Channel Flow & Hydraulics)', topics: [
        { id: 'civil-s4-fm2-t1', name: 'Open Channel Flow, Hydraulic Jump' }, { id: 'civil-s4-fm2-t2', name: 'Hydraulic Machines (Turbines, Pumps)' }
      ]},
      { id: 'civil-s4-geotech1', name: 'Geotechnical Engineering I (Soil Mechanics)', topics: [
        { id: 'civil-s4-geotech1-t1', name: 'Soil Properties, Classification' }, { id: 'civil-s4-geotech1-t2', name: 'Permeability, Seepage, Compaction' }
      ]},
      { id: 'civil-s4-concrete', name: 'Concrete Technology', topics: [
        { id: 'civil-s4-concrete-t1', name: 'Properties of Concrete Ingredients' }, { id: 'civil-s4-concrete-t2', name: 'Concrete Mix Design, Special Concretes' }
      ]},
      { id: 'civil-s4-survey-lab2', name: 'Surveying Lab II', topics: [{ id: 'civil-s4-survey-lab2-t1', name: 'Advanced Surveying Techniques' }]},
      { id: 'civil-s4-geotech-lab1', name: 'Geotechnical Engineering Lab I', topics: [{ id: 'civil-s4-geotech-lab1-t1', name: 'Soil Testing' }]},
    ],
  },
  { // Semester 5
    semester: 5,
    subjects: [
      { id: 'civil-s5-sa2', name: 'Structural Analysis II (Indeterminate Structures)', topics: [
        { id: 'civil-s5-sa2-t1', name: 'Slope Deflection, Moment Distribution Methods' }, { id: 'civil-s5-sa2-t2', name: 'Influence Lines, Matrix Methods Basics' }
      ]},
      { id: 'civil-s5-rcc1', name: 'Reinforced Concrete Design I', topics: [
        { id: 'civil-s5-rcc1-t1', name: 'Limit State Design Philosophy' }, { id: 'civil-s5-rcc1-t2', name: 'Design of Beams, Slabs, Columns' }
      ]},
      { id: 'civil-s5-geotech2', name: 'Geotechnical Engineering II (Foundation Engg.)', topics: [
        { id: 'civil-s5-geotech2-t1', name: 'Shear Strength of Soils, Earth Pressure Theories' }, { id: 'civil-s5-geotech2-t2', name: 'Shallow & Deep Foundations Design' }
      ]},
      { id: 'civil-s5-transpo1', name: 'Transportation Engineering I (Highways)', topics: [
        { id: 'civil-s5-transpo1-t1', name: 'Highway Planning, Geometric Design' }, { id: 'civil-s5-transpo1-t2', name: 'Pavement Materials & Design' }
      ]},
      { id: 'civil-s5-wee1', name: 'Water Engineering I (Hydrology & Water Resources)', topics: [
        { id: 'civil-s5-wee1-t1', name: 'Hydrologic Cycle, Precipitation, Runoff' }, { id: 'civil-s5-wee1-t2', name: 'Water Resources Planning & Management' }
      ]},
      { id: 'civil-s5-rcc-lab', name: 'RCC Design Lab', topics: [{ id: 'civil-s5-rcc-lab-t1', name: 'Structural Detailing' }]},
      { id: 'civil-s5-transpo-lab1', name: 'Transportation Engineering Lab I', topics: [{ id: 'civil-s5-transpo-lab1-t1', name: 'Material Testing (Aggregates, Bitumen)' }]},
    ],
  },
  { // Semester 6
    semester: 6,
    subjects: [
      { id: 'civil-s6-steel', name: 'Design of Steel Structures', topics: [
        { id: 'civil-s6-steel-t1', name: 'Properties of Steel, Design Philosophies' }, { id: 'civil-s6-steel-t2', name: 'Design of Tension, Compression Members, Beams, Connections' }
      ]},
      { id: 'civil-s6-rcc2', name: 'Reinforced Concrete Design II', topics: [
        { id: 'civil-s6-rcc2-t1', name: 'Design of Footings, Retaining Walls, Staircases' }, { id: 'civil-s6-rcc2-t2', name: 'Introduction to Prestressed Concrete' }
      ]},
      { id: 'civil-s6-transpo2', name: 'Transportation Engineering II (Railways, Airports, Harbors)', topics: [
        { id: 'civil-s6-transpo2-t1', name: 'Railway Engineering Components & Design' }, { id: 'civil-s6-transpo2-t2', name: 'Airport Planning & Design, Harbor Engineering Basics' }
      ]},
      { id: 'civil-s6-wee2', name: 'Water Engineering II (Irrigation & Environmental Engg.)', topics: [
        { id: 'civil-s6-wee2-t1', name: 'Irrigation Systems Design, Water Supply Engineering' }, { id: 'civil-s6-wee2-t2', name: 'Wastewater Treatment & Disposal' }
      ]},
      { id: 'civil-s6-est', name: 'Estimating, Costing & Valuation', topics: [
        { id: 'civil-s6-est-t1', name: 'Quantity Surveying, Rate Analysis' }, { id: 'civil-s6-est-t2', name: 'Specifications, Tenders, Valuation' }
      ]},
      { id: 'civil-s6-geotech-lab2', name: 'Geotechnical Engineering Lab II', topics: [{ id: 'civil-s6-geotech-lab2-t1', name: 'Advanced Soil Testing' }]},
      { id: 'civil-s6-env-lab', name: 'Environmental Engineering Lab', topics: [{ id: 'civil-s6-env-lab-t1', name: 'Water Quality Testing' }]},
    ],
  },
  { // Semester 7
    semester: 7,
    subjects: [
      { id: 'civil-s7-cpm', name: 'Construction Planning and Management', topics: [
        { id: 'civil-s7-cpm-t1', name: 'Project Management Techniques (PERT, CPM)' }, { id: 'civil-s7-cpm-t2', name: 'Resource Allocation, Site Management, Safety' }
      ]},
      { id: 'civil-s7-pe1', name: 'Professional Elective I (e.g., Advanced Structural Analysis)', topics: [
        { id: 'civil-s7-pe1-advsa-t1', name: 'Matrix Methods, Finite Element Method Basics' }
      ]},
      { id: 'civil-s7-pe2', name: 'Professional Elective II (e.g., Ground Improvement Techniques)', topics: [
        { id: 'civil-s7-pe2-git-t1', name: 'Methods of Soil Stabilization' }
      ]},
      { id: 'civil-s7-oe1', name: 'Open Elective I', topics: [{ id: 'civil-s7-oe1-t1', name: 'Interdisciplinary Topic 1' }]},
      { id: 'civil-s7-proj1', name: 'Project Work Phase I', topics: [
        { id: 'civil-s7-proj1-t1', name: 'Literature Survey, Problem Identification' }, { id: 'civil-s7-proj1-t2', name: 'Preliminary Design & Methodology' }
      ]},
      { id: 'civil-s7-seminar', name: 'Seminar', topics: [{ id: 'civil-s7-seminar-t1', name: 'Technical Presentation' }]},
    ],
  },
  { // Semester 8
    semester: 8,
    subjects: [
      { id: 'civil-s8-profprac', name: 'Professional Practice, Law & Ethics', topics: [
        { id: 'civil-s8-profprac-t1', name: 'Contracts, Tenders, Arbitration' }, { id: 'civil-s8-profprac-t2', name: 'Engineering Ethics, Professional Responsibilities' }
      ]},
      { id: 'civil-s8-pe3', name: 'Professional Elective III', topics: [{ id: 'civil-s8-pe3-t1', name: 'Specialized Civil Topic 1' }]},
      { id: 'civil-s8-pe4', name: 'Professional Elective IV', topics: [{ id: 'civil-s8-pe4-t1', name: 'Specialized Civil Topic 2' }]},
      { id: 'civil-s8-proj2', name: 'Project Work Phase II & Dissertation', topics: [
        { id: 'civil-s8-proj2-t1', name: 'Detailed Design, Implementation/Analysis' }, { id: 'civil-s8-proj2-t2', name: 'Report Writing and Viva-Voce' }
      ]},
    ],
  },
];

// --- Electronics and Communication Engineering (ECE) Data ---
const eceSemesters: DepartmentSemester[] = [
  { // Semester 1
    semester: 1,
    subjects: [
      commonFirstYearMaths1, commonFirstYearPhysics, commonProgrammingC, commonBasicElectrical, commonEnglishComm,
      { id: 'ece-s1-ec-intro', name: 'Introduction to ECE', topics: [
        { id: 'ece-s1-ec-intro-t1', name: 'Overview of Electronics & Communication' }, { id: 'ece-s1-ec-intro-t2', name: 'Applications in Daily Life' }
      ]},
      { id: 'ece-s1-phy-lab', name: 'Physics Lab for ECE', topics: [{ id: 'ece-s1-phy-lab-t1', name: 'Semiconductor Experiments' }]},
    ],
  },
  { // Semester 2
    semester: 2,
    subjects: [
      commonFirstYearMaths2, commonFirstYearChemistry,
      { id: 'ece-s2-edc', name: 'Electronic Devices and Circuits', topics: [
        { id: 'ece-s2-edc-t1', name: 'Semiconductor Diodes & Applications' }, { id: 'ece-s2-edc-t2', name: 'BJT, FET: Construction & Characteristics' }, { id: 'ece-s2-edc-t3', name: 'Basic Amplifier Configurations' }
      ]},
      { id: 'ece-s2-nt', name: 'Network Theory', topics: [
        { id: 'ece-s2-nt-t1', name: 'Circuit Analysis Techniques (Mesh, Nodal)' }, { id: 'ece-s2-nt-t2', name: 'Network Theorems, Two-Port Networks' }, { id: 'ece-s2-nt-t3', name: 'Transient Analysis, Filters Basics' }
      ]},
      commonEngGraphics,
      { id: 'ece-s2-edc-lab', name: 'Electronic Devices Lab', topics: [{ id: 'ece-s2-edc-lab-t1', name: 'Device Characteristics, Basic Circuits' }]},
      { id: 'ece-s2-nt-lab', name: 'Network Theory Lab', topics: [{ id: 'ece-s2-nt-lab-t1', name: 'Circuit Simulations & Verification' }]},
    ],
  },
  { // Semester 3
    semester: 3,
    subjects: [
      { id: 'ece-s3-math3', name: 'Mathematics III (Transforms & Probability)', topics: [
        { id: 'ece-s3-math3-t1', name: 'Fourier, Laplace, Z-Transforms' }, { id: 'ece-s3-math3-t2', name: 'Probability Theory, Random Variables' }
      ]},
      { id: 'ece-s3-aec', name: 'Analog Electronic Circuits', topics: [
        { id: 'ece-s3-aec-t1', name: 'BJT & FET Amplifiers (Small Signal Analysis)' }, { id: 'ece-s3-aec-t2', name: 'Feedback Amplifiers, Oscillators' }, { id: 'ece-s3-aec-t3', name: 'Power Amplifiers, Tuned Amplifiers' }
      ]},
      { id: 'ece-s3-dld', name: 'Digital Logic Design', topics: [
        { id: 'ece-s3-dld-t1', name: 'Boolean Algebra, Logic Gates, Combinational Circuits' }, { id: 'ece-s3-dld-t2', name: 'Sequential Circuits (Flip-Flops, Counters, Registers)' }, { id: 'ece-s3-dld-t3', name: 'Memory Devices, ADC/DAC Basics' }
      ]},
      { id: 'ece-s3-ss', name: 'Signals and Systems', topics: [
        { id: 'ece-s3-ss-t1', name: 'Classification of Signals & Systems' }, { id: 'ece-s3-ss-t2', name: 'LTI Systems, Convolution' }, { id: 'ece-s3-ss-t3', name: 'Fourier Series & Transform Applications' }
      ]},
      { id: 'ece-s3-ds', name: 'Data Structures using C++', topics: [
        { id: 'ece-s3-ds-t1', name: 'Arrays, Stacks, Queues, Linked Lists' }, { id: 'ece-s3-ds-t2', name: 'Trees, Graphs, Searching & Sorting' }
      ]},
      { id: 'ece-s3-aec-lab', name: 'Analog Circuits Lab', topics: [{ id: 'ece-s3-aec-lab-t1', name: 'Amplifier & Oscillator Design' }]},
      { id: 'ece-s3-dld-lab', name: 'Digital Logic Lab', topics: [{ id: 'ece-s3-dld-lab-t1', name: 'Combinational & Sequential Circuit Design' }]},
    ],
  },
  { // Semester 4
    semester: 4,
    subjects: [
      { id: 'ece-s4-lic', name: 'Linear Integrated Circuits', topics: [
        { id: 'ece-s4-lic-t1', name: 'Op-Amp Fundamentals & Applications' }, { id: 'ece-s4-lic-t2', name: 'Timers (555), PLL, Voltage Regulators' }, { id: 'ece-s4-lic-t3', name: 'Active Filters, Data Converters' }
      ]},
      { id: 'ece-s4-ac', name: 'Analog Communication', topics: [
        { id: 'ece-s4-ac-t1', name: 'Amplitude Modulation (AM, DSB-SC, SSB-SC)' }, { id: 'ece-s4-ac-t2', name: 'Angle Modulation (FM, PM)' }, { id: 'ece-s4-ac-t3', name: 'Noise in Communication Systems, Radio Receivers' }
      ]},
      { id: 'ece-s4-eftl', name: 'Electromagnetic Fields and Transmission Lines', topics: [
        { id: 'ece-s4-eftl-t1', name: 'Electrostatics, Magnetostatics, Maxwell’s Equations' }, { id: 'ece-s4-eftl-t2', name: 'EM Wave Propagation, Transmission Line Theory' }, { id: 'ece-s4-eftl-t3', name: 'Smith Chart, Impedance Matching' }
      ]},
      { id: 'ece-s4-mpmc', name: 'Microprocessors and Microcontrollers', topics: [
        { id: 'ece-s4-mpmc-t1', name: '8086 Architecture & Programming' }, { id: 'ece-s4-mpmc-t2', name: '8051 Microcontroller Architecture & Programming' }, { id: 'ece-s4-mpmc-t3', name: 'Interfacing Peripherals' }
      ]},
      { id: 'ece-s4-cs', name: 'Control Systems', topics: [
        { id: 'ece-s4-cs-t1', name: 'Open & Closed Loop Systems, Transfer Functions' }, { id: 'ece-s4-cs-t2', name: 'Time Domain Analysis, Stability (Routh, Nyquist)' }, { id: 'ece-s4-cs-t3', name: 'Frequency Domain Analysis (Bode, Polar Plots)' }
      ]},
      { id: 'ece-s4-lic-lab', name: 'LIC Lab', topics: [{ id: 'ece-s4-lic-lab-t1', name: 'Op-Amp Circuits, 555 Timer Applications' }]},
      { id: 'ece-s4-mpmc-lab', name: 'MPMC Lab', topics: [{ id: 'ece-s4-mpmc-lab-t1', name: '8086 & 8051 Programming, Interfacing' }]},
    ],
  },
  { // Semester 5
    semester: 5,
    subjects: [
      { id: 'ece-s5-dsp', name: 'Digital Signal Processing', topics: [
        { id: 'ece-s5-dsp-t1', name: 'DFT, FFT Algorithms' }, { id: 'ece-s5-dsp-t2', name: 'Design of FIR & IIR Filters' }, { id: 'ece-s5-dsp-t3', name: 'Multirate Signal Processing, DSP Processors' }
      ]},
      { id: 'ece-s5-dc', name: 'Digital Communication', topics: [
        { id: 'ece-s5-dc-t1', name: 'Sampling, Quantization, PCM, DPCM, DM' }, { id: 'ece-s5-dc-t2', name: 'Digital Modulation Techniques (ASK, FSK, PSK, QAM)' }, { id: 'ece-s5-dc-t3', name: 'Information Theory & Coding Basics' }
      ]},
      { id: 'ece-s5-awp', name: 'Antennas and Wave Propagation', topics: [
        { id: 'ece-s5-awp-t1', name: 'Antenna Fundamentals (Radiation, Gain, Impedance)' }, { id: 'ece-s5-awp-t2', name: 'Types of Antennas (Dipole, Yagi-Uda, Microstrip)' }, { id: 'ece-s5-awp-t3', name: 'Wave Propagation (Ground, Sky, Space waves)' }
      ]},
      { id: 'ece-s5-vlsi', name: 'VLSI Design', topics: [
        { id: 'ece-s5-vlsi-t1', name: 'MOS Transistor Theory, CMOS Logic Design' }, { id: 'ece-s5-vlsi-t2', name: 'VLSI Fabrication Process, Layout Design Rules' }, { id: 'ece-s5-vlsi-t3', name: 'Introduction to HDL (VHDL/Verilog)' }
      ]},
      { id: 'ece-s5-pe1', name: 'Professional Elective I (e.g., Computer Networks)', topics: [
        { id: 'ece-s5-pe1-cn-t1', name: 'OSI & TCP/IP Models' }, { id: 'ece-s5-pe1-cn-t2', name: 'Routing & Switching' }
      ]},
      { id: 'ece-s5-dsp-lab', name: 'DSP Lab', topics: [{ id: 'ece-s5-dsp-lab-t1', name: 'Filter Design, Signal Processing using MATLAB/Simulink' }]},
      { id: 'ece-s5-dc-lab', name: 'Digital Communication Lab', topics: [{ id: 'ece-s5-dc-lab-t1', name: 'Modulation/Demodulation Experiments' }]},
    ],
  },
  { // Semester 6
    semester: 6,
    subjects: [
      { id: 'ece-s6-mw', name: 'Microwave Engineering', topics: [
        { id: 'ece-s6-mw-t1', name: 'Microwave Frequencies, Waveguides, Cavity Resonators' }, { id: 'ece-s6-mw-t2', name: 'Microwave Components (Attenuators, Phase Shifters, Tees)' }, { id: 'ece-s6-mw-t3', name: 'Microwave Tubes & Solid State Devices' }
      ]},
      { id: 'ece-s6-es', name: 'Embedded Systems', topics: [
        { id: 'ece-s6-es-t1', name: 'Introduction to Embedded Systems, ARM Architecture' }, { id: 'ece-s6-es-t2', name: 'RTOS Concepts, Interfacing with Peripherals' }, { id: 'ece-s6-es-t3', name: 'Embedded System Design Case Studies' }
      ]},
      { id: 'ece-s6-pe2', name: 'Professional Elective II (e.g., Optical Communication)', topics: [
        { id: 'ece-s6-pe2-oc-t1', name: 'Optical Fibers, Light Sources, Detectors' }, { id: 'ece-s6-pe2-oc-t2', name: 'Optical Networks' }
      ]},
      { id: 'ece-s6-pe3', name: 'Professional Elective III (e.g., Digital Image Processing)', topics: [
        { id: 'ece-s6-pe3-dip-t1', name: 'Image Fundamentals, Enhancement' }, { id: 'ece-s6-pe3-dip-t2', name: 'Segmentation, Compression' }
      ]},
      { id: 'ece-s6-oe1', name: 'Open Elective I', topics: [{ id: 'ece-s6-oe1-t1', name: 'Interdisciplinary Topic 1' }]},
      { id: 'ece-s6-vlsi-lab', name: 'VLSI Design Lab', topics: [{ id: 'ece-s6-vlsi-lab-t1', name: 'HDL Programming, Circuit Simulation & Layout' }]},
      { id: 'ece-s6-es-lab', name: 'Embedded Systems Lab', topics: [{ id: 'ece-s6-es-lab-t1', name: 'ARM Programming, RTOS Experiments' }]},
    ],
  },
  { // Semester 7
    semester: 7,
    subjects: [
      { id: 'ece-s7-wc', name: 'Wireless Communication', topics: [
        { id: 'ece-s7-wc-t1', name: 'Cellular Concepts, Mobile Radio Propagation' }, { id: 'ece-s7-wc-t2', name: 'Modulation Techniques for Mobile Radio, Multiple Access Techniques' }, { id: 'ece-s7-wc-t3', name: 'Wireless Standards (GSM, CDMA, LTE, 5G basics)' }
      ]},
      { id: 'ece-s7-pe4', name: 'Professional Elective IV', topics: [{ id: 'ece-s7-pe4-t1', name: 'Advanced ECE Topic 1' }]},
      { id: 'ece-s7-pe5', name: 'Professional Elective V', topics: [{ id: 'ece-s7-pe5-t1', name: 'Advanced ECE Topic 2' }]},
      { id: 'ece-s7-oe2', name: 'Open Elective II', topics: [{ id: 'ece-s7-oe2-t1', name: 'Interdisciplinary Topic 2' }]},
      { id: 'ece-s7-proj1', name: 'Project Work Phase I', topics: [
        { id: 'ece-s7-proj1-t1', name: 'Literature Survey, Problem Definition' }, { id: 'ece-s7-proj1-t2', name: 'System Design and Simulation' }
      ]},
      { id: 'ece-s7-seminar', name: 'Seminar', topics: [{ id: 'ece-s7-seminar-t1', name: 'Technical Presentation on Current Trends' }]},
    ],
  },
  { // Semester 8
    semester: 8,
    subjects: [
      { id: 'ece-s8-mgmt', name: 'Engineering Management & Ethics', topics: [
        { id: 'ece-s8-mgmt-t1', name: 'Project Management, Financial Management' }, { id: 'ece-s8-mgmt-t2', name: 'Professional Ethics, IPR' }
      ]},
      { id: 'ece-s8-pe6', name: 'Professional Elective VI', topics: [{ id: 'ece-s8-pe6-t1', name: 'Advanced ECE Topic 3' }]},
      { id: 'ece-s8-oe3', name: 'Open Elective III', topics: [{ id: 'ece-s8-oe3-t1', name: 'Interdisciplinary Topic 3' }]},
      { id: 'ece-s8-proj2', name: 'Project Work Phase II & Dissertation', topics: [
        { id: 'ece-s8-proj2-t1', name: 'Hardware/Software Implementation, Testing' }, { id: 'ece-s8-proj2-t2', name: 'Report Writing and Viva-Voce' }
      ]},
    ],
  },
];

// --- Electrical & Electronics Engineering (EEE) Data ---
const eeeSemesters: DepartmentSemester[] = [
  { // Semester 1
    semester: 1,
    subjects: [
      commonFirstYearMaths1, commonFirstYearPhysics, commonProgrammingC, commonBasicElectrical, commonEnglishComm,
      { id: 'eee-s1-intro', name: 'Introduction to EEE', topics: [
        { id: 'eee-s1-intro-t1', name: 'Overview of Electrical & Electronics Engg.' }, { id: 'eee-s1-intro-t2', name: 'Power Systems & Electronics Basics' }
      ]},
      { id: 'eee-s1-workshop', name: 'Electrical Workshop', topics: [{ id: 'eee-s1-workshop-t1', name: 'Wiring, Soldering, Safety' }]},
    ],
  },
  { // Semester 2
    semester: 2,
    subjects: [
      commonFirstYearMaths2, commonFirstYearChemistry,
      { id: 'eee-s2-circtheory1', name: 'Circuit Theory I', topics: [
        { id: 'eee-s2-circtheory1-t1', name: 'DC Circuit Analysis (KCL, KVL, Thevenin, Norton)' }, { id: 'eee-s2-circtheory1-t2', name: 'AC Circuit Analysis (RLC, Resonance, Power Factor)' }
      ]},
      { id: 'eee-s2-edc', name: 'Electronic Devices and Circuits', topics: [
        { id: 'eee-s2-edc-t1', name: 'Semiconductor Diodes, BJT, FET' }, { id: 'eee-s2-edc-t2', name: 'Basic Amplifier Circuits' }
      ]},
      commonEngGraphics,
      { id: 'eee-s2-circtheory-lab', name: 'Circuit Theory Lab', topics: [{ id: 'eee-s2-circtheory-lab-t1', name: 'Circuit Verification & Analysis' }]},
      { id: 'eee-s2-edc-lab', name: 'EDC Lab', topics: [{ id: 'eee-s2-edc-lab-t1', name: 'Device Characteristics' }]},
    ],
  },
  { // Semester 3
    semester: 3,
    subjects: [
      { id: 'eee-s3-math3', name: 'Mathematics III (Transforms & Numerical Methods)', topics: [
        { id: 'eee-s3-math3-t1', name: 'Fourier, Laplace Transforms' }, { id: 'eee-s3-math3-t2', name: 'Numerical Solutions of DEs' }
      ]},
      { id: 'eee-s3-circtheory2', name: 'Circuit Theory II', topics: [
        { id: 'eee-s3-circtheory2-t1', name: 'Three Phase Circuits, Network Topology' }, { id: 'eee-s3-circtheory2-t2', name: 'Filters, Attenuators' }
      ]},
      { id: 'eee-s3-emft', name: 'Electromagnetic Field Theory', topics: [
        { id: 'eee-s3-emft-t1', name: 'Electrostatics, Magnetostatics' }, { id: 'eee-s3-emft-t2', name: 'Maxwell’s Equations, EM Waves' }
      ]},
      { id: 'eee-s3-machines1', name: 'Electrical Machines I (DC Machines & Transformers)', topics: [
        { id: 'eee-s3-machines1-t1', name: 'DC Generators & Motors' }, { id: 'eee-s3-machines1-t2', name: 'Single Phase & Three Phase Transformers' }
      ]},
      { id: 'eee-s3-aec', name: 'Analog Electronic Circuits', topics: [
        { id: 'eee-s3-aec-t1', name: 'Amplifiers (BJT, FET), Feedback Amplifiers' }, { id: 'eee-s3-aec-t2', name: 'Oscillators, Power Amplifiers' }
      ]},
      { id: 'eee-s3-machines-lab1', name: 'Electrical Machines Lab I', topics: [{ id: 'eee-s3-machines-lab1-t1', name: 'DC Machine & Transformer Testing' }]},
      { id: 'eee-s3-aec-lab', name: 'Analog Electronics Lab', topics: [{ id: 'eee-s3-aec-lab-t1', name: 'Amplifier & Oscillator Design' }]},
    ],
  },
  { // Semester 4
    semester: 4,
    subjects: [
      { id: 'eee-s4-dld', name: 'Digital Logic Design', topics: [
        { id: 'eee-s4-dld-t1', name: 'Logic Gates, Combinational Circuits' }, { id: 'eee-s4-dld-t2', name: 'Sequential Circuits, ADC/DAC' }
      ]},
      { id: 'eee-s4-machines2', name: 'Electrical Machines II (AC Machines)', topics: [
        { id: 'eee-s4-machines2-t1', name: 'Induction Motors (Single & Three Phase)' }, { id: 'eee-s4-machines2-t2', name: 'Synchronous Generators & Motors' }
      ]},
      { id: 'eee-s4-powergen', name: 'Power Generation Systems', topics: [
        { id: 'eee-s4-powergen-t1', name: 'Thermal, Hydro, Nuclear Power Plants' }, { id: 'eee-s4-powergen-t2', name: 'Renewable Energy Sources (Solar, Wind)' }
      ]},
      { id: 'eee-s4-lic', name: 'Linear Integrated Circuits', topics: [
        { id: 'eee-s4-lic-t1', name: 'Op-Amp Applications' }, { id: 'eee-s4-lic-t2', name: 'Timers, PLL, Voltage Regulators' }
      ]},
      { id: 'eee-s4-measure', name: 'Electrical Measurements & Instrumentation', topics: [
        { id: 'eee-s4-measure-t1', name: 'Measurement of R, L, C, Power, Energy' }, { id: 'eee-s4-measure-t2', name: 'Transducers, Oscilloscopes' }
      ]},
      { id: 'eee-s4-machines-lab2', name: 'Electrical Machines Lab II', topics: [{ id: 'eee-s4-machines-lab2-t1', name: 'AC Machine Testing' }]},
      { id: 'eee-s4-lic-lab', name: 'LIC Lab', topics: [{ id: 'eee-s4-lic-lab-t1', name: 'Op-Amp Circuit Design' }]},
    ],
  },
  { // Semester 5
    semester: 5,
    subjects: [
      { id: 'eee-s5-cs', name: 'Control Systems', topics: [
        { id: 'eee-s5-cs-t1', name: 'Transfer Functions, Block Diagrams' }, { id: 'eee-s5-cs-t2', name: 'Time & Frequency Domain Analysis, Stability' }
      ]},
      { id: 'eee-s5-psa', name: 'Power System Analysis I', topics: [
        { id: 'eee-s5-psa-t1', name: 'Transmission Line Parameters, Per Unit System' }, { id: 'eee-s5-psa-t2', name: 'Load Flow Studies, Symmetrical Components' }
      ]},
      { id: 'eee-s5-pe', name: 'Power Electronics', topics: [
        { id: 'eee-s5-pe-t1', name: 'Power Semiconductor Devices (SCR, MOSFET, IGBT)' }, { id: 'eee-s5-pe-t2', name: 'Rectifiers, Inverters, Choppers, Cycloconverters' }
      ]},
      { id: 'eee-s5-mpmc', name: 'Microprocessors and Microcontrollers', topics: [
        { id: 'eee-s5-mpmc-t1', name: '8086/8051 Architecture' }, { id: 'eee-s5-mpmc-t2', name: 'Programming and Interfacing' }
      ]},
      { id: 'eee-s5-pe1', name: 'Professional Elective I (e.g., High Voltage Engineering)', topics: [
        { id: 'eee-s5-pe1-hv-t1', name: 'Breakdown Mechanisms' }, { id: 'eee-s5-pe1-hv-t2', name: 'HV Generation & Measurement' }
      ]},
      { id: 'eee-s5-cs-lab', name: 'Control Systems Lab', topics: [{ id: 'eee-s5-cs-lab-t1', name: 'System Response & Stability Analysis (MATLAB)' }]},
      { id: 'eee-s5-pe-lab', name: 'Power Electronics Lab', topics: [{ id: 'eee-s5-pe-lab-t1', name: 'Converter & Inverter Circuits' }]},
    ],
  },
  { // Semester 6
    semester: 6,
    subjects: [
      { id: 'eee-s6-psoc', name: 'Power System Operation and Control', topics: [
        { id: 'eee-s6-psoc-t1', name: 'Economic Load Dispatch, Load Frequency Control' }, { id: 'eee-s6-psoc-t2', name: 'Voltage Control, Reactive Power Compensation' }
      ]},
      { id: 'eee-s6-dsp', name: 'Digital Signal Processing', topics: [
        { id: 'eee-s6-dsp-t1', name: 'DFT, FFT, Digital Filters' }, { id: 'eee-s6-dsp-t2', name: 'Applications in Power Systems' }
      ]},
      { id: 'eee-s6-ed', name: 'Electrical Drives', topics: [
        { id: 'eee-s6-ed-t1', name: 'DC Motor Drives, AC Motor Drives' }, { id: 'eee-s6-ed-t2', name: 'Speed Control Techniques' }
      ]},
      { id: 'eee-s6-pe2', name: 'Professional Elective II (e.g., Smart Grid Technologies)', topics: [
        { id: 'eee-s6-pe2-sg-t1', name: 'Smart Grid Architecture' }, { id: 'eee-s6-pe2-sg-t2', name: 'AMI, Demand Side Management' }
      ]},
      { id: 'eee-s6-oe1', name: 'Open Elective I', topics: [{ id: 'eee-s6-oe1-t1', name: 'Interdisciplinary Topic 1' }]},
      { id: 'eee-s6-ps-lab', name: 'Power Systems Lab', topics: [{ id: 'eee-s6-ps-lab-t1', name: 'Load Flow, Fault Analysis (Simulation)' }]},
      { id: 'eee-s6-mpmc-lab', name: 'MPMC Lab', topics: [{ id: 'eee-s6-mpmc-lab-t1', name: 'Interfacing for Control Applications' }]},
    ],
  },
  { // Semester 7
    semester: 7,
    subjects: [
      { id: 'eee-s7-prot', name: 'Power System Protection & Switchgear', topics: [
        { id: 'eee-s7-prot-t1', name: 'Relays, Circuit Breakers' }, { id: 'eee-s7-prot-t2', name: 'Protection Schemes for Generators, Transformers, Lines' }
      ]},
      { id: 'eee-s7-util', name: 'Utilization of Electrical Energy', topics: [
        { id: 'eee-s7-util-t1', name: 'Electric Drives, Heating, Welding' }, { id: 'eee-s7-util-t2', name: 'Illumination, Traction' }
      ]},
      { id: 'eee-s7-pe3', name: 'Professional Elective III', topics: [{ id: 'eee-s7-pe3-t1', name: 'Advanced EEE Topic 1' }]},
      { id: 'eee-s7-pe4', name: 'Professional Elective IV', topics: [{ id: 'eee-s7-pe4-t1', name: 'Advanced EEE Topic 2' }]},
      { id: 'eee-s7-oe2', name: 'Open Elective II', topics: [{ id: 'eee-s7-oe2-t1', name: 'Interdisciplinary Topic 2' }]},
      { id: 'eee-s7-proj1', name: 'Project Work Phase I', topics: [
        { id: 'eee-s7-proj1-t1', name: 'Literature Review, Problem Definition' }, { id: 'eee-s7-proj1-t2', name: 'Design and Simulation' }
      ]},
    ],
  },
  { // Semester 8
    semester: 8,
    subjects: [
      { id: 'eee-s8-pq', name: 'Power Quality', topics: [
        { id: 'eee-s8-pq-t1', name: 'Voltage Sags, Swells, Harmonics' }, { id: 'eee-s8-pq-t2', name: 'Power Quality Improvement Techniques' }
      ]},
      { id: 'eee-s8-pe5', name: 'Professional Elective V', topics: [{ id: 'eee-s8-pe5-t1', name: 'Advanced EEE Topic 3' }]},
      { id: 'eee-s8-pe6', name: 'Professional Elective VI', topics: [{ id: 'eee-s8-pe6-t1', name: 'Advanced EEE Topic 4' }]},
      { id: 'eee-s8-proj2', name: 'Project Work Phase II & Dissertation', topics: [
        { id: 'eee-s8-proj2-t1', name: 'Implementation, Testing' }, { id: 'eee-s8-proj2-t2', name: 'Report Writing and Viva-Voce' }
      ]},
      { id: 'eee-s8-ethics', name: 'Professional Ethics & Management', topics: [{ id: 'eee-s8-ethics-t1', name: 'Engineering Ethics, Project Management Basics' }]},
    ],
  },
];

// --- Information Technology (it) Data --- (Similar to CSE but with more focus on applications, networking, and software systems)
const itSemesters: DepartmentSemester[] = [
  { // Semester 1
    semester: 1,
    subjects: [
      commonFirstYearMaths1, commonFirstYearPhysics, commonProgrammingC, commonBasicElectrical, commonEnglishComm,
      { id: 'it-s1-intro', name: 'Fundamentals of IT', topics: [
        { id: 'it-s1-intro-t1', name: 'Overview of Information Technology' }, { id: 'it-s1-intro-t2', name: 'Computer Systems and Applications' }
      ]},
      { id: 'it-s1-prog-lab', name: 'Programming Lab (C)', topics: [{ id: 'it-s1-prog-lab-t1', name: 'Problem Solving using C' }]},
    ],
  },
  { // Semester 2
    semester: 2,
    subjects: [
      commonFirstYearMaths2, commonFirstYearChemistry,
      { id: 'it-s2-ds', name: 'Data Structures using Python', topics: [
        { id: 'it-s2-ds-t1', name: 'Arrays, Stacks, Queues, Linked Lists' }, { id: 'it-s2-ds-t2', name: 'Trees, Graphs, Hashing' }, { id: 'it-s2-ds-t3', name: 'Algorithm Complexity' }
      ]},
      { id: 'it-s2-webdev1', name: 'Web Development Basics (HTML, CSS, JS)', topics: [
        { id: 'it-s2-webdev1-t1', name: 'HTML5 Structure and Semantics' }, { id: 'it-s2-webdev1-t2', name: 'CSS3 Styling and Layouts' }, { id: 'it-s2-webdev1-t3', name: 'JavaScript Fundamentals, DOM Manipulation' }
      ]},
      commonEngGraphics,
      { id: 'it-s2-ds-lab', name: 'Data Structures Lab (Python)', topics: [{ id: 'it-s2-ds-lab-t1', name: 'Implementation of DS' }]},
      { id: 'it-s2-web-lab1', name: 'Web Development Lab I', topics: [{ id: 'it-s2-web-lab1-t1', name: 'Static Web Page Design' }]},
    ],
  },
  { // Semester 3
    semester: 3,
    subjects: [
      { id: 'it-s3-dmath', name: 'Discrete Mathematics for IT', topics: [
        { id: 'it-s3-dmath-t1', name: 'Set Theory, Logic, Relations' }, { id: 'it-s3-dmath-t2', name: 'Graph Theory, Combinatorics' }
      ]},
      { id: 'it-s3-oop', name: 'Object-Oriented Programming (Java)', topics: [
        { id: 'it-s3-oop-t1', name: 'OOP Concepts, Java Basics' }, { id: 'it-s3-oop-t2', name: 'Inheritance, Polymorphism, Interfaces' }, { id: 'it-s3-oop-t3', name: 'Exception Handling, Collections' }
      ]},
      { id: 'it-s3-coa', name: 'Computer Organization and Architecture', topics: [
        { id: 'it-s3-coa-t1', name: 'CPU, Memory, I/O Organization' }, { id: 'it-s3-coa-t2', name: 'Instruction Sets, Pipelining' }
      ]},
      { id: 'it-s3-dld', name: 'Digital Logic Design', topics: [
        { id: 'it-s3-dld-t1', name: 'Number Systems, Logic Gates' }, { id: 'it-s3-dld-t2', name: 'Combinational & Sequential Circuits' }
      ]},
      { id: 'it-s3-probstat', name: 'Probability and Statistics for IT', topics: [
        { id: 'it-s3-probstat-t1', name: 'Probability Basics, Distributions' }, { id: 'it-s3-probstat-t2', name: 'Statistical Inference' }
      ]},
      { id: 'it-s3-oop-lab', name: 'OOP Lab (Java)', topics: [{ id: 'it-s3-oop-lab-t1', name: 'Java Programming Exercises' }]},
      { id: 'it-s3-dld-lab', name: 'DLD Lab', topics: [{ id: 'it-s3-dld-lab-t1', name: 'Circuit Design' }]},
    ],
  },
  { // Semester 4
    semester: 4,
    subjects: [
      { id: 'it-s4-os', name: 'Operating Systems', topics: [
        { id: 'it-s4-os-t1', name: 'Process Management, CPU Scheduling' }, { id: 'it-s4-os-t2', name: 'Memory Management, File Systems, Deadlocks' }
      ]},
      { id: 'it-s4-dbms', name: 'Database Management Systems', topics: [
        { id: 'it-s4-dbms-t1', name: 'Relational Model, SQL' }, { id: 'it-s4-dbms-t2', name: 'Normalization, Transaction Management' }
      ]},
      { id: 'it-s4-se', name: 'Software Engineering', topics: [
        { id: 'it-s4-se-t1', name: 'SDLC Models, Requirement Engineering' }, { id: 'it-s4-se-t2', name: 'Software Design, Testing, UML' }
      ]},
      { id: 'it-s4-cn1', name: 'Computer Networks I', topics: [
        { id: 'it-s4-cn1-t1', name: 'OSI & TCP/IP Models, Physical & Data Link Layers' }, { id: 'it-s4-cn1-t2', name: 'Network Layer (IP Addressing, Basic Routing)' }
      ]},
      { id: 'it-s4-daa', name: 'Design and Analysis of Algorithms', topics: [
        { id: 'it-s4-daa-t1', name: 'Algorithm Design Techniques' }, { id: 'it-s4-daa-t2', name: 'Complexity Analysis' }
      ]},
      { id: 'it-s4-os-lab', name: 'OS Lab', topics: [{ id: 'it-s4-os-lab-t1', name: 'Shell Scripting, System Calls' }]},
      { id: 'it-s4-dbms-lab', name: 'DBMS Lab', topics: [{ id: 'it-s4-dbms-lab-t1', name: 'SQL Queries, PL/SQL' }]},
    ],
  },
  { // Semester 5
    semester: 5,
    subjects: [
      { id: 'it-s5-webtech', name: 'Advanced Web Technologies', topics: [
        { id: 'it-s5-webtech-t1', name: 'Client-Side Frameworks (React/Angular/Vue)' }, { id: 'it-s5-webtech-t2', name: 'Server-Side (Node.js/Express or Python/Django)' }, { id: 'it-s5-webtech-t3', name: 'APIs, AJAX, JSON' }
      ]},
      { id: 'it-s5-cn2', name: 'Computer Networks II', topics: [
        { id: 'it-s5-cn2-t1', name: 'Transport Layer (TCP, UDP), Application Layer Protocols' }, { id: 'it-s5-cn2-t2', name: 'Network Security Basics, Wireless Networks' }
      ]},
      { id: 'it-s5-automata', name: 'Formal Languages and Automata Theory', topics: [
        { id: 'it-s5-automata-t1', name: 'Regular Expressions, Finite Automata' }, { id: 'it-s5-automata-t2', name: 'Context-Free Grammars, Turing Machines' }
      ]},
      { id: 'it-s5-hci', name: 'Human-Computer Interaction', topics: [
        { id: 'it-s5-hci-t1', name: 'Design Principles, Usability Engineering' }, { id: 'it-s5-hci-t2', name: 'Interaction Styles, UI Evaluation' }
      ]},
      { id: 'it-s5-pe1', name: 'Professional Elective I (e.g., Data Mining & Warehousing)', topics: [
        { id: 'it-s5-pe1-dmw-t1', name: 'Data Mining Concepts' }, { id: 'it-s5-pe1-dmw-t2', name: 'Data Warehousing Architecture' }
      ]},
      { id: 'it-s5-web-lab2', name: 'Web Technologies Lab II', topics: [{ id: 'it-s5-web-lab2-t1', name: 'Full Stack Application Development Project' }]},
      { id: 'it-s5-cn-lab', name: 'Computer Networks Lab', topics: [{ id: 'it-s5-cn-lab-t1', name: 'Socket Programming, Network Simulation' }]},
    ],
  },
  { // Semester 6
    semester: 6,
    subjects: [
      { id: 'it-s6-mobi', name: 'Mobile Application Development', topics: [
        { id: 'it-s6-mobi-t1', name: 'Android/iOS Development Basics' }, { id: 'it-s6-mobi-t2', name: 'UI Design, Data Storage, APIs for Mobile' }
      ]},
      { id: 'it-s6-cloud', name: 'Cloud Computing', topics: [
        { id: 'it-s6-cloud-t1', name: 'Cloud Models (IaaS, PaaS, SaaS), Virtualization' }, { id: 'it-s6-cloud-t2', name: 'Cloud Services (AWS/Azure/GCP), Cloud Security' }
      ]},
      { id: 'it-s6-ai', name: 'Artificial Intelligence Basics', topics: [
        { id: 'it-s6-ai-t1', name: 'Search Techniques, Knowledge Representation' }, { id: 'it-s6-ai-t2', name: 'Introduction to Machine Learning Concepts' }
      ]},
      { id: 'it-s6-is', name: 'Information Security', topics: [
        { id: 'it-s6-is-t1', name: 'Cryptography Basics, Network Security' }, { id: 'it-s6-is-t2', name: 'Web Security, Cyber Laws & Ethics' }
      ]},
      { id: 'it-s6-pe2', name: 'Professional Elective II (e.g., Big Data Analytics)', topics: [
        { id: 'it-s6-pe2-bda-t1', name: 'Hadoop, MapReduce' }, { id: 'it-s6-pe2-bda-t2', name: 'Spark, NoSQL Databases' }
      ]},
      { id: 'it-s6-mobi-lab', name: 'Mobile App Dev Lab', topics: [{ id: 'it-s6-mobi-lab-t1', name: 'Mobile App Project' }]},
      { id: 'it-s6-minorproj', name: 'Minor Project (IT)', topics: [{ id: 'it-s6-minorproj-t1', name: 'Software Development Project' }]},
    ],
  },
  { // Semester 7
    semester: 7,
    subjects: [
      { id: 'it-s7-iot', name: 'Internet of Things', topics: [
        { id: 'it-s7-iot-t1', name: 'IoT Architecture, Protocols' }, { id: 'it-s7-iot-t2', name: 'IoT Devices, Data Analytics for IoT' }
      ]},
      { id: 'it-s7-spm', name: 'Software Project Management', topics: [
        { id: 'it-s7-spm-t1', name: 'Project Planning, Estimation, Scheduling' }, { id: 'it-s7-spm-t2', name: 'Risk Management, Quality Assurance' }
      ]},
      { id: 'it-s7-pe3', name: 'Professional Elective III', topics: [{ id: 'it-s7-pe3-t1', name: 'Specialized IT Topic 1' }]},
      { id: 'it-s7-oe1', name: 'Open Elective I', topics: [{ id: 'it-s7-oe1-t1', name: 'Interdisciplinary Topic' }]},
      { id: 'it-s7-proj1', name: 'Project Work Phase I', topics: [
        { id: 'it-s7-proj1-t1', name: 'Literature Survey, Problem Definition' }, { id: 'it-s7-proj1-t2', name: 'System Design and Methodology' }
      ]},
      { id: 'it-s7-intern', name: 'Internship', topics: [{ id: 'it-s7-intern-t1', name: 'Industry Experience' }]},
    ],
  },
  { // Semester 8
    semester: 8,
    subjects: [
      { id: 'it-s8-ent', name: 'Entrepreneurship and Startup Management', topics: [
        { id: 'it-s8-ent-t1', name: 'Business Plan Development' }, { id: 'it-s8-ent-t2', name: 'Funding, Marketing for Startups' }
      ]},
      { id: 'it-s8-pe4', name: 'Professional Elective IV', topics: [{ id: 'it-s8-pe4-t1', name: 'Specialized IT Topic 2' }]},
      { id: 'it-s8-pe5', name: 'Professional Elective V', topics: [{ id: 'it-s8-pe5-t1', name: 'Specialized IT Topic 3' }]},
      { id: 'it-s8-proj2', name: 'Project Work Phase II & Dissertation', topics: [
        { id: 'it-s8-proj2-t1', name: 'Implementation, Testing, Deployment' }, { id: 'it-s8-proj2-t2', name: 'Thesis Writing and Viva-Voce' }
      ]},
    ],
  },
];

// --- Mechanical Engineering (mech-eng) Data ---
const mechEngSemesters: DepartmentSemester[] = [
  { // Semester 1
    semester: 1,
    subjects: [
      commonFirstYearMaths1, commonFirstYearPhysics, commonFirstYearChemistry, commonEnglishComm,
      { id: 'mech-s1-intro', name: 'Introduction to Mechanical Engineering', topics: [
        { id: 'mech-s1-intro-t1', name: 'Scope & Applications' }, { id: 'mech-s1-intro-t2', name: 'Overview of Thermal & Design Engg.' }
      ]},
      commonEngGraphics, commonWorkshop,
    ],
  },
  { // Semester 2
    semester: 2,
    subjects: [
      commonFirstYearMaths2, commonProgrammingC, commonBasicElectrical,
      { id: 'mech-s2-engmech', name: 'Engineering Mechanics', topics: [
        { id: 'mech-s2-engmech-t1', name: 'Statics, Dynamics' }, { id: 'mech-s2-engmech-t2', name: 'Friction, Work & Energy' }
      ]},
      { id: 'mech-s2-materialsci', name: 'Material Science & Metallurgy', topics: [
        { id: 'mech-s2-materialsci-t1', name: 'Crystal Structure, Imperfections' }, { id: 'mech-s2-materialsci-t2', name: 'Phase Diagrams, Heat Treatment' }
      ]},
      { id: 'mech-s2-engmech-lab', name: 'Engineering Mechanics Lab', topics: [{ id: 'mech-s2-engmech-lab-t1', name: 'Experiments on Forces, Friction' }]},
      { id: 'mech-s2-material-lab', name: 'Material Science Lab', topics: [{ id: 'mech-s2-material-lab-t1', name: 'Microscopy, Hardness Testing' }]},
    ],
  },
  { // Semester 3
    semester: 3,
    subjects: [
      { id: 'mech-s3-math3', name: 'Mathematics III (Transforms & PDE)', topics: [
        { id: 'mech-s3-math3-t1', name: 'Fourier, Laplace Transforms' }, { id: 'mech-s3-math3-t2', name: 'Partial Differential Equations' }
      ]},
      { id: 'mech-s3-thermo', name: 'Engineering Thermodynamics', topics: [
        { id: 'mech-s3-thermo-t1', name: 'Basic Concepts, Laws of Thermodynamics' }, { id: 'mech-s3-thermo-t2', name: 'Properties of Pure Substances, Gas Mixtures' }
      ]},
      { id: 'mech-s3-som', name: 'Strength of Materials', topics: [
        { id: 'mech-s3-som-t1', name: 'Stress, Strain, Bending, Torsion' }, { id: 'mech-s3-som-t2', name: 'Columns, Springs, Thin Cylinders' }
      ]},
      { id: 'mech-s3-mp1', name: 'Manufacturing Processes I', topics: [
        { id: 'mech-s3-mp1-t1', name: 'Casting, Forging, Welding' }, { id: 'mech-s3-mp1-t2', name: 'Sheet Metal Operations' }
      ]},
      { id: 'mech-s3-fm', name: 'Fluid Mechanics', topics: [
        { id: 'mech-s3-fm-t1', name: 'Fluid Properties, Statics, Dynamics' }, { id: 'mech-s3-fm-t2', name: 'Flow through Pipes, Boundary Layer' }
      ]},
      { id: 'mech-s3-thermo-lab', name: 'Thermodynamics Lab', topics: [{ id: 'mech-s3-thermo-lab-t1', name: 'Experiments on IC Engines, Cycles' }]},
      { id: 'mech-s3-som-lab', name: 'Strength of Materials Lab', topics: [{ id: 'mech-s3-som-lab-t1', name: 'Material Testing Experiments' }]},
    ],
  },
  { // Semester 4
    semester: 4,
    subjects: [
      { id: 'mech-s4-kom', name: 'Kinematics of Machinery', topics: [
        { id: 'mech-s4-kom-t1', name: 'Mechanisms, Velocity & Acceleration Analysis' }, { id: 'mech-s4-kom-t2', name: 'Cams, Gears, Gear Trains' }
      ]},
      { id: 'mech-s4-mp2', name: 'Manufacturing Processes II', topics: [
        { id: 'mech-s4-mp2-t1', name: 'Machining Processes (Lathe, Milling, Grinding)' }, { id: 'mech-s4-mp2-t2', name: 'Non-Traditional Machining' }
      ]},
      { id: 'mech-s4-fmhm', name: 'Fluid Machinery and Hydraulic Machines', topics: [
        { id: 'mech-s4-fmhm-t1', name: 'Impact of Jets, Turbines (Pelton, Francis, Kaplan)' }, { id: 'mech-s4-fmhm-t2', name: 'Pumps (Centrifugal, Reciprocating)' }
      ]},
      { id: 'mech-s4-appliedthermo', name: 'Applied Thermodynamics', topics: [
        { id: 'mech-s4-appliedthermo-t1', name: 'IC Engines, Gas Turbines, Steam Nozzles' }, { id: 'mech-s4-appliedthermo-t2', name: 'Refrigeration and Air Conditioning' }
      ]},
      { id: 'mech-s4-metrology', name: 'Metrology and Measurements', topics: [
        { id: 'mech-s4-metrology-t1', name: 'Limits, Fits, Tolerances, Gauges' }, { id: 'mech-s4-metrology-t2', name: 'Measurement of Length, Angle, Surface Finish' }
      ]},
      { id: 'mech-s4-fmhm-lab', name: 'Fluid Machinery Lab', topics: [{ id: 'mech-s4-fmhm-lab-t1', name: 'Turbine & Pump Performance Tests' }]},
      { id: 'mech-s4-mp-lab', name: 'Manufacturing Processes Lab', topics: [{ id: 'mech-s4-mp-lab-t1', name: 'Machining & Welding Practice' }]},
    ],
  },
  { // Semester 5
    semester: 5,
    subjects: [
      { id: 'mech-s5-dom', name: 'Dynamics of Machinery', topics: [
        { id: 'mech-s5-dom-t1', name: 'Static & Dynamic Force Analysis, Balancing' }, { id: 'mech-s5-dom-t2', name: 'Vibrations (Free, Forced, Damped)' }
      ]},
      { id: 'mech-s5-dme1', name: 'Design of Machine Elements I', topics: [
        { id: 'mech-s5-dme1-t1', name: 'Design for Static & Fatigue Loads' }, { id: 'mech-s5-dme1-t2', name: 'Design of Shafts, Keys, Couplings, Springs' }
      ]},
      { id: 'mech-s5-ht', name: 'Heat Transfer', topics: [
        { id: 'mech-s5-ht-t1', name: 'Conduction, Convection, Radiation' }, { id: 'mech-s5-ht-t2', name: 'Heat Exchangers' }
      ]},
      { id: 'mech-s5-ipe', name: 'Industrial Engineering and Production Management', topics: [
        { id: 'mech-s5-ipe-t1', name: 'Work Study, Method Study, Plant Layout' }, { id: 'mech-s5-ipe-t2', name: 'Production Planning & Control, Inventory Management' }
      ]},
      { id: 'mech-s5-pe1', name: 'Professional Elective I (e.g., Automobile Engineering)', topics: [
        { id: 'mech-s5-pe1-auto-t1', name: 'Vehicle Systems (Engine, Transmission)' }, { id: 'mech-s5-pe1-auto-t2', name: 'Suspension, Brakes, Steering' }
      ]},
      { id: 'mech-s5-dom-lab', name: 'Dynamics of Machinery Lab', topics: [{ id: 'mech-s5-dom-lab-t1', name: 'Vibration & Balancing Experiments' }]},
      { id: 'mech-s5-ht-lab', name: 'Heat Transfer Lab', topics: [{ id: 'mech-s5-ht-lab-t1', name: 'Conduction, Convection, Radiation Experiments' }]},
    ],
  },
  { // Semester 6
    semester: 6,
    subjects: [
      { id: 'mech-s6-dme2', name: 'Design of Machine Elements II', topics: [
        { id: 'mech-s6-dme2-t1', name: 'Design of Bearings, Gears, Brakes, Clutches' }, { id: 'mech-s6-dme2-t2', name: 'Design of IC Engine Parts' }
      ]},
      { id: 'mech-s6-cadcam', name: 'CAD/CAM', topics: [
        { id: 'mech-s6-cadcam-t1', name: 'Geometric Modeling, CNC Technology' }, { id: 'mech-s6-cadcam-t2', name: 'Group Technology, FMS, Robotics Basics' }
      ]},
      { id: 'mech-s6-icengines', name: 'Internal Combustion Engines', topics: [
        { id: 'mech-s6-icengines-t1', name: 'Engine Cycles, Combustion, Performance' }, { id: 'mech-s6-icengines-t2', name: 'Fuel Supply, Ignition, Cooling Systems' }
      ]},
      { id: 'mech-s6-or', name: 'Operations Research', topics: [
        { id: 'mech-s6-or-t1', name: 'Linear Programming, Transportation Problems' }, { id: 'mech-s6-or-t2', name: 'Queuing Theory, Game Theory, PERT/CPM' }
      ]},
      { id: 'mech-s6-pe2', name: 'Professional Elective II (e.g., Refrigeration & AC)', topics: [
        { id: 'mech-s6-pe2-rac-t1', name: 'Refrigeration Cycles' }, { id: 'mech-s6-pe2-rac-t2', name: 'Psychrometry, AC Systems' }
      ]},
      { id: 'mech-s6-cadcam-lab', name: 'CAD/CAM Lab', topics: [{ id: 'mech-s6-cadcam-lab-t1', name: 'Modeling & CNC Programming' }]},
      { id: 'mech-s6-ic-lab', name: 'IC Engines Lab', topics: [{ id: 'mech-s6-ic-lab-t1', name: 'Engine Performance Testing' }]},
    ],
  },
  { // Semester 7
    semester: 7,
    subjects: [
      { id: 'mech-s7-mechatronics', name: 'Mechatronics', topics: [
        { id: 'mech-s7-mechatronics-t1', name: 'Sensors, Actuators, PLC Programming' }, { id: 'mech-s7-mechatronics-t2', name: 'Microcontroller Applications in Mechanical Systems' }
      ]},
      { id: 'mech-s7-feacfd', name: 'Finite Element Analysis & CFD Basics', topics: [
        { id: 'mech-s7-feacfd-t1', name: 'FEA Principles & Applications' }, { id: 'mech-s7-feacfd-t2', name: 'Introduction to Computational Fluid Dynamics' }
      ]},
      { id: 'mech-s7-pe3', name: 'Professional Elective III', topics: [{ id: 'mech-s7-pe3-t1', name: 'Advanced Mech Topic 1' }]},
      { id: 'mech-s7-oe1', name: 'Open Elective I', topics: [{ id: 'mech-s7-oe1-t1', name: 'Interdisciplinary Topic 1' }]},
      { id: 'mech-s7-proj1', name: 'Project Work Phase I', topics: [
        { id: 'mech-s7-proj1-t1', name: 'Literature Review, Problem Definition' }, { id: 'mech-s7-proj1-t2', name: 'Design and Analysis' }
      ]},
      { id: 'mech-s7-seminar', name: 'Seminar', topics: [{ id: 'mech-s7-seminar-t1', name: 'Technical Presentation' }]},
    ],
  },
  { // Semester 8
    semester: 8,
    subjects: [
      { id: 'mech-s8-mgmt', name: 'Industrial Management & Entrepreneurship', topics: [
        { id: 'mech-s8-mgmt-t1', name: 'Principles of Management, Organizational Structure' }, { id: 'mech-s8-mgmt-t2', name: 'Entrepreneurship, Project Management' }
      ]},
      { id: 'mech-s8-pe4', name: 'Professional Elective IV', topics: [{ id: 'mech-s8-pe4-t1', name: 'Advanced Mech Topic 2' }]},
      { id: 'mech-s8-pe5', name: 'Professional Elective V', topics: [{ id: 'mech-s8-pe5-t1', name: 'Advanced Mech Topic 3' }]},
      { id: 'mech-s8-proj2', name: 'Project Work Phase II & Dissertation', topics: [
        { id: 'mech-s8-proj2-t1', name: 'Fabrication/Simulation, Testing' }, { id: 'mech-s8-proj2-t2', name: 'Report Writing and Viva-Voce' }
      ]},
      { id: 'mech-s8-ethics', name: 'Professional Ethics', topics: [{ id: 'mech-s8-ethics-t1', name: 'Engineering Ethics and Responsibilities' }]},
    ],
  },
];

// --- Science and Humanities (sci-hum) Data ---
// Structured as an interdisciplinary/applied science program for 8 semesters.
const sciHumSemesters: DepartmentSemester[] = [
  { // Semester 1
    semester: 1,
    subjects: [
      commonFirstYearMaths1, commonFirstYearPhysics, commonFirstYearChemistry, commonEnglishComm,
      { id: 'scihum-s1-commskills', name: 'Advanced Communication Skills', topics: [
        { id: 'scihum-s1-commskills-t1', name: 'Technical Writing' }, { id: 'scihum-s1-commskills-t2', name: 'Presentation Skills' }
      ]},
      { id: 'scihum-s1-phy-lab', name: 'Physics Lab I', topics: [{ id: 'scihum-s1-phy-lab-t1', name: 'Mechanics & Optics Experiments' }]},
      { id: 'scihum-s1-chem-lab', name: 'Chemistry Lab I', topics: [{ id: 'scihum-s1-chem-lab-t1', name: 'Basic Analytical Techniques' }]},
    ],
  },
  { // Semester 2
    semester: 2,
    subjects: [
      commonFirstYearMaths2, commonProgrammingC,
      { id: 'scihum-s2-advphy', name: 'Advanced Engineering Physics', topics: [
        { id: 'scihum-s2-advphy-t1', name: 'Modern Physics Concepts' }, { id: 'scihum-s2-advphy-t2', name: 'Material Science Fundamentals' }
      ]},
      { id: 'scihum-s2-advchem', name: 'Advanced Engineering Chemistry', topics: [
        { id: 'scihum-s2-advchem-t1', name: 'Spectroscopy Basics' }, { id: 'scihum-s2-advchem-t2', name: 'Organic Chemistry Fundamentals' }
      ]},
      { id: 'scihum-s2-evs', name: 'Environmental Science & Studies', topics: [
        { id: 'scihum-s2-evs-t1', name: 'Ecosystems & Sustainability' }, { id: 'scihum-s2-evs-t2', name: 'Pollution & Control' }
      ]},
      { id: 'scihum-s2-prog-lab', name: 'Programming Lab (C)', topics: [{ id: 'scihum-s2-prog-lab-t1', name: 'Problem Solving Applications' }]},
    ],
  },
  { // Semester 3
    semester: 3,
    subjects: [
      { id: 'scihum-s3-math3', name: 'Mathematics III (Linear Algebra & Complex Analysis)', topics: [
        { id: 'scihum-s3-math3-t1', name: 'Vector Spaces, Linear Transformations' }, { id: 'scihum-s3-math3-t2', name: 'Complex Variables, Conformal Mapping' }
      ]},
      { id: 'scihum-s3-probstat', name: 'Probability and Statistics', topics: [
        { id: 'scihum-s3-probstat-t1', name: 'Distributions, Hypothesis Testing' }, { id: 'scihum-s3-probstat-t2', name: 'Correlation & Regression' }
      ]},
      { id: 'scihum-s3-solidstate', name: 'Solid State Physics', topics: [
        { id: 'scihum-s3-solidstate-t1', name: 'Crystal Structures, Band Theory' }, { id: 'scihum-s3-solidstate-t2', name: 'Semiconductors, Superconductors' }
      ]},
      { id: 'scihum-s3-thermo', name: 'Thermodynamics & Statistical Mechanics', topics: [
        { id: 'scihum-s3-thermo-t1', name: 'Laws of Thermodynamics' }, { id: 'scihum-s3-thermo-t2', name: 'Statistical Ensembles' }
      ]},
      { id: 'scihum-s3-humanities1', name: 'Humanities I (e.g., Economics)', topics: [
        { id: 'scihum-s3-humanities1-t1', name: 'Micro & Macro Economics Basics' }
      ]},
    ],
  },
  { // Semester 4
    semester: 4,
    subjects: [
      { id: 'scihum-s4-nummethods', name: 'Numerical Methods & Optimization', topics: [
        { id: 'scihum-s4-nummethods-t1', name: 'Numerical Solutions of Equations & DEs' }, { id: 'scihum-s4-nummethods-t2', name: 'Linear Programming Basics' }
      ]},
      { id: 'scihum-s4-quantum', name: 'Quantum Mechanics for Engineers', topics: [
        { id: 'scihum-s4-quantum-t1', name: 'Wave-Particle Duality, Schrodinger Equation' }, { id: 'scihum-s4-quantum-t2', name: 'Applications in Nanotechnology' }
      ]},
      { id: 'scihum-s4-instrument', name: 'Scientific Instrumentation', topics: [
        { id: 'scihum-s4-instrument-t1', name: 'Principles of Measurement' }, { id: 'scihum-s4-instrument-t2', name: 'Analytical Instruments (Spectrophotometers, Microscopes)' }
      ]},
      { id: 'scihum-s4-dspbasics', name: 'Digital Signal Processing Basics', topics: [
        { id: 'scihum-s4-dspbasics-t1', name: 'Signals, Systems, Transforms' }, { id: 'scihum-s4-dspbasics-t2', name: 'Basic Filtering Techniques' }
      ]},
      { id: 'scihum-s4-humanities2', name: 'Humanities II (e.g., Psychology)', topics: [
        { id: 'scihum-s4-humanities2-t1', name: 'Introduction to Psychology' }
      ]},
    ],
  },
  { // Semester 5
    semester: 5,
    subjects: [
      { id: 'scihum-s5-compmodeling', name: 'Computational Modeling & Simulation', topics: [
        { id: 'scihum-s5-compmodeling-t1', name: 'Finite Difference/Element Methods Basics' }, { id: 'scihum-s5-compmodeling-t2', name: 'Monte Carlo Simulations' }
      ]},
      { id: 'scihum-s5-materialchar', name: 'Material Characterization Techniques', topics: [
        { id: 'scihum-s5-materialchar-t1', name: 'XRD, SEM, TEM Basics' }, { id: 'scihum-s5-materialchar-t2', name: 'Spectroscopic Techniques for Materials' }
      ]},
      { id: 'scihum-s5-datasci', name: 'Data Science for Applied Sciences', topics: [
        { id: 'scihum-s5-datasci-t1', name: 'Data Collection, Cleaning, Visualization' }, { id: 'scihum-s5-datasci-t2', name: 'Basic Machine Learning Models' }
      ]},
      { id: 'scihum-s5-pe1', name: 'Professional Elective I (Applied Science)', topics: [{ id: 'scihum-s5-pe1-t1', name: 'Specialized Topic 1' }]},
      { id: 'scihum-s5-humanities3', name: 'Humanities III (e.g., Sociology)', topics: [
        { id: 'scihum-s5-humanities3-t1', name: 'Social Structures and Issues' }
      ]},
    ],
  },
  { // Semester 6
    semester: 6,
    subjects: [
      { id: 'scihum-s6-nanotech', name: 'Nanotechnology & Applications', topics: [
        { id: 'scihum-s6-nanotech-t1', name: 'Synthesis & Properties of Nanomaterials' }, { id: 'scihum-s6-nanotech-t2', name: 'Applications in Engineering & Medicine' }
      ]},
      { id: 'scihum-s6-renewable', name: 'Renewable Energy Science', topics: [
        { id: 'scihum-s6-renewable-t1', name: 'Solar, Wind, Biomass Energy' }, { id: 'scihum-s6-renewable-t2', name: 'Energy Storage Systems' }
      ]},
      { id: 'scihum-s6-researchmeth', name: 'Research Methodology & IPR', topics: [
        { id: 'scihum-s6-researchmeth-t1', name: 'Literature Review, Experimental Design' }, { id: 'scihum-s6-researchmeth-t2', name: 'Intellectual Property Rights, Patents' }
      ]},
      { id: 'scihum-s6-pe2', name: 'Professional Elective II (Applied Science)', topics: [{ id: 'scihum-s6-pe2-t1', name: 'Specialized Topic 2' }]},
      { id: 'scihum-s6-oe1', name: 'Open Elective I', topics: [{ id: 'scihum-s6-oe1-t1', name: 'Interdisciplinary Topic' }]},
    ],
  },
  { // Semester 7
    semester: 7,
    subjects: [
      { id: 'scihum-s7-advmod', name: 'Advanced Modeling and Simulation', topics: [
        { id: 'scihum-s7-advmod-t1', name: 'Multiscale Modeling' }, { id: 'scihum-s7-advmod-t2', name: 'Complex Systems Simulation' }
      ]},
      { id: 'scihum-s7-biophy', name: 'Biophysics / Bio-inspired Systems', topics: [
        { id: 'scihum-s7-biophy-t1', name: 'Physical Principles in Biological Systems' }, { id: 'scihum-s7-biophy-t2', name: 'Bio-mimicry and Design' }
      ]},
      { id: 'scihum-s7-pe3', name: 'Professional Elective III', topics: [{ id: 'scihum-s7-pe3-t1', name: 'Specialized Topic 3' }]},
      { id: 'scihum-s7-proj1', name: 'Project Work Phase I', topics: [
        { id: 'scihum-s7-proj1-t1', name: 'Problem Identification in Applied Science' }, { id: 'scihum-s7-proj1-t2', name: 'Methodology Development' }
      ]},
      { id: 'scihum-s7-seminar', name: 'Seminar/Colloquium', topics: [{ id: 'scihum-s7-seminar-t1', name: 'Presentation on Research Area' }]},
    ],
  },
  { // Semester 8
    semester: 8,
    subjects: [
      { id: 'scihum-s8-ethics', name: 'Science, Technology & Society', topics: [
        { id: 'scihum-s8-ethics-t1', name: 'Ethical Implications of Scientific Advancements' }, { id: 'scihum-s8-ethics-t2', name: 'Public Policy for Science & Tech' }
      ]},
      { id: 'scihum-s8-pe4', name: 'Professional Elective IV', topics: [{ id: 'scihum-s8-pe4-t1', name: 'Specialized Topic 4' }]},
      { id: 'scihum-s8-proj2', name: 'Project Work Phase II & Dissertation', topics: [
        { id: 'scihum-s8-proj2-t1', name: 'Research Execution & Data Analysis' }, { id: 'scihum-s8-proj2-t2', name: 'Thesis Writing and Defense' }
      ]},
    ],
  },
];


export const DEPARTMENTS: Department[] = departmentsList.map(dept => {
  switch (dept.id) {
    case 'cse':
      return { id: dept.id, name: dept.name, semesters: cseSemesters };
    case 'agri-eng':
      return { id: dept.id, name: dept.name, semesters: agriEngSemesters };
    case 'ai-ds':
      return { id: dept.id, name: dept.name, semesters: aiDsSemesters };
    case 'bio-med':
      return { id: dept.id, name: dept.name, semesters: bioMedSemesters };
    case 'civil':
      return { id: dept.id, name: dept.name, semesters: civilEngSemesters };
    case 'ece':
      return { id: dept.id, name: dept.name, semesters: eceSemesters };
    case 'eee':
      return { id: dept.id, name: dept.name, semesters: eeeSemesters };
    case 'it':
      return { id: dept.id, name: dept.name, semesters: itSemesters };
    case 'mech-eng':
      return { id: dept.id, name: dept.name, semesters: mechEngSemesters };
    case 'sci-hum':
      return { id: dept.id, name: dept.name, semesters: sciHumSemesters };
    default: // Fallback for any other departments, though all are covered above
      return { id: dept.id, name: dept.name, semesters: [] }; // Should not happen
  }
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


// These placeholder functions might still be useful for quickly adding new departments
// or if a department's detailed data is not yet available.
const generatePlaceholderTopics = (subjectIdPrefix: string, count: number = 3): Topic[] => {
  const topics: Topic[] = [];
  for (let i = 1; i <= count; i++) {
    topics.push({ id: `${subjectIdPrefix}-topic${i}`, name: `Generic Topic ${String.fromCharCode(64 + i)} for ${subjectIdPrefix.split('-s')[0]}` });
  }
  return topics;
};

const generatePlaceholderSubjects = (departmentShortName: string, semesterNumber: number, count: number = 5): Subject[] => {
  const subjects: Subject[] = [];
  for (let i = 1; i <= count; i++) {
    const subjectId = `${departmentShortName.toLowerCase().replace(/[& ]+/g, '-')}-s${semesterNumber}-subj${i}`;
    subjects.push({
      id: subjectId,
      name: `${departmentShortName} Sem ${semesterNumber} Subject ${i}`,
      topics: generatePlaceholderTopics(subjectId),
    });
    if (i <= 2) { 
        const labSubjectId = `${departmentShortName.toLowerCase().replace(/[& ]+/g, '-')}-s${semesterNumber}-lab${i}`;
        subjects.push({
            id: labSubjectId,
            name: `${departmentShortName} Sem ${semesterNumber} Subject ${i} Lab`,
            topics: generatePlaceholderTopics(labSubjectId, 2)
        });
    }
  }
  return subjects;
};

const generatePlaceholderSemesters = (departmentShortName: string, numSemesters: number = 8): DepartmentSemester[] => {
  const semesters: DepartmentSemester[] = [];
  for (let i = 1; i <= numSemesters; i++) {
    semesters.push({
      semester: i,
      subjects: generatePlaceholderSubjects(departmentShortName, i, (i <= 4 ? 5: 4) ), 
    });
  }
  return semesters;
};
