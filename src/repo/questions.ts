interface post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export async function getQuestions() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (response.ok) {
    const posts: post[] = await response.json();

    return posts.slice(0, 10).map((post) => ({
      question: post.body,
      options: post.body.split(" ").slice(0, 4),
      answer: 10 % post.id,
    }));
  }
}

export type QuestionsType = Awaited<ReturnType<typeof getQuestions>>;