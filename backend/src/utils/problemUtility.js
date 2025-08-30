import axios from "axios";

export const getLanguageById = (language) => {
    const language = {
        "c++": 54,
        "java": 62,
        "javascript": 63,
        "python": 71
    }
    return language[language.toLowerCase()];
}

export const submitBatch = async (submissions) => {

}


