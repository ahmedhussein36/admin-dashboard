import { useState, useEffect } from "react";

const useRandomNumber = () => {
    const [randomNumber, setRandomNumber] = useState(401);

    useEffect(() => {
        const storedNumber = localStorage.getItem("randomNumber");
        let newNumber = storedNumber ? parseInt(storedNumber, 10) + 1 : 400;

        // Ensure the new number is within the range of 60 to 199
        if (newNumber > 999) {
            newNumber = 401;
        }

        localStorage.setItem("randomNumber", newNumber.toString());
        setRandomNumber(newNumber);
    }, []);

    return randomNumber;
};

export default useRandomNumber;
