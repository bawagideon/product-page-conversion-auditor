const test = require('node:test');
const assert = require('node:assert');
const { ProductPageCROAuditor } = require('../src/index.js');

test('ProductPageCROAuditor: gives 100 to fully optimized product page', () => {
  const auditor = new ProductPageCROAuditor();
  const res = auditor.auditPage({
    hasStickyAddToCart: true,
    hasCustomerReviewsAboveFold: true,
    hasTrustBadges: true,
    hasShippingGuarantee: true,
    mobileLoadSeconds: 1.8
  });
  assert.strictEqual(res.croScore, 100);
  assert.strictEqual(res.status, 'EXCELLENT');
  assert.strictEqual(res.defectCount, 0);
});

test('ProductPageCROAuditor: penalizes missing CTA and slow speed', () => {
  const auditor = new ProductPageCROAuditor();
  const res = auditor.auditPage({
    hasStickyAddToCart: false, // -20
    hasCustomerReviewsAboveFold: true,
    hasTrustBadges: false, // -15
    hasShippingGuarantee: true,
    mobileLoadSeconds: 4.5 // -25
  });
  assert.strictEqual(res.croScore, 40);
  assert.strictEqual(res.status, 'CRITICAL_LEAKS');
  assert.strictEqual(res.defectCount, 3);
});
