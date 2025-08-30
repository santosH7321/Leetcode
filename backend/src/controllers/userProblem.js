import {getLanguageById, submitBatch} from "../utils/problemUtility.js";

const createProblem = async (req, res) => {
    const { title, description, difficulty, tags, visibleTestCases, hiddenTestCases, startCode, referenceSolution, problemCreator } = req.body;
    try {
        for(const {language, completeCode} of referenceSolution){
            // sorce_code
            // Language_id
            // stdin
            // expected_output

            const languageId = getLanguageById(language);
            // i am creating Batch Submission
            const submission = visibleTestCases.map((testcase) => ({
                source_code:completeCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));

            const submitResult = await submitBatch(submission);

            

        }
    } 
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
