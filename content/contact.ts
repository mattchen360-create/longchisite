import { site } from "@/content/site";

export const directContact = {
  name: "Matt Chen",
  role: "Project enquiries",
  email: site.email,
  whatsappUrl: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello LONGCHI, I would like to discuss equipment for my project.")}`,
  wechatQr: "/images/contact/matt-wechat.jpg",
};

// Add only verified, user-supplied official profile URLs. No placeholder destinations.
export const socialProfiles: {
  platform: "linkedin" | "facebook" | "youtube" | "instagram";
  label: string;
  url: string;
}[] = [
  {
    platform: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/longchismart/",
  },
  {
    platform: "youtube",
    label: "YouTube",
    url: "https://www.youtube.com/@longchismart",
  },
];
