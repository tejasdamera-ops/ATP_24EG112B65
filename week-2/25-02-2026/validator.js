// 1. Validate task title (not empty, min 3 chars)
function validateTitle(title) {
  if (!title) 
    return false;
  if (title.length < 3) 
    return false;
  return true;
}

// 2. Validate priority (must be: low, medium, high)
function validatePriority(priority) {
  return priority === 'low' || 
         priority === 'medium' || 
         priority === 'high';
}

// 3. Validate due date (must be future date)
function validateDueDate(date) {
  const inputDate = new Date(date);
  const today = new Date();

if(inputDate> date)
  return true;

return false;
}

export { validateDueDate, validatePriority, validateTitle };