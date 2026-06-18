import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import API from "../services/api"
import { generateQuestions, evaluateAnswers } from "../services/aiService"
import { FaMicrophone } from "react-icons/fa"
import toast from "react-hot-toast"

function Interview() {
  const location = useLocation()
  const navigate = useNavigate()
  const recognitionRef = useRef(null)
  const role = location.state?.role || "Software Developer"

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answer, setAnswer] = useState("")
  const [allAnswers, setAllAnswers] = useState([])
  const [isListening, setIsListening] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => { loadQuestions() }, [])

  async function loadQuestions() {
    const result = await generateQuestions(role)
    const questionArray = result.split("\n").filter((q) => q.trim() !== "")
    setQuestions(questionArray)
    setLoading(false)
  }

  function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      toast.error("Speech not supported — use Chrome")
      return
    }
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.lang = "en-US"
      recognitionRef.current.continuous = false
      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)
      recognitionRef.current.onresult = (event) => {
        const speechText = event.results[0][0].transcript
        setAnswer((prev) => prev + " " + speechText)
      }
    }
    recognitionRef.current.start()
  }

  async function nextQuestion() {
    if (answer.trim() === "") {
      toast.error("Please provide an answer")
      return
    }

    const updatedAnswers = [...allAnswers, answer]
    setAllAnswers(updatedAnswers)
    setAnswer("")

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setSubmitting(true)
      try {
        const aiResult = await evaluateAnswers(updatedAnswers)
        await API.post("/interviews/save", {
          role,
          answers: updatedAnswers,
          communicationScore: aiResult.communicationScore,
          technicalScore: aiResult.technicalScore,
          confidenceScore: aiResult.confidenceScore,
          overallScore: aiResult.overallScore,
          feedback: aiResult.feedback,
        })
        toast.success("Interview complete")
        navigate("/dashboard")
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
        setSubmitting(false)
      }
    }
  }

  const progress = questions.length > 0 ? ((currentQuestion) / questions.length) * 100 : 0

  return (
    <div className="min-h-screen bg-[#0A0A0F]">

      {/* Top bar */}
      <div className="border-b border-white/5 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
              <path d="M4.5 7l1.8 1.8L9.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">InterviewAI</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-600">{role}</span>
          {questions.length > 0 && (
            <span className="text-xs text-gray-600 tabular-nums">
              {currentQuestion + 1} / {questions.length}
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {questions.length > 0 && (
        <div className="h-0.5 bg-white/5">
          <div
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="max-w-2xl mx-auto px-8 pt-16">
        {loading ? (
          <div className="flex flex-col items-center gap-4 pt-24">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
            <p className="text-sm text-gray-500">Generating questions…</p>
          </div>
        ) : submitting ? (
          <div className="flex flex-col items-center gap-4 pt-24">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
            <p className="text-sm text-gray-500">Evaluating your answers…</p>
          </div>
        ) : (
          <div>
            {/* Question */}
            <div className="mb-8">
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">
                Question {currentQuestion + 1}
              </p>
              <h2 className="text-xl font-semibold text-white leading-relaxed">
                {questions[currentQuestion]}
              </h2>
            </div>

            {/* Answer box */}
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here…"
              rows={6}
              className="w-full p-4 text-sm text-white bg-[#111118] border border-white/5 rounded-xl placeholder-gray-600 outline-none focus:border-indigo-500/40 transition-colors resize-none"
            />

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={startVoice}
                title="Use voice input"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  isListening
                    ? "bg-red-500/15 text-red-400 border border-red-500/30"
                    : "bg-[#111118] border border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/15"
                }`}
              >
                <FaMicrophone className={isListening ? "animate-pulse" : ""} />
                {isListening ? "Listening…" : "Voice input"}
              </button>

              <button
                onClick={nextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-indigo-500 hover:bg-indigo-400 text-white transition-colors duration-150"
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Interview
