import { Schema, models, model, type InferSchemaType } from "mongoose";

const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Sirhan Admin" },
  },
  { timestamps: true }
);

const SiteSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    brandName: { type: String, default: "Sirhan" },
    tagline: { type: String, default: "Mind · Body · Balance" },
    siteTitle: { type: String, default: "Sirhan | Center for Well-Being" },
    siteDescription: {
      type: String,
      default:
        "Practical psychological support, career guidance, learning, and community wellbeing.",
    },
    colors: {
      navy: { type: String, default: "#06141b" },
      slate: { type: String, default: "#11212d" },
      stone: { type: String, default: "#253745" },
      sage: { type: String, default: "#5a7f6c" },
      sageDeep: { type: String, default: "#3f5f50" },
      sageSoft: { type: String, default: "#d5e4db" },
      ivory: { type: String, default: "#f6efe3" },
      ivoryDeep: { type: String, default: "#efe6d6" },
      clay: { type: String, default: "#c47f5f" },
      claySoft: { type: String, default: "#f0d8cc" },
      cream: { type: String, default: "#faf7f1" },
      paper: { type: String, default: "#fffdf9" },
      muted: { type: String, default: "#5c6b72" },
    },
    fonts: {
      display: { type: String, default: "Cormorant Garamond" },
      sans: { type: String, default: "Outfit" },
      script: { type: String, default: "Great Vibes" },
    },
    images: {
      logo: { type: String, default: "/logo-mark.svg" },
      hero: { type: String, default: "/calm.jpg" },
      favicon: { type: String, default: "/favicon.ico" },
    },
    contact: {
      phone: { type: String, default: "+92 300 0000000" },
      email: { type: String, default: "hello@sirhan.care" },
      location: { type: String, default: "Lahore, Pakistan" },
      hours: {
        type: String,
        default: "Mon–Fri · 10:00 AM – 6:00 PM\nSat · 11:00 AM – 3:00 PM",
      },
    },
    social: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      youtube: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const PageContentSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    sections: {
      type: Schema.Types.Mixed,
      default: {},
    },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    category: { type: String, default: "General" },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    author: { type: String, default: "Sirhan Team" },
  },
  { timestamps: true }
);

const MediaAssetSchema = new Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    alt: { type: String, default: "" },
    mimeType: { type: String, default: "image/jpeg" },
    size: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const NavItemSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    order: { type: Number, default: 0 },
    parentId: { type: String, default: null },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type AdminUserDoc = InferSchemaType<typeof AdminUserSchema> & {
  _id: string;
};
export type SiteSettingsDoc = InferSchemaType<typeof SiteSettingsSchema> & {
  _id: string;
};
export type PageContentDoc = InferSchemaType<typeof PageContentSchema> & {
  _id: string;
};
export type BlogPostDoc = InferSchemaType<typeof BlogPostSchema> & {
  _id: string;
};
export type MediaAssetDoc = InferSchemaType<typeof MediaAssetSchema> & {
  _id: string;
};

export const AdminUser =
  models.AdminUser || model("AdminUser", AdminUserSchema);
export const SiteSettings =
  models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
export const PageContent =
  models.PageContent || model("PageContent", PageContentSchema);
export const BlogPost = models.BlogPost || model("BlogPost", BlogPostSchema);
export const MediaAsset =
  models.MediaAsset || model("MediaAsset", MediaAssetSchema);
export const NavItem = models.NavItem || model("NavItem", NavItemSchema);
