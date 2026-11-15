import React from 'react';

/**
 * CompanyLogo renders crisp, authentic vector brand logos for returnship partners.
 * Falls back gracefully to custom image URLs or stylized monograms.
 */
export default function CompanyLogo({
  company = '',
  logo = '',
  size = 'md', // 'sm' (32px), 'md' (48px), 'lg' (56px)
  className = '',
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-xl text-xs',
    md: 'w-12 h-12 rounded-2xl text-sm',
    lg: 'w-14 h-14 rounded-2xl text-base',
  };

  const containerSize = sizeClasses[size] || sizeClasses.md;
  const normalizedCompany = (company || '').toLowerCase().trim();

  // 1. Direct Image URL provided
  if (logo && (logo.startsWith('http') || logo.startsWith('/') || logo.startsWith('data:'))) {
    return (
      <div
        className={`${containerSize} bg-white dark:bg-[#18132C] border border-purple-100 dark:border-purple-800/40 p-1.5 flex items-center justify-center shadow-xs shrink-0 overflow-hidden ${className}`}
      >
        <img
          src={logo}
          alt={`${company} logo`}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    );
  }

  // 2. Microsoft Leap / Microsoft
  if (normalizedCompany.includes('microsoft')) {
    return (
      <div
        className={`${containerSize} bg-white dark:bg-[#1E1838] border border-slate-200 dark:border-purple-800/60 p-2 flex items-center justify-center shadow-xs shrink-0 ${className}`}
        title="Microsoft"
      >
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
          <rect x="2" y="2" width="9.2" height="9.2" fill="#F25022" rx="0.75" />
          <rect x="12.8" y="2" width="9.2" height="9.2" fill="#7FBA00" rx="0.75" />
          <rect x="2" y="12.8" width="9.2" height="9.2" fill="#00A4EF" rx="0.75" />
          <rect x="12.8" y="12.8" width="9.2" height="9.2" fill="#FFB900" rx="0.75" />
        </svg>
      </div>
    );
  }

  // 3. Target Elevate / Target
  if (normalizedCompany.includes('target')) {
    return (
      <div
        className={`${containerSize} bg-white dark:bg-[#1E1838] border border-slate-200 dark:border-purple-800/60 p-1.5 flex items-center justify-center shadow-xs shrink-0 ${className}`}
        title="Target"
      >
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
          <circle cx="12" cy="12" r="10" fill="#CC0000" />
          <circle cx="12" cy="12" r="6.6" fill="#FFFFFF" />
          <circle cx="12" cy="12" r="3.3" fill="#CC0000" />
        </svg>
      </div>
    );
  }

  // 4. Deloitte Encore / Deloitte
  if (normalizedCompany.includes('deloitte')) {
    return (
      <div
        className={`${containerSize} bg-[#0A0A0A] border border-slate-800 p-1.5 flex items-center justify-center shadow-xs shrink-0 ${className}`}
        title="Deloitte"
      >
        <svg viewBox="0 0 44 24" className="w-full h-full" fill="none">
          <text
            x="2"
            y="17"
            fill="#FFFFFF"
            fontSize="11"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.5px"
          >
            Deloitte
          </text>
          <circle cx="41" cy="16" r="2" fill="#86BC25" />
        </svg>
      </div>
    );
  }

  // 5. Intuit Again / Intuit
  if (normalizedCompany.includes('intuit')) {
    return (
      <div
        className={`${containerSize} bg-[#0077C5] border border-blue-400/40 p-1.5 flex items-center justify-center shadow-xs shrink-0 ${className}`}
        title="Intuit"
      >
        <svg viewBox="0 0 40 24" className="w-full h-full" fill="none">
          <text
            x="20"
            y="17"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.5px"
          >
            intuit
          </text>
        </svg>
      </div>
    );
  }

  // 6. Razorpay
  if (normalizedCompany.includes('razorpay')) {
    return (
      <div
        className={`${containerSize} bg-[#0A1931] border border-blue-900/60 p-2 flex items-center justify-center shadow-xs shrink-0 ${className}`}
        title="Razorpay"
      >
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
          <path
            d="M13.8 2.5L4.5 13.8H11.2L9.2 21.5L19.5 10.2H12.8L13.8 2.5Z"
            fill="#3395FF"
          />
          <path
            d="M12.2 2.5L5.8 13.8H11.2L9.8 19.5L16.2 10.2H11.5L12.2 2.5Z"
            fill="#0C2340"
            opacity="0.25"
          />
        </svg>
      </div>
    );
  }

  // 7. Infosys Restart / Infosys
  if (normalizedCompany.includes('infosys')) {
    return (
      <div
        className={`${containerSize} bg-[#007CC3] border border-sky-400/40 p-1.5 flex items-center justify-center shadow-xs shrink-0 ${className}`}
        title="Infosys"
      >
        <svg viewBox="0 0 42 24" className="w-full h-full" fill="none">
          <text
            x="21"
            y="16.5"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="10.5"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.2px"
          >
            Infosys
          </text>
        </svg>
      </div>
    );
  }

  // 8. Google
  if (normalizedCompany.includes('google')) {
    return (
      <div
        className={`${containerSize} bg-white dark:bg-[#1E1838] border border-slate-200 dark:border-purple-800/60 p-2 flex items-center justify-center shadow-xs shrink-0 ${className}`}
        title="Google"
      >
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      </div>
    );
  }

  // 9. Amazon
  if (normalizedCompany.includes('amazon')) {
    return (
      <div
        className={`${containerSize} bg-[#131921] border border-slate-800 p-2 flex items-center justify-center shadow-xs shrink-0 ${className}`}
        title="Amazon"
      >
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
          <text
            x="12"
            y="13"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="8.5"
            fontWeight="900"
            fontFamily="system-ui, sans-serif"
          >
            amazon
          </text>
          <path
            d="M5 16C9 19.5 15 19.5 19 16"
            stroke="#FF9900"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M19 16L18 14M19 16L17 17" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 10. Fallback: Elegant Gradient Monogram
  const initials = company
    ? company
        .split(' ')
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'RB';

  return (
    <div
      className={`${containerSize} bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white font-extrabold flex items-center justify-center shadow-xs shrink-0 tracking-wider ${className}`}
      title={company}
    >
      {initials}
    </div>
  );
}
