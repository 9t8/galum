"use client";

import { useUserId } from "@nhost/nextjs";
import { useState } from "react";

export default function Connect() {
  const id = useUserId();

  const [email, setEmail] = useState("");

  return <></>;
}
