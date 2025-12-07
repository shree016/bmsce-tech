import { Question, Response } from "./types";

// Simple in-memory store
class Store {
  private questions: Map<string, Question> = new Map();
  private responses: Map<string, Response> = new Map();

  constructor() {
    // Add demo questions for testing
    this.initializeDemoData();
  }

  private initializeDemoData() {
    const demoQuestions: Question[] = [
      {
        id: "demo1",
        question: "Have you completed registration?",
        type: "yes-no",
        audience: "all",
        isAnonymous: false,
        requireName: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        id: "demo2",
        question: "Do you need help with the assignment?",
        type: "yes-no",
        audience: "all",
        isAnonymous: true,
        requireName: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
      {
        id: "demo3",
        question: "What topics would you like to cover in the next session?",
        type: "short-answer",
        audience: "all",
        isAnonymous: false,
        requireName: false,
        createdAt: new Date(),
      },
    ];

    const demoResponses: Response[] = [
      {
        id: "resp1",
        questionId: "demo1",
        answer: "Yes",
        name: "Rahul Kumar",
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "resp2",
        questionId: "demo1",
        answer: "Yes",
        name: "Priya Sharma",
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "resp3",
        questionId: "demo1",
        answer: "No",
        name: "Amit Patel",
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "resp4",
        questionId: "demo2",
        answer: "Yes",
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: "resp5",
        questionId: "demo2",
        answer: "No",
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: "resp6",
        questionId: "demo3",
        answer: "Machine Learning and AI fundamentals",
        name: "Sneha Reddy",
        submittedAt: new Date(),
      },
    ];

    demoQuestions.forEach((q) => this.questions.set(q.id, q));
    demoResponses.forEach((r) => this.responses.set(r.id, r));
  }

  // Questions
  addQuestion(question: Question) {
    this.questions.set(question.id, question);
  }

  getQuestion(id: string): Question | undefined {
    return this.questions.get(id);
  }

  getAllQuestions(): Question[] {
    return Array.from(this.questions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // Responses
  addResponse(response: Response) {
    this.responses.set(response.id, response);
  }

  getResponsesForQuestion(questionId: string): Response[] {
    return Array.from(this.responses.values())
      .filter((r) => r.questionId === questionId)
      .sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime());
  }

  getAllResponses(): Response[] {
    return Array.from(this.responses.values());
  }
}

export const store = new Store();
