
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

export const DEPARTMENTS: Department[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    semesters: [
      {
        semester: 1,
        subjects: [
          { id: 'cs101', name: 'Introduction to Programming', topics: [{id: 'vars', name: 'Variables & Data Types'}, {id: 'control', name: 'Control Flow (If/Else, Loops)'}, {id: 'functions', name: 'Functions & Procedures'}] },
          { id: 'cs102', name: 'Discrete Mathematics', topics: [{id: 'sets', name: 'Set Theory'}, {id: 'logic', name: 'Propositional Logic'}, {id: 'proofs', name: 'Proof Techniques'}] },
        ],
      },
      {
        semester: 2,
        subjects: [
          { id: 'cs201', name: 'Data Structures', topics: [{id: 'arrays', name: 'Arrays & Lists'}, {id: 'stacks_queues', name: 'Stacks & Queues'}, {id: 'trees', name: 'Trees & Graphs Basics'}] },
          { id: 'cs202', name: 'Algorithms', topics: [{id: 'sorting', name: 'Sorting Algorithms (Bubble, Merge, Quick)'}, {id: 'searching', name: 'Searching Algorithms (Linear, Binary)'}, {id: 'complexity', name: 'Big O Notation'}] },
        ],
      },
    ],
  },
  {
    id: 'ee',
    name: 'Electrical Engineering',
    semesters: [
      {
        semester: 1,
        subjects: [
          { id: 'ee101', name: 'Circuit Theory I', topics: [{id: 'ohms_law', name: "Ohm's Law & Kirchhoff's Laws"}, {id: 'dc_analysis', name: 'DC Circuit Analysis'}, {id: 'capacitors_inductors', name: 'Capacitors & Inductors Basics'}] },
          { id: 'ee102', name: 'Digital Logic Design', topics: [{id: 'boolean_algebra', name: "Boolean Algebra"}, {id: 'logic_gates', name: 'Logic Gates'}, {id: 'combinational_circuits', name: 'Combinational Circuits'}] },
        ],
      },
      {
        semester: 2,
        subjects: [
          { id: 'ee201', name: 'Circuit Theory II', topics: [{id: 'ac_analysis', name: 'AC Circuit Analysis'}, {id: 'rlc_circuits', name: 'RLC Circuits'}, {id: 'op_amps', name: 'Operational Amplifiers'}] },
          { id: 'ee202', name: 'Electromagnetics I', topics: [{id: 'vector_analysis', name: 'Vector Analysis'}, {id: 'electrostatics', name: 'Electrostatics'}, {id: 'magnetostatics', name: 'Magnetostatics'}] },
        ],
      },
    ],
  },
   {
    id: 'me',
    name: 'Mechanical Engineering',
    semesters: [
      {
        semester: 1,
        subjects: [
          { id: 'me101', name: 'Statics', topics: [{id: 'force_vectors', name: 'Force Vectors'}, {id: 'equilibrium', name: 'Equilibrium of Particles'}, {id: 'trusses', name: 'Analysis of Trusses'}] },
          { id: 'me102', name: 'Engineering Drawing', topics: [{id: 'orthographic', name: 'Orthographic Projection'}, {id: 'isometric', name: 'Isometric Views'}, {id: 'dimensioning', name: 'Dimensioning & Tolerancing'}] },
        ],
      },
    ],
  },
];

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
