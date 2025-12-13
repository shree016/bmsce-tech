"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Pusher from "pusher-js";
import { toast } from "sonner";
import {
  Download,
  ArrowLeft,
  ExternalLink,
  Github,
  Radio, // 🔥 added icon
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Footer } from "@/components/footer";
import { Question, Response } from "@/lib/types";

export default function DashboardPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Initial fetch + realtime new questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/questions");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_KEY!,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      }
    );

    const channel = pusher.subscribe("questions");

    channel.bind("new-question", (question: Question) => {
      setQuestions((prev) => [question, ...prev]);
      toast.success("New question added");
    });

    return () => {
      pusher.unsubscribe("questions");
      pusher.disconnect();
    };
  }, []);

  const handleQuestionClick = (question: Question & { responses?: Response[] }) => {
    setSelectedQuestion(question);
    setResponses(question.responses || []);
  };

  const exportToCSV = () => {
    if (!selectedQuestion) return;

    const headers = ["Email", "Answer", "Submitted At"];
    const rows = responses.map((r) => [
      r.email || "Unknown",
      r.answer,
      new Date(r.submittedAt).toLocaleString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedQuestion.question.slice(0, 30)}-responses.csv`;
    a.click();

    URL.revokeObjectURL(url);
    toast.success("CSV exported successfully");
  };

  const getResponseStats = (question: Question) => {
    const res = question.responses || [];
    if (question.type === "yes-no") {
      const yes = res.filter((r) => r.answer === "Yes").length;
      const no = res.filter((r) => r.answer === "No").length;
      return `${yes} Yes, ${no} No`;
    }
    return `${res.length} responses`;
  };

  const openQuestionLink = (id: string) => {
    window.open(`${window.location.origin}/q/${id}`, "_blank");
  };

  // 🔥 LIVE WALL LINK
  const openLiveWall = (id: string) => {
    window.open(`${window.location.origin}/live/${id}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <nav className="border-b bg-white/70 dark:bg-slate-950/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={100} height={40} />
          </Link>

          <a
            href="https://github.com/sandeep5shetty/bmsce-tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </a>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {!selectedQuestion ? (
          <>
            <div className="flex items-center gap-4 mb-4">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </Link>
              <h2 className="text-2xl font-semibold">Your Questions</h2>
            </div>

            {loading ? (
              <div className="flex flex-col items-center py-12 gap-4">
                <Spinner size="lg" />
                <p className="text-muted-foreground">Loading questions…</p>
              </div>
            ) : questions.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <h3 className="text-xl font-semibold">No questions yet</h3>
                  <Link href="/create">
                    <Button className="mt-4">Create Question</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {questions.map((q) => (
                  <Card
                    key={q.id}
                    className="cursor-pointer hover:shadow"
                    onClick={() => handleQuestionClick(q)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle>{q.question}</CardTitle>

                        <div className="flex gap-1">
                          {/* 🔗 Open Question */}
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              openQuestionLink(q.id);
                            }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>

                          {/* 🔥 Open Live Wall */}
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              openLiveWall(q.id);
                            }}
                            title="Open Live Wall"
                          >
                            <Radio className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm">{getResponseStats(q)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <Button variant="ghost" onClick={() => setSelectedQuestion(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button onClick={exportToCSV} disabled={!responses.length}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{selectedQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Answer</TableHead>
                      <TableHead>Submitted At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {responses.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.email}</TableCell>
                        <TableCell>{r.answer}</TableCell>
                        <TableCell>
                          {new Date(r.submittedAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
