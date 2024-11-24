import mongoose, { Schema, Document } from "mongoose";

// Define interfaces for each nested structure
interface IQuestion {
  question: string;
  options: string[];
  correct_answer: string;
}

interface IDifficulty {
  difficulty: string;
  questions: IQuestion[];
}

export interface ICategory extends Document {
  category: string;
  questions: IDifficulty[];
}

// Define the Question Schema
const QuestionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correct_answer: { type: String, required: true },
});

// Define the Difficulty Schema
const DifficultySchema = new Schema<IDifficulty>({
  difficulty: { type: String, required: true },
  questions: { type: [QuestionSchema], required: true },
});

// Define the Category Schema
const CategorySchema = new Schema<ICategory>({
  category: { type: String, required: true },
  questions: { type: [DifficultySchema], required: true },
});

// Create the Mongoose model
const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);

export default CategoryModel;
