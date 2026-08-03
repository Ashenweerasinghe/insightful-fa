import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import { Grid } from "@/components/layout/grid";
import { Divider } from "@/components/layout/divider";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

export const metadata: Metadata = {
  title: "Industry Focus",
  description:
    "IFA specializes in inventory-driven businesses, where operational decisions directly affect financial performance — helping leaders gain visibility and make better decisions before month-end.",
  alternates: {
    canonical: "/industry-focus",
  },
  openGraph: {
    title: "Industry Focus · Insightful Financial Analytics",
    description:
      "Helping inventory-driven businesses turn operational and financial data into earlier visibility and better decisions.",
    type: "website",
  },
};

/** Industries IFA focuses on (inventory-driven). Rendered as a two-column
 *  editorial list of name + the value IFA delivers for each. */
const INDUSTRIES: readonly { name: string; description: string }[] = [
  {
    name: "Manufacturing",
    description:
      "Improve visibility into inventory, production, labor, margins, and profitability.",
  },
  {
    name: "Distribution & Wholesale",
    description:
      "Optimize purchasing, inventory turnover, supplier performance, and working capital.",
  },
  {
    name: "E-Commerce",
    description:
      "Manage inventory, fulfillment costs, multiple sales channels, returns, and profitability.",
  },
  {
    name: "Apparel & Fashion",
    description:
      "Improve inventory planning, forecasting, markdown management, and margin protection.",
  },
  {
    name: "Consumer Products",
    description:
      "Connect inventory planning, production, and financial performance.",
  },
  {
    name: "Food & Beverage Manufacturing",
    description:
      "Monitor ingredient costs, spoilage, production efficiency, inventory, and profitability.",
  },
  {
    name: "Automotive Parts & Industrial Supply",
    description:
      "Strengthen inventory management, warehouse performance, purchasing, and operational efficiency.",
  },
  {
    name: "Medical & Healthcare Supply",
    description:
      "Improve inventory control, demand forecasting, purchasing, and cash flow.",
  },
  {
    name: "Importers & Exporters",
    description:
      "Manage supplier performance, shipping, inventory planning, and working capital.",
  },
  {
    name: "Multi-Location Businesses",
    description:
      "Location performance, operational comparisons, profitability, and management reporting.",
  },
];

export default function IndustryFocusPage() {
  return (
    <>
      <Section variant="transitional">
        <Container width="default">
          <Stack gap="xl" className="mx-auto max-w-[72ch]">
            <Heading
              level={1}
              size="display-md"
              className="text-heading-xl lg:text-display-md"
            >
              Helping Inventory-Driven Businesses Make Better Decisions
            </Heading>

            <Stack gap="md">
              <Text size="body-lg" className="text-text-secondary">
                At IFA, we specialize in working with businesses where
                operational decisions have a direct impact on financial
                performance.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                Our primary focus is inventory-driven industries because
                inventory influences almost every part of the business&mdash;from
                revenue and cost of sales to cash flow, profitability, and
                working capital.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                That&rsquo;s where our approach delivers the greatest value.
              </Text>
            </Stack>

            <Stack gap="md">
              <Heading
                level={2}
                size="heading-xl"
                className="text-heading-lg lg:text-heading-xl"
              >
                Why Inventory-Driven Businesses?
              </Heading>
              <Text size="body-lg" className="text-text-secondary">
                Inventory doesn&rsquo;t just affect your warehouse&mdash;it
                affects your entire business.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                Every inventory decision influences revenue, cost of sales,
                gross margins, cash flow, working capital, and profitability.
              </Text>
              <Text size="body-lg" className="text-text-secondary">
                That&rsquo;s why IFA specializes in inventory-driven businesses.
                We help business leaders understand these relationships earlier,
                giving them the visibility and confidence to make better
                decisions before month-end.
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section variant="editorial">
        <Container width="default">
          <Stack gap="lg">
            <Heading
              level={2}
              size="heading-xl"
              className="text-heading-lg lg:text-heading-xl"
            >
              Industries
            </Heading>
            <Grid variant="grid-2" className="items-start gap-[var(--space-xl)]">
              {INDUSTRIES.map((industry) => (
                <Stack key={industry.name} gap="sm">
                  <Text
                    size="body-lg"
                    className="text-text-primary font-semibold"
                  >
                    {industry.name}
                  </Text>
                  <Text size="body-lg" className="text-text-secondary">
                    {industry.description}
                  </Text>
                </Stack>
              ))}
            </Grid>

            <Divider className="my-[var(--space-lg)]" />

            <Stack gap="md" className="max-w-[72ch]">
              <Heading
                level={2}
                size="heading-lg"
                className="text-heading-md lg:text-heading-lg"
              >
                Not Seeing Your Industry?
              </Heading>
              <Text size="body-lg" className="text-text-secondary">
                If your business manages inventory and operational data, our
                methodology can likely help. Contact us to learn how IFA can
                improve financial visibility and business performance.
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
