const assert = require('assert');
const Portfolio = require('../models/Portfolio');

const doc = new Portfolio({
  userSlug: 'pipeline-test',
  personalInfo: { fullName: 'Test User', role: 'Dev', bio: 'Bio' },
  projects: [],
  education: [],
  skills: ['React', 'Node.js'],
  socials: { github: 'https://github.com/test', email: 'test@example.com' }
});

const plain = doc.toObject();
assert.deepStrictEqual(plain.skills, ['React', 'Node.js']);
assert.deepStrictEqual(plain.socials, {
  github: 'https://github.com/test',
  linkedin: '',
  email: 'test@example.com',
  _id: plain.socials._id
});
console.log('portfolio-pipeline test passed');
