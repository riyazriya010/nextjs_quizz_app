import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';


// GET method to get data
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'Computer Related';
  const difficulty = searchParams.get('difficulty') || 'easy';

  try {
    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Query the database for the quiz data, directly filtering based on category and difficulty
    const quiz = await db
      .collection('quiz')
      .findOne(
        {
          category,
          'questions.difficulty': difficulty,  // Filter by category and difficulty
        },
        {
          projection: {
            'questions.$': 1,  // Only return the matched questions
          },
        }
      );

    // Check if quiz was found
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      return NextResponse.json(
        { error: `No quiz found for category: ${category} and difficulty: ${difficulty}` },
        { status: 404 }
      );
    }

    // Extract the matched questions
    const questions = quiz.questions[0].questions;  // Only get the questions array for the matched difficulty

    // Return the questions as JSON response
    return NextResponse.json(questions);

  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Error fetching questions' }, { status: 500 });
  }
}




// POST method to store data
export async function POST(req: Request) {
  try {
    // Parse the incoming data
    const body = await req.json();
    const { category, difficulty, question, options, correct_answer } = body;

    // Validate the input data
    if (!category || !difficulty || !question || !options || !correct_answer) {
      return NextResponse.json(
        { error: 'All fields (category, difficulty, question, options, correct_answer) are required.' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Find or create the category
    const existingCategory = await db.collection('quiz').findOne({ category });

    if (!existingCategory) {
      // If the category doesn't exist, create a new category with the question
      await db.collection('quiz').insertOne({
        category,
        questions: [
          {
            difficulty,
            questions: [
              {
                question,
                options,
                correct_answer,
              },
            ],
          },
        ],
      });
    } else {
      // If the category exists, update it
      const existingDifficulty = existingCategory.questions.find(
        (d: any) => d.difficulty === difficulty
      );

      if (existingDifficulty) {
        // Append to the existing difficulty's questions
        await db.collection('quiz').updateOne(
          { category, 'questions.difficulty': difficulty },
          {
            $push: {
              'questions.$.questions': { question, options, correct_answer },
            },
          }
        );
      } else {
        // Add a new difficulty to the existing category
        await db.collection('quiz').updateOne(
          { category },
          {
            $push: {
              questions: {
                difficulty,
                questions: [{ question, options, correct_answer }],
              },
            },
          }
        );
      }
    }

    return NextResponse.json({ message: 'Quiz question added successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Error adding quiz question:', error);
    return NextResponse.json({ error: 'Error adding quiz question.' }, { status: 500 });
  }
}