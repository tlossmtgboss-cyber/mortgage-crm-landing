import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Builder Application Portal",
  description: "Complete your CMG Home Loans builder packet online. 90+ fields, e-sign documents, and upload supporting materials — all in one place.",
};

export default function BuilderApplicationPage() {
  redirect("https://tlossmtgboss-cyber.github.io/cmg-builder-portal/register.html");
}
