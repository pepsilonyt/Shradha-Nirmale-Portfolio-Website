export const NAV = {
  logo: 'Shradha N. | Learning Strategist',
  email: 'contact@shradhalearningstrategist.com',
  linkedin: 'https://www.linkedin.com/in/shradha-nirmale-english-educator-conversion-optimizer/',
  preply: 'https://preply.in/SHRADHA6EN3044924710?ts=17811645',
  calendar: 'https://calendar.app.google/ScjHC7Ku8iBbNgHj6',
  cxlCerts: 'https://1drv.ms/f/c/f4ebd9bd1dcddc1c/IgAc3M0dvdnrIID0JAQAAAAAAT2oEWoh-TtTK-wmZD5NYyA?e=ucsBDZ',
};

export const HERO = {
  socialProof: 'Independent Test Prep Provider · 100% 5-Star Reviews on Preply',
  h1: 'Clear English for High Scores and Better Careers.',
  sub: 'Stop memorizing endless rules. Find the exact bottleneck blocking your English progress, eliminate exam panic, and get the results you need.',
  bullets: [
    { icon: 'Target', text: 'Precision diagnostics, not generic coaching' },
    { icon: 'TrendingUp', text: 'Science-backed strategies for fast results' },
    { icon: 'ShieldCheck', text: 'Proven across CELPIP, DET & Corporate English' },
  ],
  cta: 'Find Your English Bottleneck Now →',
  trust: '🛡 100% Free Consultation · Takes 2 minutes · Calendar opens instantly',
};

export const PAIN_CARDS = [
  {
    id: 'celpip',
    icon: 'GraduationCap',
    title: 'Stuck on CELPIP?',
    pain: "You've taken practice tests but your score doesn't move. Reading and Writing feel impossible under time pressure.",
    solution: 'I map your exact skill gaps, rebuild your time-management approach, and coach you to consistent band improvement.',
  },
  {
    id: 'det',
    icon: 'Laptop',
    title: 'Dreading the DET?',
    pain: "The adaptive format confuses you. You don't know which skills the algorithm targets and why your score fluctuates.",
    solution: 'Learn the DET algorithm, practice adaptive drills, and get a custom score-maximization roadmap.',
  },
  {
    id: 'career',
    icon: 'Briefcase',
    title: 'Career English Blocking You?',
    pain: "You're technically skilled but your English in meetings, presentations, or emails holds back your promotions.",
    solution: 'Corporate-context English coaching that targets your exact professional scenarios — emails, decks, negotiations.',
  },
];

export const TRACKS = [
  {
    id: 'celpip',
    icon: 'GraduationCap',
    title: 'CELPIP Prep',
    subtitle: 'Canadian Immigration & Residency',
    benefits: ['Band-by-band gap analysis', 'Timed mock sessions', 'Listening & Speaking acceleration', '1-on-1 strategy coaching'],
    audience: 'For: PR applicants, Canadian immigrants, citizenship seekers',
    cta: 'Start CELPIP Track →',
  },
  {
    id: 'det',
    icon: 'Laptop',
    title: 'Duolingo English Test',
    subtitle: 'University Admissions Worldwide',
    benefits: ['Adaptive test strategy', 'Literacy & Comprehension drills', 'Score prediction modeling', 'Rapid improvement sprints'],
    audience: 'For: International students, university applicants',
    cta: 'Start DET Track →',
  },
  {
    id: 'corporate',
    icon: 'Briefcase',
    title: 'Corporate English',
    subtitle: 'Professional Communication Mastery',
    benefits: ['Executive presence training', 'Email & report writing', 'Presentation confidence', 'Negotiation language'],
    audience: 'For: Professionals, managers, team leads',
    cta: 'Start Corporate Track →',
  },
];

export const STATS = [
  { value: 50, suffix: '+', label: 'International Professionals Coached' },
  { value: 5.0, suffix: '/5', label: 'Verified Preply Rating' },
  { value: 100, suffix: '%', label: '5-Star Student Reviews' },
  { value: 3, suffix: '+ yrs', label: 'Specialized Test Prep Experience' },
];

export interface CredentialItem {
  id: number;
  title: string;
  subtitle: string;
  issuer: string;
  image: string;
  verified: boolean;
  code: string;
  description: string;
}

