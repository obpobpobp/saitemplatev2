export interface Source {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'recording';
  uploadedAt: string;
  size?: string;
}

export interface QuizQuestionData {
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
}

export interface Creation {
  id: string;
  type: 'summary' | 'quiz' | 'note' | 'exam';
  title: string;
  createdAt: string;
  status?: 'viewing' | 'completed' | 'in-progress';
  metadata?: {
    questionCount?: number;
    score?: number;
    progress?: number;
  };
  quizData?: {
    questions: QuizQuestionData[];
    timeLimit?: number;
  };
  examData?: {
    examId: string;
    questions: any[];
  };
}

export interface Project {
  id: string;
  emoji: string;
  title: string;
  course: string;
  updatedDate: string;
  isLocked?: boolean;
  sources: Source[];
  creations: Creation[];
  description?: string;
}

// Nursing projects
const nursingProjects: Project[] = [
  {
    id: 'nursing-1',
    emoji: '🩺',
    title: 'Cardiovascular System',
    course: 'Anatomy & Physiology',
    updatedDate: 'Today',
    sources: [
      { id: 's1', name: 'Heart Anatomy Lecture.pdf', type: 'pdf', uploadedAt: '2 hours ago', size: '2.3 MB' },
      { id: 's2', name: 'Blood Flow Diagrams.pdf', type: 'pdf', uploadedAt: '2 hours ago', size: '1.8 MB' },
      { id: 's3', name: 'Cardiac Cycle Notes.pdf', type: 'pdf', uploadedAt: '3 hours ago', size: '1.2 MB' },
      { id: 's4', name: 'ECG Reading Guide.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '3.1 MB' }
    ],
    creations: [
      { id: 'c1', type: 'summary', title: 'Cardiovascular System Summary', createdAt: '1 hour ago', status: 'viewing' },
      { 
        id: 'c2', 
        type: 'quiz', 
        title: 'Heart Anatomy Quiz', 
        createdAt: '3 hours ago', 
        status: 'completed', 
        metadata: { questionCount: 15, score: 87 },
        quizData: {
          timeLimit: 20,
          questions: [
            {
              question: 'Which chamber of the heart receives oxygenated blood from the lungs?',
              options: ['Right atrium', 'Left atrium', 'Right ventricle', 'Left ventricle'],
              correctOption: 1,
              explanation: 'The left atrium receives oxygenated blood from the pulmonary veins after blood has been oxygenated in the lungs. This blood then flows into the left ventricle for systemic circulation.'
            },
            {
              question: 'What is the function of the tricuspid valve?',
              options: [
                'Prevents backflow from left ventricle to left atrium',
                'Prevents backflow from right ventricle to right atrium',
                'Prevents backflow from aorta to left ventricle',
                'Prevents backflow from pulmonary artery to right ventricle'
              ],
              correctOption: 1,
              explanation: 'The tricuspid valve is located between the right atrium and right ventricle. It opens to allow blood flow into the right ventricle and closes to prevent backflow during ventricular contraction.'
            },
            {
              question: 'During which phase of the cardiac cycle does ventricular filling occur?',
              options: ['Systole', 'Diastole', 'Isovolumetric contraction', 'Isovolumetric relaxation'],
              correctOption: 1,
              explanation: 'Ventricular filling occurs during diastole when the ventricles are relaxed and the AV valves (tricuspid and mitral) are open, allowing blood to flow from the atria into the ventricles.'
            },
            {
              question: 'What is the normal resting heart rate for adults?',
              options: ['40-60 bpm', '60-100 bpm', '100-120 bpm', '120-140 bpm'],
              correctOption: 1,
              explanation: 'The normal resting heart rate for adults ranges from 60 to 100 beats per minute. Athletes may have lower resting rates (40-60 bpm) due to cardiovascular conditioning.'
            },
            {
              question: 'Which blood vessel carries deoxygenated blood from the heart to the lungs?',
              options: ['Pulmonary vein', 'Pulmonary artery', 'Aorta', 'Vena cava'],
              correctOption: 1,
              explanation: 'The pulmonary artery carries deoxygenated blood from the right ventricle to the lungs for oxygenation. It\'s the only artery in the body that carries deoxygenated blood.'
            },
            {
              question: 'What generates the electrical impulse that initiates each heartbeat?',
              options: ['AV node', 'SA node', 'Bundle of His', 'Purkinje fibers'],
              correctOption: 1,
              explanation: 'The sinoatrial (SA) node is the heart\'s natural pacemaker, located in the right atrium. It generates electrical impulses that spread through the heart, initiating each cardiac cycle.'
            },
            {
              question: 'Which layer of the heart wall is responsible for contraction?',
              options: ['Endocardium', 'Myocardium', 'Epicardium', 'Pericardium'],
              correctOption: 1,
              explanation: 'The myocardium is the thick middle layer of heart muscle responsible for the heart\'s contractile function. It\'s composed of cardiac muscle cells that generate the force needed to pump blood.'
            },
            {
              question: 'What is the first heart sound (S1) caused by?',
              options: [
                'Closure of semilunar valves',
                'Closure of AV valves',
                'Opening of semilunar valves',
                'Ventricular filling'
              ],
              correctOption: 1,
              explanation: 'The first heart sound (S1) is caused by the closure of the atrioventricular valves (tricuspid and mitral) at the beginning of ventricular systole. This sound is often described as "lub".'
            },
            {
              question: 'Which coronary artery supplies blood to the left ventricle?',
              options: ['Right coronary artery', 'Left anterior descending artery', 'Posterior descending artery', 'Circumflex artery'],
              correctOption: 1,
              explanation: 'The left anterior descending (LAD) artery is the primary blood supply to the left ventricle and interventricular septum. Blockage of this artery can cause severe anterior wall myocardial infarction.'
            },
            {
              question: 'What is the average stroke volume in a healthy adult at rest?',
              options: ['40-50 mL', '70-80 mL', '100-110 mL', '120-130 mL'],
              correctOption: 1,
              explanation: 'The average stroke volume (amount of blood pumped per beat) in a healthy adult at rest is approximately 70-80 mL. This can increase significantly during exercise.'
            },
            {
              question: 'Which structure prevents the backflow of blood from the left ventricle into the left atrium?',
              options: ['Tricuspid valve', 'Mitral valve', 'Aortic valve', 'Pulmonary valve'],
              correctOption: 1,
              explanation: 'The mitral (bicuspid) valve is located between the left atrium and left ventricle. It prevents backflow of blood from the left ventricle to the left atrium during systole.'
            },
            {
              question: 'What is cardiac output determined by?',
              options: [
                'Heart rate only',
                'Stroke volume only',
                'Heart rate × Stroke volume',
                'Blood pressure × Heart rate'
              ],
              correctOption: 2,
              explanation: 'Cardiac output is calculated as heart rate multiplied by stroke volume (CO = HR × SV). Normal cardiac output at rest is approximately 5 liters per minute.'
            },
            {
              question: 'During an ECG, what does the QRS complex represent?',
              options: [
                'Atrial depolarization',
                'Ventricular depolarization',
                'Ventricular repolarization',
                'Atrial repolarization'
              ],
              correctOption: 1,
              explanation: 'The QRS complex represents ventricular depolarization, which leads to ventricular contraction. It\'s the most prominent waveform on the ECG and normally lasts 0.08-0.12 seconds.'
            },
            {
              question: 'What is the function of the chordae tendineae?',
              options: [
                'Generate electrical impulses',
                'Prevent valve leaflets from inverting',
                'Conduct electrical signals',
                'Produce hormones'
              ],
              correctOption: 1,
              explanation: 'Chordae tendineae are fibrous cords that connect the papillary muscles to the AV valve leaflets. They prevent the valves from inverting into the atria during ventricular contraction.'
            },
            {
              question: 'Which factor increases cardiac contractility?',
              options: [
                'Increased parasympathetic stimulation',
                'Decreased calcium availability',
                'Increased sympathetic stimulation',
                'Beta-blocker medications'
              ],
              correctOption: 2,
              explanation: 'Sympathetic stimulation releases norepinephrine and epinephrine, which increase cardiac contractility through β1-adrenergic receptor activation. This increases the force of heart muscle contraction.'
            }
          ]
        }
      },
      { 
        id: 'c3', 
        type: 'exam', 
        title: 'Cardiovascular Mock Exam', 
        createdAt: '2 hours ago', 
        metadata: { questionCount: 6 },
        examData: {
          examId: 'exam-cardio-001',
          questions: [
            {
              id: '1',
              type: 'multiple-choice',
              questionNumber: 1,
              marks: 5,
              text: 'What concept does Bauman use to describe the temporary and loosely bound social groups in liquid modernity?',
              options: [
                'Networked individualism',
                'Mechanical solidarity',
                'Organic solidarity',
                'Swarm theory',
              ],
              correctAnswer: 3,
            },
            {
              id: '2',
              type: 'short-answer',
              questionNumber: 2,
              marks: 3,
              text: 'Define cognitive load theory in one sentence.',
              correctAnswer: 'Cognitive load theory explains how working memory capacity affects learning.',
            },
            {
              id: '3',
              type: 'true-false',
              questionNumber: 3,
              marks: 2,
              text: 'React is a JavaScript framework designed for building mobile applications.',
              correctAnswer: false,
            },
            {
              id: '4',
              type: 'multi-select',
              questionNumber: 4,
              marks: 4,
              text: 'Which of the following are valid React hooks? (Select all that apply)',
              options: ['useState', 'useContext', 'useClass', 'useEffect', 'useComponent', 'useRef'],
              correctAnswer: [0, 1, 3, 5],
            },
            {
              id: '5',
              type: 'long-answer',
              questionNumber: 5,
              marks: 8,
              stem: 'Consider the following scenario: A teacher wants to explain photosynthesis to middle school students.',
              text: 'Explain how you would apply multimedia learning principles to design an effective lesson. Include specific examples of media types and their purposes.',
              correctAnswer: 'A comprehensive answer should mention Mayer\'s principles, dual coding theory, and provide concrete examples of visuals and text integration.',
            },
            {
              id: '6',
              type: 'fill-blanks',
              questionNumber: 6,
              marks: 6,
              text: 'The process of  is essential for converting sunlight into  energy, which plants use for .',
              blanks: [
                { id: 'blank1', correctAnswer: 'photosynthesis', position: 15 },
                { id: 'blank2', correctAnswer: 'chemical', position: 60 },
                { id: 'blank3', correctAnswer: 'growth', position: 95 },
              ],
            },
          ]
        }
      },
      { id: 'c4', type: 'note', title: 'Study Notes', createdAt: 'Today' }
    ],
    description: 'Comprehensive study of the cardiovascular system including heart anatomy, blood flow, and cardiac cycle'
  },
  {
    id: 'nursing-2',
    emoji: '💊',
    title: 'Pharmacology Basics',
    course: 'Pharmacology 101',
    updatedDate: 'Yesterday',
    sources: [
      { id: 's5', name: 'Drug Classifications.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '4.2 MB' },
      { id: 's6', name: 'Dosage Calculations.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '1.5 MB' }
    ],
    creations: [
      { id: 'c4', type: 'summary', title: 'Drug Classes Overview', createdAt: 'Yesterday', status: 'completed' },
      { 
        id: 'c5', 
        type: 'quiz', 
        title: 'Pharmacology Quiz', 
        createdAt: 'Yesterday', 
        metadata: { questionCount: 20, score: 92 },
        quizData: {
          timeLimit: 25,
          questions: [
            {
              question: 'Which drug class is typically used as first-line treatment for hypertension?',
              options: ['Beta blockers', 'ACE inhibitors', 'Calcium channel blockers', 'Diuretics'],
              correctOption: 3,
              explanation: 'Thiazide diuretics are often used as first-line treatment for hypertension in uncomplicated cases. They reduce blood pressure by decreasing blood volume through increased sodium and water excretion.'
            },
            {
              question: 'What is the primary mechanism of action for NSAIDs?',
              options: [
                'Blocking histamine receptors',
                'Inhibiting COX enzymes',
                'Blocking opioid receptors',
                'Enhancing GABA activity'
              ],
              correctOption: 1,
              explanation: 'NSAIDs work by inhibiting cyclooxygenase (COX) enzymes, which are responsible for prostaglandin synthesis. This reduces inflammation, pain, and fever.'
            },
            {
              question: 'Which medication requires therapeutic drug monitoring due to its narrow therapeutic index?',
              options: ['Ibuprofen', 'Digoxin', 'Acetaminophen', 'Aspirin'],
              correctOption: 1,
              explanation: 'Digoxin has a narrow therapeutic index (0.5-2.0 ng/mL), meaning the difference between therapeutic and toxic levels is small. Regular monitoring is essential to prevent toxicity.'
            },
            {
              question: 'What is the antidote for warfarin overdose?',
              options: ['Protamine sulfate', 'Vitamin K', 'Naloxone', 'N-acetylcysteine'],
              correctOption: 1,
              explanation: 'Vitamin K is the antidote for warfarin overdose. Warfarin inhibits vitamin K-dependent clotting factors, so administering vitamin K reverses this effect.'
            },
            {
              question: 'Which beta-blocker is cardioselective?',
              options: ['Propranolol', 'Metoprolol', 'Labetalol', 'Carvedilol'],
              correctOption: 1,
              explanation: 'Metoprolol is a β1-selective (cardioselective) beta-blocker, primarily affecting the heart with less impact on β2 receptors in the lungs and peripheral vessels at therapeutic doses.'
            }
          ]
        }
      }
    ],
    description: 'Introduction to pharmacology including drug classifications and dosage calculations'
  },
  {
    id: 'nursing-3',
    emoji: '🧬',
    title: 'Microbiology & Infection Control',
    course: 'Microbiology',
    updatedDate: '2 days ago',
    sources: [
      { id: 's7', name: 'Bacterial Infections.pdf', type: 'pdf', uploadedAt: '2 days ago', size: '3.8 MB' }
    ],
    creations: [
      { id: 'c6', type: 'note', title: 'Infection Control Notes', createdAt: '2 days ago', status: 'in-progress' }
    ],
    description: 'Study of microorganisms and infection control practices'
  },
  {
    id: 'nursing-4',
    emoji: '🏥',
    title: 'Patient Assessment',
    course: 'Clinical Skills',
    updatedDate: '3 days ago',
    sources: [
      { id: 's8', name: 'Vital Signs Guide.pdf', type: 'pdf', uploadedAt: '3 days ago', size: '2.1 MB' },
      { id: 's9', name: 'Physical Assessment.pdf', type: 'pdf', uploadedAt: '3 days ago', size: '5.3 MB' },
      { id: 's10', name: 'Assessment Demo.mp4', type: 'recording', uploadedAt: '3 days ago', size: '45 MB' }
    ],
    creations: [
      { id: 'c7', type: 'summary', title: 'Assessment Techniques Summary', createdAt: '3 days ago' },
      { 
        id: 'c8', 
        type: 'quiz', 
        title: 'Vital Signs Quiz', 
        createdAt: '3 days ago', 
        metadata: { questionCount: 10 },
        quizData: {
          timeLimit: 15,
          questions: [
            {
              question: 'What is the normal respiratory rate for adults at rest?',
              options: ['8-10 breaths/min', '12-20 breaths/min', '22-28 breaths/min', '30-35 breaths/min'],
              correctOption: 1,
              explanation: 'The normal respiratory rate for adults at rest is 12-20 breaths per minute. Rates below 12 (bradypnea) or above 20 (tachypnea) may indicate respiratory issues.'
            },
            {
              question: 'Where should you place the stethoscope to best hear the apical pulse?',
              options: [
                '2nd intercostal space, right sternal border',
                '5th intercostal space, left midclavicular line',
                '4th intercostal space, left sternal border',
                '3rd intercostal space, right midclavicular line'
              ],
              correctOption: 1,
              explanation: 'The apical pulse is best heard at the 5th intercostal space at the left midclavicular line, which is the point of maximal impulse (PMI) where the apex of the heart is closest to the chest wall.'
            },
            {
              question: 'What does a blood pressure reading of 140/90 mmHg indicate?',
              options: ['Normal blood pressure', 'Elevated blood pressure', 'Stage 1 hypertension', 'Stage 2 hypertension'],
              correctOption: 2,
              explanation: 'A blood pressure of 140/90 mmHg indicates Stage 1 hypertension. Stage 1 is defined as systolic 130-139 mmHg or diastolic 80-89 mmHg.'
            },
            {
              question: 'Which site is recommended for taking an infant\'s temperature rectally?',
              options: ['Insert 0.5 inch (1.25 cm)', 'Insert 1.5 inches (3.75 cm)', 'Insert 2 inches (5 cm)', 'Insert 3 inches (7.5 cm)'],
              correctOption: 0,
              explanation: 'For infants, rectal thermometers should be inserted only 0.5 inch (1.25 cm) to avoid injury. For adults, insertion depth is typically 1.5 inches.'
            },
            {
              question: 'What is considered a normal oxygen saturation (SpO2) level?',
              options: ['85-90%', '91-94%', '95-100%', '100% only'],
              correctOption: 2,
              explanation: 'Normal oxygen saturation is 95-100%. Values below 95% may indicate hypoxemia and require assessment. Values below 90% are considered critically low.'
            }
          ]
        }
      }
    ],
    description: 'Comprehensive guide to patient assessment and vital signs monitoring'
  }
];

// Medicine projects
const medicineProjects: Project[] = [
  {
    id: 'med-1',
    emoji: '🧠',
    title: 'Neurological Disorders',
    course: 'Neurology',
    updatedDate: 'Today',
    sources: [
      { id: 's11', name: 'CNS Anatomy.pdf', type: 'pdf', uploadedAt: '1 hour ago', size: '6.2 MB' },
      { id: 's12', name: 'Stroke Management.pdf', type: 'pdf', uploadedAt: '2 hours ago', size: '3.5 MB' },
      { id: 's13', name: 'Epilepsy Guide.pdf', type: 'pdf', uploadedAt: '3 hours ago', size: '2.8 MB' },
      { id: 's14', name: 'Parkinson Disease.pdf', type: 'pdf', uploadedAt: '4 hours ago', size: '3.1 MB' },
      { id: 's15', name: 'Brain Scan Images.pdf', type: 'image', uploadedAt: '5 hours ago', size: '8.3 MB' }
    ],
    creations: [
      { id: 'c9', type: 'summary', title: 'Neurological Disorders Overview', createdAt: '30 min ago', status: 'viewing' },
      { 
        id: 'c10', 
        type: 'quiz', 
        title: 'CNS Anatomy Quiz', 
        createdAt: '2 hours ago', 
        metadata: { questionCount: 25, score: 88 },
        quizData: {
          timeLimit: 30,
          questions: [
            {
              question: 'Which lobe of the brain is primarily responsible for processing visual information?',
              options: ['Frontal lobe', 'Parietal lobe', 'Temporal lobe', 'Occipital lobe'],
              correctOption: 3,
              explanation: 'The occipital lobe, located at the back of the brain, contains the primary visual cortex and is responsible for processing visual information.'
            },
            {
              question: 'What is the function of Broca\'s area?',
              options: ['Visual processing', 'Speech production', 'Auditory processing', 'Memory formation'],
              correctOption: 1,
              explanation: 'Broca\'s area, located in the frontal lobe (typically left hemisphere), is responsible for speech production and motor aspects of language. Damage causes Broca\'s aphasia.'
            },
            {
              question: 'Which structure connects the two cerebral hemispheres?',
              options: ['Corpus callosum', 'Thalamus', 'Hypothalamus', 'Pons'],
              correctOption: 0,
              explanation: 'The corpus callosum is a large bundle of nerve fibers that connects the left and right cerebral hemispheres, allowing communication between them.'
            },
            {
              question: 'What is the primary function of the cerebellum?',
              options: ['Emotion regulation', 'Coordination and balance', 'Memory consolidation', 'Language processing'],
              correctOption: 1,
              explanation: 'The cerebellum coordinates voluntary movements, maintains posture and balance, and helps with motor learning. Damage causes ataxia and coordination problems.'
            },
            {
              question: 'Which cranial nerve is responsible for vision?',
              options: ['CN I (Olfactory)', 'CN II (Optic)', 'CN III (Oculomotor)', 'CN IV (Trochlear)'],
              correctOption: 1,
              explanation: 'The optic nerve (CN II) transmits visual information from the retina to the brain. It\'s the only cranial nerve that is actually a central nervous system tract.'
            }
          ]
        }
      },
      { id: 'c11', type: 'note', title: 'Clinical Cases Notes', createdAt: 'Today' },
      { 
        id: 'c12', 
        type: 'quiz', 
        title: 'Stroke Management Quiz', 
        createdAt: '3 hours ago', 
        metadata: { questionCount: 15 },
        quizData: {
          timeLimit: 20,
          questions: [
            {
              question: 'What does the acronym FAST stand for in stroke recognition?',
              options: [
                'Face, Arms, Speech, Time',
                'Focal, Acute, Sudden, Timed',
                'Facial, Ataxia, Sensory, Tremor',
                'Frontal, Arterial, Stroke, Test'
              ],
              correctOption: 0,
              explanation: 'FAST stands for Face (drooping), Arms (weakness), Speech (difficulty), and Time (call emergency). This is a quick method for stroke recognition and emphasizes time-critical treatment.'
            },
            {
              question: 'What is the time window for administering tPA in acute ischemic stroke?',
              options: ['1.5 hours', '3 hours', '4.5 hours', '6 hours'],
              correctOption: 2,
              explanation: 'The FDA-approved window for IV tPA administration is within 3 hours of symptom onset, but it can be extended to 4.5 hours in eligible patients following AHA/ASA guidelines.'
            },
            {
              question: 'Which type of stroke is caused by bleeding in the brain?',
              options: ['Ischemic stroke', 'Hemorrhagic stroke', 'Transient ischemic attack', 'Lacunar stroke'],
              correctOption: 1,
              explanation: 'Hemorrhagic stroke is caused by bleeding into the brain tissue or subarachnoid space, accounting for about 13% of strokes. It has higher mortality than ischemic stroke.'
            }
          ]
        }
      }
    ],
    description: 'Comprehensive study of neurological disorders including stroke, epilepsy, and Parkinson\'s disease'
  },
  {
    id: 'med-2',
    emoji: '❤️',
    title: 'Cardiology Essentials',
    course: 'Internal Medicine',
    updatedDate: 'Yesterday',
    sources: [
      { id: 's16', name: 'Heart Failure.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '4.2 MB' },
      { id: 's17', name: 'Arrhythmias.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '3.7 MB' },
      { id: 's18', name: 'ECG Interpretation.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '5.1 MB' }
    ],
    creations: [
      { id: 'c13', type: 'summary', title: 'Cardiology Summary', createdAt: 'Yesterday', status: 'completed' },
      { 
        id: 'c14', 
        type: 'quiz', 
        title: 'Heart Failure Quiz', 
        createdAt: 'Yesterday', 
        metadata: { questionCount: 20, score: 91 },
        quizData: {
          timeLimit: 25,
          questions: [
            {
              question: 'What is the primary pathophysiology of systolic heart failure?',
              options: [
                'Impaired ventricular filling',
                'Reduced ventricular contractility',
                'Valvular regurgitation',
                'Increased afterload'
              ],
              correctOption: 1,
              explanation: 'Systolic heart failure (HFrEF) is characterized by reduced ventricular contractility, resulting in decreased ejection fraction (<40%). The heart cannot pump blood effectively.'
            },
            {
              question: 'Which medication class is the cornerstone of heart failure treatment?',
              options: ['Calcium channel blockers', 'ACE inhibitors or ARBs', 'Alpha blockers', 'Nitrates'],
              correctOption: 1,
              explanation: 'ACE inhibitors (or ARBs if ACE-intolerant) are first-line therapy for heart failure. They reduce afterload, decrease mortality, and slow disease progression.'
            },
            {
              question: 'What is the most common cause of right-sided heart failure?',
              options: ['Pulmonary embolism', 'Left-sided heart failure', 'Tricuspid regurgitation', 'Pulmonary hypertension'],
              correctOption: 1,
              explanation: 'Left-sided heart failure is the most common cause of right-sided heart failure. Increased pressure backs up into the pulmonary circulation, causing right ventricular strain.'
            }
          ]
        }
      },
      { 
        id: 'c15', 
        type: 'quiz', 
        title: 'ECG Quiz', 
        createdAt: 'Yesterday', 
        metadata: { questionCount: 30, score: 85 },
        quizData: {
          timeLimit: 35,
          questions: [
            {
              question: 'What does the P wave represent on an ECG?',
              options: ['Atrial depolarization', 'Ventricular depolarization', 'Atrial repolarization', 'Ventricular repolarization'],
              correctOption: 0,
              explanation: 'The P wave represents atrial depolarization, the electrical activation of the atria that precedes atrial contraction. Normal P waves are upright in leads I, II, and aVF.'
            },
            {
              question: 'What is the normal PR interval duration?',
              options: ['0.06-0.10 seconds', '0.12-0.20 seconds', '0.22-0.28 seconds', '0.30-0.40 seconds'],
              correctOption: 1,
              explanation: 'The normal PR interval is 0.12-0.20 seconds (3-5 small squares). It represents the time from atrial depolarization to the beginning of ventricular depolarization.'
            },
            {
              question: 'What ECG change is most characteristic of acute myocardial infarction?',
              options: ['ST segment depression', 'ST segment elevation', 'Prolonged QT interval', 'U waves'],
              correctOption: 1,
              explanation: 'ST segment elevation in contiguous leads is the hallmark of acute STEMI (ST-Elevation Myocardial Infarction), indicating full-thickness myocardial injury requiring immediate intervention.'
            }
          ]
        }
      }
    ],
    description: 'Essential cardiology topics including heart failure, arrhythmias, and ECG interpretation'
  },
  {
    id: 'med-3',
    emoji: '🦴',
    title: 'Orthopedic Surgery',
    course: 'Surgery',
    updatedDate: '2 days ago',
    sources: [
      { id: 's19', name: 'Fracture Management.pdf', type: 'pdf', uploadedAt: '2 days ago', size: '7.2 MB' }
    ],
    creations: [
      { id: 'c16', type: 'note', title: 'Surgical Techniques Notes', createdAt: '2 days ago', status: 'in-progress' }
    ],
    description: 'Orthopedic surgery principles and fracture management'
  }
];

// Law projects
const lawProjects: Project[] = [
  {
    id: 'law-1',
    emoji: '⚖️',
    title: 'Constitutional Law Fundamentals',
    course: 'Constitutional Law',
    updatedDate: 'Today',
    sources: [
      { id: 's20', name: 'Constitutional Framework.pdf', type: 'pdf', uploadedAt: '2 hours ago', size: '4.5 MB' },
      { id: 's21', name: 'Separation of Powers.pdf', type: 'pdf', uploadedAt: '3 hours ago', size: '2.3 MB' },
      { id: 's22', name: 'Bill of Rights.pdf', type: 'pdf', uploadedAt: '4 hours ago', size: '3.1 MB' },
      { id: 's23', name: 'Landmark Cases.pdf', type: 'pdf', uploadedAt: '5 hours ago', size: '6.8 MB' },
      { id: 's24', name: 'Federal System.pdf', type: 'pdf', uploadedAt: '6 hours ago', size: '2.9 MB' },
      { id: 's25', name: 'Judicial Review.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '3.7 MB' }
    ],
    creations: [
      { id: 'c17', type: 'summary', title: 'Constitutional Law Summary', createdAt: '1 hour ago', status: 'viewing' },
      { 
        id: 'c18', 
        type: 'quiz', 
        title: 'Bill of Rights Quiz', 
        createdAt: '4 hours ago', 
        metadata: { questionCount: 30, score: 93 },
        quizData: {
          timeLimit: 35,
          questions: [
            {
              question: 'Which amendment protects freedom of speech?',
              options: ['First Amendment', 'Second Amendment', 'Fourth Amendment', 'Fifth Amendment'],
              correctOption: 0,
              explanation: 'The First Amendment protects five fundamental freedoms: religion, speech, press, assembly, and petition. It\'s the cornerstone of American civil liberties.'
            },
            {
              question: 'What does the Fourth Amendment protect against?',
              options: ['Self-incrimination', 'Unreasonable searches and seizures', 'Cruel and unusual punishment', 'Double jeopardy'],
              correctOption: 1,
              explanation: 'The Fourth Amendment protects against unreasonable searches and seizures, requiring probable cause for warrants and establishing the exclusionary rule.'
            },
            {
              question: 'Which amendment abolished slavery?',
              options: ['13th Amendment', '14th Amendment', '15th Amendment', '19th Amendment'],
              correctOption: 0,
              explanation: 'The 13th Amendment (1865) abolished slavery and involuntary servitude, except as punishment for a crime. It was the first of the Reconstruction Amendments.'
            },
            {
              question: 'What does the Fifth Amendment\'s Due Process Clause require?',
              options: [
                'Equal protection under the law',
                'Fair legal procedures before deprivation of life, liberty, or property',
                'Right to jury trial',
                'Freedom from cruel punishment'
              ],
              correctOption: 1,
              explanation: 'The Fifth Amendment\'s Due Process Clause requires that the federal government follow fair legal procedures before depriving someone of life, liberty, or property.'
            },
            {
              question: 'Which amendment guarantees the right to a speedy and public trial?',
              options: ['Fifth Amendment', 'Sixth Amendment', 'Seventh Amendment', 'Eighth Amendment'],
              correctOption: 1,
              explanation: 'The Sixth Amendment guarantees criminal defendants the right to a speedy and public trial, an impartial jury, to be informed of charges, to confront witnesses, and to have counsel.'
            }
          ]
        }
      },
      { id: 'c19', type: 'note', title: 'Case Briefs', createdAt: 'Today' },
      { 
        id: 'c20', 
        type: 'quiz', 
        title: 'Landmark Cases Quiz', 
        createdAt: '1 day ago', 
        metadata: { questionCount: 25, score: 89 },
        quizData: {
          timeLimit: 30,
          questions: [
            {
              question: 'What did Marbury v. Madison (1803) establish?',
              options: [
                'Judicial review',
                'Separation of powers',
                'Federal supremacy',
                'Individual rights'
              ],
              correctOption: 0,
              explanation: 'Marbury v. Madison established the principle of judicial review, giving the Supreme Court the power to declare laws unconstitutional.'
            },
            {
              question: 'What was the holding in Brown v. Board of Education (1954)?',
              options: [
                'Separate but equal is constitutional',
                'School segregation is unconstitutional',
                'Affirmative action is required',
                'Busing is mandatory'
              ],
              correctOption: 1,
              explanation: 'Brown v. Board of Education held that racial segregation in public schools violates the Equal Protection Clause, overturning Plessy v. Ferguson\'s "separate but equal" doctrine.'
            },
            {
              question: 'What right was recognized in Gideon v. Wainwright (1963)?',
              options: [
                'Right to remain silent',
                'Right to confront witnesses',
                'Right to counsel in criminal cases',
                'Right to jury trial'
              ],
              correctOption: 2,
              explanation: 'Gideon v. Wainwright established that states must provide counsel to criminal defendants who cannot afford an attorney, incorporating the Sixth Amendment.'
            }
          ]
        }
      },
      { id: 'c21', type: 'summary', title: 'Separation of Powers Summary', createdAt: '1 day ago' }
    ],
    description: 'Fundamental principles of constitutional law including separation of powers and bill of rights'
  },
  {
    id: 'law-2',
    emoji: '📜',
    title: 'Contract Law',
    course: 'Contract Law',
    updatedDate: 'Yesterday',
    sources: [
      { id: 's26', name: 'Contract Formation.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '3.2 MB' },
      { id: 's27', name: 'Breach & Remedies.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '4.1 MB' }
    ],
    creations: [
      { id: 'c22', type: 'summary', title: 'Contract Law Summary', createdAt: 'Yesterday', status: 'completed' },
      { 
        id: 'c23', 
        type: 'quiz', 
        title: 'Contract Formation Quiz', 
        createdAt: 'Yesterday', 
        metadata: { questionCount: 20, score: 87 },
        quizData: {
          timeLimit: 25,
          questions: [
            {
              question: 'What are the essential elements of a valid contract?',
              options: [
                'Offer and acceptance only',
                'Offer, acceptance, and consideration',
                'Offer, acceptance, consideration, and writing',
                'Agreement and payment'
              ],
              correctOption: 1,
              explanation: 'A valid contract requires: (1) offer, (2) acceptance, (3) consideration, (4) legal capacity, and (5) legal purpose. Writing is required only for certain contracts under the Statute of Frauds.'
            },
            {
              question: 'What is consideration in contract law?',
              options: [
                'Careful thought before signing',
                'Something of legal value exchanged',
                'The contract price',
                'Good faith negotiation'
              ],
              correctOption: 1,
              explanation: 'Consideration is something of legal value (benefit or detriment) exchanged between parties. It can be a promise, performance, or forbearance, and must be bargained for.'
            },
            {
              question: 'What is the mailbox rule?',
              options: [
                'Contracts must be mailed within 30 days',
                'Acceptance is effective upon dispatch',
                'Offers expire if not mailed back',
                'Written contracts require certified mail'
              ],
              correctOption: 1,
              explanation: 'The mailbox rule states that acceptance is effective upon dispatch (when mailed), while revocations and rejections are effective upon receipt. This creates a binding contract when acceptance is mailed.'
            }
          ]
        }
      }
    ],
    description: 'Contract law principles including formation, breach, and remedies'
  },
  {
    id: 'law-3',
    emoji: '🏛️',
    title: 'Criminal Procedure',
    course: 'Criminal Law',
    updatedDate: '2 days ago',
    sources: [
      { id: 's28', name: 'Fourth Amendment.pdf', type: 'pdf', uploadedAt: '2 days ago', size: '2.8 MB' },
      { id: 's29', name: 'Search & Seizure.pdf', type: 'pdf', uploadedAt: '2 days ago', size: '3.5 MB' },
      { id: 's30', name: 'Miranda Rights.pdf', type: 'pdf', uploadedAt: '2 days ago', size: '1.9 MB' }
    ],
    creations: [
      { id: 'c24', type: 'note', title: 'Criminal Procedure Notes', createdAt: '2 days ago', status: 'in-progress' },
      { 
        id: 'c25', 
        type: 'quiz', 
        title: 'Fourth Amendment Quiz', 
        createdAt: '2 days ago', 
        metadata: { questionCount: 15 },
        quizData: {
          timeLimit: 20,
          questions: [
            {
              question: 'What is required for a valid search warrant?',
              options: [
                'Reasonable suspicion only',
                'Probable cause and particularity',
                'Officer discretion',
                'Any criminal suspicion'
              ],
              correctOption: 1,
              explanation: 'A valid search warrant requires: (1) probable cause, (2) particularity (specific description of place and items), (3) issued by neutral magistrate, and (4) based on oath or affirmation.'
            },
            {
              question: 'Which is NOT an exception to the warrant requirement?',
              options: [
                'Search incident to arrest',
                'Plain view doctrine',
                'General suspicion',
                'Exigent circumstances'
              ],
              correctOption: 2,
              explanation: 'General or reasonable suspicion alone does not justify warrantless searches. Valid exceptions include: search incident to arrest, plain view, consent, exigent circumstances, and automobile exception.'
            },
            {
              question: 'What does the exclusionary rule prohibit?',
              options: [
                'Excluding witnesses from trial',
                'Using illegally obtained evidence',
                'Excluding the defendant from court',
                'Multiple trials for same offense'
              ],
              correctOption: 1,
              explanation: 'The exclusionary rule prohibits the prosecution from using evidence obtained in violation of the Fourth Amendment. It also applies to "fruit of the poisonous tree."'
            }
          ]
        }
      }
    ],
    description: 'Criminal procedure including search and seizure, and Miranda rights'
  },
  {
    id: 'law-4',
    emoji: '🏢',
    title: 'Corporate Law Basics',
    course: 'Business Law',
    updatedDate: '3 days ago',
    sources: [
      { id: 's31', name: 'Corporate Formation.pdf', type: 'pdf', uploadedAt: '3 days ago', size: '4.2 MB' }
    ],
    creations: [
      { id: 'c26', type: 'summary', title: 'Corporate Law Summary', createdAt: '3 days ago' }
    ],
    description: 'Introduction to corporate law and business entities'
  },
  {
    id: 'law-5',
    emoji: '🏠',
    title: 'Property Law',
    course: 'Property Law',
    updatedDate: '4 days ago',
    sources: [
      { id: 's32', name: 'Real Property.pdf', type: 'pdf', uploadedAt: '4 days ago', size: '5.1 MB' },
      { id: 's33', name: 'Easements.pdf', type: 'pdf', uploadedAt: '4 days ago', size: '2.3 MB' }
    ],
    creations: [
      { id: 'c27', type: 'note', title: 'Property Law Notes', createdAt: '4 days ago' },
      { 
        id: 'c28', 
        type: 'quiz', 
        title: 'Real Property Quiz', 
        createdAt: '4 days ago', 
        metadata: { questionCount: 18 },
        quizData: {
          timeLimit: 22,
          questions: [
            {
              question: 'What is a fee simple absolute?',
              options: [
                'Temporary ownership',
                'Complete ownership with no limitations',
                'Joint ownership',
                'Rental agreement'
              ],
              correctOption: 1,
              explanation: 'Fee simple absolute is the most complete form of property ownership, giving the owner unlimited duration and the power to transfer the property freely. It has no limitations or conditions.'
            },
            {
              question: 'What is an easement?',
              options: [
                'Full property ownership',
                'Right to use another\'s property for specific purpose',
                'Temporary lease',
                'Zoning restriction'
              ],
              correctOption: 1,
              explanation: 'An easement is a non-possessory interest that gives the holder the right to use another\'s property for a specific purpose (e.g., access, utilities) without owning it.'
            },
            {
              question: 'What is required for adverse possession?',
              options: [
                'Owner\'s permission',
                'Short-term use',
                'Continuous, hostile, open, and notorious use for statutory period',
                'Verbal agreement'
              ],
              correctOption: 2,
              explanation: 'Adverse possession requires: (1) actual possession, (2) open and notorious, (3) exclusive, (4) hostile/adverse, and (5) continuous for the statutory period (usually 10-20 years).'
            }
          ]
        }
      }
    ],
    description: 'Property law including real property and easements'
  }
];

// Physics projects
const physicsProjects: Project[] = [
  {
    id: 'physics-1',
    emoji: '⚛️',
    title: 'Quantum Mechanics Intro',
    course: 'Modern Physics',
    updatedDate: 'Today',
    sources: [
      { id: 's34', name: 'Wave-Particle Duality.pdf', type: 'pdf', uploadedAt: '1 hour ago', size: '3.2 MB' },
      { id: 's35', name: 'Schrödinger Equation.pdf', type: 'pdf', uploadedAt: '2 hours ago', size: '4.1 MB' },
      { id: 's36', name: 'Quantum States.pdf', type: 'pdf', uploadedAt: '3 hours ago', size: '2.8 MB' }
    ],
    creations: [
      { id: 'c29', type: 'summary', title: 'Quantum Mechanics Summary', createdAt: '30 min ago', status: 'viewing' },
      { 
        id: 'c30', 
        type: 'quiz', 
        title: 'Wave-Particle Duality Quiz', 
        createdAt: '2 hours ago', 
        metadata: { questionCount: 15, score: 82 },
        quizData: {
          timeLimit: 20,
          questions: [
            {
              question: 'What experiment first demonstrated wave-particle duality of light?',
              options: ['Photoelectric effect', 'Double-slit experiment', 'Compton scattering', 'Davisson-Germer experiment'],
              correctOption: 1,
              explanation: 'The double-slit experiment demonstrates that light exhibits both wave-like (interference pattern) and particle-like behavior depending on whether it is observed.'
            },
            {
              question: 'What is the de Broglie wavelength formula?',
              options: ['λ = h/p', 'λ = hf', 'λ = E/p', 'λ = mc²'],
              correctOption: 0,
              explanation: 'The de Broglie wavelength λ = h/p, where h is Planck\'s constant and p is momentum. This relates a particle\'s wavelength to its momentum.'
            },
            {
              question: 'What does the Heisenberg Uncertainty Principle state?',
              options: [
                'Energy is quantized',
                'Light has wave-particle duality',
                'Position and momentum cannot both be precisely known',
                'Matter is made of particles'
              ],
              correctOption: 2,
              explanation: 'The Heisenberg Uncertainty Principle states that the product of uncertainties in position and momentum is greater than or equal to ℏ/2. You cannot simultaneously know both with perfect precision.'
            },
            {
              question: 'What is a quantum of light called?',
              options: ['Electron', 'Photon', 'Neutron', 'Proton'],
              correctOption: 1,
              explanation: 'A photon is a quantum (discrete packet) of electromagnetic energy. Einstein proposed this concept to explain the photoelectric effect.'
            },
            {
              question: 'What does the wave function Ψ represent in quantum mechanics?',
              options: [
                'Definite position of a particle',
                'Probability amplitude',
                'Energy of the system',
                'Momentum of a particle'
              ],
              correctOption: 1,
              explanation: 'The wave function Ψ represents the probability amplitude. |Ψ|² gives the probability density of finding a particle at a particular location.'
            }
          ]
        }
      },
      { id: 'c31', type: 'note', title: 'Lecture Notes', createdAt: 'Today' }
    ],
    description: 'Introduction to quantum mechanics including wave-particle duality and Schrödinger equation'
  },
  {
    id: 'physics-2',
    emoji: '🔭',
    title: 'Astrophysics',
    course: 'Astrophysics',
    updatedDate: 'Yesterday',
    sources: [
      { id: 's37', name: 'Stellar Evolution.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '5.3 MB' },
      { id: 's38', name: 'Black Holes.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '4.7 MB' },
      { id: 's39', name: 'Cosmology.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '6.2 MB' },
      { id: 's40', name: 'Galaxy Formation.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '3.9 MB' }
    ],
    creations: [
      { id: 'c32', type: 'summary', title: 'Astrophysics Overview', createdAt: 'Yesterday', status: 'completed' },
      { 
        id: 'c33', 
        type: 'quiz', 
        title: 'Stellar Evolution Quiz', 
        createdAt: 'Yesterday', 
        metadata: { questionCount: 20, score: 90 },
        quizData: {
          timeLimit: 25,
          questions: [
            {
              question: 'What is the primary energy source in main sequence stars?',
              options: [
                'Gravitational contraction',
                'Hydrogen fusion',
                'Helium fusion',
                'Carbon fusion'
              ],
              correctOption: 1,
              explanation: 'Main sequence stars generate energy through hydrogen fusion in their cores, converting hydrogen into helium via the proton-proton chain or CNO cycle.'
            },
            {
              question: 'What determines a star\'s position on the main sequence?',
              options: ['Age', 'Mass', 'Chemical composition', 'Distance from Earth'],
              correctOption: 1,
              explanation: 'A star\'s mass is the primary determinant of its position on the main sequence. More massive stars are hotter, more luminous, and located toward the upper left of the H-R diagram.'
            },
            {
              question: 'What is the final stage of evolution for a star with mass similar to the Sun?',
              options: ['Neutron star', 'Black hole', 'White dwarf', 'Supernova'],
              correctOption: 2,
              explanation: 'Solar-mass stars end as white dwarfs after shedding their outer layers as planetary nebulae. They lack sufficient mass to undergo supernova or form neutron stars or black holes.'
            }
          ]
        }
      },
      { 
        id: 'c34', 
        type: 'quiz', 
        title: 'Black Holes Quiz', 
        createdAt: 'Yesterday', 
        metadata: { questionCount: 18, score: 86 },
        quizData: {
          timeLimit: 22,
          questions: [
            {
              question: 'What is the event horizon of a black hole?',
              options: [
                'The center of the black hole',
                'The point of no return where escape velocity equals light speed',
                'The outer atmosphere',
                'The accretion disk'
              ],
              correctOption: 1,
              explanation: 'The event horizon is the boundary beyond which nothing, not even light, can escape the black hole\'s gravitational pull. Its radius is called the Schwarzschild radius.'
            },
            {
              question: 'What is a stellar-mass black hole formed from?',
              options: [
                'Collision of neutron stars',
                'Core collapse of massive star',
                'Merger of galaxies',
                'Accumulation of dark matter'
              ],
              correctOption: 1,
              explanation: 'Stellar-mass black holes (3-100 solar masses) form from the core collapse of massive stars (>20-25 solar masses) during supernova explosions.'
            },
            {
              question: 'What is Hawking radiation?',
              options: [
                'X-rays from accretion disk',
                'Theoretical radiation from black hole quantum effects',
                'Light from nearby stars',
                'Gravitational waves'
              ],
              correctOption: 1,
              explanation: 'Hawking radiation is theoretical thermal radiation predicted to be emitted by black holes due to quantum effects near the event horizon. It causes black holes to slowly evaporate.'
            }
          ]
        }
      }
    ],
    description: 'Astrophysics including stellar evolution, black holes, and cosmology'
  },
  {
    id: 'physics-3',
    emoji: '⚡',
    title: 'Electromagnetism',
    course: 'Physics II',
    updatedDate: '2 days ago',
    sources: [
      { id: 's41', name: 'Maxwell Equations.pdf', type: 'pdf', uploadedAt: '2 days ago', size: '3.5 MB' }
    ],
    creations: [
      { id: 'c35', type: 'note', title: 'Electromagnetism Notes', createdAt: '2 days ago', status: 'in-progress' }
    ],
    description: 'Study of electromagnetic fields and Maxwell\'s equations'
  },
  {
    id: 'physics-4',
    emoji: '🌡️',
    title: 'Thermodynamics',
    course: 'Thermal Physics',
    updatedDate: '3 days ago',
    sources: [
      { id: 's42', name: 'Laws of Thermodynamics.pdf', type: 'pdf', uploadedAt: '3 days ago', size: '2.9 MB' },
      { id: 's43', name: 'Heat Transfer.pdf', type: 'pdf', uploadedAt: '3 days ago', size: '3.2 MB' }
    ],
    creations: [
      { id: 'c36', type: 'summary', title: 'Thermodynamics Summary', createdAt: '3 days ago' },
      { 
        id: 'c37', 
        type: 'quiz', 
        title: 'Laws of Thermodynamics Quiz', 
        createdAt: '3 days ago', 
        metadata: { questionCount: 12 },
        quizData: {
          timeLimit: 18,
          questions: [
            {
              question: 'What does the First Law of Thermodynamics state?',
              options: [
                'Entropy always increases',
                'Energy cannot be created or destroyed',
                'Heat flows from hot to cold',
                'Absolute zero is unattainable'
              ],
              correctOption: 1,
              explanation: 'The First Law of Thermodynamics states that energy is conserved: ΔU = Q - W, where ΔU is change in internal energy, Q is heat added, and W is work done by the system.'
            },
            {
              question: 'What does the Second Law of Thermodynamics state?',
              options: [
                'Energy is conserved',
                'Entropy of an isolated system always increases',
                'Temperature is constant in equilibrium',
                'Work equals heat transfer'
              ],
              correctOption: 1,
              explanation: 'The Second Law states that the entropy of an isolated system always increases or remains constant. This explains why certain processes are irreversible and defines the arrow of time.'
            },
            {
              question: 'What is entropy?',
              options: [
                'Total energy of a system',
                'Measure of disorder or randomness',
                'Heat capacity',
                'Work done by gas'
              ],
              correctOption: 1,
              explanation: 'Entropy is a measure of the disorder or randomness of a system. Higher entropy means more disorder and less available energy to do useful work.'
            },
            {
              question: 'What is an adiabatic process?',
              options: [
                'Constant temperature',
                'Constant pressure',
                'No heat transfer',
                'Constant volume'
              ],
              correctOption: 2,
              explanation: 'An adiabatic process is one in which no heat is transferred into or out of the system (Q = 0). Temperature changes occur due to work done on or by the system.'
            }
          ]
        }
      }
    ],
    description: 'Laws of thermodynamics and heat transfer'
  }
];

// Home page demo projects (matching Figma design with real university content)
const homePageProjects: Project[] = [
  {
    id: 'home-1',
    emoji: '🩺',
    title: 'Cardiovascular System',
    course: 'Anatomy & Physiology',
    updatedDate: 'Jan 20, 2025',
    isLocked: true,
    sources: [
      { id: 's1', name: 'Heart Anatomy Lecture.pdf', type: 'pdf', uploadedAt: '2 hours ago', size: '2.3 MB' },
      { id: 's2', name: 'Blood Flow Diagrams.pdf', type: 'pdf', uploadedAt: '2 hours ago', size: '1.8 MB' },
      { id: 's3', name: 'Cardiac Cycle Notes.pdf', type: 'pdf', uploadedAt: '3 hours ago', size: '1.2 MB' }
    ],
    creations: [
      { id: 'c1', type: 'summary', title: 'Cardiovascular System Summary', createdAt: '1 hour ago', status: 'viewing' },
      { 
        id: 'c2', 
        type: 'quiz', 
        title: 'Heart Anatomy Quiz', 
        createdAt: '3 hours ago', 
        status: 'completed', 
        metadata: { questionCount: 15, score: 87 },
        quizData: {
          timeLimit: 20,
          questions: [
            {
              question: 'Which chamber of the heart receives oxygenated blood from the lungs?',
              options: ['Right atrium', 'Left atrium', 'Right ventricle', 'Left ventricle'],
              correctOption: 1,
              explanation: 'The left atrium receives oxygenated blood from the pulmonary veins after blood has been oxygenated in the lungs.'
            },
            {
              question: 'What is the function of the tricuspid valve?',
              options: [
                'Prevents backflow from left ventricle to left atrium',
                'Prevents backflow from right ventricle to right atrium',
                'Prevents backflow from aorta to left ventricle',
                'Prevents backflow from pulmonary artery to right ventricle'
              ],
              correctOption: 1,
              explanation: 'The tricuspid valve prevents blood from flowing back into the right atrium during ventricular contraction.'
            }
          ]
        }
      },
      { 
        id: 'c100', 
        type: 'exam', 
        title: 'Cardiovascular Mock Exam', 
        createdAt: '2 hours ago', 
        metadata: { questionCount: 6 },
        examData: {
          examId: 'exam-cardio-001',
          questions: [
            {
              id: '1',
              type: 'multiple-choice',
              questionNumber: 1,
              marks: 5,
              text: 'What concept does Bauman use to describe the temporary and loosely bound social groups in liquid modernity?',
              options: [
                'Networked individualism',
                'Mechanical solidarity',
                'Organic solidarity',
                'Swarm theory',
              ],
              correctAnswer: 3,
            },
            {
              id: '2',
              type: 'short-answer',
              questionNumber: 2,
              marks: 3,
              text: 'Define cognitive load theory in one sentence.',
              correctAnswer: 'Cognitive load theory explains how working memory capacity affects learning.',
            },
            {
              id: '3',
              type: 'true-false',
              questionNumber: 3,
              marks: 2,
              text: 'React is a JavaScript framework designed for building mobile applications.',
              correctAnswer: false,
            },
            {
              id: '4',
              type: 'multi-select',
              questionNumber: 4,
              marks: 4,
              text: 'Which of the following are valid React hooks? (Select all that apply)',
              options: ['useState', 'useContext', 'useClass', 'useEffect', 'useComponent', 'useRef'],
              correctAnswer: [0, 1, 3, 5],
            },
            {
              id: '5',
              type: 'long-answer',
              questionNumber: 5,
              marks: 8,
              stem: 'Consider the following scenario: A teacher wants to explain photosynthesis to middle school students.',
              text: 'Explain how you would apply multimedia learning principles to design an effective lesson. Include specific examples of media types and their purposes.',
              correctAnswer: 'A comprehensive answer should mention Mayer\'s principles, dual coding theory, and provide concrete examples of visuals and text integration.',
            },
            {
              id: '6',
              type: 'fill-blanks',
              questionNumber: 6,
              marks: 6,
              text: 'The process of  is essential for converting sunlight into  energy, which plants use for .',
              blanks: [
                { id: 'blank1', correctAnswer: 'photosynthesis', position: 15 },
                { id: 'blank2', correctAnswer: 'chemical', position: 60 },
                { id: 'blank3', correctAnswer: 'growth', position: 95 },
              ],
            },
          ]
        }
      }
    ],
    description: 'Comprehensive study of the cardiovascular system including heart anatomy and blood flow'
  },
  {
    id: 'home-2',
    emoji: '🥦',
    title: 'Nutrition & Metabolism',
    course: 'Anatomy & Physiology',
    updatedDate: 'Jan 20, 2025',
    isLocked: true,
    sources: [
      { id: 's4', name: 'Metabolism Pathways.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '3.1 MB' },
      { id: 's5', name: 'Nutrition Lecture.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '2.4 MB' }
    ],
    creations: [
      { id: 'c3', type: 'summary', title: 'Metabolism Overview', createdAt: 'Yesterday', status: 'completed' },
      { 
        id: 'c4', 
        type: 'quiz', 
        title: 'Nutrition Quiz', 
        createdAt: 'Yesterday', 
        metadata: { questionCount: 20, score: 92 },
        quizData: {
          timeLimit: 25,
          questions: [
            {
              question: 'What is the primary function of carbohydrates in the body?',
              options: ['Tissue repair', 'Energy production', 'Hormone synthesis', 'Immune function'],
              correctOption: 1,
              explanation: 'Carbohydrates are the body\'s primary source of energy, especially for the brain and during high-intensity exercise.'
            },
            {
              question: 'Which vitamin is essential for blood clotting?',
              options: ['Vitamin A', 'Vitamin C', 'Vitamin K', 'Vitamin E'],
              correctOption: 2,
              explanation: 'Vitamin K is essential for the synthesis of clotting factors in the liver and plays a crucial role in blood coagulation.'
            }
          ]
        }
      }
    ],
    description: 'Study of human nutrition and metabolic processes'
  },
  {
    id: 'home-3',
    emoji: '🩺',
    title: 'Patient Assessment',
    course: 'Anatomy & Physiology',
    updatedDate: 'Jan 20, 2025',
    isLocked: true,
    sources: [
      { id: 's6', name: 'Vital Signs Guide.pdf', type: 'pdf', uploadedAt: '3 days ago', size: '2.1 MB' },
      { id: 's7', name: 'Physical Assessment.pdf', type: 'pdf', uploadedAt: '3 days ago', size: '5.3 MB' }
    ],
    creations: [
      { id: 'c5', type: 'summary', title: 'Assessment Techniques Summary', createdAt: '3 days ago' },
      { 
        id: 'c6', 
        type: 'quiz', 
        title: 'Vital Signs Quiz', 
        createdAt: '3 days ago', 
        metadata: { questionCount: 10 },
        quizData: {
          timeLimit: 15,
          questions: [
            {
              question: 'What is the normal respiratory rate for adults at rest?',
              options: ['8-10 breaths/min', '12-20 breaths/min', '22-28 breaths/min', '30-35 breaths/min'],
              correctOption: 1,
              explanation: 'The normal respiratory rate for adults at rest is 12-20 breaths per minute.'
            }
          ]
        }
      }
    ],
    description: 'Comprehensive guide to patient assessment and vital signs monitoring'
  },
  {
    id: 'home-4',
    emoji: '🏁',
    title: 'Final Exam: General Overview',
    course: 'Anatomy & Physiology',
    updatedDate: 'Jan 20, 2025',
    isLocked: true,
    sources: [
      { id: 's8', name: 'Complete Study Guide.pdf', type: 'pdf', uploadedAt: '1 week ago', size: '12.5 MB' },
      { id: 's9', name: 'Practice Questions.pdf', type: 'pdf', uploadedAt: '1 week ago', size: '4.2 MB' },
      { id: 's10', name: 'Review Notes.pdf', type: 'pdf', uploadedAt: '1 week ago', size: '6.8 MB' }
    ],
    creations: [
      { id: 'c7', type: 'summary', title: 'Final Exam Study Guide', createdAt: '1 week ago', status: 'viewing' },
      { 
        id: 'c8', 
        type: 'quiz', 
        title: 'Comprehensive Mock Exam', 
        createdAt: '1 week ago', 
        metadata: { questionCount: 50, score: 88 },
        quizData: {
          timeLimit: 60,
          questions: [
            {
              question: 'What is homeostasis?',
              options: [
                'Cell division process',
                'Maintenance of stable internal environment',
                'Energy production in cells',
                'Genetic inheritance pattern'
              ],
              correctOption: 1,
              explanation: 'Homeostasis is the body\'s ability to maintain a stable internal environment despite external changes, crucial for survival.'
            },
            {
              question: 'Which body system is responsible for transporting oxygen and nutrients?',
              options: ['Respiratory system', 'Digestive system', 'Cardiovascular system', 'Nervous system'],
              correctOption: 2,
              explanation: 'The cardiovascular system (heart, blood vessels, blood) transports oxygen, nutrients, hormones, and waste products throughout the body.'
            }
          ]
        }
      },
      { id: 'c9', type: 'note', title: 'Review Notes', createdAt: '1 week ago' }
    ],
    description: 'Comprehensive final exam preparation for Anatomy & Physiology'
  },
  {
    id: 'home-5',
    emoji: '💊',
    title: 'Pharmacology Basics',
    course: 'Pharmacology 101',
    updatedDate: 'Jan 20, 2025',
    isLocked: true,
    sources: [
      { id: 's11', name: 'Drug Classifications.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '4.2 MB' },
      { id: 's12', name: 'Dosage Calculations.pdf', type: 'pdf', uploadedAt: '1 day ago', size: '1.5 MB' }
    ],
    creations: [
      { id: 'c10', type: 'summary', title: 'Drug Classes Overview', createdAt: 'Yesterday', status: 'completed' },
      { 
        id: 'c11', 
        type: 'quiz', 
        title: 'Pharmacology Quiz', 
        createdAt: 'Yesterday', 
        metadata: { questionCount: 20, score: 92 },
        quizData: {
          timeLimit: 25,
          questions: [
            {
              question: 'What is the primary mechanism of action for NSAIDs?',
              options: [
                'Blocking histamine receptors',
                'Inhibiting COX enzymes',
                'Blocking opioid receptors',
                'Enhancing GABA activity'
              ],
              correctOption: 1,
              explanation: 'NSAIDs work by inhibiting cyclooxygenase (COX) enzymes, which reduces inflammation, pain, and fever.'
            }
          ]
        }
      }
    ],
    description: 'Introduction to pharmacology including drug classifications and dosage calculations'
  },
  {
    id: 'home-6',
    emoji: '🏥',
    title: 'Clinical Skills Fundamentals',
    course: 'Pharmacology 101',
    updatedDate: 'Jan 20, 2025',
    isLocked: true,
    sources: [
      { id: 's13', name: 'Clinical Procedures.pdf', type: 'pdf', uploadedAt: '2 days ago', size: '5.7 MB' },
      { id: 's14', name: 'Safety Protocols.pdf', type: 'pdf', uploadedAt: '2 days ago', size: '2.9 MB' }
    ],
    creations: [
      { id: 'c12', type: 'summary', title: 'Clinical Skills Summary', createdAt: '2 days ago' },
      { id: 'c13', type: 'note', title: 'Practice Notes', createdAt: '2 days ago', status: 'in-progress' }
    ],
    description: 'Essential clinical skills and safety protocols for healthcare professionals'
  },
  {
    id: 'home-7',
    emoji: '🥑',
    title: 'Personal Wellness Study',
    course: '',
    updatedDate: 'Jan 20, 2025',
    isLocked: true,
    sources: [
      { id: 's15', name: 'Wellness Guide.pdf', type: 'pdf', uploadedAt: '5 days ago', size: '3.4 MB' }
    ],
    creations: [
      { id: 'c14', type: 'note', title: 'Wellness Notes', createdAt: '5 days ago' }
    ],
    description: 'Personal study project on health and wellness'
  }
];

export const getMockProjects = (persona: 'many-projects' | 'few-projects' | 'new-user'): Project[] => {
  if (persona === 'new-user') {
    return [];
  }
  
  if (persona === 'few-projects') {
    return [
      nursingProjects[0],
      lawProjects[0],
      physicsProjects[0]
    ];
  }
  
  // many-projects - return home page demo projects
  return homePageProjects;
};

export const getProjectById = (id: string): Project | undefined => {
  const allProjects = [
    ...nursingProjects,
    ...medicineProjects,
    ...lawProjects,
    ...physicsProjects,
    ...homePageProjects
  ];
  return allProjects.find(p => p.id === id);
};

// Helper function to get recent projects for dropdown
export const getRecentProjects = (currentProjectId?: string, limit: number = 5) => {
  const allProjects = [
    ...nursingProjects,
    ...medicineProjects,
    ...lawProjects,
    ...physicsProjects,
    ...homePageProjects
  ];
  
  return allProjects
    .filter(p => p.id !== currentProjectId)
    .slice(0, limit)
    .map(p => ({
      id: p.id,
      title: p.title,
      emoji: p.emoji,
      isViewing: false,
      lastAccessed: p.updatedDate
    }));
};

export { nursingProjects, medicineProjects, lawProjects, physicsProjects };


