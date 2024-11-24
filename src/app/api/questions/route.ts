// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/app/lib/mongodb';

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const category = searchParams.get('category') || 'Computer Related';
//   const difficulty = searchParams.get('difficulty') || 'easy';

//   try {
//     // Connect to MongoDB
//     const { db } = await connectToDatabase();

//     // Query the database for the quiz data
//     const quiz = await db
//       .collection('quiz')
//       .findOne({ category, 'questions.difficulty': difficulty });

//     if (!quiz) {
//       return NextResponse.json({ error: 'No quiz found for this category and difficulty' }, { status: 404 });
//     }

//     // Extract the questions from the quiz document
//     const questions = quiz.questions[0].questions; // Get the questions array inside the first "questions" field

//     // Return the questions as JSON response
//     return NextResponse.json(questions);
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     return NextResponse.json({ error: 'Error fetching questions' }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

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
