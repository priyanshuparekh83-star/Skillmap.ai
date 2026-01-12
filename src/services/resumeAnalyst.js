// AI Resume Analyst Service
// Simulates the logic of identifying skills and confidence from parsed resume data.

// Rule-based heuristic engine
const calculateConfidence = (skill, experience, projects) => {
    let score = 0;

    // 1. Evidence in Work Experience (High Weight)
    const workMentions = experience.filter(role =>
        role.description.toLowerCase().includes(skill.toLowerCase()) ||
        role.skillsUsed.includes(skill)
    );
    if (workMentions.length > 0) score += 60;
    if (workMentions.some(role => role.durationYears > 1)) score += 20;

    // 2. Evidence in Projects (Medium Weight)
    const projectMentions = projects.filter(proj =>
        proj.techStack.includes(skill)
    );
    if (projectMentions.length > 0) score += 30;

    // 3. Raw Skill List (Low Weight - Claim only)
    score += 10;

    return Math.min(score, 100); // Cap at 100
};

const inferExperienceLevel = (years) => {
    if (years < 2) return "Junior";
    if (years < 5) return "Mid-Level";
    return "Senior";
};

export const analyzeResume = (parsedResume) => {
    // 1. Extract all claimed skills
    const allSkills = new Set([
        ...parsedResume.skills.languages,
        ...parsedResume.skills.frameworks,
        ...parsedResume.skills.tools
    ]);

    const analyzedSkills = [];

    allSkills.forEach(skill => {
        const confidence = calculateConfidence(
            skill,
            parsedResume.experience,
            parsedResume.projects
        );

        analyzedSkills.push({
            name: skill,
            confidenceScore: confidence,
            status: confidence > 65 ? "Confirmed" : "Partial/Weak",
            evidence: confidence > 65 ? "Verified via Work Experience" : "Mentioned in Skills list only"
        });
    });

    // 2. Identify Weaknesses (Partial skills)
    const confirmed = analyzedSkills.filter(s => s.status === "Confirmed");
    const partial = analyzedSkills.filter(s => s.status === "Partial/Weak");

    // 3. Infer Overall Level
    const totalYears = parsedResume.experience.reduce((acc, curr) => acc + curr.durationYears, 0);

    return {
        metadata: {
            candidateName: parsedResume.name,
            inferredLevel: inferExperienceLevel(totalYears),
            totalExperienceYears: totalYears
        },
        skillProfile: {
            confirmedSkills: confirmed.sort((a, b) => b.confidenceScore - a.confidenceScore),
            partialSkills: partial.sort((a, b) => b.confidenceScore - a.confidenceScore)
        },
        analysisTimestamp: new Date().toISOString()
    };
};

// --- Example Mock Input for Testing ---
export const MOCK_PARSED_RESUME = {
    name: "Alex Doe",
    skills: {
        languages: ["JavaScript", "Python", "Java"],
        frameworks: ["React", "Django"],
        tools: ["Docker", "Git"]
    },
    experience: [
        {
            role: "Frontend Developer",
            company: "TechCorp",
            durationYears: 2.5,
            description: "Built responsive UI with React and Redux.",
            skillsUsed: ["React", "JavaScript", "Redux"]
        }
    ],
    projects: [
        {
            name: "Portfolio Site",
            techStack: ["React", "CSS"]
        }
    ]
};
