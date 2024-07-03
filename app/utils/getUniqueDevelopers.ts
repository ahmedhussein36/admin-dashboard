// utils/getUniqueCompounddevelopers.ts
export interface Developer {
    id: string;
    title: string;
}

export interface Compound {
    developer?: Developer;
}

export const getUniqueDevelopers = (compounds: any[]): Developer[] => {
    const uniqueDevelopers: Developer[] = [];
    const developerIds = new Set<string>();

    compounds.forEach((compound) => {
        const developer = compound?.developer;
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
