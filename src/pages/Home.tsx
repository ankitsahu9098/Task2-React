import { useState, useEffect } from "react";
import { ApiService } from "../services";

export default function Home({ user, setUser }: { user: any; setUser: (user: any) => void }) {
  interface Question {
    questionId: number;
    title: string;
    username: string;
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAsk, setShowAsk] = useState(false);
  const [question, setQuestion] = useState("");
  const [askUser, setAskUser] = useState("");

  const [selected, setSelected] = useState<Question | null>(null);
  const [answer, setAnswer] = useState("");
  const [answerUser, setAnswerUser] = useState("");

  // load questions
  const loadData = async () => {
    const data = await ApiService.get("/users/list");
    setQuestions(data || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  // add question
  const addQuestion = async () => {
    await ApiService.post("/users/question", {
      title: question,
      username: askUser, // 👈 pass inside body
    });

    setShowAsk(false);
    setQuestion("");
    loadData();
  };

  // add answer
  const addAnswer = async () => {
    if (!selected) return;
    await ApiService.post("/users/answer", {
      questionId: selected.questionId,
      answerText: answer,
      username: answerUser,
    });

    setSelected(null);
    setAnswer("");
    loadData();
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>StackOverflow Clone</h2>
        <div>
          <span>{user?.username}</span>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      </div>

      {/* ASK BUTTON */}
      <button style={styles.askBtn} onClick={() => setShowAsk(true)}>
        Ask Question
      </button>

      {/* ASK FORM */}
      {showAsk && (
        <div style={styles.box}>
          <input
            style={styles.input}
            placeholder="Username"
            onChange={(e) => setAskUser(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Your Question"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={addQuestion}>Submit</button>
        </div>
      )}

      {/* QUESTIONS LIST */}
      <div>
        {questions.map((q) => (
          <div key={q.questionId} style={styles.question}>
            <h4 onClick={() => setSelected(q)}>{q.title}</h4>
            <p>by {q.username}</p>
          </div>
        ))}
      </div>

      {/* ANSWER BOX */}
      {selected && (
        <div style={styles.box}>
          <h3>{selected.title}</h3>

          <input
            style={styles.input}
            placeholder="Username"
            onChange={(e) => setAnswerUser(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Your Answer"
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button onClick={addAnswer}>Submit Answer</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    background: "#f8f9f9",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  askBtn: {
    background: "#0a95ff",
    color: "white",
    padding: 10,
    border: "none",
    marginBottom: 20,
  },
  question: {
    background: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    cursor: "pointer",
  },
  box: {
    background: "white",
    padding: 15,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
};
