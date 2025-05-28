import React from "react";
import { Mail, Zap, ArrowRight, Check, Star } from "lucide-react";
import { features, testimonials, steps } from "@/assets/Content";
import SigninButton from "@/components/SigninButton";

const InboxSageLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">InboxSage</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-slate-300 hover:text-white transition-colors"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Reviews
              </a>
              <SigninButton className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer">
                Try Now
              </SigninButton>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center transition-all duration-1000 ${
              1 == 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-950/50 border border-blue-800/50 rounded-full text-blue-300 text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Email Assistant
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Achieve Inbox Zero.
              <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Automatically.
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your email chaos into organized productivity. InboxSage
              uses advanced AI to summarize, organize, and reply to your emails
              — so you can focus on what matters most.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <SigninButton className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 font-semibold text-lg cursor-pointer">
                <span>Try Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </SigninButton>
              <button className="text-slate-300 hover:text-white px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200 font-semibold">
                Watch Demo
              </button>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="bg-gradient-to-t from-slate-800 to-slate-850 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
                <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-slate-400">
                    InboxSage Dashboard
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-96">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-slate-800/50 rounded-lg p-6 shadow-sm border border-slate-700/50">
                      <h3 className="font-semibold text-white mb-4">
                        Today's Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Processed</span>
                          <span className="font-medium text-green-400">
                            47 emails
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Auto-replied</span>
                          <span className="font-medium text-blue-400">
                            12 emails
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Filtered spam</span>
                          <span className="font-medium text-red-400">
                            23 emails
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-6 shadow-sm border border-slate-700/50">
                      <h3 className="font-semibold text-white mb-4">
                        Priority Emails
                      </h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-950/50 rounded-lg border-l-4 border-blue-400">
                          <div className="text-sm font-medium text-white">
                            Client Meeting Tomorrow
                          </div>
                          <div className="text-xs text-slate-400">
                            From: sarah@company.com
                          </div>
                        </div>
                        <div className="p-3 bg-green-950/50 rounded-lg border-l-4 border-green-400">
                          <div className="text-sm font-medium text-white">
                            Project Update Required
                          </div>
                          <div className="text-xs text-slate-400">
                            From: team@startup.io
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-6 shadow-sm border border-slate-700/50">
                      <h3 className="font-semibold text-white mb-4">
                        Quick Actions
                      </h3>
                      <div className="space-y-2">
                        <button className="w-full text-left p-3 text-sm text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors">
                          📝 Draft newsletter response
                        </button>
                        <button className="w-full text-left p-3 text-sm text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors">
                          📅 Schedule follow-up
                        </button>
                        <button className="w-full text-left p-3 text-sm text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors">
                          🔄 Bulk archive old threads
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-slate-800/50 rounded-2xl p-8 shadow-sm border border-slate-700/50 hover:shadow-lg hover:border-slate-600/50 transition-all duration-300">
                  <div className="text-3xl font-bold text-blue-400 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to master your inbox and boost productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800/50 rounded-2xl p-8 shadow-sm border border-slate-700/50 hover:shadow-lg hover:border-slate-600/50 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by Professionals
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              See how InboxSage is transforming email management for thousands
              of users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-2xl p-8 shadow-sm border border-slate-700/50"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Inbox?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who've already achieved inbox zero
            with InboxSage. Start your free trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SigninButton className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 font-semibold text-lg cursor-pointer">
              <span>Start with Google in 1 Click</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </SigninButton>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-slate-400">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-400 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 py-4 px-4 sm:px-6 lg:px-8 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">InboxSage</div>
              <div className="text-sm text-slate-300">
                Achieve Inbox Zero. Automatically.
              </div>
            </div>
          </div>
          <SigninButton className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold cursor-pointer">
            Try Now
          </SigninButton>
        </div>
      </div>

      <footer className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 mb-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">InboxSage</span>
              </div>
              <p className="text-slate-400 max-w-md">
                Transform your email chaos into organized productivity with
                AI-powered assistance.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm">
              © 2025 InboxSage. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InboxSageLanding;
