import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MessageCircle, 
  Clock, 
  Globe,
  HelpCircle,
  FileText,
  Users,
  Settings,
  RefreshCw
} from "lucide-react";

const HelpCenter = () => {
  const { user } = useAuth();
  const { profile, isLoading: profileLoading, isFetching: profileFetching, isError: profileError } = useProfile();
  const [copied, setCopied] = useState({ email: false, phone: false });
  const [activeTab, setActiveTab] = useState("contact");

  const handleCopy = (type, value) => {
    navigator.clipboard.writeText(value);
    setCopied((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 1500);
  };

  // Get user name from user_metadata
  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    return "Not provided";
  };

  const supportChannels = [
    {
      id: "email",
      title: "Email Support",
      description: "Get help via email",
      icon: <Mail className="w-5 h-5" />,
      value: "support@myhellodreams.com",
      action: () => handleCopy("email", "support@myhellodreams.com"),
      actionText: copied.email ? "Copied!" : "Copy Email",
      link: "mailto:support@myhellodreams.com"
    },
    {
      id: "phone",
      title: "Phone Support",
      description: "Call us directly",
      icon: <Phone className="w-5 h-5" />,
      value: "+234 701 677 3420",
      action: () => handleCopy("phone", "+234 701 677 3420"),
      actionText: copied.phone ? "Copied!" : "Copy Number",
      link: "https://wa.me/2347016773420"
    },
    {
      id: "whatsapp",
      title: "WhatsApp Support",
      description: "Chat with us on WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      value: "WhatsApp Chat",
      action: () => window.open("https://wa.me/2347016773420", "_blank"),
      actionText: "Open Chat",
      link: "https://wa.me/2347016773420"
    }
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. We'll send you an email with instructions to reset your password."
    },
    {
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, simply browse our course catalog, select the course you're interested in, and click the 'Enroll' button. You'll be guided through the enrollment process."
    },
    {
      question: "Can I access courses offline?",
      answer: "Currently, our courses are only available online. However, you can download course materials and resources for offline reference."
    },
    {
      question: "How do I track my learning progress?",
      answer: "Your learning progress is automatically tracked as you complete lessons. You can view your progress in the 'My Learning' section of your profile."
    },
    {
      question: "What if I have technical issues?",
      answer: "If you're experiencing technical issues, please contact our support team via email or WhatsApp. Include details about the issue and your device/browser information."
    }
  ];

  const tabs = [
    { key: "contact", label: "Contact Support", icon: <MessageCircle className="w-4 h-4" /> },
    { key: "faq", label: "FAQ", icon: <HelpCircle className="w-4 h-4" /> }
  ];

  // Show error state only if there's no cached data
  if (profileError && !profile) {
    return (
      <div className="w-full px-[5%] py-10">
        <div className="text-center text-red-600">
          Error loading profile data. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-[5%] py-10">
      <div className="w-full flex justify-center items-center xl:w-[804px] xl:mx-auto h-[150px] border border-[#eaecf0] rounded-sm p-8 mb-6 text-center">
        <h2 className="text-[#010413] text-[20px] md:text-[28px] xl:text-[32px] mb-2">
          Help Center
        </h2>
      </div>
      
      <div
        className="bg-white rounded-xl shadow-xl p-8 xl:w-[804px] xl:mx-auto"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {/* User Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#010413] text-[16px] font-semibold">Your Information</h3>
            {/* Background sync indicator */}
            {profileFetching && (
              <div className="flex items-center gap-2 text-[#667085] text-xs">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Syncing...</span>
              </div>
            )}
          </div>
          <div className="text-[#667085] text-sm space-y-1">
            <p><strong>Name:</strong> {getUserName()}</p>
            <p><strong>Email:</strong> {user?.email || profile?.email}</p>
            <p><strong>Member since:</strong> {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-[#eaecf0]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 pb-2 px-1 transition-colors duration-200 ${
                activeTab === tab.key
                  ? "text-[#1342ff] border-b-2 border-[#1342ff] font-medium"
                  : "text-[#667085] hover:text-[#101828]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contact Support Tab */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[#010413] text-[18px] font-semibold mb-4">Get in Touch</h3>
              <p className="text-[#667085] text-sm mb-6">
                We're here to help! Choose your preferred way to contact our support team.
              </p>
            </div>

            <div className="grid gap-4">
              {supportChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#f7f7f7] rounded-lg p-4 border border-[#eaecf0]"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-0">
                    <div className="text-[#1342ff]">
                      {channel.icon}
                    </div>
                    <div>
                      <h4 className="text-[#101828] font-medium">{channel.title}</h4>
                      <p className="text-[#667085] text-sm">{channel.description}</p>
                      {channel.id !== "whatsapp" && (
                        <p className="text-[#101828] text-sm font-medium mt-1">{channel.value}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {channel.id !== "whatsapp" && (
                      <a
                        href={channel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1342ff] text-white px-4 py-2 rounded font-medium hover:bg-[#2313ff] transition-colors duration-200 text-sm"
                      >
                        {channel.id === "email" ? "Send Email" : "Call Now"}
                      </a>
                    )}
                    <button
                      onClick={channel.action}
                      className={`px-4 py-2 rounded font-medium transition-colors duration-200 text-sm ${
                        copied[channel.id]
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-[#101828] hover:bg-gray-300"
                      }`}
                    >
                      {channel.actionText}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Support Hours */}
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Support Hours</span>
              </div>
              <p className="text-green-700 text-sm">
                Monday - Friday: 9:00 AM - 6:00 PM (WAT)<br />
                Saturday: 10:00 AM - 4:00 PM (WAT)<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div>
            <h3 className="text-[#010413] text-[18px] font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-[#eaecf0] rounded-lg">
                  <details className="group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#f7f7f7] transition-colors duration-200">
                      <span className="text-[#101828] font-medium">{item.question}</span>
                      <span className="text-[#1342ff] group-open:rotate-180 transition-transform duration-200">
                        ▼
                      </span>
                    </summary>
                    <div className="px-4 pb-4 text-[#667085] text-sm">
                      {item.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
