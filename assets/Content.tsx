import { Zap, Shield, MessageSquare, Filter } from "lucide-react";

export const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Smart Summarization",
    description:
      "Get the gist of long email threads in seconds with AI-powered summaries.",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Reply Generator",
    description:
      "Generate contextual replies that match your tone and style automatically.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Advanced Spam Filter",
    description:
      "Block unwanted emails with intelligent filtering that learns from your behavior.",
  },
  {
    icon: <Filter className="w-6 h-6" />,
    title: "Smart Organization",
    description:
      "Automatically categorize and prioritize emails based on importance and urgency.",
  },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    content:
      "InboxSage helped me reduce my email processing time by 80%. I finally achieved inbox zero!",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Freelance Designer",
    content:
      "The AI replies are so natural, my clients can't tell the difference. It's like having a personal assistant.",
    avatar: "MJ",
  },
  {
    name: "Emily Rodriguez",
    role: "Graduate Student",
    content:
      "Managing professor emails and research communications is now effortless. Game changer for students!",
    avatar: "ER",
  },
];

export const steps = [
  {
    number: "01",
    title: "Connect Gmail",
    description:
      "Securely link your Gmail account with one-click OAuth integration.",
  },
  {
    number: "02",
    title: "Summarize & Sort",
    description:
      "AI automatically categorizes and summarizes your incoming emails.",
  },
  {
    number: "03",
    title: "Reply Smartly",
    description:
      "Generate perfect responses or let AI handle routine replies automatically.",
  },
];
