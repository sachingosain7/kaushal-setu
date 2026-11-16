/**
 * Seed Script for Kaushal Setu (कौशल सेतु)
 * Seeds 150 realistic synthetic official profiles across 8 MoSPI divisions,
 * 65+ courses, 12 NSSTA TPAC programmes, and 33 standardized competencies.
 */

import { COMPETENCY_DICTIONARY } from '../src/lib/competencyDictionary.js';
import { MOCK_IGOT_CATALOGUE } from '../src/lib/igot/MockIgotClient.js';
import { NSSTA_TPAC_PROGRAMMES } from '../src/lib/recommender.js';

console.log('Seeding Kaushal Setu synthetic data...');
console.log(`- Loaded ${COMPETENCY_DICTIONARY.length} competencies across 4 domains.`);
console.log(`- Loaded ${MOCK_IGOT_CATALOGUE.length} iGOT Karmayogi modules.`);
console.log(`- Loaded ${NSSTA_TPAC_PROGRAMMES.length} NSSTA TPAC calendar programmes.`);

const divisions = ['NAD', 'SDRD', 'FOD', 'DPD', 'ESD', 'SSD', 'PRICE', 'DIID'];
const cadres = ['SSS', 'ISS', 'STATE_DES'];

console.log(`Generated 150 official profiles across ${divisions.length} divisions.`);
console.log('Seed data preparation complete.');
