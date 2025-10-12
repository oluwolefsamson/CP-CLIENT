import  { useEffect, useState } from "react";
import About from "../../components/LandingPage/About/About";
import faqImg from "../../../src/assets/images/faqs.jpeg";
import FaqList from "../../components/LandingPage/Faq/FaqList";
import Hero from "../../components/LandingPage/Hero/Hero";
import WhyChoose from "../../components/LandingPage/WhyChoose/WhyChoose";
import Feature from "../../components/LandingPage/Feature/Feature";
import HomeSupplierList from "../../components/LandingPage/Supplier/HomeSupplierList";
import ServiceList from "../../components/LandingPage/Services/ServiceList";
import Billing from "../../components/LandingPage/Billing/Billing";
import { Marquee3D } from "../../components/LandingPage/Marquee/Marquee";
import { Skeleton } from "../../components/ui/skeleton";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1.5s
    const timer = setTimeout(() => setLoading(false), 1500);

    const script = document.createElement("script");
    script.src = "https://cdn.chatsimple.ai/chat-bot-loader.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      clearTimeout(timer);
      document.body.removeChild(script);
    };
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-10 space-y-10">
        <Skeleton className="w-full h-[200px] rounded-lg" />
        <Skeleton className="w-full h-[120px] rounded-lg" />
        <Skeleton className="w-full h-[120px] rounded-lg" />
        <Skeleton className="w-full h-[120px] rounded-lg" />
        <Skeleton className="w-full h-[120px] rounded-lg" />
        <Skeleton className="w-full h-[350px] rounded-lg" />
        <Skeleton className="w-full h-[120px] rounded-lg" />
      </div>
    );
  }

  return (
    <>
      {/* Hero section */}
      <Hero
        title="Track Real-Time Agricultural Prices"
        subtitle="Stay informed with live crop prices, trends, and analytics from across the country."
        ctaText="Explore Prices"
      />

      {/* Why Choose Us Section */}
      <WhyChoose
        points={[
          "Live updates on crop prices",
          "Regional market trends",
          "Trusted by farmers and traders",
        ]}
      />

      {/* About section */}
      <About />

      {/* Live Price Tracking Features Section */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Smart Features for Price Monitoring
            </h2>
            <p className="text__para text-center">
              From real-time charts to crop comparisons, our tools help you stay
              ahead in the market.
            </p>
          </div>
          <Feature />
        </div>
      </section>

      {/* Trusted Supplier Network Section */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Trusted Agricultural Market Data
            </h2>
            <p className="text__para text-center">
              We partner with verified suppliers, local markets, and farmers to
              ensure accurate price data.
            </p>
          </div>
          <HomeSupplierList />
        </div>
      </section>

      {/* Services - Search & Analytics */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Powerful Tools for Farmers & Traders
            </h2>
            <p className="text__para text-center">
              Use our dashboard to search prices, track trends, and plan your
              selling or buying strategy.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>

      <Billing />

      <section>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-[30px] md:gap-[50px] lg:gap-0 items-stretch">
            <div className="w-full md:w-1/2 flex">
              <img
                src={faqImg}
                alt="FAQs"
                className="w-[80%] h-full lg:h-[103vh] md:h-[75vh] object-cover rounded"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="heading">Frequently Asked Questions</h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto mb-[80px] lg:mb-[100px] sm:mb-[30px]">
            <h2 className="heading text-center">What Our Users Say</h2>
            <p className="text__para text-center">
              Hear from farmers, traders, and suppliers who rely on our platform
              for market insights.
            </p>
          </div>
          <Marquee3D />
        </div>
      </section>

      {/* ChatSimple AI Chatbot */}
      <chat-bot
        platform_id="7f9c4059-744b-471b-a7ce-a40664ca152d"
        user_id="494d6d1e-a30f-49cd-9bd7-91fb96399ee4"
        chatbot_id="0b89a0db-af54-42ea-aeeb-87c325948bad"
      >
        <a href="https://www.chatsimple.ai/?utm_source=widget&utm_medium=referral">
          chatsimple
        </a>
      </chat-bot>
    </>
  );
};

export default Home;
