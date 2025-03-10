import { useState, useRef } from "react";
import { motion } from "framer-motion";
import InputSection from "./burnout/InputSection";
import ResultsCard from "./burnout/ResultsCard";
import ShareSection from "./burnout/ShareSection";
import BurnoutVisuals from "./BurnoutVisuals";
import BurnoutRecommendations from "./BurnoutRecommendations";
import SunsamaCTA from "./burnout/SunsamaCTA";
import QuizTeaser from "./burnout/QuizTeaser";

interface BurnoutInputs {
  hoursWorked: number;
  sleepHours: number;
  selfCareHours: number;
}

// Function to handle asset URLs in both development and embedded contexts
const getAssetUrl = (path: string) => {
  // If it's already an absolute URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // For embedded version, use the global base URL
  if (typeof window !== 'undefined' && 
      // @ts-ignore
      window.__BURNOUT_CALC_BASE_URL__) {
    // @ts-ignore
    return window.__BURNOUT_CALC_BASE_URL__ + path.replace(/^\//, '');
  }
  
  // For local development
  return path;
};

const BurnoutCalculator = () => {
  const [inputs, setInputs] = useState<BurnoutInputs>({
    hoursWorked: 40,
    sleepHours: 7,
    selfCareHours: 5,
  });
  const [showResults, setShowResults] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const resultsRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const calculateRiskScore = () => {
    const workLoad = inputs.hoursWorked / 40;
    const sleepDeficit = (8 - inputs.sleepHours) / 8;
    const selfCareDeficit = (10 - inputs.selfCareHours) / 10;

    const score = (workLoad * 4 + sleepDeficit * 3 + selfCareDeficit * 3) / 10;
    return Math.min(Math.max(score, 0), 1) * 10;
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { level: "Low Risk", color: "text-sage-500" };
    if (score <= 6) return { level: "Moderate Risk", color: "text-orange-500" };
    return { level: "High Risk", color: "text-red-500" };
  };

  const getBurnoutWindow = (score: number) => {
    if (score <= 3) return "Low risk - maintain current balance";
    if (score <= 6) return "4-8 weeks if patterns continue";
    return "2-4 weeks if patterns continue";
  };

  const handleInputChange = (field: string, value: number[]) => {
    if (!showResults) {
      setInputs(prev => ({ ...prev, [field]: value[0] }));
    }
  };

  const handleCalculate = () => {
    setShowResults(true);
    setIsOpen(false);
  };

  const handleReset = () => {
    setInputs({
      hoursWorked: 0,
      sleepHours: 0,
      selfCareHours: 0,
    });
    setShowResults(false);
    setIsOpen(true);
  };

  const score = calculateRiskScore();
  const riskLevel = getRiskLevel(score);
  const burnoutWindow = getBurnoutWindow(score);

  // Use the proper URL for the logo, handling both development and embedded contexts
  const logoUrl = getAssetUrl("lovable-uploads/2ba54d49-c430-40cf-b7f4-6109f7e05336.png");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F6FF] via-white to-[#F1F0FB]">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in p-4 sm:p-6 md:p-8">
        <div className="text-center space-y-4">
            <img 
              src={logoUrl}
              alt="Sunsama Logo" 
              className="h-6 mx-auto mb-6"
            />
          <h1 className="text-4xl font-light text-[#6E59A5]">Burnout Risk Calculator</h1>
          <p className="text-[#8E9196] max-w-md mx-auto">
            Assess your risk of burnout based on your work habits and self-care practices
          </p>
        </div>

        <InputSection
          inputs={inputs}
          showResults={showResults}
          isOpen={isOpen}
          onInputChange={handleInputChange}
          onCalculate={handleCalculate}
          onReset={handleReset}
        />

        {!showResults && (
          <QuizTeaser
            workHours={inputs.hoursWorked}
            sleepHours={inputs.sleepHours}
            selfCareHours={inputs.selfCareHours}
          />
        )}

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div ref={resultsRef}>
              <ResultsCard
                score={score}
                riskLevel={riskLevel}
                burnoutWindow={burnoutWindow}
              />
            </div>

            <BurnoutVisuals
              score={score}
              workHours={inputs.hoursWorked}
              sleepHours={inputs.sleepHours}
              selfCareHours={inputs.selfCareHours}
            />

            <BurnoutRecommendations
              workHours={inputs.hoursWorked}
              sleepHours={inputs.sleepHours}
              selfCareHours={inputs.selfCareHours}
            />

            <SunsamaCTA score={score} />

            <ShareSection
              score={score}
              riskLevel={riskLevel}
              exportRef={exportRef}
            />

            <p className="text-xs text-center text-[#8E9196]">
              Your data is not stored or shared. This assessment is for informational purposes only.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BurnoutCalculator;
