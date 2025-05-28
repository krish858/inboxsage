"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

interface Mail {
  mailid: string;
  email: string;
  senderemail: string;
  body: string;
  subject: string;
  replybody: string;
  replysubject: string;
}

export default function History() {
  const { data: session, status } = useSession();
  const [mails, setMails] = useState<Mail[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await axios.get("/api/getReplies");
        if (res.data.success) {
          setMails(res.data.mails || []);
        } else {
          console.error("Failed to fetch replies");
        }
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    };

    if (status === "authenticated") {
      fetchReplies();
    }
  }, [status]);

  const truncate = (text: string, wordLimit: number = 50) => {
    const words = text.split(/\s+/);
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Replied Mails</h1>
        <Button
          onClick={() => router.push("/dashboard")}
          className="text-blue-400 hover:bg-black cursor-pointer"
        >
          Back to Dashboard
        </Button>
      </div>

      {mails.length === 0 ? (
        <p className="text-gray-400">No replied mails found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mails.map((mail) => (
            <Card
              key={mail.mailid}
              className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all"
            >
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  {mail.subject}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="flex justify-between items-center mt-auto pt-4 ">
                  <span className="text-xs text-gray-500">
                    From: {mail.senderemail}
                  </span>
                  <Button
                    onClick={() => {
                      router.push(`/mail/${mail.mailid}`);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 hover:bg-gray-800 cursor-pointer"
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
