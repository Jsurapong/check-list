import LayoutAdmin from "@/components/Layout/Admin";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutAdmin>{children}</LayoutAdmin>;
}
