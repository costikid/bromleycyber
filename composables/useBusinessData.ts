export const useBusinessData = () => {
  const businessData = {
    name: "Bromley Cyber",
    founder: "Costanza Casullo",
    description: "Website security for small businesses in Bromley — I help small business owners protect their websites from common vulnerabilities and hacks. Your site won't just look good — it'll stay online, up to date, and protected from the latest threats.",
    url: "https://bromleycyber.co.uk",
    telephone: "+44 7737163885",
    email: "costanza@bromleywebworks.co.uk",
    address: {
      streetAddress: "3 Fairmead",
      addressLocality: "Bromley",
      addressRegion: "Kent",
      postalCode: "BR1 2JT",
      addressCountry: "GB"
    },
    sameAs: ["https://linkedin.com/in/costanza-casullo"],
    openingHours: ["Mo-Fr 09:00-17:00"],
    priceRange: "££",
    geo: {
      latitude: 51.406,
      longitude: 0.013
    }
  }

  const securityAuditService = {
    name: "Website Security Audit",
    description: "Comprehensive evaluation of your website's security posture, identifying vulnerabilities and providing actionable solutions to protect your online presence.",
    provider: {
      name: "Bromley Cyber",
      url: "https://bromleycyber.co.uk"
    },
    areaServed: [
      { name: "Bromley" },
      { name: "London" },
      { name: "Kent" }
    ]
  }

  const webDevService = {
    name: "Secure Website Development",
    description: "Building new websites with security as a foundation, not an afterthought. Our secure development process ensures your website is protected against common vulnerabilities from day one.",
    provider: {
      name: "Bromley Cyber",
      url: "https://bromleycyber.co.uk"
    },
    areaServed: [
      { name: "Bromley" },
      { name: "London" },
      { name: "Kent" }
    ]
  }

  return {
    businessData,
    securityAuditService,
    webDevService
  }
}
