import { useState } from "react";
import { extractResumeText } from "../services/resumeService";
import toast from "react-hot-toast";

function ResumeUpload() {
  const [resumeName, setResumeName] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setResumeName(file.name);

    try {
      const text = await extractResumeText(file);

      localStorage.setItem("resume", text);

      toast.success("Resume saved");
    } catch (error) {
      console.log(error);
      toast.error("Could not read PDF");
      setResumeName("");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mt-16 max-w-xl mx-auto">
      <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/15 flex items-center justify-center shrink-0 mt-0.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-indigo-400"
            >
              <rect
                x="3"
                y="1"
                width="10"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6 5h4M6 8h4M6 11h2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white mb-1">
              Upload Resume
            </p>

            <p className="text-xs text-gray-500 mb-4">
              Attach your PDF so interview questions can be tailored to your
              experience.
            </p>

            {resumeName ? (
              <div className="flex items-center justify-between bg-[#0A0A0F] border border-white/5 rounded-lg px-3 py-2">
                <span className="text-xs text-gray-400 truncate">
                  {resumeName}
                </span>

                {uploading ? (
                  <span className="text-xs text-indigo-400 ml-2">
                    Saving...
                  </span>
                ) : (
                  <span className="text-xs text-emerald-400 ml-2">
                    Saved ✓
                  </span>
                )}
              </div>
            ) : (
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-[#0A0A0F] border border-white/5 text-gray-400 hover:text-white hover:border-white/15 cursor-pointer transition-colors">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <path
                    d="M6.5 9V4M4 6.5l2.5-2.5L9 6.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="1"
                    y="10"
                    width="11"
                    height="2"
                    rx="1"
                    fill="currentColor"
                    opacity="0.4"
                  />
                </svg>

                Choose PDF

                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;