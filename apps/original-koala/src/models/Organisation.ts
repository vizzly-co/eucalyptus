export type Id = "A" | "B";

// Some very odd logic to consistently determine what organisation
// the user is a member of.
export const getOrganisationId = (userId: string): Id => {
  const firstLetter = userId[0];

  if(firstLetter > 'J') {
    return 'A';
  } else {
    return 'B';
  };
};