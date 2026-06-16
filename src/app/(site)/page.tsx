import { HomeSections } from "@/components/blocks/HomeSections";
import { getHomePageData } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const { sections } = await getHomePageData();

  return (
    <div id="main-content">
      <HomeSections sections={sections} />
    </div>
  );
}
