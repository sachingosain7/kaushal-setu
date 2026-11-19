const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const db = new DatabaseSync(path.join(__dirname, '..', 'dev.db'));

console.log('=== 1. DATABASE TABLES IN dev.db ===');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log(tables.map(t => t.name).join(', '));

console.log('\n=== 2. USERS TABLE SCHEMA & ENTRIES ===');
const usersSchema = db.prepare("PRAGMA table_info(users)").all();
console.log('Columns:', usersSchema.map(c => `${c.name} (${c.type})`).join(', '));
const users = db.prepare("SELECT * FROM users").all();
console.log('Users count:', users.length);
console.log(JSON.stringify(users, null, 2));

console.log('\n=== 3. USER SCORES (COMPETENCY LEVELS) FOR FIRST USER ===');
if (users.length > 0) {
  const scores = db.prepare(`
    SELECT us.user_id, c.code, c.name, c.domain, us.current_level, us.confidence, us.assessed_via 
    FROM user_scores us
    JOIN competencies c ON us.competency_id = c.id
    WHERE us.user_id = ?
    LIMIT 10
  `).all(users[0].id);
  console.log(JSON.stringify(scores, null, 2));
}

console.log('\n=== 4. AUDIT LOGS FOR PROFILE & ASSESSMENTS ===');
const audits = db.prepare("SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 5").all();
console.log(JSON.stringify(audits, null, 2));
