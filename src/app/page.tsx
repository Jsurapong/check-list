import { authServer } from "@/lib/auth";
import { Role } from "@/lib/types/role";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";

import DashboardStudent from "@/components/Home/DashboardStudent";
import DashboardTeacher from "@/components/Home/DashboardTeacher";
import LayoutAdmin from "@/components/Layout/Admin";

export default async function Page() {
  await authServer([Role.Admin, Role.Student, Role.TeacherL1, Role.TeacherL2]);

  const session = await getServerSession(authOptions);

  if (
    session?.user?.type === Role.Admin ||
    session?.user?.type === Role.TeacherL1 ||
    session?.user?.type === Role.TeacherL2
  ) {
    return (
      <LayoutAdmin>
        <DashboardTeacher />
      </LayoutAdmin>
    );
  }

  return (
    <LayoutAdmin>
      <DashboardStudent />
    </LayoutAdmin>
  );
}
