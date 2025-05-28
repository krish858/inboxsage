"use client";

import React, { useState, useEffect } from "react";
import { Mail, LogOut, History, Clock, ArrowRight, Zap, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [summary, setSummary] = useState("");
  const [importantEmails, setImportantEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [newPrompt, setNewPrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await axios.get("/api/generateSummary");
      if (res.data.success) {
        setSummary(res.data.data.summary || " ");
        setImportantEmails(res.data.data.mails);
      } else {
        setSummary("Failed to generate summary");
        setImportantEmails([]);
      }
    } catch (err) {
      console.error(err);
      setSummary("Error fetching summary. Try again.");
      setImportantEmails([]);
    } finally {
      setLoading(false);
    }
  };

  const submitPrompt = async () => {
    if (!newPrompt.trim()) return;

    try {
      setSubmitting(true);
      const res = await axios.post("/api/changePrompt", { prompt: newPrompt });

      if (res.data.success) {
        setShowPromptModal(false);
        setNewPrompt("");
      } else {
        console.error("Failed to update prompt:", res.data);
      }
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const getPriorityStyles = (priority: string, isUrgent: boolean) => {
    if (isUrgent) {
      return "border-l-red-500 bg-red-500/10 hover:bg-red-500/20";
    }
    switch (priority) {
      case "high":
        return "border-l-orange-500 bg-orange-500/10 hover:bg-orange-500/20";
      case "medium":
        return "border-l-blue-500 bg-blue-500/10 hover:bg-blue-500/20";
      case "low":
        return "border-l-green-500 bg-green-500/10 hover:bg-green-500/20";
      default:
        return "border-l-gray-500 bg-gray-500/10 hover:bg-gray-500/20";
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-xl">
        Loading your AI summary...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 flex items-center justify-center text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">InboxSage</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center px-3 py-1 bg-gray-700 rounded-full">
                <span className="text-sm text-gray-300 font-medium">
                  Free Tier
                </span>
              </div>

              <button
                onClick={() => {}}
                className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                title="Reply History"
              >
                <History
                  onClick={() => {
                    router.push("/history");
                  }}
                  className="w-5 h-5"
                />
              </button>

              <Avatar className="h-7 w-7">
                <AvatarImage
                  src={session?.user?.image || ""}
                  alt={session?.user?.name || "User"}
                />
                <AvatarFallback className="bg-gray-800">
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <button
                onClick={() => {
                  signOut();
                }}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome back, {session?.user?.name?.split(" ")[0] || "User"}
          </h1>
          <p className="text-gray-400">
            Here's your intelligent email summary for the past few days
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-8 h-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    AI Email Summary
                  </h2>
                  <p className="text-gray-400">
                    Recent insights • Powered by InboxSage AI
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg p-6 border border-indigo-700/50">
                <p className="text-gray-100 leading-relaxed text-lg whitespace-pre-wrap">
                  {summary}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Important Emails
                </h2>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-4">
                {importantEmails.map((email, idx) => (
                  <div
                    key={email.id || idx}
                    className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all duration-200 ${getPriorityStyles(
                      email.priority,
                      email.priority === "high" && email.body.includes("urgent")
                    )}`}
                    onClick={() => router.push(`mail/${email.id}`)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          {email.priority === "high" && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-900/50 text-red-300">
                              Urgent
                            </span>
                          )}
                          {email.tags && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                              {email.tags}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-white text-sm leading-tight mb-1">
                          {email.subject || email.title}
                        </h3>
                        <p className="text-xs text-gray-400 truncate">
                          {email.sender_mail}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 ml-3 flex-shrink-0" />
                    </div>

                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      Recent
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowPromptModal(true)}
                  className="text-sm text-blue-400 hover:underline"
                >
                  Change AI Summary Prompt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setShowPromptModal(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-white mb-4">
              Update AI Summary Prompt
            </h3>
            <textarea
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              rows={5}
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter new summary prompt for the AI..."
            />
            <button
              onClick={submitPrompt}
              disabled={submitting}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
            >
              {submitting ? "Updating..." : "Update Prompt"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
