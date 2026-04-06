<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { get, post, del } from '../services/api';

export default function Home() {

    interface Question {
    id?: number;
    title: string;
    }
  const [questions, setQuestions] = useState<any[]>([]);
  const [showAsk, setShowAsk] = useState(false);
  const [newQ, setNewQ] = useState({ username: '', title: '' });
  const [answers, setAnswers] = useState<Record<number, any[]>>({});
  const [activeQ, setActiveQ] = useState<number | null>(null);
  const [newAns, setNewAns] = useState({ username: '', title: '' });

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const loadQuestions = async () => {
    const data = await get('users/list');
    setQuestions(data || []);
  };

  const loadAnswers = async (qid: number) => {
    const data = await get(`users/answers/${qid}`);
    setAnswers(prev => ({ ...prev, [qid]: data || [] }));
  };

  useEffect(() => {
    loadQuestions();
  }, []);

   const addQuestion = async () => {
    await post(`users/question?username=${newQ.username}`, { title: newQ.title });
    setShowAsk(false);
    setNewQ({ username: '', title: '' });
    loadQuestions();
  };

  const addAnswer = async (qid: number) => {
    await post(`users/answer?username=${newAns.username}`, {
      title: newAns.title,
      questionId: qid,
      userId: newAns.username
    });
    setNewAns({ username: '', title: '' });
    loadAnswers(qid);
  };

  const deleteQuestion = async (qid: number) => {
    await del(`users/question/${qid}?userId=${user.userid}`, {});
    loadQuestions();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Questions</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowAsk(!showAsk)}
      >
        Ask a Question
      </button>

      {showAsk && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <input
            className="input"
            placeholder="Username"
            value={newQ.username}
            onChange={e => setNewQ({ ...newQ, username: e.target.value })}
          />
          <input
            className="input"
            placeholder="Question"
            value={newQ.title}
            onChange={e => setNewQ({ ...newQ, title: e.target.value })}
          />
          <button className="btn" onClick={addQuestion}>Submit</button>
        </div>
      )}

        {questions.map(q => (
        <div key={q.id} className="bg-white p-4 rounded-xl shadow mb-3">
          <div onClick={() => {
            setActiveQ(q.id);
            loadAnswers(q.id);
          }} className="cursor-pointer">
            <h3 className="font-semibold">{q.title}</h3>
            <p className="text-sm text-gray-500">By {q.userId}</p>
          </div>

          {/* Answers */}
          <div className="mt-2 space-y-2">
            {(answers[q.id] || []).map(a => (
              <div key={a.id} className="bg-gray-100 p-2 rounded">
                <p>{a.title}</p>
                <span className="text-xs text-gray-500">By {a.userId}</span>
              </div>
            ))}
          </div>

          {/* Add Answer + Delete */}
          {activeQ === q.id && (
            <div className="mt-3">
              <input
                className="input"
                placeholder="Username"
                value={newAns.username}
                onChange={e => setNewAns({ ...newAns, username: e.target.value })}
              />
                 <input
                className="input"
                placeholder="Your Answer"
                value={newAns.title}
                onChange={e => setNewAns({ ...newAns, title: e.target.value })}
              />
              <div className="flex gap-2">
                <button className="btn" onClick={() => addAnswer(q.id)}>Add Answer</button>

                {user.userid === q.userId && (
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded"
                    onClick={() => deleteQuestion(q.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
=======
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
>>>>>>> 41fa6a106b91b9fabfa32e2908d48a64c9c2bae5
