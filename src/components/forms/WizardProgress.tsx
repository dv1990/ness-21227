import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const WizardProgress: React.FC<WizardProgressProps> = ({
  currentStep,
  totalSteps,
  stepLabels
}) => {
  return (
    <div className="mb-8" role="navigation" aria-label="Form progress">
      {/* Progress Bars */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => {
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          
          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                  isCompleted || isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Step ${stepNumber}: ${stepLabels[stepNumber - 1]}${isCompleted ? ' - Completed' : ''}${isCurrent ? ' - Current' : ''}`}
              >
                {isCompleted ? <Check className="w-5 h-5" aria-hidden="true" /> : stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={cn(
                    "flex-1 h-1 mx-2 transition-all",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Step Labels */}
      <div className="flex justify-between max-w-2xl mx-auto mt-3 text-sm text-muted-foreground">
        {stepLabels.map((label, labelIndex) => (
          <span
            key={label}
            className={cn(
              "transition-colors",
              currentStep === labelIndex + 1 && "text-foreground font-medium"
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};
