import { FadeInSection } from "@/components/home/fade-in-section.comp";
import HeroBanner from "@/components/home/hero-banner.comp";
import { ServiceSection } from "@/components/home/service-section.comp";
import { DividerLineSection } from "@/components/home/divider-section.comp";
import { CategoryBubbleSection } from "@/components/home/category-section.comp";
import { NewItemsSection } from "@/components/home/new-items.comp";
import { HotItemSection } from "@/components/home/hot-item.comp";
import { Stack } from "@mui/material";
import { PartnerContactSection } from "@/components/home/partner-contact-section.comp";
import Footer from "@/components/layouts/customerLayout/footer.comp";
import { categoryApis } from "@/base/apis/category.api";
import { productApis } from "@/base/apis/product.api";
async function fetchCategoryList() {
    try {
            const data = await categoryApis.getList({ page: 0, limit: 100 })
            return data?.items
    } catch (error) {
        throw error
    }
}
async function fetchNewProductList() {
    try {
            const data = await productApis.getListByTag('handmade', { limit: 10, page: 0 })
            return data?.items
    } catch (error) {
        throw error
    }
}
export default async function Home() {
  const categories = await fetchCategoryList()
  const newProducts = await fetchNewProductList()
  return <Stack alignItems={'center'}
    sx={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${'/images/wool.jpg'})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed", 
    }}
  >
    <HeroBanner />
    <Stack bgcolor={'white'} width={'100%'} spacing={4} px={{ sm: 2, md: 6, lg: 10 }} >

      <ServiceSection />

      <FadeInSection>
        <DividerLineSection />
        <HotItemSection />
      </FadeInSection>
    </Stack>


    <FadeInSection>
      <CategoryBubbleSection categories={categories} />
    </FadeInSection>

    <Stack
      bgcolor={'white'}
      width={'100%'}
      spacing={4} pt={20}
      alignItems={'center'} px={{ sm: 2, md: 6, lg: 10 }}
      sx={{borderTopLeftRadius: '5%', borderTopRightRadius: '5%'}}
    >
      <FadeInSection>
        <DividerLineSection />
      </FadeInSection>
      
      <FadeInSection>
        <NewItemsSection items={newProducts} />
      </FadeInSection>
      <FadeInSection>
        <DividerLineSection />
      </FadeInSection>
      <FadeInSection>
        <PartnerContactSection />
      </FadeInSection>
    </Stack>
      <FadeInSection>
        < Footer/>
      </FadeInSection>
  </Stack>
}
