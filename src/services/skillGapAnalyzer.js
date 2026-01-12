// AI Skill Gap Analyzer Service
// Compares student profile against market requirements and dependency trees.

import TECH_SKILLS_DB from '../data/techSkills.json';

// Utility: Build a map of skill dependencies
const SKILL_DB_MAP = TECH_SKILLS_DB.reduce((acc, skill) => {
    acc[skill.name.toLowerCase()] = skill;
    return acc;
}, {});

export const analyzeSkillGap = (userSkills, targetRoleRequirements) => {
    const gaps = [];
    const lowerUserSkills = new Set(userSkills.map(s => s.name.toLowerCase()));

    // 1. Identify Direct Gaps from Market Requirements
    targetRoleRequirements.forEach(req => {
        const reqName = req.name.toLowerCase();

        if (!lowerUserSkills.has(reqName)) {
            // It's a missing skill
            const skillMetadata = SKILL_DB_MAP[reqName];

            // 2. Check Prerequisites (Dependency Tree)
            let blockers = [];
            if (skillMetadata && skillMetadata.prerequisites) {
                blockers = skillMetadata.prerequisites.filter(prereq =>
                    !lowerUserSkills.has(prereq.toLowerCase())
                );
            }

            // 3. Calculate "Criticality Score"
            // Base score: 50. High market reason: +20. Blockers: +10 per blocker (prioritize foundations).
            let score = 50;
            if (req.reason && req.reason.includes("Critical")) score += 30;
            if (blockers.length > 0) score += 20; // It's harder, so it's a big gap

            gaps.push({
                name: req.name,
                status: "Missing",
                reason: req.reason || "Required for this role.",
                difficulty: skillMetadata?.difficulty || "Unknown",
                blockers: blockers,
                criticalityScore: score
            });
        }
    });

    // 4. Sort by Criticality (High to Low)
    return gaps.sort((a, b) => b.criticalityScore - a.criticalityScore);
};

// --- Example Usage ---
/*
const userSkills = [{ name: "JavaScript", confidence: "high" }];
const marketReqs = [
    { name: "React", reason: "Standard UI Lib" },
    { name: "Vector Databases", reason: "Critical for RAG" }
];
const result = analyzeSkillGap(userSkills, marketReqs);
*/
