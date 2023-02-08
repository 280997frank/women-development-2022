const ContentSecurityPolicy = {
  "form-action": ["'self'"],
  "base-uri": ["'self'"],
  "report-uri": ["/api/csp-reports"],
  "frame-ancestors": ["'self'"],
  "manifest-src": ["'self'"],
  "prefetch-src": ["'self'"],
  "default-src": ["'self'"],
  "object-src": ["data:"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "https://www.google.com/recaptcha/",
    "https://www.gstatic.com/recaptcha/",
    "https://apis.google.com/js/api.js",
    "https://apis.google.com/_/scs/abc-static/_/js/",
    "https://www.googletagmanager.com/gtag/js",
    "https://www.google-analytics.com/analytics.js",
  ],
  "child-src": ["'self'"],
  "style-src": [
    "'self'",
    "'unsafe-inline'",
    "https://fonts.googleapis.com/css2",
  ],
  "font-src": ["'self'", "https://fonts.gstatic.com/s/montserrat/"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://www.google.com/images/cleardot.gif",
    `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/`,
    "https://www.google-analytics.com/j/collect",
    "https://www.google-analytics.com/collect",
    process.env.NEXT_PUBLIC_IMAGE_URL,
  ],
  "media-src": [
    "'self'",
    `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/`,
  ],
  "connect-src": [
    "'self'",
    "data:",
    "https://identitytoolkit.googleapis.com/v1/",
    "https://securetoken.googleapis.com/v1/token",
    `https://us-central1-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/`,
    `https://content-firebaseappcheck.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/apps/`,
    "https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel",
    "https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel",
    `https://firebaseinstallations.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/installations/`,
    `https://fcmregistrations.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/registrations`,
    `https://fcmregistrations.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/registrations/`,
    `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o`,
    `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/`,
    "https://www.google-analytics.com/j/collect",
    "https://www.google-analytics.com/collect",
    // "ws://4423-180-244-165-11.ngrok.io",
  ],
  "worker-src": ["'self'"],
  "frame-src": [
    "'self'",
    "https://www.google.com/recaptcha/",
    "https://recaptcha.google.com/recaptcha/",
    "https://www.youtube.com/",
    `https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}/__/auth/iframe`,
    "https://firebasestorage.googleapis.com/",
  ],
};

if (process.env.NODE_ENV === "production") {
  ContentSecurityPolicy["upgrade-insecure-requests"] = [];
} else {
  ContentSecurityPolicy["script-src"].push("'unsafe-eval'");
  ContentSecurityPolicy["connect-src"].push(
    `http://localhost:5001/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/us-central1/`
  );
  ContentSecurityPolicy["connect-src"].push(
    `ws://localhost:3000/_next/webpack-hmr`
  );
  /* ContentSecurityPolicy["connect-src"].push(
    `ws://7ff1-180-244-161-231.ngrok.io/_next/webpack-hmr`
  ); */
}

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: Object.entries(ContentSecurityPolicy)
      .map(([key, value]) => {
        return `${key} ${value.join(" ")};`;
      })
      .join(" ")
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "autoplay=*,fullscreen=*",
  },
  {
    key: "Cross-Origin-Embedder-Policy",
    value: "unsafe-none",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "cross-origin",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "cross-origin",
  },
  {
    key: "Expect-CT",
    value: "max-age=86400",
  },
];

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  reactStrictMode: true,
  generateEtags: false,
  poweredByHeader: false,
};
