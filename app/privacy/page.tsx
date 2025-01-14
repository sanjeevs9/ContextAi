import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Shield, Clock, User, Database, Globe, Mail, AlertCircle } from 'lucide-react';

type ContentType = string | string[];

type Subsection = {
  subtitle: string;
  content: ContentType;
};

type Section = {
  icon: React.ReactNode;
  title: string;
  content?: ContentType;
  subsections?: Subsection[];
};

const PrivacyPolicyPage = () => {
  const sections: Section[] = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Introduction",
      content: `Context AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Chrome extension.`
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Information We Collect",
      subsections: [
        {
          subtitle: "User-Selected Content",
          content: [
            "We collect text that you actively highlight and submit for fact-checking through our extension.",
            "This highlighted text is processed to provide you with fact-checking results and contextual information."
          ]
        },
        {
          subtitle: "Usage Data",
          content: [
            "Information about how you interact with our extension, including:",
            "Number of fact-checks performed",
            "User feedback on fact-checking results",
            "Extension installation and usage statistics"
          ]
        },
        {
          subtitle: "Account Information (Optional)",
          content: [
            "If you choose to create an account, we collect:",
            "Email address",
            "Authentication information",
            "Subscription status and payment information (for premium users)"
          ]
        }
      ]
    },
    {
      icon: <User className="w-5 h-5" />,
      title: "How We Use Your Information",
      content: [
        "Process and respond to your fact-checking requests",
        "Provide contextual explanations and source credibility assessments",
        "Manage your account and subscription",
        "Improve our service accuracy and functionality",
        "Monitor and enforce usage limits",
        "Analyze user feedback and engagement"
      ]
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Third-Party Services",
      content: `We work with the following third-party services:
        • OpenAI: For text analysis and explanation generation
        • Stripe: For payment processing (premium subscriptions only)
        • External fact-checking APIs: For verification of claims
        • Chrome Web Store: For extension distribution
        
        Each third-party service has its own privacy policy governing their use of your information.`
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Data Retention",
      content: [
        "Highlighted text is processed in real-time and not stored longer than necessary for providing the service",
        "Account information is retained while your account is active",
        "Usage data is retained for analytical purposes for up to 12 months"
      ]
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Contact Us",
      content: "If you have questions about this Privacy Policy, please contact us at [Your Contact Information]."
    }
  ];

  const renderContent = (content: ContentType) => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc pl-6 space-y-2">
          {content.map((item, index) => (
            <li key={index} className="text-gray-600">{item}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-600">{content}</p>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <CardTitle className="text-2xl text-black">Privacy Policy</CardTitle>
          </div>
          <CardDescription className="text-black">Last Updated: January 14, 2025</CardDescription>
        </CardHeader>
        
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center space-x-2 text-black">
                    {section.icon}
                    <h2 className="text-xl font-semibold text-black">{section.title}</h2>
                  </div>
                  
                  {section.subsections ? (
                    <div className="space-y-6">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="space-y-2">
                          <h3 className="text-lg font-medium text-black">{subsection.subtitle}</h3>
                          {renderContent(subsection.content)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    section.content ? renderContent(section.content) : null
                  )}
                  
                  {index < sections.length - 1 && (
                        <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;