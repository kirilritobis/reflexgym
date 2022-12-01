import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import AddPlanForm from "./AddPlanForm/AddPlanForm";

import PlansTable from "./PlansTable/PlansTable";

const Plans: FunctionComponent<{}> = () => {
  return (
    <div>
      <AddPlanForm />
      <PlansTable />
    </div>
  );
};

export default Plans;
