import { FadeInSection } from "@/components/home/fade-in-section.comp";
import HeroBanner from "@/components/home/hero-banner.comp";
import { ServiceSection } from "@/components/home/service-section.comp";
import { DividerLineSection } from "@/components/home/divider-section.comp";
import { CategoryBubbleSection } from "@/components/home/category-section.comp";
import { ContactForm } from "@/components/home/contact-form.comp";
import { NewItemsSection } from "@/components/home/new-items.comp";
import { HotItemSection } from "@/components/home/hot-item.comp";
import { Stack } from "@mui/material";
import { PartnerContactSection } from "@/components/home/partner-contact-section.comp";

export default function Home() {
  return <Stack alignItems={'center'}
    sx={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${'/images/wool.jpg'})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed", marginBottom: -6
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
      <CategoryBubbleSection />
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
        <NewItemsSection />
      </FadeInSection>
      <FadeInSection>
        <DividerLineSection />
      </FadeInSection>
      <FadeInSection>
        <PartnerContactSection />
      </FadeInSection>
    </Stack>
  </Stack>
}
