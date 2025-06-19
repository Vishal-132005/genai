
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

const generateTopics = (subjectIdPrefix: string): Topic[] => [
  { id: `${subjectIdPrefix}-topicA`, name: 'Topic A' },
  { id: `${subjectIdPrefix}-topicB`, name: 'Topic B' },
  { id: `${subjectIdPrefix}-topicC`, name: 'Topic C' },
];

const generateSubjects = (departmentId: string, departmentShortName: string, semesterNumber: number): Subject[] => {
  const subjects: Subject[] = [];
  for (let i = 1; i <= 5; i++) { // 5 subjects per semester
    const subjectId = `${departmentId}-s${semesterNumber}-subj${i}`;
    subjects.push({
      id: subjectId,
      name: `${departmentShortName} Sem ${semesterNumber} Subject ${i}`,
      topics: generateTopics(subjectId),
    });
  }
  return subjects;
};

const generateSemesters = (departmentId: string, departmentShortName: string): DepartmentSemester[] => {
  const semesters: DepartmentSemester[] = [];
  for (let i = 1; i <= 8; i++) { // 8 semesters per department
    semesters.push({
      semester: i,
      subjects: generateSubjects(departmentId, departmentShortName, i),
    });
  }
  return semesters;
};

export const DEPARTMENTS: Department[] = departmentsList.map(dept => ({
  id: dept.id,
  name: dept.name,
  semesters: generateSemesters(dept.id, dept.shortName),
}));

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
