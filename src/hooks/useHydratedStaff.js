/**
 * useHydratedStaff - Local-only context reader
 * Reads staff and company context from localStorage
 * No derivation, no fallbacks - just reads what's there
 * Mirrors useHydratedAthlete pattern from gofastfrontend-mvp1
 */
export default function useHydratedStaff() {
  // Read staff data
  const staffStr = localStorage.getItem('gfcompany_staff');
  const staff = staffStr ? JSON.parse(staffStr) : null;
  const staffId = localStorage.getItem('gfcompany_staffId');
  const firebaseId = localStorage.getItem('gfcompany_firebaseId');
  const role = localStorage.getItem('gfcompany_role');
  
  // Read company data
  const companyStr = localStorage.getItem('gfcompany_company');
  const company = companyStr ? JSON.parse(companyStr) : null;
  const companyId = localStorage.getItem('gfcompany_companyId');
  const containerId = localStorage.getItem('gfcompany_containerId');
  
  // Read company HQ (legacy key)
  const companyHQStr = localStorage.getItem('gfcompany_companyHQ');
  const companyHQ = companyHQStr ? JSON.parse(companyHQStr) : null;
  const companyHQId = localStorage.getItem('gfcompany_companyHQId');

  return {
    staff,
    staffId,
    firebaseId,
    role,
    company: company || companyHQ, // Use company or fallback to companyHQ
    companyId: companyId || companyHQId,
    containerId
  };
}

