import type { EventFormData, EventFormErrors } from "../types/campus-event";

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};
  
  if (data.title.trim().length < 3) errors.title = "En az 3 karakter olmalı.";
  if (data.category === "") errors.category = "Bir kategori seçin.";
  if (!data.date) errors.date = "Boş olamaz.";
  if (!data.time) errors.time = "Boş olamaz.";
  if (!data.location.trim()) errors.location = "Boş olamaz.";
  
  if (data.capacity !== "") {
    const cap = Number(data.capacity);
    if (!Number.isInteger(cap) || cap < 1 || cap > 1000) {
      errors.capacity = "1-1000 arası tam sayı.";
    }
  }
  
  if (data.description.trim().length > 0 && data.description.trim().length < 10) {
    errors.description = "En az 10 karakter.";
  }
  
  return errors;
}