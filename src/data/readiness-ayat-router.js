/**
 * Readiness Ayat Router
 * Central registry mapping readinessAyatKey → ayat matrix.
 * Each key corresponds to a pillar or module readiness data file.
 *
 * Usage:
 *   import { lookupReadinessAyahByKey } from './readiness-ayat-router';
 *   const ayah = lookupReadinessAyahByKey('faith', '100010');
 */

import { READINESS_AYAT_FAITH }        from './faith-readiness-ayat';
import { READINESS_AYAT_LIFE }         from './life-readiness-ayat';
import { READINESS_AYAT_INTELLECT }    from './intellect-readiness-ayat';
import { READINESS_AYAT_PEOPLE }       from './people-readiness-ayat';
import { READINESS_AYAT_WEALTH }       from './wealth-readiness-ayat';
import { READINESS_AYAT_ENVIRONMENT }  from './environment-readiness-ayat';

// Legacy / backward-compat registries (OGDEN-era modules still in use)
import { READINESS_AYAT_WORK }         from './work-readiness-ayat';
import { READINESS_AYAT_COMMUNITY }    from './community-readiness-ayat';
import { READINESS_AYAT_FAMILY }       from './family-readiness-ayat';
import { READINESS_AYAT_SPIRITUALITY } from './spirituality-readiness-ayat';
import { READINESS_AYAT_REST }         from './rest-readiness-ayat';
import { READINESS_AYAT_LEARNING }     from './learning-readiness-ayat';

const REGISTRIES = {
  // Maqasid pillar registries (new)
  faith:       READINESS_AYAT_FAITH,
  life:        READINESS_AYAT_LIFE,
  intellect:   READINESS_AYAT_INTELLECT,
  people:      READINESS_AYAT_PEOPLE,
  wealth:      READINESS_AYAT_WEALTH,
  environment: READINESS_AYAT_ENVIRONMENT,

  // Legacy / OGDEN-era module registries (backward compat)
  work:         READINESS_AYAT_WORK,
  community:    READINESS_AYAT_COMMUNITY,
  family:       READINESS_AYAT_FAMILY,
  spirituality: READINESS_AYAT_SPIRITUALITY,
  rest:         READINESS_AYAT_REST,
  learning:     READINESS_AYAT_LEARNING,
};

/**
 * Look up an ayah from the correct registry by readinessAyatKey and 6-bit binary key.
 * Returns null if the key is '111111' (all YES), the registry is unknown, or no entry found.
 *
 * @param {string} readinessAyatKey - e.g. 'faith', 'life', 'wealth', 'work'
 * @param {string} binaryKey - 6-character binary string e.g. '100010'
 * @returns {object|null}
 */
export function lookupReadinessAyahByKey(readinessAyatKey, binaryKey) {
  if (!readinessAyatKey || binaryKey === '111111') return null;
  const registry = REGISTRIES[readinessAyatKey];
  if (!registry) return null;
  return registry[binaryKey] || null;
}
