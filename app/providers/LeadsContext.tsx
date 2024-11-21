import { createContext, useContext, useState, ReactNode } from "react";

interface Lead {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    country?: Record<string, any>;
    phone: string;
    compoundName: string;
    compoundRef: string;
    unitRef?: string;
    message?: string;
}

interface LeadsContextProps {
    leads: Lead[];
    setLeads: (leads: Lead[]) => void;
}

const LeadsContext = createContext<LeadsContextProps | undefined>(undefined);

export const LeadsProvider = ({ children }: { children: ReactNode }) => {
    const [leads, setLeads] = useState<Lead[]>([]);

    return (
        <LeadsContext.Provider value={{ leads, setLeads }}>
            {children}
        </LeadsContext.Provider>
    );
};

export const useLeads = () => {
    const context = useContext(LeadsContext);
    if (!context) {
        throw new Error("useLeads must be used within a LeadsProvider");
    }
    return context;
};
