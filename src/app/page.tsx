import Button from '@/components/Button';
import Card, { CardBody, CardHeader } from '@/components/Card';
import { getFeatureFlags } from '@/lib/features';
import { markAsVerified, markAsStaging } from '@/lib/content-verification';

/**
 * Homepage
 * Technical Foundation — Package 1
 */
export default function Home() {
  const flags = getFeatureFlags();

  // Sample content with verification
  const heroContent = markAsVerified(
    {
      title: 'Professional Cleaning & Garden Care',
      subtitle: 'Trusted by businesses and homeowners across London',
    },
    'claude-code',
    'Package 1: Technical Foundation',
  );

  const stagingMessage = markAsStaging(
    {
      text: 'SAMPLE — STAGING ONLY: This is a placeholder hero section for Package 1 implementation.',
    },
    'Demo content for staging environment',
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-3xl md:py-4xl">
        <div className="max-w-container mx-auto px-md">
          <div className="max-w-2xl">
            <h1 className="text-h1 mb-md">{heroContent.data.title}</h1>
            <p className="text-body-xl text-grey-light mb-lg">
              {heroContent.data.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-md">
              <Button variant="primary" size="lg">
                Get a Free Quote
              </Button>
              <Button variant="ghost" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Staging Notice */}
      <section className="bg-yellow-50 border-l-4 border-yellow-400 py-md px-md">
        <div className="max-w-container mx-auto">
          <p className="text-body text-yellow-800">
            <strong>Developer Notice:</strong> {stagingMessage.data.text}
          </p>
        </div>
      </section>

      {/* Feature Flags Status */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="text-h2 mb-lg text-center">Technical Status</h2>
          <Card variant="outlined">
            <CardBody>
              <h3 className="h4 mb-md">Feature Flags (All Default: False)</h3>
              <ul className="space-y-sm">
                <li className="flex items-start gap-md">
                  <span
                    className={`text-body font-semibold ${
                      flags.gardenServicesEnabled ? 'text-status-success' : 'text-grey-600'
                    }`}
                  >
                    {flags.gardenServicesEnabled ? '✓' : '○'}
                  </span>
                  <span className="text-body">gardenServicesEnabled</span>
                </li>
                <li className="flex items-start gap-md">
                  <span
                    className={`text-body font-semibold ${
                      flags.publicPricingEnabled ? 'text-status-success' : 'text-grey-600'
                    }`}
                  >
                    {flags.publicPricingEnabled ? '✓' : '○'}
                  </span>
                  <span className="text-body">publicPricingEnabled</span>
                </li>
                <li className="flex items-start gap-md">
                  <span
                    className={`text-body font-semibold ${
                      flags.onlinePaymentsEnabled ? 'text-status-success' : 'text-grey-600'
                    }`}
                  >
                    {flags.onlinePaymentsEnabled ? '✓' : '○'}
                  </span>
                  <span className="text-body">onlinePaymentsEnabled</span>
                </li>
                <li className="flex items-start gap-md">
                  <span
                    className={`text-body font-semibold ${
                      flags.testimonialsEnabled ? 'text-status-success' : 'text-grey-600'
                    }`}
                  >
                    {flags.testimonialsEnabled ? '✓' : '○'}
                  </span>
                  <span className="text-body">testimonialsEnabled</span>
                </li>
                <li className="flex items-start gap-md">
                  <span
                    className={`text-body font-semibold ${
                      flags.instantEstimateEnabled ? 'text-status-success' : 'text-grey-600'
                    }`}
                  >
                    {flags.instantEstimateEnabled ? '✓' : '○'}
                  </span>
                  <span className="text-body">instantEstimateEnabled</span>
                </li>
                <li className="flex items-start gap-md">
                  <span
                    className={`text-body font-semibold ${
                      flags.aiReceptionistEnabled ? 'text-status-success' : 'text-grey-600'
                    }`}
                  >
                    {flags.aiReceptionistEnabled ? '✓' : '○'}
                  </span>
                  <span className="text-body">aiReceptionistEnabled</span>
                </li>
                <li className="flex items-start gap-md">
                  <span
                    className={`text-body font-semibold ${
                      flags.publicAddressEnabled ? 'text-status-success' : 'text-grey-600'
                    }`}
                  >
                    {flags.publicAddressEnabled ? '✓' : '○'}
                  </span>
                  <span className="text-body">publicAddressEnabled</span>
                </li>
                <li className="flex items-start gap-md">
                  <span
                    className={`text-body font-semibold ${
                      flags.dbsClaimsEnabled ? 'text-status-success' : 'text-grey-600'
                    }`}
                  >
                    {flags.dbsClaimsEnabled ? '✓' : '○'}
                  </span>
                  <span className="text-body">dbsClaimsEnabled</span>
                </li>
              </ul>
              <p className="text-body-sm text-grey-600 mt-lg">
                All feature flags are independent and default to false. Enable in .env.local
                as needed.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-3xl bg-grey-light">
        <div className="max-w-container mx-auto px-md">
          <h2 className="text-h2 mb-2xl text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {[
              {
                title: 'Commercial Cleaning',
                description: 'Professional office and commercial space cleaning.',
              },
              {
                title: 'Residential Cleaning',
                description: 'Thorough home cleaning tailored to your needs.',
              },
              {
                title: 'Specialist Services',
                description: 'End of tenancy, carpet, and deep cleaning.',
              },
            ].map((service, index) => (
              <Card key={index}>
                <CardBody>
                  <h3 className="h4 mb-md">{service.title}</h3>
                  <p className="text-body mb-lg">{service.description}</p>
                  <Button variant="secondary" size="sm">
                    Learn More
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Status */}
      <section className="py-3xl">
        <div className="max-w-container mx-auto px-md">
          <h2 className="text-h2 mb-lg text-center">Package 1 Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <Card>
              <CardHeader>
                <h3 className="h4">Framework & Setup</h3>
              </CardHeader>
              <CardBody>
                <ul className="space-y-sm text-body-sm">
                  <li>✓ Next.js 16.2+ with App Router</li>
                  <li>✓ React 19.x</li>
                  <li>✓ TypeScript 5.6+ (strict mode)</li>
                  <li>✓ Tailwind CSS 3.4+</li>
                  <li>✓ Design system tokens</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="h4">Components & Features</h3>
              </CardHeader>
              <CardBody>
                <ul className="space-y-sm text-body-sm">
                  <li>✓ Button component (3 variants, 3 sizes)</li>
                  <li>✓ Card component with subcomponents</li>
                  <li>✓ Header with mobile menu</li>
                  <li>✓ Footer (4-column responsive)</li>
                  <li>✓ Feature flags (8 independent)</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="h4">Security & Content</h3>
              </CardHeader>
              <CardBody>
                <ul className="space-y-sm text-body-sm">
                  <li>✓ CSRF protection</li>
                  <li>✓ Security headers</li>
                  <li>✓ Content verification system</li>
                  <li>✓ Environment variable management</li>
                  <li>✓ Input validation utilities</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="h4">Accessibility & Performance</h3>
              </CardHeader>
              <CardBody>
                <ul className="space-y-sm text-body-sm">
                  <li>✓ WCAG 2.2 AA compliance</li>
                  <li>✓ Keyboard navigation</li>
                  <li>✓ Reduced motion support</li>
                  <li>✓ SEO metadata utilities</li>
                  <li>✓ Google Analytics integration</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
