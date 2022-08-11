import { useState, useEffect } from "react";

export function useEnableButton (error) {
    const [isButtonEnabled, setIsButtonEnabled] = useState(true);
    
    function enableButton() {
        setIsButtonEnabled(true);
    }
        
    function disableButton() {
        setIsButtonEnabled(false);
    }

    useEffect(() => {
        error ? disableButton() : enableButton()
    }, [error])

    return {
        isButtonEnabled,
        enableButton,
        disableButton
    };
}






