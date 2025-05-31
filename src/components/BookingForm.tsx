
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CalendarIcon, Clock, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  onClose: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Available time slots (these would come from admin calendar)
  const availableTimeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const sessionTopics = [
    'Market Analysis & Strategy',
    'Risk Management',
    'Technical Analysis',
    'Trading Psychology', 
    'Portfolio Review',
    'Custom Strategy Development'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    console.log({ selectedDate, selectedTime, topic, description });
    onClose();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Schedule Your 1-on-1 Session</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="space-y-2">
              <Label>Available Times</Label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className={selectedTime === time ? "bg-yellow-500 text-black hover:bg-yellow-600" : ""}
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Topic Selection */}
          <div className="space-y-2">
            <Label htmlFor="topic">Session Topic</Label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select a topic</option>
              {sessionTopics.map((topicOption) => (
                <option key={topicOption} value={topicOption}>
                  {topicOption}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Additional Notes (Optional)</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any specific questions or topics you'd like to discuss..."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={!selectedDate || !selectedTime || !topic}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              Book Session
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
