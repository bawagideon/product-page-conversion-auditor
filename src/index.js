// Product Page CRO Auditor Engine
class ProductPageCROAuditor {
  auditPage(pageFeatures) {
    const {
      hasStickyAddToCart,
      hasCustomerReviewsAboveFold,
      hasTrustBadges,
      hasShippingGuarantee,
      mobileLoadSeconds,
      hasSocialProofPopups
    } = pageFeatures;

    let score = 100;
    const defects = [];

    if (!hasStickyAddToCart) {
      score -= 20;
      defects.push({ rule: 'STICKY_ATC_MISSING', penalty: 20, fix: 'Install persistent floating Add-to-Cart on mobile' });
    }
    if (!hasCustomerReviewsAboveFold) {
      score -= 15;
      defects.push({ rule: 'REVIEWS_BELOW_FOLD', penalty: 15, fix: 'Move star rating immediately beneath product title' });
    }
    if (!hasTrustBadges) {
      score -= 15;
      defects.push({ rule: 'TRUST_BADGES_MISSING', penalty: 15, fix: 'Display secure checkout & refund guarantee badges' });
    }
    if (!hasShippingGuarantee) {
      score -= 10;
      defects.push({ rule: 'SHIPPING_TRANSPARENCY_LACKING', penalty: 10, fix: 'State clear estimated arrival dates before checkout' });
    }
    if (mobileLoadSeconds > 3.0) {
      score -= 25;
      defects.push({ rule: 'MOBILE_LOAD_LAG', penalty: 25, fix: `Optimize images — current load time (${mobileLoadSeconds}s) exceeds 3.0s SLA` });
    }

    return {
      croScore: Math.max(0, score),
      status: score >= 80 ? 'EXCELLENT' : (score >= 60 ? 'NEEDS_WORK' : 'CRITICAL_LEAKS'),
      defectCount: defects.length,
      defects
    };
  }
}

module.exports = { ProductPageCROAuditor };
