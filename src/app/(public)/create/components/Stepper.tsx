import { FC } from "react";
import { clsx } from "clsx";
import { BsCheck } from "react-icons/bs";

export interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper: FC<StepperProps> = ({ steps, currentStep }) => (
  <ul className="relative flex flex-row gap-x-2 justify-center">
    {steps.map((step, index) => (
      <li key={step} className="shrink basis-0 flex-1 group">
        <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
          <span
            className={clsx(
              "size-7 flex justify-center items-center flex-shrink-0 font-medium rounded-full",
              currentStep === index + 1 &&
                "bg-gray-100 text-gray-800 border-2 border-gray-800",
              currentStep < index + 1 && "bg-gray-100 text-gray-800",
              currentStep > index + 1 && "bg-green-500 text-white",
            )}
          >
            {index + 1 >= currentStep ? index + 1 : <BsCheck />}
          </span>
          <div
            className={clsx(
              "ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden",
              currentStep > index + 1 && "bg-green-500",
            )}
          />
        </div>
        <div className="mt-3">
          <span className="block text-sm font-medium text-gray-800">
            {step}
          </span>
        </div>
      </li>
    ))}
  </ul>
);
