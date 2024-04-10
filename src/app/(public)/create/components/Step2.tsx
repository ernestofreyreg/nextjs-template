import { FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormActionsProps,
  ScheduleFormValues,
} from "@/app/(public)/create/components/schemas";
import { FormFrame } from "@/app/(public)/create/components/FormFrame";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Step2Props = {} & FormActionsProps;

export const Step2: FC<Step2Props> = (props) => {
  const form = useFormContext<ScheduleFormValues>();

  return (
    <FormFrame
      title="Let's create a new schedule"
      subTitle="In how many shifts will the work day be divided?"
      currentStep={2}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-between">
        <div className="flex flex-col gap-2 p-3 bg-gray-50">
          <FormField
            control={form.control}
            name="shifts"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Every day will have:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="1" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        1 Daily shift
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        2 Daily shifts
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="3" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        3 Shifts per day
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </FormFrame>
  );
};
