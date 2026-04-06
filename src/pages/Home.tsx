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
