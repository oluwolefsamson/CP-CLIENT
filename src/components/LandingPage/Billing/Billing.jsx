import { CheckIcon } from "@heroicons/react/20/solid";

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    href: "#",
    priceMonthly: "$19",
    description:
      "Ideal for casual users looking to track a limited set of prices across categories.",
    features: [
      "Track up to 5 price categories",
      "Daily price updates",
      "Email notifications for price changes",
      "Basic reporting",
    ],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "#",
    priceMonthly: "$49",
    description:
      "Best for individuals or businesses that need more comprehensive tracking across multiple markets.",
    features: [
      "Track unlimited categories",
      "Real-time price alerts",
      "Advanced price analysis and insights",
      "Priority customer support",
      "Access to in-depth reports and forecasts",
    ],
    featured: true,
  },
  {
    name: "Premium",
    id: "tier-premium",
    href: "#",
    priceMonthly: "$99",
    description:
      "Designed for enterprises requiring dedicated support, custom pricing solutions, and advanced tracking tools.",
    features: [
      "Dedicated account manager",
      "Custom price tracking plans and integrations",
      "Advanced market analytics and forecasting",
      "Real-time price tracking with API support",
      "Exclusive access to premium market insights",
    ],
    featured: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Billing() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="xl:w-[470px] mx-auto">
        <h2 className="heading text-center">
          Choose the Best Price Tracking Plan
        </h2>
        <p className="text__para text-center">
          Affordable and flexible plans to track prices across industries and
          make informed decisions.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 lg:max-w-6xl lg:grid-cols-3">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-green-900 shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-green-400" : "text-green-600",
                "text-base/7 font-semibold"
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? "text-white" : "text-gray-900",
                  "text-5xl font-semibold tracking-tight"
                )}
              >
                {tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured ? "text-gray-400" : "text-gray-500",
                  "text-base"
                )}
              >
                /month
              </span>
            </p>
            <p
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-6 text-base/7"
              )}
            >
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm/6 sm:mt-10"
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className={classNames(
                      tier.featured ? "text-green-400" : "text-green-600",
                      "h-6 w-5 flex-none"
                    )}
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? "bg-green-500 text-white shadow-xs hover:bg-green-400 focus-visible:outline-green-500"
                  : "text-green-600 ring-1 ring-green-200 ring-inset hover:ring-green-300 focus-visible:outline-green-600",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
              )}
            >
              {" "}
              Get started today{" "}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
