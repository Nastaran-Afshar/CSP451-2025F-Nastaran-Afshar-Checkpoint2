// Client-side auth helpers (feature/user-authentication)
export function validateEmail(email){ return /.+@.+/.test(email); }
export async function login(email, password){
const res = await fetch('/auth/login', {
method: 'POST', headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password })
});
if(!res.ok) throw new Error(`Login failed: ${res.status}`);
return res.json();
}