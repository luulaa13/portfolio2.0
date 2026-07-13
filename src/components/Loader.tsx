import { useEffect, useState } from "react";

const steps = [
  "Understanding users...",
  "Designing experiences...",
  "Building interfaces...",
  "Growing products...",
  "Ready."
];

function Loader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <div className="loader-content">
        <span className="loader-label">Initializing</span>

        <h2 key={currentStep} className="loader-step">
          {steps[currentStep]}
        </h2>
      </div>
    </div>
  );
}

export default Loader;
