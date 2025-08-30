import {getLanguageById, submitBatch} from "../utils/problemUtility.js";
import Problem from "../models/problem.js";


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

            const resultToken = submitResult.map((value)=> value.token);
            const testResult = await submitToken(resultToken);

            for (const test of testResult) {
                if (test.status.id != 3){
                    return res.status(400).send("Error Occured");
                }
            }
        }
        // we can store it in our DB
        const userProblem = await Problem.create({
            ...req.body,
            problemCreator: req.result._id
        });
        res.status(201).json({ message: "Problem Saved Successfully" });
    } 
    catch (error) {
        res.status(500).json({ message: "Error", error });
    }
}

export default createProblem;