
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
        id: 'cse-s1-phy1', name: 'Engineering Physics',
        topics: [
          { id: 'cse-s1-phy1-t1', name: 'Quantum Mechanics & Applications' },
          { id: 'cse-s1-phy1-t2', name: 'Semiconductor Physics & Devices' },
          { id: 'cse-s1-phy1-t3', name: 'Optoelectronics and Fiber Optics' },
          { id: 'cse-s1-phy1-t4', name: 'Lasers and Nanotechnology' },
        ],
      },
      {
        id: 'cse-s1-mat1', name: 'Mathematics I (Calculus & Linear Algebra)',
        topics: [
          { id: 'cse-s1-mat1-t1', name: 'Sequences and Series' },
          { id: 'cse-s1-mat1-t2', name: 'Differential Calculus and Applications' },
          { id: 'cse-s1-mat1-t3', name: 'Integral Calculus and Applications' },
          { id: 'cse-s1-mat1-t4', name: 'Matrices, Eigenvalues and Eigenvectors' },
        ],
      },
      {
        id: 'cse-s1-pps', name: 'Programming for Problem Solving (Using C)',
        topics: [
          { id: 'cse-s1-pps-t1', name: 'Introduction to Algorithms and Flowcharts' },
          { id: 'cse-s1-pps-t2', name: 'C Fundamentals: Variables, Data Types, Operators' },
          { id: 'cse-s1-pps-t3', name: 'Control Structures: Conditional and Looping' },
          { id: 'cse-s1-pps-t4', name: 'Functions, Recursion, Pointers' },
          { id: 'cse-s1-pps-t5', name: 'Arrays, Strings, Structures, and Unions' },
          { id: 'cse-s1-pps-t6', name: 'File Handling in C' },
        ],
      },
      {
        id: 'cse-s1-bee', name: 'Basic Electrical & Electronics Engineering',
        topics: [
          { id: 'cse-s1-bee-t1', name: 'DC Circuits: Ohm’s Law, Kirchhoff’s Laws' },
          { id: 'cse-s1-bee-t2', name: 'AC Circuits: RLC Circuits, Resonance' },
          { id: 'cse-s1-bee-t3', name: 'Transformers & DC Machines' },
          { id: 'cse-s1-bee-t4', name: 'Semiconductor Diodes & Transistors' },
        ],
      },
       {
        id: 'cse-s1-englab', name: 'English Communication Skills Lab',
        topics: [
          { id: 'cse-s1-englab-t1', name: 'Phonetics and Pronunciation' },
          { id: 'cse-s1-englab-t2', name: 'Listening Comprehension' },
          { id: 'cse-s1-englab-t3', name: 'Group Discussions and Presentations' },
        ],
      },
      {
        id: 'cse-s1-phylab', name: 'Engineering Physics Lab',
        topics: [
          { id: 'cse-s1-phylab-t1', name: 'Experiments on Optics (e.g., Spectrometer)' },
          { id: 'cse-s1-phylab-t2', name: 'Experiments on Semiconductor Devices' },
          { id: 'cse-s1-phylab-t3', name: 'Experiments on Lasers' },
        ],
      },
    ],
  },
  {
    semester: 2,
    subjects: [
      {
        id: 'cse-s2-che', name: 'Engineering Chemistry',
        topics: [
          { id: 'cse-s2-che-t1', name: 'Atomic Structure and Chemical Bonding' },
          { id: 'cse-s2-che-t2', name: 'Water Technology and Corrosion' },
          { id: 'cse-s2-che-t3', name: 'Polymers, Composites, and Nanomaterials' },
          { id: 'cse-s2-che-t4', name: 'Electrochemistry and Batteries' },
        ],
      },
      {
        id: 'cse-s2-mat2', name: 'Mathematics II (Differential Equations & Vector Calculus)',
        topics: [
          { id: 'cse-s2-mat2-t1', name: 'First Order Ordinary Differential Equations' },
          { id: 'cse-s2-mat2-t2', name: 'Higher Order Linear Differential Equations' },
          { id: 'cse-s2-mat2-t3', name: 'Vector Differentiation and Integration' },
          { id: 'cse-s2-mat2-t4', name: 'Green’s, Stokes’ and Gauss Divergence Theorems' },
        ],
      },
      {
        id: 'cse-s2-ds', name: 'Data Structures',
        topics: [
          { id: 'cse-s2-ds-t1', name: 'Introduction to Data Structures, ADTs' },
          { id: 'cse-s2-ds-t2', name: 'Arrays, Stacks, Queues, and Applications' },
          { id: 'cse-s2-ds-t3', name: 'Linked Lists: Singly, Doubly, Circular' },
          { id: 'cse-s2-ds-t4', name: 'Trees: Binary Trees, BST, AVL Trees, Heaps' },
          { id: 'cse-s2-ds-t5', name: 'Graphs: Representation, Traversal (BFS, DFS)' },
          { id: 'cse-s2-ds-t6', name: 'Sorting and Searching Algorithms Analysis' },
        ],
      },
      {
        id: 'cse-s2-edrg', name: 'Engineering Graphics & Design',
        topics: [
          { id: 'cse-s2-edrg-t1', name: 'Principles of Orthographic Projections' },
          { id: 'cse-s2-edrg-t2', name: 'Projections of Points, Lines, and Planes' },
          { id: 'cse-s2-edrg-t3', name: 'Projections and Sections of Solids' },
          { id: 'cse-s2-edrg-t4', name: 'Development of Surfaces & Isometric Projections' },
          { id: 'cse-s2-edrg-t5', name: 'Introduction to CAD software' },
        ],
      },
      {
        id: 'cse-s2-dslab', name: 'Data Structures Lab (Using C/C++)',
        topics: [
          { id: 'cse-s2-dslab-t1', name: 'Implementation of Stack and Queue operations' },
          { id: 'cse-s2-dslab-t2', name: 'Implementation of Linked List operations' },
          { id: 'cse-s2-dslab-t3', name: 'Implementation of Tree traversals and Graph algorithms' },
          { id: 'cse-s2-dslab-t4', name: 'Implementation of Sorting and Searching algorithms' },
        ],
      },
       {
        id: 'cse-s2-chelab', name: 'Engineering Chemistry Lab',
        topics: [
          { id: 'cse-s2-chelab-t1', name: 'Titrimetric Analysis' },
          { id: 'cse-s2-chelab-t2', name: 'Instrumental Methods (e.g., pH metry, Colorimetry)' },
          { id: 'cse-s2-chelab-t3', name: 'Synthesis of Simple Compounds' },
        ],
      },
    ],
  },
  {
    semester: 3,
    subjects: [
      {
        id: 'cse-s3-mat3', name: 'Mathematics III (Probability, Statistics & Complex Variables)',
        topics: [
          { id: 'cse-s3-mat3-t1', name: 'Probability Theory and Baye\'s Theorem' },
          { id: 'cse-s3-mat3-t2', name: 'Random Variables, Probability Distributions (Binomial, Poisson, Normal)' },
          { id: 'cse-s3-mat3-t3', name: 'Statistical Inference: Estimation, Hypothesis Testing' },
          { id: 'cse-s3-mat3-t4', name: 'Complex Variables: Analytic Functions, Cauchy-Riemann Equations' },
        ],
      },
      {
        id: 'cse-s3-dld', name: 'Digital Logic Design',
        topics: [
          { id: 'cse-s3-dld-t1', name: 'Number Systems, Boolean Algebra & Logic Gates' },
          { id: 'cse-s3-dld-t2', name: 'Combinational Logic Circuits: Adders, Decoders, MUX' },
          { id: 'cse-s3-dld-t3', name: 'Sequential Logic Circuits: Flip-Flops, Registers, Counters' },
          { id: 'cse-s3-dld-t4', name: 'Memory Devices: ROM, RAM, PLA, PAL' },
        ],
      },
      {
        id: 'cse-s3-oop', name: 'Object-Oriented Programming (Using Java)',
        topics: [
          { id: 'cse-s3-oop-t1', name: 'Principles of OOP: Abstraction, Encapsulation, Inheritance, Polymorphism' },
          { id: 'cse-s3-oop-t2', name: 'Java Basics: Classes, Objects, Methods, Constructors' },
          { id: 'cse-s3-oop-t3', name: 'Inheritance, Interfaces, Packages' },
          { id: 'cse-s3-oop-t4', name: 'Exception Handling, Multithreading, Applets' },
          { id: 'cse-s3-oop-t5', name: 'Java Collections Framework' },
        ],
      },
      {
        id: 'cse-s3-dsa', name: 'Design and Analysis of Algorithms',
        topics: [
          { id: 'cse-s3-dsa-t1', name: 'Algorithm Analysis: Asymptotic Notations (Big-O, Omega, Theta)' },
          { id: 'cse-s3-dsa-t2', name: 'Divide and Conquer Strategy (Merge Sort, Quick Sort, Binary Search)' },
          { id: 'cse-s3-dsa-t3', name: 'Greedy Algorithms (Knapsack, Huffman Coding, Minimum Spanning Trees)' },
          { id: 'cse-s3-dsa-t4', name: 'Dynamic Programming (Longest Common Subsequence, Matrix Chain Multiplication)' },
          { id: 'cse-s3-dsa-t5', name: 'Backtracking and Branch & Bound Techniques' },
          { id: 'cse-s3-dsa-t6', name: 'NP-Hard and NP-Complete Problems' },
        ],
      },
      {
        id: 'cse-s3-evs', name: 'Environmental Science & Engineering',
        topics: [
          { id: 'cse-s3-evs-t1', name: 'Ecosystems and Biodiversity' },
          { id: 'cse-s3-evs-t2', name: 'Environmental Pollution and Control' },
          { id: 'cse-s3-evs-t3', name: 'Sustainable Development and Climate Change' },
        ],
      },
      {
        id: 'cse-s3-dldlab', name: 'Digital Logic Design Lab',
        topics: [
          { id: 'cse-s3-dldlab-t1', name: 'Verification of Logic Gates' },
          { id: 'cse-s3-dldlab-t2', name: 'Design and Implementation of Combinational Circuits' },
          { id: 'cse-s3-dldlab-t3', name: 'Design and Implementation of Sequential Circuits' },
        ],
      },
      {
        id: 'cse-s3-ooplab', name: 'Object-Oriented Programming Lab (Java)',
        topics: [
          { id: 'cse-s3-ooplab-t1', name: 'Programs on Classes, Objects, and Methods' },
          { id: 'cse-s3-ooplab-t2', name: 'Programs on Inheritance, Interfaces, and Packages' },
          { id: 'cse-s3-ooplab-t3', name: 'Programs on Exception Handling and Multithreading' },
          { id: 'cse-s3-ooplab-t4', name: 'Programs using Java Collections Framework' },
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
          { id: 'cse-s4-os-t1', name: 'Introduction to OS, System Structures' },
          { id: 'cse-s4-os-t2', name: 'Process Management: Processes, Threads, CPU Scheduling' },
          { id: 'cse-s4-os-t3', name: 'Process Synchronization: Critical Section Problem, Semaphores, Deadlocks' },
          { id: 'cse-s4-os-t4', name: 'Memory Management: Paging, Segmentation, Virtual Memory' },
          { id: 'cse-s4-os-t5', name: 'Storage Management: File Systems, Disk Scheduling, I/O Systems' },
        ],
      },
      {
        id: 'cse-s4-dbms', name: 'Database Management Systems',
        topics: [
          { id: 'cse-s4-dbms-t1', name: 'Introduction to DBMS, ER Model, Relational Model' },
          { id: 'cse-s4-dbms-t2', name: 'Relational Algebra and SQL' },
          { id: 'cse-s4-dbms-t3', name: 'Database Design: Normalization (1NF, 2NF, 3NF, BCNF)' },
          { id: 'cse-s4-dbms-t4', name: 'Transaction Management: ACID Properties, Concurrency Control, Recovery' },
          { id: 'cse-s4-dbms-t5', name: 'Indexing and Hashing' },
        ],
      },
      {
        id: 'cse-s4-coa', name: 'Computer Organization and Architecture',
        topics: [
          { id: 'cse-s4-coa-t1', name: 'Basic Structure of Computers, Instruction Sets' },
          { id: 'cse-s4-coa-t2', name: 'CPU Design: ALU, Control Unit, Pipelining' },
          { id: 'cse-s4-coa-t3', name: 'Memory System: Cache Memory, Virtual Memory' },
          { id: 'cse-s4-coa-t4', name: 'I/O Organization: Interrupts, DMA' },
          { id: 'cse-s4-coa-t5', name: 'Parallel Processing Concepts' },
        ],
      },
      {
        id: 'cse-s4-se', name: 'Software Engineering',
        topics: [
          { id: 'cse-s4-se-t1', name: 'Introduction to Software Engineering, SDLC Models (Waterfall, Agile, Spiral)' },
          { id: 'cse-s4-se-t2', name: 'Requirement Engineering: Elicitation, Analysis, Specification' },
          { id: 'cse-s4-se-t3', name: 'Software Design: Architectural Design, Component-Level Design, UML' },
          { id: 'cse-s4-se-t4', name: 'Software Testing: Unit, Integration, System, Acceptance Testing' },
          { id: 'cse-s4-se-t5', name: 'Software Project Management: Estimation, Scheduling, Risk Management' },
        ],
      },
      {
        id: 'cse-s4-flat', name: 'Formal Languages and Automata Theory',
        topics: [
          { id: 'cse-s4-flat-t1', name: 'Finite Automata: DFA, NFA, Regular Expressions' },
          { id: 'cse-s4-flat-t2', name: 'Regular Languages and Pumping Lemma' },
          { id: 'cse-s4-flat-t3', name: 'Context-Free Grammars and Languages, Pushdown Automata' },
          { id: 'cse-s4-flat-t4', name: 'Turing Machines, Undecidability, Chomsky Hierarchy' },
        ],
      },
      {
        id: 'cse-s4-oslab', name: 'Operating Systems Lab',
        topics: [
          { id: 'cse-s4-oslab-t1', name: 'Shell Scripting and Basic Linux Commands' },
          { id: 'cse-s4-oslab-t2', name: 'CPU Scheduling Algorithm Implementations' },
          { id: 'cse-s4-oslab-t3', name: 'Memory Management Algorithm Implementations' },
          { id: 'cse-s4-oslab-t4', name: 'Process Synchronization and Deadlock Avoidance Programs' },
        ],
      },
      {
        id: 'cse-s4-dbmslab', name: 'DBMS Lab',
        topics: [
          { id: 'cse-s4-dbmslab-t1', name: 'SQL Queries: DDL, DML, DCL, TCL' },
          { id: 'cse-s4-dbmslab-t2', name: 'PL/SQL Programming: Cursors, Triggers, Procedures' },
          { id: 'cse-s4-dbmslab-t3', name: 'Database Design and Normalization Exercises' },
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
          { id: 'cse-s5-cn-t1', name: 'Introduction to Networks, OSI & TCP/IP Models' },
          { id: 'cse-s5-cn-t2', name: 'Physical Layer: Signals, Transmission Media' },
          { id: 'cse-s5-cn-t3', name: 'Data Link Layer: Error Detection/Correction, MAC Protocols' },
          { id: 'cse-s5-cn-t4', name: 'Network Layer: IP Addressing, Routing Algorithms (RIP, OSPF, BGP)' },
          { id: 'cse-s5-cn-t5', name: 'Transport Layer: TCP, UDP, Congestion Control' },
          { id: 'cse-s5-cn-t6', name: 'Application Layer: HTTP, FTP, SMTP, DNS' },
        ],
      },
      {
        id: 'cse-s5-mpmc', name: 'Microprocessors and Microcontrollers',
        topics: [
          { id: 'cse-s5-mpmc-t1', name: '8086 Microprocessor Architecture & Instruction Set' },
          { id: 'cse-s5-mpmc-t2', name: 'Assembly Language Programming for 8086' },
          { id: 'cse-s5-mpmc-t3', name: 'Interfacing Memory and I/O Devices with 8086' },
          { id: 'cse-s5-mpmc-t4', name: 'Introduction to Microcontrollers (e.g., 8051/ARM Cortex)' },
        ],
      },
      {
        id: 'cse-s5-web', name: 'Web Technologies',
        topics: [
          { id: 'cse-s5-web-t1', name: 'HTML5, CSS3, JavaScript Fundamentals' },
          { id: 'cse-s5-web-t2', name: 'DOM Manipulation and Event Handling' },
          { id: 'cse-s5-web-t3', name: 'Client-Side Frameworks/Libraries (e.g., React, Angular, Vue basics)' },
          { id: 'cse-s5-web-t4', name: 'Server-Side Scripting (e.g., Node.js with Express, or PHP/Python with Flask/Django basics)' },
          { id: 'cse-s5-web-t5', name: 'Database Connectivity (e.g., MongoDB, MySQL)' },
          { id: 'cse-s5-web-t6', name: 'AJAX, JSON, and RESTful APIs' },
        ],
      },
      {
        id: 'cse-s5-ai', name: 'Artificial Intelligence',
        topics: [
          { id: 'cse-s5-ai-t1', name: 'Introduction to AI, Intelligent Agents' },
          { id: 'cse-s5-ai-t2', name: 'Problem Solving: Search Techniques (BFS, DFS, A*, Heuristic Search)' },
          { id: 'cse-s5-ai-t3', name: 'Knowledge Representation: Logic, Semantic Nets, Frames' },
          { id: 'cse-s5-ai-t4', name: 'Reasoning Under Uncertainty, Introduction to Machine Learning Concepts' },
          { id: 'cse-s5-ai-t5', name: 'Natural Language Processing Basics' },
        ],
      },
      {
        id: 'cse-s5-pe1', name: 'Professional Elective I', // Example: Could be Data Mining, Adv Java, etc.
        topics: [
          { id: 'cse-s5-pe1-data-mining', name: 'Data Mining Concepts & Techniques' },
          { id: 'cse-s5-pe1-adv-java', name: 'Advanced Java (Servlets, JSP, JDBC)' },
          { id: 'cse-s5-pe1-soft-comp', name: 'Soft Computing (Fuzzy Logic, Neural Networks, Genetic Algorithms)' },
          { id: 'cse-s5-pe1-comp-graphics', name: 'Computer Graphics' },
        ],
      },
      {
        id: 'cse-s5-cnlab', name: 'Computer Networks Lab',
        topics: [
          { id: 'cse-s5-cnlab-t1', name: 'Network Configuration and Basic Commands' },
          { id: 'cse-s5-cnlab-t2', name: 'Socket Programming (TCP/UDP)' },
          { id: 'cse-s5-cnlab-t3', name: 'Simulation of Network Protocols (e.g., using NS2/Packet Tracer)' },
        ],
      },
      {
        id: 'cse-s5-weblab', name: 'Web Technologies Lab',
        topics: [
          { id: 'cse-s5-weblab-t1', name: 'Developing static and dynamic web pages using HTML, CSS, JavaScript' },
          { id: 'cse-s5-weblab-t2', name: 'Client-side scripting and validation' },
          { id: 'cse-s5-weblab-t3', name: 'Server-side programming and database integration' },
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
          { id: 'cse-s6-cd-t1', name: 'Phases of Compiler, Lexical Analysis, Syntax Analysis (Parsing Techniques)' },
          { id: 'cse-s6-cd-t2', name: 'Syntax Directed Translation, Intermediate Code Generation' },
          { id: 'cse-s6-cd-t3', name: 'Code Optimization Techniques' },
          { id: 'cse-s6-cd-t4', name: 'Code Generation, Runtime Environments' },
        ],
      },
      {
        id: 'cse-s6-ml', name: 'Machine Learning',
        topics: [
          { id: 'cse-s6-ml-t1', name: 'Introduction to Machine Learning, Supervised Learning (Regression, Classification - KNN, SVM, Decision Trees)' },
          { id: 'cse-s6-ml-t2', name: 'Unsupervised Learning (Clustering - K-Means, Hierarchical; Dimensionality Reduction - PCA)' },
          { id: 'cse-s6-ml-t3', name: 'Model Evaluation and Validation Techniques' },
          { id: 'cse-s6-ml-t4', name: 'Introduction to Neural Networks and Deep Learning Basics' },
          { id: 'cse-s6-ml-t5', name: 'Reinforcement Learning Concepts' },
        ],
      },
      {
        id: 'cse-s6-cns', name: 'Cryptography and Network Security',
        topics: [
          { id: 'cse-s6-cns-t1', name: 'Security Concepts, Classical Encryption Techniques' },
          { id: 'cse-s6-cns-t2', name: 'Symmetric Key Cryptography (DES, AES), Asymmetric Key Cryptography (RSA, Diffie-Hellman)' },
          { id: 'cse-s6-cns-t3', name: 'Message Authentication, Hash Functions, Digital Signatures' },
          { id: 'cse-s6-cns-t4', name: 'Network Security: IPsec, SSL/TLS, Firewalls, IDS/IPS' },
          { id: 'cse-s6-cns-t5', name: 'Web Security, Email Security, System Security' },
        ],
      },
      {
        id: 'cse-s6-pe2', name: 'Professional Elective II', // Example: Cloud, Big Data, IoT
        topics: [
          { id: 'cse-s6-pe2-cloud', name: 'Cloud Computing Models & Services (IaaS, PaaS, SaaS)' },
          { id: 'cse-s6-pe2-bigdata', name: 'Big Data Analytics (Hadoop, Spark, NoSQL)' },
          { id: 'cse-s6-pe2-iot', name: 'Internet of Things (IoT) Architecture & Protocols' },
          { id: 'cse-s6-pe2-mob-comp', name: 'Mobile Computing' },
        ],
      },
      {
        id: 'cse-s6-oe1', name: 'Open Elective I', // Generic Open Elective
        topics: [
          { id: 'cse-s6-oe1-pom', name: 'Principles of Management' },
          { id: 'cse-s6-oe1-ent', name: 'Entrepreneurship Development' },
          { id: 'cse-s6-oe1-ipr', name: 'Intellectual Property Rights' },
        ],
      },
      {
        id: 'cse-s6-cdlab', name: 'Compiler Design Lab',
        topics: [
          { id: 'cse-s6-cdlab-t1', name: 'Implementation of Lexical Analyzer' },
          { id: 'cse-s6-cdlab-t2', name: 'Implementation of Parsers (e.g., Recursive Descent, Shift-Reduce)' },
          { id: 'cse-s6-cdlab-t3', name: 'Intermediate Code Generation exercises' },
        ],
      },
      {
        id: 'cse-s6-mllab', name: 'Machine Learning Lab (Using Python)',
        topics: [
          { id: 'cse-s6-mllab-t1', name: 'Implementation of Regression and Classification algorithms' },
          { id: 'cse-s6-mllab-t2', name: 'Implementation of Clustering algorithms' },
          { id: 'cse-s6-mllab-t3', name: 'Working with ML libraries (e.g., Scikit-learn, TensorFlow/Keras basics)' },
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
          { id: 'cse-s7-dist-t1', name: 'Characterization of Distributed Systems, System Models' },
          { id: 'cse-s7-dist-t2', name: 'Interprocess Communication, Remote Invocation (RPC, RMI)' },
          { id: 'cse-s7-dist-t3', name: 'Distributed File Systems, Name Services' },
          { id: 'cse-s7-dist-t4', name: 'Time and Global States, Coordination and Agreement' },
          { id: 'cse-s7-dist-t5', name: 'Consistency and Replication, Fault Tolerance' },
        ],
      },
      {
        id: 'cse-s7-pe3', name: 'Professional Elective III',
        topics: [
          { id: 'cse-s7-pe3-nlp', name: 'Natural Language Processing Techniques' },
          { id: 'cse-s7-pe3-cv', name: 'Computer Vision & Image Processing' },
          { id: 'cse-s7-pe3-block', name: 'Blockchain Technologies & Applications' },
          { id: 'cse-s7-pe3-hci', name: 'Human-Computer Interaction' },
        ],
      },
      {
        id: 'cse-s7-pe4', name: 'Professional Elective IV',
        topics: [
          { id: 'cse-s7-pe4-cyber', name: 'Cyber Security & Forensics' },
          { id: 'cse-s7-pe4-mobiledev', name: 'Mobile Application Development (Android/iOS)' },
          { id: 'cse-s7-pe4-sepm', name: 'Software Project Management Advanced' },
          { id: 'cse-s7-pe4-bioinfo', name: 'Bioinformatics' },
        ],
      },
      {
        id: 'cse-s7-oe2', name: 'Open Elective II', // Generic Open Elective
        topics: [
          { id: 'cse-s7-oe2-gis', name: 'Remote Sensing and GIS' },
          { id: 'cse-s7-oe2-dm', name: 'Disaster Management' },
          { id: 'cse-s7-oe2-finance', name: 'Financial Management' },
        ],
      },
      {
        id: 'cse-s7-proj1', name: 'Project Work Phase I / Mini Project',
        topics: [
          { id: 'cse-s7-proj1-t1', name: 'Problem Identification and Literature Survey' },
          { id: 'cse-s7-proj1-t2', name: 'Requirement Analysis and Feasibility Study' },
          { id: 'cse-s7-proj1-t3', name: 'System Design and Methodology Finalization' },
          { id: 'cse-s7-proj1-t4', name: 'Presentation of Project Proposal' },
        ],
      },
      {
        id: 'cse-s7-indtrain', name: 'Industrial Training / Internship (Summer)',
        topics: [
          { id: 'cse-s7-indtrain-t1', name: 'Industry Exposure and Skill Development' },
          { id: 'cse-s7-indtrain-t2', name: 'Application of Theoretical Knowledge' },
          { id: 'cse-s7-indtrain-t3', name: 'Report Submission and Presentation' },
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
          { id: 'cse-s8-pe5-dl', name: 'Deep Learning Architectures & Applications' },
          { id: 'cse-s8-pe5-agile', name: 'Agile Software Development Practices' },
          { id: 'cse-s8-pe5-rpa', name: 'Robotic Process Automation' },
          { id: 'cse-s8-pe5-ethic', name: 'Professional Ethics in Engineering' },
        ],
      },
      {
        id: 'cse-s8-pe6', name: 'Professional Elective VI',
        topics: [
          { id: 'cse-s8-pe6-quantum', name: 'Quantum Computing Fundamentals' },
          { id: 'cse-s8-pe6-paracomp', name: 'Parallel and Distributed Computing' },
          { id: 'cse-s8-pe6-datasci', name: 'Advanced Data Science Topics' },
          { id: 'cse-s8-pe6-testing', name: 'Software Testing and Quality Assurance' },
        ],
      },
      {
        id: 'cse-s8-proj2', name: 'Project Work Phase II & Dissertation',
        topics: [
          { id: 'cse-s8-proj2-t1', name: 'Implementation and Development of Project' },
          { id: 'cse-s8-proj2-t2', name: 'Testing, Validation, and Performance Analysis' },
          { id: 'cse-s8-proj2-t3', name: 'Final Report Writing and Documentation' },
          { id: 'cse-s8-proj2-t4', name: 'Final Project Viva-Voce and Demonstration' },
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
    topics.push({ id: `${subjectIdPrefix}-topic${i}`, name: `Generic Topic ${String.fromCharCode(64 + i)} for ${subjectIdPrefix.split('-s')[0]}` });
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
    // Add a placeholder lab subject
    if (i <= 2) { // Add labs for first 2 placeholder subjects
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

// This function generates placeholder semesters for a department.
const generatePlaceholderSemesters = (departmentShortName: string, numSemesters: number = 8): DepartmentSemester[] => {
  const semesters: DepartmentSemester[] = [];
  for (let i = 1; i <= numSemesters; i++) {
    semesters.push({
      semester: i,
      subjects: generatePlaceholderSubjects(departmentShortName, i, (i <= 4 ? 5: 4) ), // Fewer subjects in later placeholder sems
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

