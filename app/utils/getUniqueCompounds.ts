// utils/getUniqueCompounddevelopers.ts
export interface Developer {
    id: string;
    title: string;
}

export interface Compound {
    developer?: Developer;
}

export const getUniqueCompounds = (data: any[]): Developer[] => {
    const uniqueDevelopers: Developer[] = [];
    const developerIds = new Set<string>();

    data.forEach((item) => {
        const developer = item?.developer;
        if (developer && !developerIds.has(developer.id)) {
            uniqueDevelopers.push({
                title: developer.title,
                id: developer.id,
            });
            developerIds.add(developer.id);
        }
    });

    return uniqueDevelopers;
};
