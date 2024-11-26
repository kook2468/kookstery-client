"use client";

import { useState } from "react";
import SignUpForm from "./components/signup-form";
import SignUpSuccess from "./components/signup-success";

export default function SignUpPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  return (
    <div>
      {isSuccess ? <SignUpSuccess /> : <SignUpForm onSuccess={handleSuccess} />}{" "}
    </div>
  );
}
