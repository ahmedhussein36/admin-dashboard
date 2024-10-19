"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import {
    addDays,
    format,
    startOfDay,
    startOfWeek,
    startOfMonth,
    startOfYear,
    subDays,
} from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: subDays(new Date(), 30),
        to: new Date(),
    });
    const [isOpen, setIsOpen] = React.useState(false);

    const presets = [
        {
            label: "Today",
            value: { from: startOfDay(new Date()), to: new Date() },
        },
        {
            label: "Last 7 days",
            value: { from: subDays(new Date(), 7), to: new Date() },
        },
        {
            label: "Last 30 days",
            value: { from: subDays(new Date(), 30), to: new Date() },
        },
        {
            label: "This year",
            value: { from: startOfYear(new Date()), to: new Date() },
        },
    ];

    const handleApply = () => {
        setIsOpen(false);
        // Here you can add any additional logic you want to execute when the date range is applied
    };

    return (
        <div className={cn("grid gap-2 ", className)}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[230px] h-12 justify-start text-left font-medium text-base",
                            "border-gray-500"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 text-purple-500" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3 space-y-3 md:space-y-0 md:space-x-3 md:flex md:flex-row">
                        {presets.map((preset) => (
                            <Button
                                key={preset.label}
                                onClick={() => setDate(preset.value)}
                                variant="outline"
                                className="w-full md:w-auto justify-start text-left font-normal border-purple-200 hover:bg-purple-100 hover:text-purple-900"
                            >
                                {preset.label}
                            </Button>
                        ))}
                    </div>
                    <div className="border-t border-purple-200" />
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        className="[&_.rdp-day_button:hover:not(\\[disabled\\])]:bg-purple-100 [&_.rdp-day_button[aria-selected='true']]:bg-purple-900 [&_.rdp-day_button[aria-selected='true']]:text-primary-foreground [&_.rdp-day_button[aria-selected='true']:hover]:bg-purple-700"
                    />
                    <div className="p-3 border-t border-purple-200">
                        <Button
                            onClick={handleApply}
                            className="w-full bg-purple-800 hover:bg-purple-700 text-white"
                        >
                            Apply
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