export const CERTS: CredentialItem[] = [
  {
    id: 1,
    title: 'Cambridge CELTA at International House Budapest',
    subtitle: 'University of Cambridge & IH Budapest Accredited',
    issuer: 'Cambridge Assessment English & International House Budapest',
    image: '/logos/celta-cambridge-ih-budapest.png',
    verified: true,
    code: 'CAM-CELTA-IH-BUDAPEST',
    description: 'Gold-standard CELTA teaching qualification awarded by Cambridge Assessment English (University of Cambridge) and completed through intensive practical training and observed teaching practice at International House Budapest.',
  },
  {
    id: 2,
    title: 'Duolingo English Test Partner',
    subtitle: 'Official Global Partner Network Member',
    issuer: 'Duolingo English Test (DET)',
    image: '/logos/duolingo-partner-network.png',
    verified: true,
    code: 'DET-GPN-MEMBER',
    description: 'Accredited member of the Duolingo English Test Global Partner Network, specialized in adaptive testing algorithms and score acceleration.',
  },
  {
    id: 3,
    title: 'CELPIP Instructor Training (Level 2)',
    subtitle: 'Prometric / Paragon Testing Enterprises',
    issuer: 'Prometric (CELPIP Testing Authority)',
    image: '/certs/celpip-instructor-certificate.png',
    verified: true,
    code: 'CELPIP-L2-INSTRUCTOR',
    description: 'Official Instructor Training Certificate awarded to Shradha Nirmale on January 8, 2026, validating specialized pedagogical mastery for the CELPIP exam.',
  },
];

export const FAQS = [
  {
    id: 'f1',
    category: 'General',
    question: 'What makes your approach different from other English tutors?',
    answer: 'I apply cognitive science and diagnostic data analysis to identify the exact skill gap blocking your progress — not generic grammar drills. Every learner gets a personalized cognitive learning timeline based on their specific error patterns.',
  },
  {
    id: 'f2',
    category: 'General',
    question: 'How quickly can I expect to see results?',
    answer: 'Most students see measurable score or confidence improvements within 4–6 sessions. The diagnostic session in week one identifies your bottleneck, and the targeted approach means zero wasted time.',
  },
  {
    id: 'f3',
    category: 'CELPIP',
    question: "I've already taken CELPIP twice. Can you still help?",
    answer: "Absolutely. Repeat test-takers often have an ingrained habit or a single skill gap that keeps their score stuck. The diagnostic process identifies exactly what that is and we fix it strategically.",
  },
  {
    id: 'f4',
    category: 'DET',
    question: 'How does Duolingo English Test coaching work?',
    answer: 'The DET is an adaptive test — the algorithm adjusts difficulty based on your answers. I teach you to understand how it scores, what skills carry the most weight, and how to maximize your performance within its unique format.',
  },
  {
    id: 'f6',
    category: 'Payment',
    question: 'What are the payment options?',
    answer: 'Sessions are booked and paid through Preply, which accepts all major credit cards and PayPal. For direct engagement, Wise, secure bank transfers, and Google Pay are also supported.',
  },
  {
    id: 'f7',
    category: 'Payment',
    question: 'Do you offer refunds if I am not satisfied?',
    answer: "Preply offers a satisfaction guarantee. If you are not satisfied after your first trial lesson, Preply will refund your lesson credits. Please review Preply's refund policy for full details.",
  },
  {
    id: 'f8',
    category: 'Preply',
    question: 'Why do you use Preply instead of direct booking?',
    answer: 'Preply provides a secure, globally trusted payment infrastructure, verified tutor profiles, and student protection guarantees. It also makes scheduling across time zones seamless for my international students.',
  },
  {
    id: 'f9',
    category: 'Preply',
    question: 'Can I message you before booking a session?',
    answer: 'Yes! On Preply you can send me a free message before your trial lesson. I respond within 24 hours and we can discuss your goals and whether I am the right fit before you commit.',
  },
];

export interface PreplyReview {
  id: string;
  name: string;
  date: string;
  category: 'CELPIP' | 'Duolingo DET' | 'Business English' | 'General';
  rating: number;
  highlight: string;
  text: string;
  verified: boolean;
}

