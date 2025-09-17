// Simple DB adapter pattern (can switch to real DB later)
class Users {
constructor(seed=[]){ this.rows = [...seed]; }
all(){ return this.rows; }
byEmail(email){ return this.rows.find(u => u.email === email); }
add(user){ this.rows.push({ id: this.rows.length+1, ...user }); return this.rows.at(-1); }
}


const seedUsers = [{ id: 1, email: 'demo@example.com', password: 'pass123' }];
module.exports = { Users, seedUsers };