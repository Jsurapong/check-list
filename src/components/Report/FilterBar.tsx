import React, { useCallback } from "react";
import { Card, Select, Space } from "antd";
import { useGetRoomQuery } from "@/app/room/service";
import { useSession } from "next-auth/react";

import { yearOption, termOptions } from "../Room/constants";
import { Role } from "@/lib/types/role";

const FilterBar: React.FC<{
  onChange: (value: number | undefined) => void;
  onChangeYear: (value: number | undefined) => void;
  onChangeTerm: (value: number | undefined) => void;
}> = ({ onChange, onChangeYear, onChangeTerm }) => {
  const [selected, setSelected] = React.useState<number | undefined>();
  const [yearSelected, setYearSelected] = React.useState<number | undefined>();
  const [termSelected, setTermSelected] = React.useState<number | undefined>();

  const { data, isFetching } = useGetRoomQuery({});

  const { data: session } = useSession();

  const userId = session?.user.id;
  const type = session?.user.type;

  const options = data
    ?.filter(
      (item) =>
        item.teacherId === userId ||
        type === Role.Admin ||
        type === Role.TeacherL1
    )
    ?.map((item) => {
      const name = item.name;
      const year = yearOption?.find((y) => y.value === item.year)?.label;
      const department = item.department.name;

      const fullName = name + " " + year + " " + department;

      return { label: fullName, value: item.id };
    });

  const handleOnChange = (value: number | undefined) => {
    onChange(value);
    setSelected(value);
  };

  const handleOnChangeYear = (value: number | undefined) => {
    onChangeYear(value);
    setYearSelected(value);
  };

  const handleOnChangeTerm = (value: number | undefined) => {
    onChangeTerm(value);
    setTermSelected(value);
  };

  return (
    <Card>
      <Space direction="vertical">
        ห้อง
        <Select
          value={selected}
          onChange={(value: number | undefined) => {
            handleOnChange(value);
          }}
          loading={isFetching}
          options={options}
          style={{ minWidth: "300px" }}
        />
        ปีการศึกษา
        <Select
          value={yearSelected}
          onChange={(value: number | undefined) => {
            handleOnChangeYear(value);
          }}
          options={yearOption}
          style={{ minWidth: "300px" }}
        />
        เทอม
        <Select
          value={termSelected}
          onChange={(value: number | undefined) => {
            handleOnChangeTerm(value);
          }}
          options={termOptions}
          style={{ minWidth: "300px" }}
        />
      </Space>
    </Card>
  );
};

export default FilterBar;
