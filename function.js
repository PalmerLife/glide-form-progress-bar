window.function = function(steps, currentStep, primaryColor, completedStages) {
  // Parse inputs
  const stepsArray = (steps.value || "").split(",").map(step => step.trim());
  const currentStepIndex = Math.max(0, (currentStep.value || 1) - 1); // Ensure index is non-negative
  const color = primaryColor.value || "#5C9D5B"; // Default to green if primary color is not provided
  const completedStagesArray = (completedStages.value || "").split(",").map(num => parseInt(num.trim(), 10)); // Parse completed stages

  // Define fallback colors
  const inactiveBackgroundColor = "#1F1F1F";
  const inactiveBorderColor = "#333333";
  const connectorActiveColor = color;
  const connectorInactiveColor = "#333333";
  const textColor = "#FFFFFF";

  // Generate HTML
  const progressBarHtml = `<div style="display:flex;align-items:center;font-family:Arial,sans-serif;gap:0px;">${stepsArray
    .map((_, index) => {
      // Determine if the stage is completed, active, or inactive
      const isCompleted = completedStagesArray.includes(index + 1);
      const isCurrent = index === currentStepIndex;
      const isBeforeCurrent = index < currentStepIndex;

      // Circle styles
      let circleBackgroundColor = inactiveBackgroundColor;
      let circleBorderColor = inactiveBorderColor;
      let circleContent = `${index + 1}`;
      if (isCompleted) {
        circleBackgroundColor = color;
        circleBorderColor = color;
        circleContent = "✔";
      } else if (isBeforeCurrent) {
        circleBackgroundColor = inactiveBackgroundColor;
        circleBorderColor = color; // Updated to set the border color to the primary color for stages less than currentStage but not completed
      }
      if (isCurrent) {
        circleBorderColor = color;
      }

      // Circle element
      const circleElement = `<div style="background-color:${circleBackgroundColor};border:1px solid ${circleBorderColor};width:30px;height:30px;border-radius:50%;display:flex;justify-content:center;align-items:center;color:${textColor};font-weight:bold;font-size:16px;">${circleContent}</div>`;

      // Connector element (if not the last step)
      const connectorElement =
        index < stepsArray.length - 1
          ? `<div style="flex:1;height:1px;background-color:${index < currentStepIndex ? connectorActiveColor : connectorInactiveColor};"></div>`
          : "";

      return circleElement + connectorElement;
    })
    .join("")}</div>`;

  // Return the generated minified HTML
  return progressBarHtml.trim();
};