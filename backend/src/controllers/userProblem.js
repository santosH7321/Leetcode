import { getLanguageById, submitBatch } from "../utils/problemUtility.js";
import Problem from "../models/problem.js";

export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolution,
    problemCreator,
  } = req.body;
  try {
    for (const { language, completeCode } of referenceSolution) {
      // sorce_code
      // Language_id
      // stdin
      // expected_output

      const languageId = getLanguageById(language);
      // i am creating Batch Submission
      const submission = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submission);

      const resultToken = submitResult.map((value) => value.token);
      const testResult = await submitToken(resultToken);

      for (const test of testResult) {
        if (test.status.id != 3) {
          return res.status(400).send("Error Occured");
        }
      }
    }
    // we can store it in our DB
    const userProblem = await Problem.create({
      ...req.body,
      problemCreator: req.result._id,
    });
    res.status(201).json({ message: "Problem Saved Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

export const updateProblem = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolution,
    problemCreator,
  } = req.body;
  try {
    if(!id) return res.status(400).send("Missing ID field");
    const DsaProblem = await Problem.findById(id);
    if(!DsaProblem){
        return res.status(404).send("Id is not persent in server");
    }
    for (const { language, completeCode } of referenceSolution) {

      const languageId = getLanguageById(language);
      // i am creating Batch Submission
      const submission = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submission);

      const resultToken = submitResult.map((value) => value.token);
      const testResult = await submitToken(resultToken);

      for (const test of testResult) {
        if (test.status.id != 3) {
          return res.status(400).send("Error Occured");
        }
      }
    }
    // we can store it in our DB
    const newProblem = await Problem.findByIdAndUpdate(id, {...req.body}, {runValidators: true, new: true});
    res.status(200).send(newProblem);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const deleteProblem = async (req, res) => {
    const {id} = req.params;

    try {
        if(!id) return res.status(400).send("ID is Missing");
        const deletedProblem = await Problem.findByIdAndDelete(id);

        if(!deleteProblem) return res.status(404).send("Problem is Missing");

        res.status(200).send("Successfully Deleted");
    } catch (error) {
        res.status(500).json({message: "Error" + error.message})
    }
}

export const getProblemById = async (req, res) => {
    const {id} = req.params;
    try {
        if(!id)
            return res.status(400).send("ID is Missing");
        const getProblem = await Problem.findById(id);

        if(!getProblem)
            return res.status(200).send("Problem is Missing");

        res.status(200).send(getProblem);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getAllProblem = async (req, res) => {
    try {
        const getProblem = await Problem.find({});
        if(getProblem.length==0)
            return res.status(404).send("Problem is Missing");
        res.status(200).send(getProblem)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const solvedAllProblemByUser = async (req, res) => {
    
}