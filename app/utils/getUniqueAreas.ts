// utils/getUniqueCompoundAreas.ts
export interface Area {
    id: string;
    title: string;
}

export interface Compound {
    area?: Area;
}

export const getUniqueAreas = (compounds: any[]): Area[] => {
    const uniqueAreas: Area[] = [];
    const areaIds = new Set<string>();

    compounds.forEach((compound) => {
        const area = compound?.area;
        if (area && !areaIds.has(area.id)) {
            uniqueAreas.push({ title: area.title, id: area.id });
            areaIds.add(area.id);
        }
    });

    return uniqueAreas;
};
