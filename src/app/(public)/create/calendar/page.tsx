"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  compareAsc,
  differenceInDays,
  getDaysInMonth,
  isPast,
  isToday,
} from "date-fns";
import { range } from "ramda";
import { clsx } from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const D = new Date();

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const colSpans = [
  "col-span-1",
  "col-span-2",
  "col-span-3",
  "col-span-4",
  "col-span-5",
  "col-span-6",
  "col-span-7",
];

export default function CalendarSchedulePage() {
  const days = useMemo<number[]>(() => {
    const daysMonth = getDaysInMonth(D);
    return range(1, daysMonth + 1);
  }, []);
  const [enabledDays, setEnabledDays] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const monthStart = useMemo(() => {
    const date = new Date(D.getFullYear(), D.getMonth(), 1);
    return date.getDay();
  }, []);

  const monthEnd = useMemo(() => {
    const date = new Date(D.getFullYear(), D.getMonth(), 1);
    date.setDate(getDaysInMonth(D));
    return date.getDay();
  }, []);

  const handlerEnableDay = useCallback(
    (dayIndex: number) => (value: boolean) => {
      const next = [...enabledDays];
      next[dayIndex] = value;
      setEnabledDays(next);
    },
    [enabledDays],
  );

  return (
    <div className="w-full h-full">
      <div className="p-4">
        <div className="grid grid-cols-7 relative">
          <div className="-z-10 absolute inset-0 pattern-diagonal-lines pattern-gray-500 pattern-bg-white pattern-size-2 pattern-opacity-20" />
          {weekDays.map((day, dayIndex) => (
            <div
              key={day}
              className={clsx(
                "bg-gray-100 h-10 flex flex-row gap-2 justify-center items-center font-semibold text-sm text-gray-500",
                "border-l border-l-gray-200 border-t border-t-gray-200",
                "border-b border-b-gray-200",
                dayIndex === 6 && "border-r border-r-gray-200",
              )}
            >
              <Checkbox
                id={day}
                checked={enabledDays[dayIndex]}
                onCheckedChange={handlerEnableDay(dayIndex)}
              />
              <Label htmlFor={day} className="cursor-pointer">
                {day}
              </Label>
            </div>
          ))}
          {monthStart > 0 && (
            <div
              className={clsx(
                "bg-white border-b border-b-gray-200 border-l border-l-gray-200",
                colSpans[monthStart - 1],
              )}
            />
          )}
          {days.map((day) => {
            const d = new Date(D.getFullYear(), D.getMonth(), day);
            const dayIndex = d.getDay();
            const isEnabled =
              enabledDays[dayIndex] && (!isPast(d) || isToday(d));

            if (!isEnabled) {
              return (
                <div
                  key={day}
                  className={clsx(
                    "h-32 flex flex-col border-l border-l-gray-200 border-b border-b-gray-200",
                    dayIndex === 6 && "border-r border-r-gray-200",
                  )}
                >
                  <div className="text-gray-500 px-2 py-1 text-sm font-normal">
                    {day}
                  </div>
                </div>
              );
            }
            return (
              <div
                key={day}
                className={clsx(
                  "bg-gray-100 h-32 flex flex-col",
                  "border-l border-l-gray-200",
                  "border-b border-b-gray-200",
                  dayIndex === 6 && "border-r border-r-gray-200",
                )}
              >
                <div className="bg-gray-500 text-white px-2 py-1 text-sm font-semibold">
                  {day}
                </div>
              </div>
            );
          })}
          {monthEnd < 6 && (
            <div
              className={clsx(
                "bg-white border-l border-l-gray-200 border-b border-b-gray-200 border-r border-r-gray-200",
                `col-span-${6 - monthEnd}`,
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
