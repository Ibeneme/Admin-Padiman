import React, { useState } from "react";
import "./FAQPage.css";
import AddIcon from "../../Components/Icons/AddIcon";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggleAnswer = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is Padiman Route?",
      answer:
        "Padiman Route is a mobile app that connects verified travellers with individuals who want to travel affordably or send parcels efficiently. Travellers can earn money from their trips by offering rides or delivering parcels.",
    },
    {
      question: "How can I earn with Padiman Route?",
      answer:
        "You can earn by listing your available car seats or trunk space. When others book a ride or request parcel delivery, you get paid for helping out during your journey.",
    },
    {
      question: "Is Padiman Route safe to use?",
      answer:
        "Yes. All users are verified to ensure safety and accountability. We are building a trusted network for both travellers and senders.",
    },
    {
      question: "Do I need to be a full-time driver?",
      answer:
        "No. You can use Padiman Route even if you’re just travelling for personal reasons. Every trip you take can help someone else move or send something — and you get rewarded for it.",
    },
    {
      question: "Can I use Padiman Route for sending parcels?",
      answer:
        "Absolutely! Just choose a verified traveller heading to your parcel’s destination and enjoy cost-effective delivery.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div className="faq-container">
        <br /> <br /> <br />
        <h1 className="faq-header">Frequently Asked Questions</h1>
        <p className="faq-subtext">
          Got questions about Padiman Route? We’ve answered the most common ones
          here.
        </p>
        {faqItems.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => handleToggleAnswer(index)}
              aria-expanded={activeIndex === index}
            >
              <h3 className="faq-title">{faq.question}</h3>
              <span
                style={{
                  marginLeft: 12,

                  borderRadius: "50%",
                  padding: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AddIcon width={28} height={28} color="purple" />
              </span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
