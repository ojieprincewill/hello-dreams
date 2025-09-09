// Currency utilities for USD ⇄ NGN conversion and formatting
// - Caches exchange rate in localStorage to reduce network calls
// - Falls back to a safe default if the network is unavailable

const LOCAL_STORAGE_KEY = "usd_ngn_rate_cache_v1";

/**
 * Retrieve USD→NGN rate.
 * Uses exchangerate.host (no API key required). Caches in localStorage.
 *
 * @param {Object} options
 * @param {number} [options.cacheTtlMs=43200000] - Cache TTL in ms (default 12h)
 * @param {number} [options.fallbackRate=1500] - Fallback rate if network fails
 * @returns {Promise<number>} USD→NGN rate
 */
export async function getUsdToNgnRate({ cacheTtlMs = 12 * 60 * 60 * 1000, fallbackRate = 1500 } = {}) {
  try {
    // Try cache first
    const cachedRaw = typeof window !== "undefined" ? window.localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    if (cachedRaw) {
      try {
        const cached = JSON.parse(cachedRaw);
        if (cached && typeof cached.rate === "number" && typeof cached.timestamp === "number") {
          const isFresh = Date.now() - cached.timestamp < cacheTtlMs;
          if (isFresh && cached.rate > 0) {
            return cached.rate;
          }
        }
      } catch (_) {
        // ignore corrupt cache
      }
    }

    // Fetch live rate
    const response = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=NGN", { cache: "no-store" });
    if (!response.ok) throw new Error(`Exchange API error: ${response.status}`);
    const data = await response.json();
    const rate = data && data.rates && typeof data.rates.NGN === "number" ? data.rates.NGN : undefined;
    if (!rate || rate <= 0) throw new Error("Invalid NGN rate from API");

    // Update cache
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ rate, timestamp: Date.now() })
        );
      }
    } catch (_) {
      // ignore storage errors (quota, privacy modes, etc.)
    }

    return rate;
  } catch (_) {
    // On any failure, try stale cache before final fallback
    try {
      const cachedRaw = typeof window !== "undefined" ? window.localStorage.getItem(LOCAL_STORAGE_KEY) : null;
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        if (cached && typeof cached.rate === "number" && cached.rate > 0) {
          return cached.rate;
        }
      }
    } catch (_) {
      // ignore
    }
    return fallbackRate;
  }
}

/**
 * Convert a USD amount to NGN using the current (or cached) rate.
 * @param {number} usdAmount
 * @param {Object} options - Same options as getUsdToNgnRate
 * @returns {Promise<number>} NGN amount (unformatted)
 */
export async function convertUsdToNgn(usdAmount, options) {
  const numericUsd = typeof usdAmount === "number" ? usdAmount : Number(usdAmount);
  if (!Number.isFinite(numericUsd)) return NaN;
  const rate = await getUsdToNgnRate(options);
  console.log(rate)
  return numericUsd * rate;
}

/**
 * Format a NGN amount as a currency string (e.g., ₦1,234.50).
 * @param {number} ngnAmount
 * @param {Intl.NumberFormatOptions} [formatOptions]
 * @returns {string}
 */
export function formatNgn(ngnAmount, formatOptions) {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
      ...(formatOptions || {}),
    }).format(ngnAmount);
  } catch (_) {
    // Fallback simple formatting
    const amount = Number(ngnAmount);
    if (!Number.isFinite(amount)) return "₦0";
    return `₦${amount.toLocaleString("en-NG", { maximumFractionDigits: 2 })}`;
  }
}

/**
 * Convenience helper: Convert USD to NGN and return a formatted string.
 * @param {number} usdAmount
 * @param {Object} options - Same options as getUsdToNgnRate
 * @param {Intl.NumberFormatOptions} [formatOptions]
 * @returns {Promise<string>}
 */
export async function convertAndFormatUsdToNgn(usdAmount, options, formatOptions) {
  const ngn = await convertUsdToNgn(usdAmount, options);
  return formatNgn(ngn, formatOptions);
}

export default {
  getUsdToNgnRate,
  convertUsdToNgn,
  formatNgn,
  convertAndFormatUsdToNgn,
};