export const TESTIMONIALS: PreplyReview[] = [
  {
    id: 'baljit',
    name: 'Baljit',
    date: 'October 12, 2026',
    category: 'General',
    rating: 5,
    highlight: 'Wonderful, patient, and knowledgeable teacher',
    text: 'Shradha is a wonderful and supportive teacher. She is patient, knowledgeable, and well-prepared for her lessons. She explains concepts clearly and makes each lesson interesting and helpful. I really appreciate her teaching style and the effort she puts into every lesson. I’ve had a very positive experience learning with her and would highly recommend her to others.',
    verified: true,
  },
  {
    id: 'vishnu',
    name: 'Vishnu',
    date: 'October 6, 2026',
    category: 'CELPIP',
    rating: 5,
    highlight: 'Knows exactly what the CELPIP exam looks for',
    text: 'Shradha is an excellent CELPIP tutor. Her lessons are well structured, she gives clear and honest feedback, and she knows exactly what the exam looks for. I feel far more confident in my speaking and writing since working with her. Highly recommended!',
    verified: true,
  },
  {
    id: 'ritika',
    name: 'Ritika',
    date: 'August 6, 2026',
    category: 'Business English',
    rating: 5,
    highlight: 'Practical business communication & confidence building',
    text: 'I came to know about Shraddha through Preply while searching for a business English teacher. I watched her profile and introduction video, and her friendly, clear, and practical teaching style immediately stood out to me. I decided to learn with her because her approach is different and makes English learning feel natural and engaging. In every lesson I have taken with her, I have learned something new. She explains concepts patiently, corrects mistakes in a supportive way, and helps me improve my confidence in speaking. Her lessons are well structured, interactive, and focused on practical business communication. I am very excited to continue improving my business English with her guidance.',
    verified: true,
  },
  {
    id: 'giovanna',
    name: 'Giovanna',
    date: 'July 31, 2026',
    category: 'CELPIP',
    rating: 5,
    highlight: 'Noticed significant improvement in less than a week',
    text: 'I highly recommend her for CELPIP preparation course. She has excellent, outstanding teaching skills and a very effective approach. She provides constructive and detailed feedback that has helped me understand exactly what I need to improve. The lessons include practical activities and engaging exercises that are extremely valuable for the CELPIP exam. In less than a week I have already noticed a significant improvement in my practice test course by following her guidance and completing the homework assignments. I truly appreciate her dedication and professionalism. I highly recommend her to anyone preparing for exams.',
    verified: true,
  },
  {
    id: 'nishad',
    name: 'Nishad',
    date: 'June 19, 2026',
    category: 'Duolingo DET',
    rating: 5,
    highlight: 'DET strategies and tips were a game changer',
    text: 'Shradha is an outstanding English tutor! She helped me prepare for the Duolingo English Test, and her tips and strategies were a game changer. She is professional, easy to work with, and very knowledgeable about the exam requirements. I highly recommend her to any professional looking to improve their English.',
    verified: true,
  },
  {
    id: 'apoorwa',
    name: 'Apoorwa',
    date: 'June 12, 2026',
    category: 'General',
    rating: 5,
    highlight: 'Quickly identifies hidden mistakes and personalized practice',
    text: 'Shraddha is an amazing teacher who genuinely cares about her students’ progress. She quickly identifies areas that need improvement and provides detailed feedback tailored to your responses. She helped me recognize mistakes I was making unknowingly and showed me the right way to practice and improve. Her lessons are engaging, personalized, and highly effective. I have seen a noticeable improvement in my English and confidence thanks to her guidance. Highly recommended!',
    verified: true,
  },
  {
    id: 'siddharth',
    name: 'Siddharth',
    date: 'June 2, 2026',
    category: 'General',
    rating: 5,
    highlight: 'Engaging trial lesson with natural, insightful feedback',
    text: "I just had a trial lesson with Shraddha, and it was a great experience. I'm already quite comfortable speaking English, but she made the session engaging and insightful. She was friendly, easy to talk to, and created a comfortable learning environment. The conversation flowed naturally, and she provided helpful feedback along the way. I can definitely see how her teaching style would help learners improve their confidence and communication skills. Looking forward to more lessons with her!",
    verified: true,
  },
  {
    id: 'lu',
    name: 'Lu',
    date: 'May 25, 2026',
    category: 'CELPIP',
    rating: 5,
    highlight: 'Achieved desired CELPIP grades with customized coaching',
    text: 'Miss. Shradha is a very professional and patient teacher. I took classes with her for my CELPIP test, and in the end, I did achieve the desired grades! She is very familiar with the test-taking strategies and exam rubrics. Additionally, she customized the course according to my personal circumstances, sent me assignments after class and provided me with thoughtful feedback afterwards. She is very patient and encouraging, always giving me real-time correction in the class for my pronunciation, grammar mistakes and intonation. With the help of Miss. Shradha, I have made great progress in my English and have become more confident. She is not just a teacher.',
    verified: true,
  },
];
