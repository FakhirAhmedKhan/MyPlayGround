import portfolio from "@/data/portfolio.json";
import type { PortfolioData } from "./types";
import SkillIcon from "@/data/SkillIcon.json";
export const portfolioData = {
    ...portfolio,
    SkillIcon: SkillIcon
} as unknown as PortfolioData;

export function getHomeData() {
    return portfolioData.sections.home;
}

export function getEducationData() {
    return portfolioData.sections.education;
}

export function getSkillsData() {
    return {
        ...portfolioData.sections.skills,
        items: SkillIcon.items
    };
}

export function getProjectsData() {
    return portfolioData.sections.projects;
}

export function getCertificationsData() {
    return portfolioData.sections.certifications;
}

export function getFooterData() {
    return portfolioData.sections.footer;
}

export function getMetaData() {
    return portfolioData.meta;
}
