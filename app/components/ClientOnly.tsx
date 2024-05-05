"use client";

import React, { useState, useEffect } from "react";
import Loader from "./Loader";

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        setLoading(true);
    }, []);

    if (!hasMounted) return <Loader />;

    return <div>{children}</div>;
};

export default ClientOnly;
