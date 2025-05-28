"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, Send, Bot, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EmailData {
  sendermail: string;
  subject: string;
  body: string;
  error?: string;
  details?: string;
}

interface ReplyData {
  mailid: string;
  email: string;
  subject: string;
  body: string;
  replybody: string;
  replysubject: string;
}

interface Message {
  role: string;
  content: string;
}

interface CheckReplyResponse {
  success: boolean;
  exists?: boolean;
  type?: string;
  error?: any;
}

interface CreateReplyResponse {
  success: boolean;
  reply?: ReplyData;
  type?: string;
  error?: any;
}

interface GetReplyAndMessageResponse {
  success: boolean;
  reply?: ReplyData;
  message?: {
    Mailid: string;
    email: string;
    message: Message[];
  };
  type?: string;
  error?: any;
}

interface ChatResponse {
  success: boolean;
  data?: {
    message: string;
    replybody: string;
    replysubject: string;
  };
  type?: string;
  error?: any;
  msg?: string;
}

const MailPage = () => {
  const params = useParams();
  const [emailId, setEmailId] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [replyExists, setReplyExists] = useState(false);
  const [emailData, setEmailData] = useState<EmailData | null>(null);
  const [replyData, setReplyData] = useState<ReplyData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userQuery, setUserQuery] = useState("");
  const [generating, setGenerating] = useState(false);
  const [chatting, setChatting] = useState(false);

  useEffect(() => {
    if (params?.id && Array.isArray(params.id)) {
      setEmailId(params.id.join("/"));
    }
  }, [params]);

  const checkReplyExists = useCallback(
    async (id: string): Promise<CheckReplyResponse | null> => {
      try {
        const response: AxiosResponse<CheckReplyResponse> = await axios.get(
          `/api/checkReplyExists/${id}`
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
          console.error(error.response?.status);
        }
        return null;
      }
    },
    []
  );

  const fetchEmailData = useCallback(
    async (id: string): Promise<EmailData | null> => {
      try {
        const response: AxiosResponse<EmailData> = await axios.get(
          `/api/fetchMail/${id}`
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          console.error("Response data:", error.response?.data);
          console.error("Response status:", error.response?.status);
        }
        return null;
      }
    },
    []
  );

  const getReplyAndMessage = useCallback(
    async (id: string): Promise<GetReplyAndMessageResponse | null> => {
      try {
        const response: AxiosResponse<GetReplyAndMessageResponse> =
          await axios.get(`/api/getReplyandMessage/${id}`);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
          console.error(error.response?.status);
        }
        return null;
      }
    },
    []
  );

  const createReply = useCallback(
    async (payload: {
      id: string;
      mailsub: string;
      mailbody: string;
      sendermail: string;
    }): Promise<CreateReplyResponse | null> => {
      try {
        const response: AxiosResponse<CreateReplyResponse> = await axios.post(
          "/api/createReply",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
          console.error(error.response?.status);
        }
        return null;
      }
    },
    []
  );

  const sendChatQuery = useCallback(
    async (payload: {
      id: string;
      query: string;
    }): Promise<ChatResponse | null> => {
      try {
        const response: AxiosResponse<ChatResponse> = await axios.post(
          "/api/chat",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          console.error("Response data:", error.response?.data);
          console.error("Response status:", error.response?.status);
        }
        return null;
      }
    },
    []
  );

  useEffect(() => {
    if (!emailId) return;

    const initializeData = async () => {
      try {
        setLoading(true);

        const replyCheckData = await checkReplyExists(emailId);
        if (!replyCheckData?.success) {
          toast.error("Failed to check reply status");
          return;
        }

        setReplyExists(replyCheckData.exists || false);

        if (replyCheckData.exists) {
          const replyData = await getReplyAndMessage(emailId);
          if (replyData?.success) {
            if (replyData.reply) {
              setReplyData(replyData.reply);
              setMessages(replyData.message?.message || []);
            } else {
              console.warn(" no reply found, setting replyExists to false");
              setReplyExists(false);
              setReplyData(null);
              setMessages([]);
            }
          } else {
            console.error("Failed to fetch reply:", replyData);
            toast.error("Failed to fetch reply data");
          }
        }
        const emailData = await fetchEmailData(emailId);
        if (emailData?.error) {
          toast.error("Failed to fetch email data");
          console.error("Email fetch error:", emailData.error);
        } else if (emailData) {
          setEmailData(emailData);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [emailId, checkReplyExists, getReplyAndMessage, fetchEmailData]);

  const handleGenerateReply = useCallback(async () => {
    if (!emailData || !emailId) {
      console.log("missing email data or email ");
      return;
    }

    try {
      setGenerating(true);

      const response = await createReply({
        id: emailId,
        mailsub: emailData.subject,
        mailbody: emailData.body,
        sendermail: emailData.sendermail,
      });

      if (response?.success && response.reply) {
        setReplyData(response.reply);
        setReplyExists(true);
        setMessages([]);
        toast.success("Reply generated successfully!");
      } else {
        toast.error("Failed to generate reply");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while generating reply");
    } finally {
      setGenerating(false);
    }
  }, [emailData, emailId, createReply]);

  const handleSendChatMessage = useCallback(async () => {
    if (!userQuery.trim() || !emailId) {
      console.log("mising user query or email ID for chat");
      return;
    }

    try {
      setChatting(true);
      console.log("💬 Sending chat message:", userQuery);

      const response = await sendChatQuery({
        id: emailId,
        query: userQuery,
      });

      if (response?.success && response.data) {
        // Update messages
        setMessages((prev) => [
          ...prev,
          { role: "user", content: userQuery },
          { role: "assistant", content: response.data!.message },
        ]);

        // Update reply data
        if (replyData) {
          setReplyData({
            ...replyData,
            replybody: response.data.replybody,
            replysubject: response.data.replysubject,
          });
        }

        setUserQuery("");
        toast.success("Reply updated successfully!");
        console.log("✅ Chat message processed successfully");
      } else {
        const errorMsg = response?.msg || "Failed to process chat message";
        toast.error(errorMsg);
        console.error(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while processing your message");
    } finally {
      setChatting(false);
    }
  }, [userQuery, emailId, replyData, sendChatQuery]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !chatting && userQuery.trim()) {
        handleSendChatMessage();
      }
    },
    [chatting, userQuery, handleSendChatMessage]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-gray-300">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {!replyExists ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-blue-500 mr-2" />
                  <CardTitle className="text-2xl text-gray-100">
                    Email Details
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {emailData ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        From:
                      </label>
                      <p className="text-gray-100 bg-gray-700 p-2 rounded text-sm">
                        {emailData.sendermail}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Subject:
                      </label>
                      <p className="text-gray-100 bg-gray-700 p-2 rounded text-sm">
                        {emailData.subject}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Body:
                      </label>
                      <ScrollArea className="h-96 bg-gray-700 p-3 rounded">
                        <div
                          dangerouslySetInnerHTML={{ __html: emailData.body }}
                          className="text-gray-100 text-sm"
                        />
                      </ScrollArea>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">Loading email...</p>
                )}
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-green-500 mr-2" />
                  <CardTitle className="text-2xl text-gray-100">
                    AI-Generated Reply
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {replyData ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Subject:
                      </label>
                      <Input
                        value={replyData.replysubject}
                        readOnly
                        className="bg-gray-700 border-gray-600 text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Body:
                      </label>
                      <Textarea
                        value={replyData.replybody}
                        readOnly
                        className="bg-gray-700 border-gray-600 text-gray-100 min-h-32"
                      />
                    </div>
                    <div className="pt-4 flex justify-end">
                      <a
                        href={`mailto:${
                          emailData?.sendermail
                        }?subject=${encodeURIComponent(
                          replyData.replysubject
                        )}&body=${encodeURIComponent(replyData.replybody)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          Send Email
                        </Button>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Button
                      onClick={handleGenerateReply}
                      disabled={generating}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {generating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate Reply"
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-gray-100 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-500" />
                  Original Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                {emailData ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        From:
                      </label>
                      <p className="text-gray-100 bg-gray-700 p-2 rounded text-sm">
                        {emailData.sendermail}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Subject:
                      </label>
                      <p className="text-gray-100 bg-gray-700 p-2 rounded text-sm">
                        {emailData.subject}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Body:
                      </label>
                      <ScrollArea className="h-96 bg-gray-700 p-3 rounded">
                        <div
                          dangerouslySetInnerHTML={{ __html: emailData.body }}
                          className="text-gray-100 text-sm"
                        />
                      </ScrollArea>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">Loading email...</p>
                )}
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-100 flex items-center">
                    <Send className="h-5 w-5 mr-2 text-green-500" />
                    Generated Reply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {replyData ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300">
                          Subject:
                        </label>
                        <Input
                          value={replyData.replysubject}
                          readOnly
                          className="bg-gray-700 border-gray-600 text-gray-100"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300">
                          Body:
                        </label>
                        <Textarea
                          value={replyData.replybody}
                          readOnly
                          className="bg-gray-700 border-gray-600 text-gray-100 min-h-32"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400">Loading reply...</p>
                  )}
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-100 flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-purple-500" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64 mb-4 bg-gray-700 p-3 rounded">
                    {messages.length > 0 ? (
                      <div className="space-y-3">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${
                              message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`flex max-w-[80%] ${
                                message.role === "user"
                                  ? "flex-row-reverse"
                                  : "flex-row"
                              } items-start space-x-2`}
                            >
                              <div
                                className={`flex-shrink-0 ${
                                  message.role === "user" ? "ml-2" : "mr-2"
                                }`}
                              >
                                {message.role === "user" ? (
                                  <User className="h-6 w-6 text-blue-400" />
                                ) : (
                                  <Bot className="h-6 w-6 text-purple-400" />
                                )}
                              </div>
                              <div
                                className={`p-3 rounded-lg ${
                                  message.role === "user"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-600 text-gray-100"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center">
                        Start a conversation to refine your reply...
                      </p>
                    )}
                  </ScrollArea>

                  <div className="flex space-x-2">
                    <Input
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      placeholder="Ask AI to modify the reply..."
                      className="bg-gray-700 border-gray-600 text-gray-100 flex-1"
                      onKeyPress={handleKeyPress}
                    />
                    <Button
                      onClick={handleSendChatMessage}
                      disabled={chatting || !userQuery.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {chatting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailPage;
