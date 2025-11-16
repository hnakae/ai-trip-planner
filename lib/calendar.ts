// lib/calendar.ts
import * as ics from "ics";
import { DailyPlan, Place } from "./types";

// Manually define the EventAttributes type as @types/ics is not available
type EventAttributes = {
  title: string;
  start: ics.DateArray;
  duration: { hours: number };
  description?: string;
  location?: string;
};

function addTimeToDate(date: Date, hours: number): ics.DateArray {
  const newDate = new Date(date);
  newDate.setUTCHours(hours);
  return [
    newDate.getUTCFullYear(),
    newDate.getUTCMonth() + 1,
    newDate.getUTCDate(),
    newDate.getUTCHours(),
    0,
  ];
}

function createEvent(
  date: Date,
  hours: number,
  title: string,
  place: Place | null | undefined
): EventAttributes | null {
  if (!place) return null;

  return {
    title: `${title}: ${place.name}`,
    start: addTimeToDate(date, hours),
    duration: { hours: 1 },
    location: place.address,
    description: place.notes,
  };
}

export function createIcsString(plan: DailyPlan[]): string | null {
  const events: EventAttributes[] = [];

  plan.forEach((day) => {
    const dayDate = new Date(day.date);

    const breakfastEvent = createEvent(dayDate, 9, "Breakfast", day.breakfast);
    const lunchEvent = createEvent(dayDate, 13, "Lunch", day.lunch);
    const dinnerEvent = createEvent(dayDate, 19, "Dinner", day.dinner);
    const activityEvent = createEvent(dayDate, 15, "Activity", day.activity);
    const sweetsEvent = createEvent(dayDate, 17, "Sweets", day.sweets);

    if (breakfastEvent) events.push(breakfastEvent);
    if (lunchEvent) events.push(lunchEvent);
    if (dinnerEvent) events.push(dinnerEvent);
    if (activityEvent) events.push(activityEvent);
    if (sweetsEvent) events.push(sweetsEvent);
  });

  if (events.length === 0) {
    return null;
  }

  const { error, value } = ics.createEvents(events);

  if (error) {
    console.error("Failed to create ICS file:", error);
    return null;
  }

  return value || null;
}
