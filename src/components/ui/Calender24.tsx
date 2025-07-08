import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function Calendar24({ value, onChange }: { value?: Date; onChange?: (date?: Date) => void }) {
    const [open, setOpen] = React.useState(false);

    const [time, setTime] = React.useState(() => {
        if (value) return value.toTimeString().slice(0, 8);
        return '10:30:00';
    });

    const handleDateChange = (date?: Date) => {
        if (!date) {
            onChange?.(undefined);
            return;
        }
        const [h, m, s] = time.split(':').map(Number);
        date.setHours(h, m, s || 0, 0);
        onChange?.(date);
        setOpen(false);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTime(newTime);
        if (value) {
            const [h, m, s] = newTime.split(':').map(Number);
            const newDate = new Date(value);
            newDate.setHours(h, m, s || 0, 0);
            onChange?.(newDate);
        }
    };

    React.useEffect(() => {
        if (value) setTime(value.toTimeString().slice(0, 8));
    }, [value]);

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" id="date-picker" className="w-32 justify-between font-normal">
                            {value ? value.toLocaleDateString() : 'Select date'}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar mode="single" selected={value} captionLayout="dropdown" onSelect={handleDateChange} />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    value={time}
                    onChange={handleTimeChange}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    );
}
