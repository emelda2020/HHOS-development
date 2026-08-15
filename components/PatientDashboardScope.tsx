"use client";

import { ReactNode } from "react";
import styles from "./PatientDashboard.module.css";

export default function PatientDashboardScope({
  children
}: {
  children: ReactNode;
}) {
  return <div className={styles.scope}>{children}</div>;
}
