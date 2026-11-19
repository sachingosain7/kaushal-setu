const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const db = new DatabaseSync(path.join(__dirname, '..', 'dev.db'));

// Add Ali Sayam and Shanu Kumar to users table
const insertUser = db.prepare(`
  INSERT OR REPLACE INTO users (id, email, name, designation, cadre, division, role, experience_years, qualification, learning_hours, streak_days, badges_count, avatar_url)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

insertUser.run(
  'user-ali-sayam',
  'ali.sayam@nic.in',
  'Ali Sayam',
  'Statistical Officer (Data Engineering & Pipeline)',
  'SSS',
  'DIID',
  'LEARNER',
  4,
  'B.Tech Computer Science & Statistics',
  46.5,
  11,
  8,
  'https://ui-avatars.com/api/?name=Ali+Sayam&background=0F8B6D&color=FFFFFF'
);

insertUser.run(
  'user-shanu-kumar',
  'shanu.kumar@nic.in',
  'Shanu Kumar',
  'Junior Statistical Officer (Field Enumeration & CAPI)',
  'SSS',
  'FOD',
  'LEARNER',
  3,
  'B.Tech Computer Science & Informatics',
  38.0,
  9,
  7,
  'https://ui-avatars.com/api/?name=Shanu+Kumar&background=E4572E&color=FFFFFF'
);

// Add scores for Ali Sayam and Shanu Kumar
const insertScore = db.prepare(`
  INSERT OR REPLACE INTO user_scores (user_id, competency_id, current_level, confidence, assessed_via, last_assessed_at)
  VALUES (?, ?, ?, ?, ?, datetime('now'))
`);

const competencies = db.prepare("SELECT id FROM competencies LIMIT 6").all();

for (const c of competencies) {
  insertScore.run('user-ali-sayam', c.id, 4, 0.90, 'DIAGNOSTIC');
  insertScore.run('user-shanu-kumar', c.id, 3, 0.85, 'DIAGNOSTIC');
}

console.log('Successfully seeded Ali Sayam and Shanu Kumar into dev.db users table.');
