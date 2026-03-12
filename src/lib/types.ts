export interface SocialLink {
    url: string;
    icon: string;
    label: string;
}

export interface HomeSection {
    greeting: string;
    name: string;
    roles: string[];
    tagline: string;
    description: string;
    cta: string;
    socialLinks: SocialLink[];
}

export interface EducationItem {
    year: string;
    title: string;
    description: string;
    logo: string;
    icon: string;
    color: string;
}

export interface EducationSection {
    title: string;
    paragraph: string;
    items: EducationItem[];
}

export interface SkillItem {
    name: string;
    icon: string;
}

export interface SkillsSection {
    title: string;
    paragraph: string;
    items: SkillItem[];
}

export interface ProjectItem {
    id: number;
    title: string;
    link: string;
    description: string;
    codeLink: string;
    imageUrl: string;
    category: string;
}

export interface ProjectsSection {
    title: string;
    paragraph: string;
    items: ProjectItem[];
}

export interface CertificationItem {
    year: string;
    title: string;
    issuer: string;
    description: string;
    skills: string[];
    credentialUrl: string;
    logo: string;
    icon: string;
    color: string;
}

export interface CertificationsSection {
    title: string;
    paragraph: string;
    items: CertificationItem[];
}

export interface FooterSection {
    title: string;
    paragraph: string;
    githubUsername: string;
}

export interface PortfolioData {
    meta: {
        name: string;
        title: string;
        description: string;
        url: string;
        twitterHandle: string;
    };
    navLabels: Record<string, string>;
    badges: Record<string, string>;
    sections: {
        home: HomeSection;
        education: EducationSection;
        skills: SkillsSection;
        projects: ProjectsSection;
        certifications: CertificationsSection;
        footer: FooterSection;
    };
    SkillIcon: {
        items: SkillItem[];
    };
}

export interface CodeBlock {
    type: "code";
    language: string;
    code: string;
    title?: string;
}

export interface ParagraphBlock {
    type: "paragraph";
    content: string;
}

export type BlogContentItem = ParagraphBlock | CodeBlock;

export interface BlogPost {
    id: string;
    title: string;
    description: string;
    date: string;
    author: string;
    category: string;
    content: BlogContentItem[];
    tags?: string[];
}
