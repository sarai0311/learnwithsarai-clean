import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimezoneSelectorProps {
  value: string;
  onValueChange: (timezone: string) => void;
  className?: string;
}

const COMMON_TIMEZONES = [
  // North America
  { value: 'Pacific/Honolulu', label: 'Hawaii (HST)', region: 'North America', offset: 'UTC-10' },
  { value: 'America/Anchorage', label: 'Alaska (AKST)', region: 'North America', offset: 'UTC-9' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PST)', region: 'North America', offset: 'UTC-8' },
  { value: 'America/Denver', label: 'Mountain Time (MST)', region: 'North America', offset: 'UTC-7' },
  { value: 'America/Chicago', label: 'Central Time (CST)', region: 'North America', offset: 'UTC-6' },
  { value: 'America/New_York', label: 'Eastern Time (EST)', region: 'North America', offset: 'UTC-5' },
  { value: 'America/Halifax', label: 'Atlantic Time (AST)', region: 'North America', offset: 'UTC-4' },
  
  // South America
  { value: 'America/Sao_Paulo', label: 'Brazil Time (BRT)', region: 'South America', offset: 'UTC-3' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Argentina Time (ART)', region: 'South America', offset: 'UTC-3' },
  
  // Europe
  { value: 'Atlantic/Azores', label: 'Azores Time (AZOT)', region: 'Europe', offset: 'UTC-1' },
  { value: 'Europe/London', label: 'London Time (GMT)', region: 'Europe', offset: 'UTC+0' },
  { value: 'Atlantic/Canary', label: 'Canary Islands Time (WET)', region: 'Europe', offset: 'UTC+0' },
  { value: 'Europe/Madrid', label: 'Central European Time (CET)', region: 'Europe', offset: 'UTC+1' },
  { value: 'Europe/Rome', label: 'Central European Time (CET)', region: 'Europe', offset: 'UTC+1' },
  { value: 'Europe/Cairo', label: 'Cairo Time (EET)', region: 'Europe', offset: 'UTC+2' },
  { value: 'Europe/Moscow', label: 'Moscow Time (MSK)', region: 'Europe', offset: 'UTC+3' },
  
  // Asia
  { value: 'Asia/Dubai', label: 'Gulf Time (GST)', region: 'Asia', offset: 'UTC+4' },
  { value: 'Asia/Karachi', label: 'Pakistan Time (PKT)', region: 'Asia', offset: 'UTC+5' },
  { value: 'Asia/Kolkata', label: 'India Time (IST)', region: 'Asia', offset: 'UTC+5:30' },
  { value: 'Asia/Dhaka', label: 'Bangladesh Time (BST)', region: 'Asia', offset: 'UTC+6' },
  { value: 'Asia/Bangkok', label: 'Thailand Time (ICT)', region: 'Asia', offset: 'UTC+7' },
  { value: 'Asia/Shanghai', label: 'China Time (CST)', region: 'Asia', offset: 'UTC+8' },
  { value: 'Asia/Tokyo', label: 'Japan Time (JST)', region: 'Asia', offset: 'UTC+9' },
  
  // Oceania
  { value: 'Australia/Sydney', label: 'Sydney Time (AEDT)', region: 'Oceania', offset: 'UTC+11' },
  { value: 'Pacific/Auckland', label: 'New Zealand Time (NZDT)', region: 'Oceania', offset: 'UTC+13' },
];

// Get current time in timezone for display
const getCurrentTimeInTimezone = (timezone: string): string => {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return formatter.format(now);
  } catch {
    return '';
  }
};

const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({ 
  value, 
  onValueChange, 
  className = "" 
}) => {
  const { t } = useLanguage();
  
  // Group timezones by region
  const timezonesByRegion = COMMON_TIMEZONES.reduce((acc, tz) => {
    if (!acc[tz.region]) {
      acc[tz.region] = [];
    }
    acc[tz.region].push(tz);
    return acc;
  }, {} as Record<string, typeof COMMON_TIMEZONES>);

  const selectedTimezone = COMMON_TIMEZONES.find(tz => tz.value === value);
  const currentTime = getCurrentTimeInTimezone(value);

  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-sarai-primary" />
            <SelectValue placeholder="Select your timezone">
              {selectedTimezone && (
                <div className="flex items-center gap-2">
                  <span>{selectedTimezone.label}</span>
                  {currentTime && (
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {currentTime}
                    </span>
                  )}
                </div>
              )}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {Object.entries(timezonesByRegion).map(([region, timezones]) => (
            <div key={region}>
              <div className="px-2 py-1.5 text-sm font-medium text-gray-500 bg-gray-50">
                {region}
              </div>
              {timezones.map((timezone) => {
                const currentTimeInTz = getCurrentTimeInTimezone(timezone.value);
                return (
                  <SelectItem 
                    key={timezone.value} 
                    value={timezone.value}
                    className="pl-4 pr-8"
                  >
                    <div className="flex items-center justify-between w-full mr-6">
                      <div className="flex flex-col flex-1">
                        <span className="font-medium">{timezone.label}</span>
                        <span className="text-xs text-gray-500">{timezone.offset}</span>
                      </div>
                      {currentTimeInTz && (
                        <span className="text-xs text-gray-500 flex items-center gap-1 ml-2 shrink-0">
                          <Clock className="h-3 w-3" />
                          {currentTimeInTz}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </div>
          ))}
        </SelectContent>
      </Select>
      
      {selectedTimezone && currentTime && (
        <div className="mt-2 text-sm text-gray-600 flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>Current time in {selectedTimezone.label}: {currentTime}</span>
        </div>
      )}
    </div>
  );
};

export default TimezoneSelector;